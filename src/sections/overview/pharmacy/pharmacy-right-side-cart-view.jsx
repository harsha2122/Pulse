// src/sections/overview/pharmacy/pharmacy-right-side-cart-view.jsx - Enhanced version with proper calculations
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// Enhanced calculation utilities for handling duplicate products
const CartCalculationUtils = {
  // Calculate subtotal for all items
 calculateSubtotal: (items) => items.reduce((total, item) => {
    const itemPrice = parseFloat(item.product.price) || 0;
    const itemQuantity = parseInt(item.quantity, 10) || 0;
    return total + (itemPrice * itemQuantity);
  }, 0),

  // Calculate original total (before discounts)
  calculateOriginalTotal: (items) => items.reduce((total, item) => {
      const originalPrice = parseFloat(item.product.original_price || item.product.price) || 0;
      const itemQuantity = parseInt(item.quantity, 10) || 0;
      return total + (originalPrice * itemQuantity);
    }, 0),

  // Calculate total quantity across all items
  calculateTotalQuantity: (items) =>
  items.reduce((total, item) => total + (parseInt(item.quantity, 10) || 0), 0),

  // Calculate total savings
  calculateTotalSavings: (items, appliedDiscount = 0) => {
    const originalTotal = CartCalculationUtils.calculateOriginalTotal(items);
    const currentSubtotal = CartCalculationUtils.calculateSubtotal(items);
    const productSavings = originalTotal - currentSubtotal;
    return productSavings + appliedDiscount;
  },

  // Calculate prescription items count
  calculatePrescriptionCount: (items) => items.filter(item => item.product.is_prescription_required).length,

  // Calculate delivery fee based on subtotal
  calculateDeliveryFee: (subtotal, freeDeliveryThreshold = 750) =>
     subtotal >= freeDeliveryThreshold ? 0 : 50 // ₹50 delivery fee
  ,

  // Recalculate entire cart
  recalculateCart: (items, promoDiscount = 0, freeDeliveryThreshold = 750) => {
    const subtotal = CartCalculationUtils.calculateSubtotal(items);
    const originalTotal = CartCalculationUtils.calculateOriginalTotal(items);
    const totalQuantity = CartCalculationUtils.calculateTotalQuantity(items);
    const prescriptionCount = CartCalculationUtils.calculatePrescriptionCount(items);
    const deliveryFee = CartCalculationUtils.calculateDeliveryFee(subtotal, freeDeliveryThreshold);
    const totalSavings = CartCalculationUtils.calculateTotalSavings(items, promoDiscount);
    const finalTotal = subtotal - promoDiscount + deliveryFee;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      original_total: parseFloat(originalTotal.toFixed(2)),
      total_items: totalQuantity,
      prescription_items_count: prescriptionCount,
      delivery_fee: deliveryFee,
      discount: parseFloat(promoDiscount.toFixed(2)),
      total_savings: parseFloat(totalSavings.toFixed(2)),
      total: parseFloat(Math.max(0, finalTotal).toFixed(2))
    };
  }
};

