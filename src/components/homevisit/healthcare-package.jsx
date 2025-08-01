import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

export function HealthcarePackages({ packages, onBookService }) {
  if (!packages?.length) return null;

  return (
    <Stack spacing={2}>
      {packages.map((pkg) => (
        <Card key={pkg.id} sx={{ borderRadius: 1 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600} color={pkg.color} sx={{ mb: 1 }}>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {pkg.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: pkg.bgColor,
                  ml: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color={pkg.color} textAlign="center">
                  {pkg.price}
                </Typography>
                <Typography variant="caption" color={pkg.color} textAlign="center" display="block">
                  {pkg.duration}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Services Included
            </Typography>

            <Stack spacing={0.5} sx={{ mb: 2 }}>
              {pkg.services.map((service, index) => (
                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:check-bold" width={12} sx={{ color: 'white' }} />
                  </Box>
                  <Typography variant="body2">
                    {service}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Typography variant="body2" color={pkg.color} sx={{ mb: 2, fontWeight: 500 }}>
              {pkg.additionalServices}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-bold" />}
              onClick={() => onBookService(pkg)}
              sx={{
                bgcolor: pkg.color,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: pkg.color,
                  opacity: 0.9,
                },
              }}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
