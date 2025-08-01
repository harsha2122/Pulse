// src/sections/overview/pharmacy/view/pharmacy-products-view.jsx
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { usePharmacyManager } from 'src/hooks/use-pharmacy';

import { pharmacyApi } from 'src/_mock/pharmacy';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// Import the cart drawer component
import { PharmacyRightSideCartView } from '../pharmacy-right-side-cart-view';

// ----------------------------------------------------------------------

// Product filters and sorting options
const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'rating_desc', label: 'Rating (High to Low)' },
  { value: 'featured', label: 'Featured First' },
];

// ----------------------------------------------------------------------

// Enhanced Floating Cart Icon Component
function FloatingCartIcon({ cartCount, onClick, animate = false }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 1000,
      }}
    >
      <Tooltip title="View Cart" placement="left">
        <Fab
          color="primary"
          onClick={onClick}
          sx={{
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            boxShadow: (theme) => theme.shadows[8],
            transform: animate ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          <Badge
            badgeContent={cartCount || 0}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                minWidth: 20,
                height: 20,
                borderRadius: '10px',
                border: '2px solid',
                borderColor: 'background.paper',
                animation: animate ? 'bounce 0.6s ease-in-out' : 'none',
                '@keyframes bounce': {
                  '0%, 20%, 60%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '80%': { transform: 'translateY(-5px)' },
                },
              }
            }}
          >
            <Iconify
              icon="solar:cart-bold"
              width={cartCount > 0 ? 28 : 32}
              sx={{
                color: 'white',
                transition: 'all 0.2s ease-in-out',
              }}
            />
          </Badge>
        </Fab>
      </Tooltip>
    </Box>
  );
}

// ----------------------------------------------------------------------

