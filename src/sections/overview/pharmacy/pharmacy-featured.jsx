// src/sections/overview/pharmacy/pharmacy-featured.jsx
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PharmacyFeatured({ config, cartItemCount, onEdit, onViewCart }) {
  return (
    <Paper
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'primary.contrastText',
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" spacing={3}>
        {/* Pharmacy Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            zIndex: 1,
            backdropFilter: 'blur(10px)',
          }}
        >
          🏥
        </Box>

        {/* Pharmacy Info */}
        <Box sx={{ flex: 1, zIndex: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
            {config.name}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2, fontWeight: 400 }}>
            {config.description}
          </Typography>

          {/* Quick Info Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip
              icon={<Iconify icon="solar:clock-circle-bold" width={16} />}
              label={config.operating_hours}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'inherit',
                backdropFilter: 'blur(10px)',
                '& .MuiChip-icon': { color: 'inherit' }
              }}
            />
            <Chip
              icon={<Iconify icon="solar:shield-check-bold" width={16} />}
              label={`License: ${config.license_number}`}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'inherit',
                backdropFilter: 'blur(10px)',
                '& .MuiChip-icon': { color: 'inherit' }
              }}
            />
            {config.is_active && (
              <Chip
                icon={<Iconify icon="solar:check-circle-bold" width={16} />}
                label="Active"
                sx={{
                  bgcolor: 'success.main',
                  color: 'success.contrastText',
                  '& .MuiChip-icon': { color: 'inherit' }
                }}
              />
            )}
          </Stack>

          {/* Contact Info */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 3, opacity: 0.9 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:phone-bold" width={18} />
              <Typography variant="body2">{config.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:letter-bold" width={18} />
              <Typography variant="body2">{config.email}</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} sx={{ zIndex: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:cart-plus-bold" />}
            onClick={onViewCart}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(255,255,255,0.5)',
              minWidth: { xs: 'auto', sm: 120 },
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.8)',
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            Cart ({cartItemCount})
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={onEdit}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(255,255,255,0.5)',
              minWidth: { xs: 'auto', sm: 120 },
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.8)',
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            Edit
          </Button>
        </Stack>
      </Stack>

      {/* Services Badge */}
      {config.special_services && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            p: 1.5,
            zIndex: 1,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:heart-bold" width={16} />
            <Typography variant="caption" fontWeight="medium">
              Special Services Available
            </Typography>
          </Stack>
        </Box>
      )}
    </Paper>
  );
}
