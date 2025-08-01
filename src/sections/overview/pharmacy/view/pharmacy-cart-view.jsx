// src/sections/overview/pharmacy/view/pharmacy-cart-view.jsx
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { usePharmacyCart } from 'src/hooks/use-pharmacy';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove, updating }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = useCallback(async (newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    try {
      await onUpdateQuantity(item.product.id, newQuantity);
    } catch (error) {
      setQuantity(item.quantity); // Revert on error
      toast.error('Failed to update quantity');
    }
  }, [item.product.id, item.quantity, onUpdateQuantity]);

  const handleRemove = useCallback(async () => {
    try {
      await onRemove(item.product.id);
      toast.success(`${item.product.name} removed from cart`);
    } catch (error) {
      toast.error('Failed to remove item');
    }
  }, [item.product.id, item.product.name, onRemove]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Product Image */}
          <Grid item xs={3} sm={2}>
            <Box
              component="img"
              src={item.product.image_url}
              alt={item.product.name}
              sx={{
                width: '100%',
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={9} sm={4}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              {item.product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {item.product.brand} • {item.product.unit}
            </Typography>

            {/* Badges */}
            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
              {item.product.is_prescription_required && (
                <Chip
                  label="Rx Required"
                  size="small"
                  color="warning"
                  sx={{ height: 20, fontSize: '0.6rem' }}
                />
              )}
              {item.product.is_bestseller && (
                <Chip
                  label="Bestseller"
                  size="small"
                  color="error"
                  sx={{ height: 20, fontSize: '0.6rem' }}
                />
              )}
            </Stack>
          </Grid>

          {/* Quantity Controls */}
          <Grid item xs={6} sm={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                size="small"
                disabled={updating || quantity <= 1}
                onClick={() => handleQuantityChange(quantity - 1)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  width: 32,
                  height: 32,
                }}
              >
                <Iconify icon="solar:minus-bold" width={16} />
              </IconButton>

              <TextField
                size="small"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!Number.isNaN(value) && value > 0) {
                    handleQuantityChange(value);
                  }
                }}
                sx={{
                  width: 60,
                  '& .MuiOutlinedInput-root': {
                    textAlign: 'center',
                  },
                }}
                inputProps={{
                  style: { textAlign: 'center', padding: '8px' }
                }}
              />

              <IconButton
                size="small"
                disabled={updating}
                onClick={() => handleQuantityChange(quantity + 1)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  width: 32,
                  height: 32,
                }}
              >
                <Iconify icon="solar:add-bold" width={16} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Price */}
          <Grid item xs={6} sm={2}>
            <Stack alignItems="flex-end">
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                ₹{item.total_price}
              </Typography>
              {item.savings_amount > 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ₹{item.total_original_price}
                </Typography>
              )}
              {item.savings_amount > 0 && (
                <Typography variant="caption" color="success.main">
                  Save ₹{item.savings_amount}
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Remove Button */}
          <Grid item xs={12} sm={2}>
            <Stack alignItems="flex-end">
              <IconButton
                color="error"
                disabled={updating}
                onClick={handleRemove}
                sx={{ mb: 1 }}
              >
                {updating ? (
                  <CircularProgress size={20} />
                ) : (
                  <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                )}
              </IconButton>
              <Typography variant="caption" color="text.secondary">
                ₹{item.unit_price} each
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

// Order Summary Component
function OrderSummary({ cart, onCheckout, checkoutLoading }) {
  return (
    <Card sx={{ position: 'sticky', top: 24 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        <Stack spacing={2}>
          {/* Items Summary */}
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Subtotal ({cart.total_items} items)
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                ₹{cart.subtotal}
              </Typography>
            </Stack>

            {cart.total_savings > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="success.main">
                  Total Savings
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  -₹{cart.total_savings}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Delivery Charges
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {cart.delivery_charge === '0.00' ? 'FREE' : `₹${cart.delivery_charge}`}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Total */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              Total Amount
            </Typography>
            <Typography variant="h6" color="primary.main">
              ₹{cart.total_amount}
            </Typography>
          </Stack>

          {/* Free Delivery Alert */}
          {parseFloat(cart.subtotal) < 500 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="caption">
                Add ₹{(500 - parseFloat(cart.subtotal)).toFixed(2)} more for FREE delivery
              </Typography>
            </Alert>
          )}

          {/* Prescription Required Alert */}
          {cart.prescription_required && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              <Typography variant="caption">
                Some items require prescription. Upload during checkout.
              </Typography>
            </Alert>
          )}

          {/* Checkout Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onCheckout}
            loading={checkoutLoading}
            disabled={cart.total_items === 0}
            startIcon={<Iconify icon="solar:card-bold" />}
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>

          {/* Continue Shopping */}
          <Button
            variant="outlined"
            size="large"
            fullWidth
            href={`${paths.dashboard.root}/pharmacy`}
            startIcon={<Iconify icon="solar:cart-plus-bold" />}
          >
            Continue Shopping
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function PharmacyCartView() {
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const {
    cart,
    loading,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isEmpty,
  } = usePharmacyCart();

  const handleUpdateQuantity = useCallback(async (productId, quantity) => {
    await updateCartQuantity(productId, quantity);
  }, [updateCartQuantity]);

  const handleRemoveItem = useCallback(async (productId) => {
    await removeFromCart(productId);
  }, [removeFromCart]);

  const handleClearCart = useCallback(async () => {
    try {
      await clearCart();
      toast.success('Cart cleared successfully');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  }, [clearCart]);

  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to checkout page
      router.push(`${paths.dashboard.root}/pharmacy/checkout`);
    } catch (error) {
      toast.error('Failed to proceed to checkout');
    } finally {
      setCheckoutLoading(false);
    }
  }, [router]);

  const handleBackToPharmacy = () => {
    router.push(`${paths.dashboard.root}/pharmacy`);
  };

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress size={40} />
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Shopping Cart"
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy', href: `${paths.dashboard.root}/pharmacy` },
            { name: 'Cart' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:arrow-left-bold" />}
                onClick={handleBackToPharmacy}
              >
                Continue Shopping
              </Button>
              {!isEmpty && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              )}
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {isEmpty ? (
          /* Empty Cart State */
          <Card>
            <CardContent>
              <Box
                sx={{
                  py: 12,
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
                  <Iconify icon="solar:cart-large-2-bold" width={64} sx={{ color: 'grey.500' }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                  Looks like you haven&#39;t added any items to your cart yet.
                  Start shopping to find great deals on medicines and healthcare products.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Iconify icon="solar:cart-plus-bold" />}
                    onClick={handleBackToPharmacy}
                  >
                    Start Shopping
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Iconify icon="solar:pills-bold" />}
                    onClick={() => toast.info('Featured products coming soon!')}
                  >
                    Browse Categories
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ) : (
          /* Cart with Items */
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6">
                      Cart Items ({cart.total_items})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cart.unique_items_count} unique products
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              {/* Cart Items List */}
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  updating={loading}
                />
              ))}

              {/* Delivery Information */}
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Delivery Information
                  </Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:clock-circle-bold" width={20} color="success.main" />
                      <Typography variant="body2">
                        Standard delivery: Get by tomorrow
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:shield-check-bold" width={20} color="info.main" />
                      <Typography variant="body2">
                        All medicines are verified and authentic
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:phone-bold" width={20} color="warning.main" />
                      <Typography variant="body2">
                        24/7 customer support available
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <OrderSummary
                cart={cart}
                onCheckout={handleCheckout}
                checkoutLoading={checkoutLoading}
              />

              {/* Offers Card */}
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Available Offers
                  </Typography>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: 'success.lighter',
                        border: '1px solid',
                        borderColor: 'success.light',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:gift-bold" width={20} color="success.main" />
                        <Typography variant="subtitle2" color="success.main">
                          First Order Discount
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        Get 10% off on your first order
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: 'info.lighter',
                        border: '1px solid',
                        borderColor: 'info.light',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:delivery-bold" width={20} color="info.main" />
                        <Typography variant="subtitle2" color="info.main">
                          Free Delivery
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        On orders above ₹500
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </DashboardContent>
  );
}
