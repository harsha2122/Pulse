// src/sections/overview/diagnostics/components/payment-step.jsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    label: 'Pay with PayPal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icon: 'logos:paypal',
  },
  {
    value: 'card',
    label: 'Credit / Debit card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icon: 'solar:card-bold',
  },
  {
    value: 'cash',
    label: 'Cash on Collection',
    description: 'Pay with cash when your sample is collected.',
    icon: 'solar:wallet-money-bold',
  },
];

// ----------------------------------------------------------------------

export function PaymentStep({ selectedPayment, onPaymentChange }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Payment Method
        </Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={selectedPayment}
            onChange={(e) => onPaymentChange(e.target.value)}
          >
            <Stack spacing={2}>
              {PAYMENT_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={
                    <Box sx={{ flex: 1, width: '100%' }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '2px solid',
                          borderColor: selectedPayment === option.value ? 'primary.main' : 'divider',
                          bgcolor: selectedPayment === option.value ? 'primary.lighter' : 'transparent',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            bgcolor: selectedPayment === option.value ? 'primary.lighter' : 'action.hover',
                          },
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              bgcolor: selectedPayment === option.value ? 'primary.main' : 'grey.200',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify
                              icon={option.icon}
                              width={24}
                              color={selectedPayment === option.value ? 'white' : 'text.secondary'}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {option.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                          {selectedPayment === option.value && (
                            <Box>
                              <Iconify icon="eva:checkmark-circle-fill" width={24} color="success.main" />
                            </Box>
                          )}
                        </Stack>
                      </Paper>
                    </Box>
                  }
                  sx={{
                    m: 0,
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* Additional Payment Info */}
        {selectedPayment === 'card' && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                You will be redirected to our secure payment gateway to complete your transaction.
              </Typography>
            </Alert>
          </Box>
        )}

        {selectedPayment === 'cash' && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Please keep the exact amount ready for payment during sample collection.
              </Typography>
            </Alert>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
