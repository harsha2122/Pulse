import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

export function DeliveryLocationCard({ location = 'Home' }) {
  return (
    <Card sx={{ mb: 2, bgcolor: '#2196F3', color: 'white', borderRadius: 1 }}>
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:map-point-bold" width={24} sx={{ color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
              Deliver to
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {location}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Iconify icon="solar:alt-arrow-up-bold" width={20} sx={{ color: 'white' }} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