// Initial cart with selected products (no empty state buttons)
const INITIAL_CART_DATA = {
  items: [
    {
      id: 101,
      quantity: 1,
      product: {
        id: 201,
        name: 'Aspirin 75mg Tablets',
        brand: 'CardioShield',
        price: 85.00,
        original_price: 95.00,
        unit: 'Pack of 30 tablets',
        image_url: 'https://via.placeholder.com/200x200/e8f5e8/388e3c?text=Aspirin+75mg',
        stock_quantity: 45,
        is_in_stock: true,
        is_prescription_required: false,
        category: 'Cardiovascular',
        manufacturer: 'PharmaCorp Ltd.',
        expiry_date: '2026-12-31',
        batch_number: 'ASP240101'
      }
    },
    {
      id: 102,
      quantity: 2,
      product: {
        id: 202,
        name: 'Omega-3 Fish Oil Capsules',
        brand: 'HealthMax',
        price: 450.00,
        original_price: 450.00,
        unit: 'Bottle of 90 capsules',
        image_url: 'https://via.placeholder.com/200x200/fff3e0/ff8f00?text=Omega+3',
        stock_quantity: 12,
        is_in_stock: true,
        is_prescription_required: false,
        category: 'Supplements',
        manufacturer: 'NutriLife Sciences',
        expiry_date: '2026-08-15',
        batch_number: 'OM3240205'
      }
    },
    {
      id: 103,
      quantity: 1,
      product: {
        id: 203,
        name: 'Metformin 500mg Extended Release',
        brand: 'DiabetCare',
        price: 180.00,
        original_price: 200.00,
        unit: 'Strip of 15 tablets',
        image_url: 'https://via.placeholder.com/200x200/e3f2fd/1565c0?text=Metformin+500mg',
        stock_quantity: 8,
        is_in_stock: true,
        is_prescription_required: true,
        category: 'Diabetes Care',
        manufacturer: 'MediCore Pharmaceuticals',
        expiry_date: '2027-03-20',
        batch_number: 'MET240115'
      }
    }
  ],
  total_items: 4,
  subtotal: 985.00,
  discount: 45.00,
  delivery_fee: 0,
  total: 940.00,
  total_savings: 65.00,
  applied_coupons: ['HEALTH20'],
  delivery_address: {
    name: 'John Doe',
    address: '123 Medical Street, Health City, HC 12345',
    phone: '+1 234-567-8900'
  },
  estimated_delivery: '2-3 business days',
  prescription_items_count: 1
};

