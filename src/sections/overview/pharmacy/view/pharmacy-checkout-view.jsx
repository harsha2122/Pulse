// src/sections/overview/pharmacy/view/pharmacy-checkout-view.jsx
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Divider from '@mui/material/Divider';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// Mock cart data - in real app, this would come from state/API
const MOCK_CART_DATA = {
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
        image_url: 'https://via.placeholder.com/200x200/e8f5e8/388e3c?text=Aspirin',
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
        image_url: 'https://via.placeholder.com/200x200/fff3e0/ff8f00?text=Omega3',
      }
    }
  ],
  total_items: 3,
  subtotal: 985.00,
  discount: 90.00,
  delivery_fee: 0,
  total: 895.00,
  total_savings: 100.00
};

const CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

// Cart Step Component
function CartStep({ cartData, onNext }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Cart ({cartData.total_items} items)
      </Typography>

      <Stack spacing={2}>
        {cartData.items.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: { xs: 80, sm: 60 },
                    height: { xs: 80, sm: 60 },
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={item.product.image_url}
                    alt={item.product.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {item.product.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Chip label={item.product.brand} size="small" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">
                      {item.product.unit}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

// Billing & Address Step Component
function BillingAddressStep({ onNext, onBack }) {
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [addresses] = useState([
    {
      id: 'home',
      type: 'Home',
      name: 'Jayvion Simon',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '+1 202-555-0143'
    },
    {
      id: 'office',
      type: 'Office',
      name: 'Lucian Obrien',
      address: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
      phone: '+1 416-555-0198'
    }
  ]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Delivery Address
      </Typography>

      <Stack spacing={2}>
        {addresses.map((addr) => (
          <Paper
            key={addr.id}
            variant="outlined"
            sx={{
              p: 2,
              cursor: 'pointer',
              border: selectedAddress === addr.id ? 2 : 1,
              borderColor: selectedAddress === addr.id ? 'primary.main' : 'divider',
              '&:hover': { borderColor: 'primary.main' }
            }}
            onClick={() => setSelectedAddress(addr.id)}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">{addr.name}</Typography>
                  <Chip label={addr.type} size="small" color={addr.id === 'home' ? 'primary' : 'default'} />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {addr.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {addr.phone}
                </Typography>
              </Stack>
              <Button
                size="small"
                variant={selectedAddress === addr.id ? 'contained' : 'outlined'}
                sx={{ minWidth: 100 }}
              >
                {selectedAddress === addr.id ? 'Selected' : 'Select'}
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

// Payment Step Component
function PaymentStep({ cartData, onBack, onComplete, loading }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [deliveryMethod, setDeliveryMethod] = useState('free');

  const deliveryOptions = [
    { id: 'free', name: 'Free', price: 0, duration: '5-7 days delivery' },
    { id: 'standard', name: 'Standard', price: 10, duration: '3-5 days delivery' },
    { id: 'express', name: 'Express', price: 20, duration: '2-3 days delivery' }
  ];

  const selectedDelivery = deliveryOptions.find(opt => opt.id === deliveryMethod);
  const finalTotal = cartData.total + (selectedDelivery?.price || 0);

  return (
    <Stack spacing={4}>
      {/* Delivery Options */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Delivery Options
        </Typography>
        <Stack spacing={1}>
          {deliveryOptions.map((option) => (
            <Paper
              key={option.id}
              variant="outlined"
              sx={{
                p: 2,
                cursor: 'pointer',
                border: deliveryMethod === option.id ? 2 : 1,
                borderColor: deliveryMethod === option.id ? 'primary.main' : 'divider',
                '&:hover': { borderColor: 'primary.main' }
              }}
              onClick={() => setDeliveryMethod(option.id)}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Iconify
                    icon={
                      option.id === 'free' ? 'solar:bicycle-bold' :
                      option.id === 'standard' ? 'solar:delivery-bold' :
                      'solar:rocket-bold'
                    }
                    width={24}
                  />
                  <Box>
                    <Typography variant="subtitle2">{option.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.duration}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="h6" color="primary.main">
                  {option.price === 0 ? 'Free' : `₹${option.price}`}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Payment Methods */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Payment Method
        </Typography>
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: 'pointer',
              border: paymentMethod === 'paypal' ? 2 : 1,
              borderColor: paymentMethod === 'paypal' ? 'primary.main' : 'divider',
            }}
            onClick={() => setPaymentMethod('paypal')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2">Pay with PayPal</Typography>
                <Typography variant="body2" color="text.secondary">
                  You will be redirected to PayPal website to complete your purchase securely.
                </Typography>
              </Box>
              <Box sx={{ width: 60, height: 30, bgcolor: '#003087', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" color="white" fontWeight="bold">PayPal</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: 'pointer',
              border: paymentMethod === 'card' ? 2 : 1,
              borderColor: paymentMethod === 'card' ? 'primary.main' : 'divider',
            }}
            onClick={() => setPaymentMethod('card')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2">Credit / Debit card</Typography>
                <Typography variant="body2" color="text.secondary">
                  We support Mastercard, Visa, Discover and Stripe.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Box sx={{ width: 30, height: 20, bgcolor: '#ff5f00', borderRadius: 0.5 }} />
                <Box sx={{ width: 30, height: 20, bgcolor: '#1a1f71', borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="caption" color="white" fontSize="8px">VISA</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: 'pointer',
              border: paymentMethod === 'cash' ? 2 : 1,
              borderColor: paymentMethod === 'cash' ? 'primary.main' : 'divider',
            }}
            onClick={() => setPaymentMethod('cash')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2">Cash on Delivery</Typography>
                <Typography variant="body2" color="text.secondary">
                  Pay with cash when your order is delivered.
                </Typography>
              </Box>
              <Iconify icon="solar:banknote-bold" width={32} />
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {/* Order Summary */}
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">₹{cartData.subtotal.toFixed(2)}</Typography>
          </Stack>
          {cartData.discount > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="success.main">Discount</Typography>
              <Typography variant="body2" color="success.main">-₹{cartData.discount.toFixed(2)}</Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Shipping</Typography>
            <Typography variant="body2" color={selectedDelivery?.price === 0 ? 'success.main' : 'text.primary'}>
              {selectedDelivery?.price === 0 ? 'Free' : `₹${selectedDelivery?.price}`}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary.main">₹{finalTotal.toFixed(2)}</Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            (VAT included if applicable)
          </Typography>
        </Stack>
      </Paper>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={onBack} fullWidth>
          Back
        </Button>
        <LoadingButton
          variant="contained"
          onClick={onComplete}
          loading={loading}
          fullWidth
          size="large"
          sx={{ py: 1.5 }}
        >
          Complete Order
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

// Main Checkout View Component
export function PharmacyCheckoutView() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState(0);
  const [cartData, setCartData] = useState(MOCK_CART_DATA);
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Get product info from URL params if available
  const productName = searchParams.get('product') || '';
  const fromProduct = searchParams.get('from') === 'product';

  useEffect(() => {
    // In real app, load cart data from API/state
    if (fromProduct && productName) {
      // Handle single product checkout
      console.log('Checkout from product:', productName);
    }
  }, [fromProduct, productName]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOrderCompleted(true);
      toast.success('Order placed successfully!');

      // Redirect to order confirmation or orders page
      setTimeout(() => {
        router.push(paths.dashboard.pharmacy.orders);
      }, 2000);
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderCompleted) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'success.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <Iconify icon="solar:check-circle-bold" width={60} sx={{ color: 'success.main' }} />
          </Box>
          <Typography variant="h4" gutterBottom>
            Order Completed!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for your purchase. Your order has been placed successfully.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push(paths.dashboard.pharmacy.orders)}
            startIcon={<Iconify icon="solar:eye-bold" />}
          >
            View Orders
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Checkout"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Pharmacy', href: paths.dashboard.pharmacy.root },
          { name: 'Checkout' },
        ]}
        sx={{ mb: 4 }}
      />

      {/* Stepper */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
          {CHECKOUT_STEPS.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>
                <Typography variant={isMobile ? 'caption' : 'body2'}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            {activeStep === 0 && (
              <CartStep cartData={cartData} onNext={handleNext} />
            )}
            {activeStep === 1 && (
              <BillingAddressStep onNext={handleNext} onBack={handleBack} />
            )}
            {activeStep === 2 && (
              <PaymentStep
                cartData={cartData}
                onBack={handleBack}
                onComplete={handleCompleteOrder}
                loading={loading}
              />
            )}

            {/* Navigation Buttons for Cart and Address steps */}
            {activeStep < 2 && (
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  fullWidth
                >
                  {activeStep === CHECKOUT_STEPS.length - 1 ? 'Place Order' : 'Continue'}
                </Button>
              </Stack>
            )}
          </Paper>
        </Box>

        {/* Order Summary Sidebar - Only show on desktop for steps 0 and 1 */}
        {activeStep < 2 && !isMobile && (
          <Box sx={{ width: 350 }}>
            <Paper variant="outlined" sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">₹{cartData.subtotal.toFixed(2)}</Typography>
                </Stack>
                {cartData.discount > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="success.main">Discount</Typography>
                    <Typography variant="body2" color="success.main">-₹{cartData.discount.toFixed(2)}</Typography>
                  </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2" color="success.main">Free</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">₹{cartData.total.toFixed(2)}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" textAlign="center">
                  (VAT included if applicable)
                </Typography>
              </Stack>
            </Paper>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
