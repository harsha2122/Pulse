// src/sections/overview/diagnostics/components/cart-step.jsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);


export function CartStep({ items = [] }) {
  const handleQuantityChange = (itemId, newQuantity) => {
    console.log('Change quantity for item:', itemId, 'to:', newQuantity);
    // Handle quantity change logic here
  };

  const handleRemoveItem = (itemId) => {
    console.log('Remove item:', itemId);
    // Handle remove item logic here
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Iconify icon="solar:cart-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add some diagnostic tests to get started
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Review Your Tests ({items.length} {items.length === 1 ? 'test' : 'tests'})
        </Typography>

        <Stack divider={<Divider />} spacing={3}>
          {items.map((item) => (
            <Box key={item.id}>
              <Stack direction="row" spacing={2}>
                {/* Test Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                    bgcolor: 'primary.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Iconify icon="solar:test-tube-bold" width={24} color="primary.main" />
                </Box>

                {/* Test Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {item.test?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Test Code: {item.test?.code}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {item.test?.sample_type && (
                      <Chip
                        label={item.test.sample_type}
                        size="small"
                        variant="outlined"
                        color="info"
                      />
                    )}
                    {item.test?.duration_hours && (
                      <Chip
                        label={`${item.test.duration_hours}h report`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {item.test?.is_home_collection && (
                      <Chip
                        label="Home collection"
                        size="small"
                        variant="outlined"
                        color="success"
                      />
                    )}
                  </Stack>

                  {/* Quantity Controls */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Quantity:
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                      sx={{ border: 1, borderColor: 'divider' }}
                    >
                      <Iconify icon="solar:minus-bold" width={16} />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{
                        minWidth: 24,
                        textAlign: 'center',
                        fontWeight: 'medium',
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      sx={{ border: 1, borderColor: 'divider' }}
                    >
                      <Iconify icon="solar:add-bold" width={16} />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Price and Actions */}
                <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                  <Stack spacing={1}>
                    {item.test?.price !== item.test?.effective_price && (
                    <Typography variant="body2" fontWeight="medium">
  {formatPrice((item.test?.price ?? 0) * item.quantity)}
</Typography>
                    )}
                    <Typography variant="h6" color="primary.main">
                      {formatPrice((item.test?.effective_price || item.test?.price || 0) * item.quantity)}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" width={16} />}
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              </Stack>

              {/* Savings Badge */}
              {item.test?.price > item.test?.effective_price && (
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={`Save ${formatPrice((item.test.price - item.test.effective_price) * item.quantity)}`}
                    color="success"
                    variant="soft"
                    size="small"
                    icon={<Iconify icon="solar:tag-bold" width={14} />}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Stack>

        {/* Additional Information */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Iconify icon="solar:info-circle-bold" width={16} color="info.main" />
            <Typography variant="subtitle2">Important Information</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            • Fasting may be required for some tests - we &quot;ll inform you before sample collection
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Reports will be available online within the specified timeframe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Home collection is available for all selected tests
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
