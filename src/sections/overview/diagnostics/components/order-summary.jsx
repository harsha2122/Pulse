// src/sections/overview/diagnostics/components/order-summary.jsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);

export function OrderSummary({
  items = [],
  subtotal = 0,
  deliveryCharge = 0,
  discount = 0,
  total = 0,
  billingAddress,
  selectedDelivery,
  activeStep = 0,
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card sx={{ position: 'sticky', top: 24 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Order Summary
        </Typography>

        {/* Items List */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {items.map((item) => (
            <Box key={item.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1, pr: 1 }}>
                  <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                    {item.test?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Code: {item.test?.code} • Qty: {item.quantity}
                  </Typography>
                  {item.test?.sample_type && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Sample: {item.test.sample_type}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {item.test?.price !== item.test?.effective_price && (
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      {formatPrice((item.test?.price ?? 0) * item.quantity)}
                    </Typography>
                  )}
                  <Typography variant="body2" fontWeight="medium">
                    {formatPrice((item.test?.effective_price || item.test?.price || 0) * item.quantity)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Pricing Breakdown */}
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </Typography>
            <Typography variant="body2">
              {formatPrice(subtotal)}
            </Typography>
          </Stack>

          {selectedDelivery === 'home_collection' && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Home Collection
              </Typography>
              <Typography variant="body2" color={deliveryCharge === 0 ? 'success.main' : 'inherit'}>
                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
              </Typography>
            </Stack>
          )}

          {discount > 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Discount
              </Typography>
              <Typography variant="body2" color="success.main">
                -{formatPrice(discount)}
              </Typography>
            </Stack>
          )}

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              {formatPrice(total)}
            </Typography>
          </Stack>
        </Stack>

        {/* Delivery Information */}
        {activeStep >= 1 && selectedDelivery === 'home_collection' && billingAddress && (
          <>
            <Divider sx={{ my: 2 }} />
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Iconify icon="solar:home-bold" width={16} />
                <Typography variant="subtitle2">Home Collection Address</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {billingAddress.firstName} {billingAddress.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {billingAddress.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {billingAddress.phone}
              </Typography>
            </Paper>
          </>
        )}

        {/* Lab Visit Information */}
        {activeStep >= 1 && selectedDelivery === 'lab_visit' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Iconify icon="solar:hospital-bold" width={16} />
                <Typography variant="subtitle2">Lab Visit</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Visit our lab at your convenience during working hours (9 AM - 6 PM)
              </Typography>
            </Paper>
          </>
        )}

        {/* Additional Info */}
        {selectedDelivery === 'home_collection' && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify icon="solar:shield-check-bold" color="success.main" width={16} />
              <Typography variant="caption" color="text.secondary">
                Trained professionals will collect samples at your home
              </Typography>
            </Stack>
          </Box>
        )}

        {/* Savings Badge */}
        {items.some(item => item.test?.price > item.test?.effective_price) && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={`You save ${formatPrice(
                items.reduce((acc, item) => {
  const savings = (item.test?.price || 0) - (item.test?.effective_price || 0);
  return acc + (savings * item.quantity);
}, 0)
              )}`}
              color="success"
              variant="soft"
              size="small"
              icon={<Iconify icon="solar:tag-bold" width={16} />}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