// Enhanced Cart Item Component
function EnhancedCartItemCard({ item, onUpdateQuantity, onRemove, loading }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update local quantity when item prop changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.product.stock_quantity) {
      if (newQuantity > item.product.stock_quantity) {
        toast.error(`Only ${item.product.stock_quantity} items available in stock`);
      }
      return;
    }

    setUpdating(true);
    const oldQuantity = quantity;
    setQuantity(newQuantity);

    try {
      await onUpdateQuantity(item.id, newQuantity);
    } catch (error) {
      setQuantity(oldQuantity);
      toast.error('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await onRemove(item.id);
    } catch (error) {
      toast.error('Failed to remove item');
      setRemoving(false);
    }
  };

  const itemTotal = parseFloat(item.product.price) * quantity;
  const originalTotal = parseFloat(item.product.original_price || item.product.price) * quantity;
  const savings = originalTotal - itemTotal;

  return (
    <Fade in={!removing} timeout={300}>
      <Card
        variant="outlined"
        sx={{
          mb: 1.5,
          opacity: updating || removing ? 0.6 : 1,
          transition: 'all 0.3s ease-in-out',
          border: removing ? '1px dashed' : '1px solid',
          borderColor: removing ? 'error.main' : 'divider',
          borderRadius: 1.5,
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { pb: { xs: 1.5, sm: 2 } }
        }}>
          <Stack spacing={1.5}>
            {/* Main Item Info */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.5, sm: 2 }}
              alignItems={{ xs: 'stretch', sm: 'flex-start' }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  width: { xs: 80, sm: 70 },
                  height: { xs: 80, sm: 70 },
                  borderRadius: 1,
                  bgcolor: 'grey.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                  mx: { xs: 'auto', sm: 0 },
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box
                  component="img"
                  src={item.product.image_url}
                  alt={item.product.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    p: 0.5,
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
                  <Iconify icon="solar:health-bold" width={20} sx={{ color: 'grey.400' }} />
                </Box>

                {/* Prescription Badge */}
                {item.product.is_prescription_required && (
                  <Chip
                    label="Rx"
                    size="small"
                    color="info"
                    sx={{
                      position: 'absolute',
                      top: 2,
                      left: 2,
                      fontSize: '0.5rem',
                      height: 14,
                      minWidth: 18,
                      '& .MuiChip-label': { px: 0.3 }
                    }}
                  />
                )}
              </Box>

              {/* Product Details */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack spacing={1}>
                  {/* Header: Name and Remove Button */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.2,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        fontWeight: 600,
                        pr: 1,
                        color: 'text.primary'
                      }}
                    >
                      {item.product.name}
                    </Typography>
                    <Tooltip title="Remove">
                      <IconButton
                        size="small"
                        onClick={handleRemove}
                        disabled={updating || loading || removing}
                        sx={{
                          flexShrink: 0,
                          color: 'error.main',
                          '&:hover': {
                            bgcolor: 'error.lighter',
                            transform: 'scale(1.1)'
                          },
                          width: 24,
                          height: 24,
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={12} />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  {/* Brand and Unit */}
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip
                      label={item.product.brand}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.625rem',
                        height: 16,
                        '& .MuiChip-label': { px: 0.5 }
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.7rem' }}
                    >
                      {item.product.unit}
                    </Typography>
                  </Stack>

                  {/* Price and Quantity Section */}
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {/* Price Information */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography
                        variant="subtitle2"
                        color="primary.main"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        ₹{itemTotal.toFixed(2)}
                      </Typography>
                      {savings > 0 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            textDecoration: 'line-through',
                            fontSize: '0.7rem'
                          }}
                        >
                          ₹{originalTotal.toFixed(2)}
                        </Typography>
                      )}
                    </Stack>

                    {/* Quantity Controls */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1 || updating || loading || removing}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          width: 24,
                          height: 24,
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'primary.lighter'
                          },
                          '&:disabled': {
                            borderColor: 'action.disabled',
                            color: 'action.disabled'
                          }
                        }}
                      >
                        <Iconify icon="solar:minus-bold" width={10} />
                      </IconButton>

                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          minWidth: 28,
                          textAlign: 'center',
                          px: 0.5,
                          py: 0.25,
                          bgcolor: 'grey.100',
                          borderRadius: 0.5,
                          fontSize: '0.8rem',
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        {quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= item.product.stock_quantity || updating || loading || removing}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          width: 24,
                          height: 24,
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'primary.lighter'
                          },
                          '&:disabled': {
                            borderColor: 'action.disabled',
                            color: 'action.disabled'
                          }
                        }}
                      >
                        <Iconify icon="solar:add-bold" width={10} />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Stock Status */}
                  <Typography
                    variant="caption"
                    color={item.product.is_in_stock ? 'success.main' : 'error.main'}
                    sx={{
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        bgcolor: item.product.is_in_stock ? 'success.main' : 'error.main'
                      }}
                    />
                    {item.product.is_in_stock
                      ? `${item.product.stock_quantity} in stock`
                      : 'Out of stock'
                    }
                  </Typography>

                  {/* Savings Display */}
                  {savings > 0 && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      fontWeight="bold"
                      sx={{
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Iconify icon="solar:tag-price-bold" width={10} />
                      Save ₹{savings.toFixed(2)}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );
}

// Enhanced Compact Order Summary Component
function CompactOrderSummary({ cartData, promoCode, onPromoCodeApply, loading }) {
  const [promoInput, setPromoInput] = useState(promoCode || '');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Update promo input when prop changes
  useEffect(() => {
    setPromoInput(promoCode || '');
  }, [promoCode]);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;

    setPromoLoading(true);
    setPromoError('');
    try {
      await onPromoCodeApply(promoInput.trim());
    } catch (error) {
      setPromoError('Invalid promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleRemovePromo = async () => {
    setPromoLoading(true);
    try {
      await onPromoCodeApply('');
      setPromoInput('');
      setPromoError('');
    } catch (error) {
      toast.error('Failed to remove promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const subtotal = cartData?.subtotal || 0;
  const discount = cartData?.discount || 0;
  const deliveryFee = cartData?.delivery_fee || 0;
  const total = cartData?.total || 0;
  const savings = cartData?.total_savings || 0;
  const freeDeliveryThreshold = 750;
  const prescriptionItemsCount = cartData?.prescription_items_count || 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 1.5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '1rem'
          }}
        >
          <Iconify icon="solar:calculator-minimalistic-bold" width={16} />
          Order Summary
        </Typography>

        {/* Prescription Items Alert */}
        {prescriptionItemsCount > 0 && (
          <Alert severity="warning" icon={<Iconify icon="solar:document-text-bold" />} sx={{ py: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
              {prescriptionItemsCount} prescription item(s) - Upload prescription required
            </Typography>
          </Alert>
        )}

        {/* Promo Code Section */}
        <Box>
          <Typography variant="body2" gutterBottom sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
            Promo Code
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Enter code"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value.toUpperCase());
                setPromoError('');
              }}
              disabled={loading || promoLoading}
              error={!!promoError}
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  fontSize: '0.8rem',
                  height: 32
                }
              }}
              InputProps={{
                startAdornment: (
                  <Iconify
                    icon="solar:ticket-bold"
                    width={14}
                    sx={{ mr: 0.5, color: 'text.secondary' }}
                  />
                )
              }}
            />
            <LoadingButton
              variant="contained"
              size="small"
              loading={promoLoading}
              disabled={!promoInput.trim() || loading}
              onClick={handleApplyPromo}
              sx={{
                minWidth: 60,
                height: 32,
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            >
              Apply
            </LoadingButton>
          </Stack>

          <Collapse in={!!promoCode}>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={`Applied: ${promoCode}`}
                size="small"
                color="success"
                variant="filled"
                onDelete={handleRemovePromo}
                deleteIcon={<Iconify icon="solar:close-circle-bold" width={12} />}
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-label': { px: 0.75 }
                }}
              />
            </Box>
          </Collapse>
        </Box>

        <Divider />

        {/* Price Breakdown */}
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              Subtotal ({cartData?.total_items || 0} items)
            </Typography>
            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
              ₹{subtotal.toFixed(2)}
            </Typography>
          </Stack>

          {discount > 0 && (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                color="success.main"
                sx={{
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Iconify icon="solar:tag-price-bold" width={12} />
                Promo Discount
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="600"
                sx={{ fontSize: '0.8rem' }}
              >
                -₹{discount.toFixed(2)}
              </Typography>
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Iconify icon="solar:delivery-bold" width={12} />
              Delivery
            </Typography>
            <Typography
              variant="body2"
              fontWeight="600"
              color={deliveryFee === 0 ? 'success.main' : 'text.primary'}
              sx={{ fontSize: '0.8rem' }}
            >
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
            </Typography>
          </Stack>

          {savings > 0 && (
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                color="success.main"
                sx={{
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Iconify icon="solar:gift-bold" width={12} />
                Total Savings
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="600"
                sx={{ fontSize: '0.8rem' }}
              >
                ₹{savings.toFixed(2)}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Total */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontSize: '1rem' }}
          >
            Total Amount
          </Typography>
          <Typography
            variant="h6"
            color="primary.main"
            fontWeight="bold"
            sx={{ fontSize: '1.125rem' }}
          >
            ₹{total.toFixed(2)}
          </Typography>
        </Stack>

        {/* Free Delivery Alerts */}
        {deliveryFee === 0 && subtotal > 0 && (
          <Alert
            severity="success"
            icon={<Iconify icon="solar:delivery-bold" />}
            sx={{
              py: 0.5,
              '& .MuiAlert-message': { fontSize: '0.7rem' }
            }}
          >
            🎉 FREE delivery qualified!
          </Alert>
        )}

        {subtotal > 0 && subtotal < freeDeliveryThreshold && (
          <Alert
            severity="info"
            icon={<Iconify icon="solar:info-circle-bold" />}
            sx={{
              py: 0.5,
              '& .MuiAlert-message': { fontSize: '0.7rem' }
            }}
          >
            Add ₹{(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery!
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}

// Main Enhanced Cart Drawer Component
export function PharmacyRightSideCartView({ open, onClose, cartCount = 0, onCartUpdate }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [cartData, setCartData] = useState(INITIAL_CART_DATA);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Load cart data when drawer opens
  useEffect(() => {
    if (open) {
      loadCartData();
    }
  }, [open]);

  const loadCartData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Recalculate cart data to ensure consistency
      const calculatedTotals = CartCalculationUtils.recalculateCart(INITIAL_CART_DATA.items, 0);
      const loadedCartData = {
        ...INITIAL_CART_DATA,
        ...calculatedTotals
      };

      setCartData(loadedCartData);

      if (loadedCartData.applied_coupons?.length > 0) {
        setPromoCode(loadedCartData.applied_coupons[0]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load cart data');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced handleUpdateQuantity function
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const itemToUpdate = cartData.items.find(item => item.id === itemId);
    if (!itemToUpdate) return;

    // Check stock availability
    if (newQuantity > itemToUpdate.product.stock_quantity) {
      toast.error(`Only ${itemToUpdate.product.stock_quantity} items available in stock`);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      // Update the specific item quantity
      const updatedItems = cartData.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      // Recalculate all totals using utility
      const calculatedTotals = CartCalculationUtils.recalculateCart(
        updatedItems,
        cartData.discount || 0
      );

      // Update cart data with new calculations
      setCartData({
        ...cartData,
        items: updatedItems,
        ...calculatedTotals
      });

      if (onCartUpdate) {
        onCartUpdate();
      }

      toast.success('Quantity updated successfully');
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Enhanced handleRemoveItem function
  const handleRemoveItem = async (itemId) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      // Remove item from cart
      const updatedItems = cartData.items.filter(item => item.id !== itemId);

      if (updatedItems.length === 0) {
        // If no items left, reset cart and close
        const emptyCart = {
          items: [],
          total_items: 0,
          subtotal: 0,
          discount: 0,
          delivery_fee: 0,
          total: 0,
          total_savings: 0,
          applied_coupons: [],
          prescription_items_count: 0
        };

        setCartData({ ...cartData, ...emptyCart });
        setPromoCode('');
        setTimeout(() => onClose(), 500);
        toast.success('Cart cleared - all items removed');
      } else {
        // Recalculate all totals for remaining items
        const calculatedTotals = CartCalculationUtils.recalculateCart(
          updatedItems,
          cartData.discount || 0
        );

        setCartData({
          ...cartData,
          items: updatedItems,
          ...calculatedTotals
        });

        toast.success('Item removed from cart');
      }

      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    }
  };

  // Enhanced handlePromoCodeApply function
  const handlePromoCodeApply = async (code) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const currentSubtotal = CartCalculationUtils.calculateSubtotal(cartData.items);
      let promoDiscount = 0;
      let appliedCoupons = [];

      if (code && code.trim()) {
        // Validate promo code (you can add more validation logic here)
        const validCodes = {
          'HEALTH20': 0.20, // 20% discount
          'SAVE10': 0.10,   // 10% discount
          'FIRST5': 0.05,   // 5% discount
          'WELCOME15': 0.15, // 15% discount
          'NEWUSER25': 0.25  // 25% discount
        };

        const discountRate = validCodes[code.toUpperCase()];
        if (discountRate) {
          promoDiscount = currentSubtotal * discountRate;
          appliedCoupons = [code.toUpperCase()];
          setPromoCode(code.toUpperCase());
          toast.success(`Promo code applied! ${(discountRate * 100).toFixed(0)}% discount`);
        } else {
          throw new Error('Invalid promo code');
        }
      } else {
        // Remove promo code
        setPromoCode('');
        toast.success('Promo code removed');
      }

      // Recalculate cart with new discount
      const calculatedTotals = CartCalculationUtils.recalculateCart(
        cartData.items,
        promoDiscount
      );

      setCartData({
        ...cartData,
        ...calculatedTotals,
        applied_coupons: appliedCoupons
      });
    } catch (error) {
      console.error('Promo code error:', error);
      throw error; // Re-throw to be handled by the component
    }
  };

  // Enhanced addToCart function (for handling duplicate products)
  const addToCart = (productData, quantity = 1) => {
    // Check if product already exists in cart
    const existingItemIndex = cartData.items.findIndex(
      item => item.product.id === productData.id
    );

    let updatedItems;

    if (existingItemIndex >= 0) {
      // Product exists, update quantity
      const existingItem = cartData.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      // Check stock limit
      if (newQuantity > productData.stock_quantity) {
        toast.error(`Cannot add more. Only ${productData.stock_quantity} items available.`);
        return;
      }

      updatedItems = cartData.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: newQuantity }
          : item
      );
      toast.success(`Updated quantity for ${productData.name}`);
    } else {
      // New product, add to cart
      const newItem = {
        id: Date.now(), // Generate unique ID
        quantity,
        product: productData
      };
      updatedItems = [...cartData.items, newItem];
      toast.success(`${productData.name} added to cart`);
    }

    // Recalculate cart totals
    const calculatedTotals = CartCalculationUtils.recalculateCart(
      updatedItems,
      cartData.discount || 0
    );

    setCartData({
      ...cartData,
      items: updatedItems,
      ...calculatedTotals
    });

    if (onCartUpdate) onCartUpdate();
  };

  const handleCheckout = async () => {
    if (!cartData?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }

    setCheckoutLoading(true);
    try {
      const checkoutUrl = `${paths.dashboard.pharmacy.checkout}?from=cart&items=${cartData.total_items}&prescriptions=${cartData.prescription_items_count}&total=${cartData.total}`;
      router.push(checkoutUrl);
      onClose();
      toast.success('Redirecting to secure checkout...');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to proceed to checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleClearCart = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const emptyCart = {
        items: [],
        total_items: 0,
        subtotal: 0,
        discount: 0,
        delivery_fee: 0,
        total: 0,
        total_savings: 0,
        applied_coupons: [],
        prescription_items_count: 0
      };

      setCartData({ ...cartData, ...emptyCart });
      setPromoCode('');
      if (onCartUpdate) onCartUpdate();
      toast.success('Cart cleared successfully');
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
    }
  };

  const cartItems = cartData?.items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: 380,
            md: 400,
            lg: 420
          },
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        },
      }}
      ModalProps={{
        BackdropComponent: Backdrop,
        BackdropProps: {
          sx: { bgcolor: 'rgba(0, 0, 0, 0.6)' }
        }
      }}
    >
      {/* Compact Header - Fixed */}
      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'primary.lighter',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            opacity: 0.1,
          }}
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between" position="relative">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                borderRadius: 1.5,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 2,
                  left: 2,
                  right: 2,
                  bottom: 2,
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: 'primary.lighter',
                }
              }}
            >
              <Iconify icon="solar:cart-large-bold" sx={{ color: 'white' }} width={{ xs: 20, sm: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  color: 'text.primary'
                }}
              >
                Cart ({cartData?.total_items || 0})
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  fontWeight: 500
                }}
              >
                ₹{cartData?.total?.toFixed(2) || '0.00'}
                {cartData?.prescription_items_count > 0 && (
                  <Chip
                    label={`${cartData.prescription_items_count} Rx`}
                    size="small"
                    color="info"
                    sx={{ ml: 0.5, height: 14, fontSize: '0.6rem' }}
                  />
                )}
              </Typography>
            </Box>
          </Stack>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'scale(1.05)'
              },
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={{ xs: 18, sm: 20 }} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content - Scrollable */}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {loading ? (
          <Box sx={{
            p: { xs: 2, sm: 3 },
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                borderRadius: 2,
                bgcolor: 'primary.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.7, transform: 'scale(1.05)' },
                  '100%': { opacity: 1, transform: 'scale(1)' },
                },
              }}
            >
              <Iconify icon="solar:cart-large-bold" width={{ xs: 28, sm: 36 }} sx={{ color: 'primary.main' }} />
            </Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 600
              }}
            >
              Loading Cart...
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                maxWidth: 200,
                textAlign: 'center'
              }}
            >
              Fetching your selected items
            </Typography>
          </Box>
        ) : isEmpty ? (
          <Box sx={{
            p: { xs: 2, sm: 3 },
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
                borderRadius: 3,
                bgcolor: 'grey.50',
                border: '2px dashed',
                borderColor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  borderRadius: '50%',
                  bgcolor: 'grey.100',
                }
              }}
            >
              <Iconify icon="solar:cart-large-bold" width={{ xs: 40, sm: 48 }} sx={{ color: 'grey.400', zIndex: 1 }} />
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                mb: 1
              }}
            >
              Your Cart is Empty
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
                maxWidth: 280,
                mx: 'auto',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                lineHeight: 1.5
              }}
            >
              Browse our pharmacy products and add items to your cart to get started.
            </Typography>

            <Button
              variant="outlined"
              size="medium"
              onClick={onClose}
              startIcon={<Iconify icon="solar:health-bold" />}
              sx={{
                borderRadius: 1.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                py: 1,
                fontWeight: 600,
                maxWidth: 200
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <Box sx={{
              flexGrow: 1,
              overflow: 'auto',
              minHeight: 0,
              scrollBehavior: 'smooth'
            }}>
              <Box sx={{ p: { xs: 1.5, sm: 2 }, pb: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      color: 'text.primary'
                    }}
                  >
                    Items ({cartItems.length})
                    {cartData?.prescription_items_count > 0 && (
                      <Chip
                        label={`${cartData.prescription_items_count} Rx Required`}
                        size="small"
                        color="warning"
                        variant="outlined"
                        sx={{ ml: 1, fontSize: '0.7rem', height: 18 }}
                      />
                    )}
                  </Typography>
                  {cartItems.length > 0 && (
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      onClick={handleClearCart}
                      startIcon={<Iconify icon="solar:trash-bin-minimalistic-bold" width={14} />}
                      sx={{
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        fontWeight: 600,
                        minWidth: 'auto',
                        px: 1
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </Stack>

                <Stack spacing={1}>
                  {cartItems.map((item) => (
                    <EnhancedCartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      loading={loading}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Order Summary - Fixed */}
            {/* <Box sx={{
              flexShrink: 0,
              p: { xs: 1.5, sm: 2 },
              pt: 1,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: 'grey.50'
            }}>
              <CompactOrderSummary
                cartData={cartData}
                promoCode={promoCode}
                onPromoCodeApply={handlePromoCodeApply}
                loading={loading}
              />
            </Box> */}
          </>
        )}
      </Box>

      {/* Checkout Button - Fixed Footer */}
      {!isEmpty && (
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}
        >
          <Stack spacing={1}>
            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              onClick={handleCheckout}
              loading={checkoutLoading}
              startIcon={<Iconify icon="solar:shield-check-bold" />}
              sx={{
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: 1.5,
                fontWeight: 'bold',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-1px)'
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {checkoutLoading ? 'Processing...' :
               cartData?.prescription_items_count > 0 ?
               `Secure Checkout (${cartData.prescription_items_count} Rx) • ₹${cartData?.total?.toFixed(2)}` :
               `Secure Checkout • ₹${cartData?.total?.toFixed(2)}`}
            </LoadingButton>

            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              disabled={checkoutLoading}
              sx={{
                borderRadius: 1.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                py: { xs: 0.75, sm: 1 },
                fontWeight: 600,
                borderWidth: 1.5,
                '&:hover': {
                  borderWidth: 1.5,
                  bgcolor: 'action.hover'
                }
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