// Enhanced Product Card Component
function ProductCard({ product, onAddToCart, onViewDetails }) {
  const [loading, setLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = () => {
    if (!product.is_in_stock || product.stock_quantity === 0)
      return { color: 'error', label: 'Out of Stock' };
    if (product.stock_quantity <= 10)
      return { color: 'warning', label: 'Low Stock' };
    return { color: 'success', label: 'In Stock' };
  };

  const stockStatus = getStockStatus();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
        border: justAdded ? '2px solid' : '1px solid',
        borderColor: justAdded ? 'success.main' : 'divider',
      }}
    >
      {/* Product Badges */}
      <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
        <Stack direction="row" spacing={0.5}>
          {product.is_bestseller && (
            <Chip
              label="Bestseller"
              size="small"
              sx={{
                bgcolor: 'warning.main',
                color: 'warning.contrastText',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          )}
          {product.is_prescription_required && (
            <Chip
              label="Rx"
              size="small"
              sx={{
                bgcolor: 'info.main',
                color: 'info.contrastText',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          )}
          {product.discount_percentage > 0 && (
            <Chip
              label={`${product.discount_percentage}% OFF`}
              size="small"
              sx={{
                bgcolor: 'error.main',
                color: 'error.contrastText',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          )}
        </Stack>
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          height: 160,
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={product.image_url}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 2,
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
          }}
        >
          <Iconify icon="solar:pill-bold" width={48} sx={{ color: 'grey.500' }} />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 48,
          }}
        >
          {product.name}
        </Typography>

        {/* Brand and Category */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={product.brand}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />
          <Chip
            label={product.subcategory_name}
            size="small"
            sx={{
              bgcolor: 'primary.lighter',
              color: 'primary.main',
              fontSize: '0.7rem',
              height: 20,
            }}
          />
        </Stack>

        {/* Product Details */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {product.unit}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 32,
            }}
          >
            {product.description}
          </Typography>
        </Stack>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Iconify icon="solar:star-bold" width={16} sx={{ color: 'warning.main' }} />
            <Typography variant="body2" fontWeight="medium">
              {product.rating}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            ({product.review_count} reviews)
          </Typography>
        </Stack>

        {/* Price and Stock */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ₹{parseFloat(product.price).toFixed(2)}
              </Typography>
              {product.original_price !== product.price && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ₹{parseFloat(product.original_price).toFixed(2)}
                </Typography>
              )}
            </Stack>
            {product.savings_amount && parseFloat(product.savings_amount) > 0 && (
              <Typography variant="caption" color="success.main">
                Save ₹{parseFloat(product.savings_amount).toFixed(2)}
              </Typography>
            )}
          </Box>
          <Chip
            label={stockStatus.label}
            size="small"
            color={stockStatus.color}
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
          />
        </Stack>

        {/* Stock Quantity and Delivery */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {product.is_in_stock ? `${product.stock_quantity} units available` : 'Currently unavailable'}
          </Typography>
          <Typography variant="caption" color="success.main">
            {product.delivery_info}
          </Typography>
        </Stack>
      </CardContent>

      {/* Action Buttons */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onViewDetails(product)}
            sx={{ flex: 1 }}
          >
            Details
          </Button>
          <LoadingButton
            variant="contained"
            size="small"
            loading={loading}
            disabled={!product.is_in_stock}
            onClick={handleAddToCart}
            startIcon={<Iconify icon="solar:cart-plus-bold" />}
            sx={{
              flex: 1,
              bgcolor: justAdded ? 'success.main' : 'primary.main',
              '&:hover': {
                bgcolor: justAdded ? 'success.dark' : 'primary.dark',
              }
            }}
          />


        </Stack>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

// Product Detail Dialog Component
function ProductDetailDialog({ product, open, onClose, onAddToCart }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onAddToCart({ ...product, quantity });
      toast.success(`${quantity} x ${product.name} added to cart!`);
      onClose();
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={product.brand} size="small" variant="outlined" />
              <Chip label={product.category_name} size="small" color="primary" />
              {product.is_bestseller && (
                <Chip label="Bestseller" size="small" color="warning" />
              )}
              {product.is_prescription_required && (
                <Chip label="Prescription Required" size="small" color="info" />
              )}
            </Stack>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: 300,
                bgcolor: 'grey.50',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={product.image_url}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  p: 2,
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                }}
              >
                <Iconify icon="solar:pill-bold" width={64} sx={{ color: 'grey.500' }} />
              </Box>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {/* Price */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    ₹{parseFloat(product.price).toFixed(2)}
                  </Typography>
                  {product.original_price !== product.price && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{parseFloat(product.original_price).toFixed(2)}
                    </Typography>
                  )}
                  {product.discount_percentage > 0 && (
                    <Chip
                      label={`${product.discount_percentage}% OFF`}
                      color="error"
                      size="small"
                    />
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Per {product.unit}
                </Typography>
                {product.savings_amount && parseFloat(product.savings_amount) > 0 && (
                  <Typography variant="body2" color="success.main">
                    You save ₹{parseFloat(product.savings_amount).toFixed(2)}
                  </Typography>
                )}
              </Box>

              {/* Rating and Reviews */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify icon="solar:star-bold" width={20} sx={{ color: 'warning.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {product.rating}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    ({product.review_count} reviews)
                  </Typography>
                </Stack>
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </Box>

              {/* Product Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Product Information
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Unit:
                    </Typography>
                    <Typography variant="body2">{product.unit}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Category:
                    </Typography>
                    <Typography variant="body2">{product.category_name}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Stock:
                    </Typography>
                    <Typography variant="body2" color={product.is_in_stock ? 'success.main' : 'error.main'}>
                      {product.is_in_stock ? `${product.stock_quantity} units` : 'Out of stock'}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Delivery:
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      {product.delivery_info}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Quantity Selector */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Quantity
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Iconify icon="solar:minus-bold" />
                  </IconButton>
                  <TextField
                    size="small"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    inputProps={{
                      min: 1,
                      max: product.stock_quantity,
                      type: 'number',
                      style: { textAlign: 'center', width: 60 }
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Iconify icon="solar:add-bold" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    (Max: {product.stock_quantity})
                  </Typography>
                </Stack>
              </Box>

              {/* Total Price */}
              <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total Price:
                  </Typography>
                  <Typography variant="h5" color="primary.main" fontWeight="bold">
                    ₹{(parseFloat(product.price) * quantity).toFixed(2)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={!product.is_in_stock}
          onClick={handleAddToCart}
          startIcon={<Iconify icon="solar:cart-plus-bold" />}
        >
          Add to Cart
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

// Main Pharmacy Products View Component
export function PharmacyProductsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL parameters
  const categoryId = searchParams.get('category');
  const categoryName = searchParams.get('categoryName');
  const searchQuery = searchParams.get('search');

  // State management
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [sortBy, setSortBy] = useState('name_asc');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Cart state and drawer - UPDATED
  const [cartCount, setCartCount] = useState(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  // Use pharmacy manager hook
  const { cart } = usePharmacyManager();

  // Load subcategories and products
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load subcategories for the selected category
        if (categoryId) {
          const subcategoriesData = await pharmacyApi.subcategories.getByCategory(categoryId);
          setSubcategories(subcategoriesData);
        }

        // Load products
        const params = {
          category: categoryId,
          subcategory: selectedSubcategory !== 'all' ? selectedSubcategory : undefined,
          search: searchTerm,
          ordering: sortBy === 'featured' ? undefined : sortBy.replace('_', sortBy.includes('desc') ? '-' : ''),
        };

        const productsData = await pharmacyApi.products.getAll(params);
        setProducts(productsData.results || []);

        // Load initial cart count
        try {
          const cartDataResponse = await pharmacyApi.cart.get();
          setCartCount(cartDataResponse.total_items || 0);
        } catch (error) {
          console.log('Cart not loaded, starting with 0');
          setCartCount(0);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, selectedSubcategory, searchTerm, sortBy]);

  // Filter and sort products
 const filteredProducts = useMemo(() => {
  const filteredData = [...products];

  // Sort products
  switch (sortBy) {
    case 'name_asc':
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      filteredData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price_asc':
      filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'price_desc':
      filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'rating_desc':
      filteredData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case 'featured':
      filteredData.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
      break;
    default:
      break;
  }

  return filteredData;
}, [products, sortBy]);

  // Handle product actions
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  };

  const handleAddToCart = async (product) => {
    try {
      // Simulate adding to cart (you can replace with actual API call)
      await pharmacyApi.cart.addItem(product.id, product.quantity || 1);

      // Update cart count with animation
      const newCount = cartCount + (product.quantity || 1);
      setCartCount(newCount);
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSubcategory('all');
    setSortBy('name_asc');
  };

  // UPDATED: Open cart drawer instead of navigating to cart page
  const handleGoToCart = () => {
    setCartDrawerOpen(true);
  };

  const handleSubcategoryChange = (event, newValue) => {
    setSelectedSubcategory(newValue);
  };

  // NEW: Handle cart updates from the drawer
  const handleCartUpdate = () => {
    // Reload cart count when cart is updated from the drawer
    const loadCartCount = async () => {
      try {
        const cartDataResponse = await pharmacyApi.cart.get();
        setCartCount(cartDataResponse.total_items || 0);
      } catch (error) {
        console.log('Cart not loaded');
        setCartCount(0);
      }
    };
    loadCartCount();
  };

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Pharmacy Products"
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy', href: `${paths.dashboard.root}/pharmacy` },
            { name: categoryName || 'Products' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:cart-bold" />}
                onClick={handleGoToCart}
              >
                Cart ({cartCount || 0})
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => toast.info('Add product feature coming soon!')}
              >
                Add Product
              </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Filters and Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack spacing={3}>
              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Search products by name, brand, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="solar:magnifer-bold" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchTerm('')} size="small">
                        <Iconify icon="solar:close-circle-bold" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Filter Controls */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                justifyContent="space-between"
              >
                {/* Subcategories Tabs */}
                {subcategories.length > 0 && (
                  <Box sx={{ flexGrow: 1 }}>
                    <Tabs
                      value={selectedSubcategory}
                      onChange={handleSubcategoryChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{
                        '& .MuiTab-root': {
                          minHeight: 40,
                          textTransform: 'none',
                          fontWeight: 500,
                        },
                      }}
                    >
                      <Tab
                        label="All Products"
                        value="all"
                        icon={<Iconify icon="solar:pills-bold" width={20} />}
                        iconPosition="start"
                      />
                      {subcategories.map((subcategory) => (
                        <Tab
                          key={subcategory.id}
                          label={`${subcategory.name} (${subcategory.product_count})`}
                          value={subcategory.id.toString()}
                          icon={<Iconify icon="solar:medical-kit-bold" width={20} />}
                          iconPosition="start"
                        />
                      ))}
                    </Tabs>
                  </Box>
                )}

                {/* Sort and Clear Filters */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClearFilters}
                    startIcon={<Iconify icon="solar:refresh-bold" />}
                  >
                    Clear Filters
                  </Button>
                </Stack>
              </Stack>

              {/* Active Filters */}
              {(searchTerm || selectedSubcategory !== 'all') && (
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                    Active filters:
                  </Typography>
                  {searchTerm && (
                    <Chip
                      label={`Search: "${searchTerm}"`}
                      size="small"
                      onDelete={() => setSearchTerm('')}
                    />
                  )}
                  {selectedSubcategory !== 'all' && (
                    <Chip
                      label={`Subcategory: ${subcategories.find(s => s.id.toString() === selectedSubcategory)?.name || 'Selected'}`}
                      size="small"
                      onDelete={() => setSelectedSubcategory('all')}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Products Results */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {filteredProducts.length} Products Founds
            {categoryName && (
              <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                in {categoryName}
                {selectedSubcategory !== 'all' &&
                  ` > ${subcategories.find(s => s.id.toString() === selectedSubcategory)?.name}`
                }
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} />
          </Box>
        ) : filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleProductClick}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Box
                sx={{
                  py: 8,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Iconify icon="solar:pill-cross-bold" width={48} sx={{ color: 'grey.500' }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  No Products Found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                  {searchTerm || selectedSubcategory !== 'all'
                    ? 'No products match your current filters. Try adjusting your search criteria.'
                    : 'No products available at the moment. Check back later or add some products to your inventory.'
                  }
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={handleClearFilters}
                    startIcon={<Iconify icon="solar:refresh-bold" />}
                  >
                    Clear Filters
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => toast.info('Add product feature coming soon!')}
                    startIcon={<Iconify icon="solar:add-circle-bold" />}
                  >
                    Add Product
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Product Detail Dialog */}
        <ProductDetailDialog
          product={selectedProduct}
          open={productDetailOpen}
          onClose={() => setProductDetailOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* Enhanced Floating Cart Icon with Animation */}
        <FloatingCartIcon
          cartCount={cartCount}
          onClick={handleGoToCart}
          animate={cartAnimation}
        />

        {/* NEW: Cart Drawer Component */}
        <PharmacyRightSideCartView
          open={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
          cartCount={cartCount}
          onCartUpdate={handleCartUpdate}
        />
      </Container>
    </DashboardContent>
  );
}
