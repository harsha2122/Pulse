// src/sections/overview/diagnostics/components/mobile-navigation.jsx

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);

export function MobileNavigation({
  activeStep,
  total,
  processing,
  onBack,
  onNext,
  stepsLength,
}) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        p: 2,
        borderRadius: 0,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Stack spacing={2}>
        {/* Total Price */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Total Amount
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            {formatPrice(total)}
          </Typography>
        </Stack>

        {/* Navigation Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
            sx={{ flex: activeStep === 0 ? 0 : 1 }}
          >
            {activeStep === 0 ? 'Back to Tests' : 'Back'}
          </Button>

          <Button
            variant="contained"
            onClick={onNext}
            disabled={processing}
            size="large"
            sx={{ flex: 2 }}
            endIcon={
              processing ? (
                <CircularProgress size={16} color="inherit" />
              ) : activeStep === stepsLength - 1 ? (
                <Iconify icon="solar:card-bold" />
              ) : (
                <Iconify icon="solar:arrow-right-bold" />
              )
            }
          >
            {processing ? 'Processing...' : activeStep === stepsLength - 1 ? 'Complete Order' : 'Continue'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
