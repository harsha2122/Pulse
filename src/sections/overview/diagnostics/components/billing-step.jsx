// src/sections/overview/diagnostics/components/billing-step.jsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
  {
    value: 'home_collection',
    label: 'Home Collection',
    description: 'Our trained professional will visit your address',
    icon: 'solar:home-bold',
    price: 0,
    benefits: ['No travel required', 'Safe & convenient', 'Flexible timing'],
  },
  {
    value: 'lab_visit',
    label: 'Lab Visit',
    description: 'Visit our lab during working hours (9 AM - 6 PM)',
    icon: 'solar:hospital-bold',
    price: 0,
    benefits: ['Immediate collection', 'Professional setup', 'Quick process'],
  },
];

export function BillingStep({
  billingAddress,
  onBillingChange,
  selectedDelivery,
  onDeliveryChange,
}) {
  const handleInputChange = (field) => (event) => {
    onBillingChange(field, event.target.value);
  };

  return (
    <Stack spacing={3}>
      {/* Billing Address */}
      <Card
        sx={{
          border: 1,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.12),
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Iconify icon="solar:user-bold" width={24} color="primary.main" />
            <Typography variant="h6" fontWeight="bold">
              Patient & Billing Information
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={billingAddress.firstName}
                onChange={handleInputChange('firstName')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={billingAddress.lastName}
                onChange={handleInputChange('lastName')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={billingAddress.email}
                onChange={handleInputChange('email')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={billingAddress.phone}
                onChange={handleInputChange('phone')}
                required
                helperText="We&quot;ll use this for booking confirmation and updates"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complete Address"
                value={billingAddress.address}
                onChange={handleInputChange('address')}
                multiline
                rows={2}
                required
                placeholder="House/Flat No., Building Name, Street, Area"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={billingAddress.city}
                onChange={handleInputChange('city')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                value={billingAddress.state}
                onChange={handleInputChange('state')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="PIN Code"
                value={billingAddress.zipCode}
                onChange={handleInputChange('zipCode')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delivery Options */}
      <Card
        sx={{
          border: 1,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.12),
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Iconify icon="solar:delivery-bold" width={24} color="primary.main" />
            <Typography variant="h6" fontWeight="bold">
              Sample Collection Method
            </Typography>
          </Stack>

          <RadioGroup
            value={selectedDelivery}
            onChange={(event) => onDeliveryChange(event.target.value)}
          >
            <Grid container spacing={2}>
              {DELIVERY_OPTIONS.map((option) => (
                <Grid item xs={12} key={option.value}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      position: 'relative',
                      bgcolor: selectedDelivery === option.value
                        ? (theme) => alpha(theme.palette.primary.main, 0.08)
                        : 'transparent',
                      borderColor: selectedDelivery === option.value
                        ? 'primary.main'
                        : (theme) => alpha(theme.palette.text.primary, 0.12),
                      borderWidth: selectedDelivery === option.value ? 2 : 1,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                        transform: 'translateY(-2px)',
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                    onClick={() => onDeliveryChange(option.value)}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio sx={{ display: 'none' }} />}
                      label=""
                      sx={{ m: 0, position: 'absolute', top: 16, right: 16 }}
                    />
                    <Radio
                      checked={selectedDelivery === option.value}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: selectedDelivery === option.value ? 'primary.main' : 'text.secondary',
                      }}
                    />

                    <Stack spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            border: 1,
                            borderColor: (theme) => alpha(theme.palette.primary.main, 0.16),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon={option.icon} width={28} color="primary.main" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {option.label}
                            </Typography>
                            {option.price === 0 && (
                              <Box
                                sx={{
                                  px: 1.5,
                                  py: 0.25,
                                  borderRadius: 1,
                                  bgcolor: 'success.main',
                                  color: 'success.contrastText',
                                }}
                              >
                                <Typography variant="caption" fontWeight="bold">
                                  FREE
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Benefits */}
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {option.benefits.map((benefit, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            sx={{
                              px: 1,
                              py: 0.5,
                              bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
                              borderRadius: 1,
                              border: 1,
                              borderColor: (theme) => alpha(theme.palette.success.main, 0.16),
                            }}
                          >
                            <Iconify icon="solar:check-circle-bold" width={14} color="success.main" />
                            <Typography variant="caption" color="success.dark" fontWeight="medium">
                              {benefit}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>

          {/* Additional Info */}
          {selectedDelivery === 'home_collection' && (
            <Box
              sx={{
                mt: 3,
                p: 2.5,
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
                borderRadius: 2,
                border: 1,
                borderColor: (theme) => alpha(theme.palette.info.main, 0.12)
              }}
            >
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Iconify icon="solar:info-circle-bold" width={20} color="info.main" sx={{ mt: 0.25 }} />
                <Box>
                  <Typography variant="subtitle2" color="info.dark" fontWeight="bold" sx={{ mb: 1 }}>
                    Home Collection Details
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      • Our certified phlebotomist will arrive at your address with proper safety equipment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Sample collection typically takes 10-15 minutes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Please ensure someone is available at the scheduled time
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • All safety protocols and hygiene standards are strictly followed
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          )}

          {selectedDelivery === 'lab_visit' && (
            <Box
              sx={{
                mt: 3,
                p: 2.5,
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.04),
                borderRadius: 2,
                border: 1,
                borderColor: (theme) => alpha(theme.palette.warning.main, 0.12)
              }}
            >
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Iconify icon="solar:clock-circle-bold" width={20} color="warning.main" sx={{ mt: 0.25 }} />
                <Box>
                  <Typography variant="subtitle2" color="warning.dark" fontWeight="bold" sx={{ mb: 1 }}>
                    Lab Visit Information
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      • Lab timings: Monday to Saturday, 9:00 AM to 6:00 PM
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Please carry a valid photo ID and your booking confirmation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Address: 123 Health Center, Medical District, Pune
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Free parking available for patients
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card
        sx={{
          border: 1,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.12),
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Iconify icon="solar:notes-bold" width={24} color="primary.main" />
            <Typography variant="h6" fontWeight="bold">
              Special Instructions (Optional)
            </Typography>
          </Stack>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Any special instructions for sample collection, preferred time slots, medical conditions, or other important notes..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Example:  &quot;Please call before arriving &quot;,  &quot;Patient has diabetes &quot;,  &quot;Prefer morning collection &quot;, etc.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
