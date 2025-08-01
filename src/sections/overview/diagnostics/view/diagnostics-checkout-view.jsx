import { useMemo, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useCart, useDiagnosticsActions } from 'src/hooks/use-diagnostics';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CartStep } from '../components/cart-step';
import { BillingStep } from '../components/billing-step';
import { PaymentStep } from '../components/payment-step';
import { OrderSummary } from '../components/order-summary';
// Import separate components
import { CheckoutStepper } from '../components/checkout-stepper';
import { MobileNavigation } from '../components/moblie-navigation';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

export function DiagnosticsCheckoutView() {
  const router = useRouter();
  const { productName } = useParams();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState('home_collection');
  const [selectedPayment, setSelectedPayment] = useState('paypal');
  const [billingAddress, setBillingAddress] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });
  const [processing, setProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { cart, cartLoading } = useCart();
  const { createOrder } = useDiagnosticsActions();

  // Sample cart items for demo
  const cartItems = useMemo(
    () => cart?.items || [
      {
        id: 1,
        test_id: 'test_1',
        test: {
          id: 'test_1',
          name: 'Complete Blood Count (CBC)',
          code: 'CBC001',
          price: 500,
          effective_price: 450,
          sample_type: 'Blood',
          duration_hours: 24,
          is_home_collection: true,
        },
        quantity: 1,
      },
      {
        id: 2,
        test_id: 'test_2',
        test: {
          id: 'test_2',
          name: 'Lipid Profile',
          code: 'LP001',
          price: 800,
          effective_price: 720,
          sample_type: 'Blood',
          duration_hours: 48,
          is_home_collection: true,
        },
        quantity: 1,
      },
    ],
    [cart]
  );

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.test?.effective_price || item.test?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  const deliveryCharge = 0; // Free delivery for now
  const discount = 0;
  const total = subtotal + deliveryCharge - discount;

  // Handle form changes
  const handleBillingChange = useCallback((field, value) => {
    setBillingAddress(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Define handleCompleteOrder FIRST (before handleNext)
  const handleCompleteOrder = useCallback(async () => {
    setProcessing(true);
    try {
      const orderData = {
        items: cartItems,
        billing_address: billingAddress,
        delivery_method: selectedDelivery,
        payment_method: selectedPayment,
        total,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSnackbarMessage('Order placed successfully!');
      setSnackbarOpen(true);

      // Redirect after success
      setTimeout(() => {
        router.push(paths.dashboard.diagnostics.root);
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setSnackbarMessage('Failed to place order. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setProcessing(false);
    }
  }, [cartItems, billingAddress, selectedDelivery, selectedPayment, total, router]);

  // Now define handleNext (after handleCompleteOrder)
  const handleNext = useCallback(() => {
    if (activeStep === STEPS.length - 1) {
      handleCompleteOrder();
    } else {
      setActiveStep(prev => prev + 1);
    }
  }, [activeStep, handleCompleteOrder]);

  const handleBack = useCallback(() => {
    if (activeStep === 0) {
      router.push(paths.dashboard.diagnostics.root);
    } else {
      setActiveStep(prev => prev - 1);
    }
  }, [activeStep, router]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CartStep items={cartItems} />;
      case 1:
        return (
          <BillingStep
            billingAddress={billingAddress}
            onBillingChange={handleBillingChange}
            selectedDelivery={selectedDelivery}
            onDeliveryChange={setSelectedDelivery}
          />
        );
      case 2:
        return (
          <PaymentStep
            selectedPayment={selectedPayment}
            onPaymentChange={setSelectedPayment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardContent>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Diagnostics', href: paths.dashboard.diagnostics.root },
            { name: productName || 'Checkout' },
          ]}
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} sx={{ pb: { xs: 20, md: 0 } }}>
              {/* Progress Stepper */}
              <CheckoutStepper activeStep={activeStep} steps={STEPS} />

              {/* Step Content */}
              {renderStepContent(activeStep)}

              {/* Desktop Navigation */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                spacing={2}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<Iconify icon="solar:arrow-left-bold" />}
                  size="large"
                >
                  {activeStep === 0 ? 'Back to Tests' : 'Back'}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={processing}
                  size="large"
                  sx={{ minWidth: 150 }}
                >
                  {processing ? (
                    <CircularProgress size={20} />
                  ) : activeStep === STEPS.length - 1 ? (
                    'Complete Order'
                  ) : (
                    'Continue'
                  )}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              discount={discount}
              total={total}
              billingAddress={billingAddress}
              selectedDelivery={selectedDelivery}
              activeStep={activeStep}
            />
          </Grid>
        </Grid>

        {/* Mobile Navigation */}
        <MobileNavigation
          activeStep={activeStep}
          total={total}
          processing={processing}
          onBack={handleBack}
          onNext={handleNext}
          stepsLength={STEPS.length}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.includes('success') ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </DashboardContent>
  );
}
