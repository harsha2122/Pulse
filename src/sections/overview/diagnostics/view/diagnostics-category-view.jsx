// src/sections/overview/diagnostics/view/diagnostics-category-view.jsx

import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useCart, useCategoryDetail, useDiagnosticsActions } from 'src/hooks/use-diagnostics';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function DiagnosticsCategoryView() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [addingToCart, setAddingToCart] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCartBadge, setShowCartBadge] = useState(false);

  const {
    categoryDetail,
    categoryDetailLoading,
    categoryDetailError,
    categoryDetailEmpty,
  } = useCategoryDetail(categoryId);

  const { cart, cartLoading } = useCart();
  const { addItemToCart, removeItemFromCart, updateCartItemQuantity } = useDiagnosticsActions();

  // Update cart items and count when cart changes
  useEffect(() => {
    if (cart?.items) {
      setCartItems(cart.items);
      const totalCount = cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
      setCartItemsCount(totalCount);
      setShowCartBadge(totalCount > 0);
    }
  }, [cart]);

  // Filter tests based on search query
  const filteredTests = (categoryDetail?.tests || []).filter(test =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTestClick = useCallback((test) => {
    router.push(paths.dashboard.diagnostics.test(test.id));
  }, [router]);

  const handleAddToCart = useCallback(async (test) => {
    if (!cart?.id) return;

    setAddingToCart(prev => ({ ...prev, [test.id]: true }));

    try {
      await addItemToCart(cart.id, test.id, 1);

      // Update local cart state immediately for better UX
      setCartItems(prev => {
        const existingItem = prev.find(item => item.test_id === test.id);
        if (existingItem) {
          return prev.map(item =>
            item.test_id === test.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { test_id: test.id, test, quantity: 1, id: Date.now() }];
      });

      setCartItemsCount(prev => prev + 1);
      setShowCartBadge(true);
      setSnackbarMessage(`${test.name} added to cart!`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbarMessage('Failed to add item to cart');
      setSnackbarOpen(true);
    } finally {
      setAddingToCart(prev => ({ ...prev, [test.id]: false }));
    }
  }, [cart?.id, addItemToCart]);

  const handleRemoveFromCart = useCallback(async (itemId) => {
    try {
      await removeItemFromCart(itemId);
      setSnackbarMessage('Item removed from cart');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error removing from cart:', error);
      setSnackbarMessage('Failed to remove item from cart');
      setSnackbarOpen(true);
    }
  }, [removeItemFromCart]);

  const handleUpdateQuantity = useCallback(async (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbarMessage('Failed to update quantity');
      setSnackbarOpen(true);
    }
  }, [updateCartItemQuantity, handleRemoveFromCart]);

  const handleBackToCategories = useCallback(() => {
    router.push(paths.dashboard.diagnostics.root);
  }, [router]);

  const handleCartClick = useCallback(() => {
    setCartDrawerOpen(true);
  }, []);

  const handleCartDrawerClose = useCallback(() => {
    setCartDrawerOpen(false);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleProceedToCheckout = useCallback(() => {
    setCartDrawerOpen(false);
    router.push(paths.dashboard.diagnostics.checkout);
  }, [router]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.test?.effective_price || item.test?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  // Loading state
  if (categoryDetailLoading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <CategoryDetailSkeleton />
        </Container>
      </DashboardContent>
    );
  }

  // Error state
  if (categoryDetailError) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ mb: 3 }}>
            {categoryDetailError.message || 'Failed to load category details'}
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBackToCategories}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
          >
            Back to Categories
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  // Empty state
  if (categoryDetailEmpty || !categoryDetail) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Alert severity="info" sx={{ mb: 3 }}>
            Category not found
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBackToCategories}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
          >
            Back to Categories
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={categoryDetail.name}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Diagnostics', href: paths.dashboard.diagnostics.root },
            { name: categoryDetail.name },
          ]}
          action={
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:arrow-left-bold" />}
              onClick={handleBackToCategories}
            >
              Back to Categories
            </Button>
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        {/* Category Header */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
              <Box
                component="img"
                src={categoryDetail.icon}
                alt={categoryDetail.name}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="h4">{categoryDetail.name}</Typography>
                  {categoryDetail.is_featured && (
                    <Label color="primary" variant="soft">Featured</Label>
                  )}
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {categoryDetail.description}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip
                    icon={<Iconify icon="solar:test-tube-bold" />}
                    label={`${categoryDetail.test_count} Tests`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={<Iconify icon="solar:dollar-bold" />}
                    label={`₹${categoryDetail.min_price} - ₹${categoryDetail.max_price}`}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <Grid container spacing={3}>
            {filteredTests.map((test) => (
              <Grid item xs={12} sm={6} md={4} key={test.id}>
                <TestCard
                  test={test}
                  onTestClick={() => handleTestClick(test)}
                  onAddToCart={() => handleAddToCart(test)}
                  addingToCart={addingToCart[test.id]}
                  cartLoading={cartLoading}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
                <Iconify icon="solar:file-search-bold" width={64} />
                <Typography variant="h6">No tests found</Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery
                    ? `No tests match your search "${searchQuery}"`
                    : 'No tests available in this category'
                  }
                </Typography>
                {searchQuery && (
                  <Button variant="outlined" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Floating Cart Icon */}
        <Zoom in={showCartBadge}>
          <Fab
            color="primary"
            onClick={handleCartClick}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              zIndex: 1300,
              boxShadow: 4,
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <Badge
              badgeContent={cartItemsCount}
              color="error"
              max={99}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  height: { xs: 18, md: 20 },
                  minWidth: { xs: 18, md: 20 },
                  fontWeight: 'bold',
                }
              }}
            >
              <Iconify icon="solar:cart-bold" width={24} />
            </Badge>
          </Fab>
        </Zoom>

        {/* Cart Drawer */}
        <CartDrawer
          open={cartDrawerOpen}
          onClose={handleCartDrawerClose}
          cartItems={cartItems}
          cartLoading={cartLoading}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          totalPrice={totalPrice}
          onProceedToCheckout={handleProceedToCheckout}
        />

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </Container>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function TestCard({ test, onTestClick, onAddToCart, addingToCart, cartLoading }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              {test.name}
            </Typography>
            {test.is_popular && (
              <Label color="warning" variant="soft" size="small">
                Popular
              </Label>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Code: {test.code}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              icon={<Iconify icon="solar:test-tube-bold" />}
              label={test.sample_type}
              size="small"
              variant="outlined"
            />
            <Chip
              icon={<Iconify icon="solar:clock-circle-bold" />}
              label={`${test.duration_hours}h`}
              size="small"
              variant="outlined"
            />
            {test.is_home_collection && (
              <Chip
                icon={<Iconify icon="solar:home-bold" />}
                label="Home Collection"
                size="small"
                variant="outlined"
                color="success"
              />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            {test.discounted_price ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                >
                  ₹{test.price}
                </Typography>
                <Typography variant="h6" color="primary.main">
                  ₹{test.effective_price}
                </Typography>
                <Label color="error" variant="soft" size="small">
                  {test.discount_percentage.toFixed(0)}% OFF
                </Label>
              </>
            ) : (
              <Typography variant="h6" color="primary.main">
                ₹{test.effective_price}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1} width="100%">
          <Button
            variant="outlined"
            size="small"
            onClick={onTestClick}
            sx={{ flex: 1 }}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onAddToCart}
            disabled={addingToCart || cartLoading}
            startIcon={
              addingToCart ? (
                <CircularProgress size={16} />
              ) : (
                <Iconify icon="solar:cart-plus-bold" />
              )
            }
            sx={{
              flex: 1,
              '&:not(:disabled):hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

// ----------------------------------------------------------------------

function CartDrawer({
  open,
  onClose,
  cartItems,
  cartLoading,
  onRemoveItem,
  onUpdateQuantity,
  totalPrice,
  onProceedToCheckout
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400, md: 450 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2">
            Cart ({cartItems.length})
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items */}
        {cartLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Iconify icon="solar:cart-bold" width={64} sx={{ mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add some tests to get started
            </Typography>
            <Button variant="outlined" onClick={onClose}>
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => onRemoveItem(item.id)}
                  onUpdateQuantity={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
                />
              ))}
            </List>

            {/* Footer */}
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary.main">
                  ₹{totalPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={onProceedToCheckout}
                disabled={cartItems.length === 0}
                startIcon={<Iconify icon="solar:card-bold" />}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

// ----------------------------------------------------------------------

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const test = item.test || {};
  const price = test.effective_price || test.price || 0;

  return (
    <ListItem sx={{ px: 0, py: 1 }}>
      <Stack direction="row" spacing={2} width="100%">
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: 'primary.lighter',
            color: 'primary.main',
          }}
        >
          <Iconify icon="solar:test-tube-bold" />
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {test.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Code: {test.code}
          </Typography>
          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
            ₹{price} × {item.quantity}
          </Typography>
        </Box>

        <Stack alignItems="center" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Decrease quantity">
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Iconify icon="eva:minus-fill" />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
              {item.quantity}
            </Typography>
            <Tooltip title="Increase quantity">
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(item.quantity + 1)}
              >
                <Iconify icon="eva:plus-fill" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Tooltip title="Remove item">
            <IconButton size="small" color="error" onClick={onRemove}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </ListItem>
  );
}

// ----------------------------------------------------------------------

function CategoryDetailSkeleton() {
  return (
    <Stack spacing={3}>
      {/* Breadcrumb Skeleton */}
      <Skeleton variant="text" width={300} height={40} />

      {/* Header Skeleton */}
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Skeleton variant="rectangular" width={64} height={64} sx={{ borderRadius: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width={200} height={32} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={120} height={24} />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Search Skeleton */}
      <Card>
        <CardContent>
          <Skeleton variant="rounded" width="100%" height={56} />
        </CardContent>
      </Card>

      {/* Tests Grid Skeleton */}
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={60} height={24} />
                    <Skeleton variant="rounded" width={60} height={24} />
                  </Stack>
                  <Skeleton variant="text" width="50%" height={28} />
                </Stack>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1} width="100%">
                  <Skeleton variant="rounded" width="50%" height={32} />
                  <Skeleton variant="rounded" width="50%" height={32} />
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
