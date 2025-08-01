// src/sections/overview/pharmacy/pharmacy-stats.jsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PharmacyStats({ stats, onViewProducts, onViewCart }) {
  const statsData = [
    {
      id: 'categories',
      title: 'Total Categories',
      value: stats.totalCategories,
      icon: 'solar:folder-bold',
      color: 'primary',
      onClick: onViewProducts,
    },
    {
      id: 'products',
      title: 'Total Products',
      value: stats.totalProducts,
      icon: 'solar:pill-bold',
      color: 'success',
      onClick: onViewProducts,
    },
    {
      id: 'cart_items',
      title: 'Cart Items',
      value: stats.cartItems,
      icon: 'solar:cart-bold',
      color: 'info',
      onClick: onViewCart,
    },
    {
      id: 'cart_value',
      title: 'Cart Value',
      value: `₹${stats.cartValue}`,
      icon: 'solar:wallet-money-bold',
      color: 'warning',
      onClick: onViewCart,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsData.map((stat) => (
        <Grid item xs={6} sm={3} key={stat.id}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: stat.onClick ? 'pointer' : 'default',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': stat.onClick ? {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
                borderColor: `${stat.color}.main`,
                '& .stat-icon': {
                  transform: 'scale(1.1)',
                  color: `${stat.color}.main`,
                },
                '& .stat-value': {
                  color: `${stat.color}.main`,
                },
              } : {},
            }}
            onClick={stat.onClick}
          >
            <Stack spacing={2} alignItems="center">
              {/* Icon */}
              <Box
                className="stat-icon"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${stat.color}.lighter`,
                  color: `${stat.color}.dark`,
                  transition: 'all 0.3s ease',
                }}
              >
                <Iconify icon={stat.icon} width={28} />
              </Box>

              {/* Value */}
              <Typography
                variant="h3"
                className="stat-value"
                sx={{
                  fontWeight: 'bold',
                  transition: 'color 0.3s ease',
                }}
              >
                {stat.value}
              </Typography>

              {/* Title */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 'medium',
                  lineHeight: 1.2,
                }}
              >
                {stat.title}
              </Typography>

              {/* Action Indicator */}
              {stat.onClick && (
                <IconButton
                  size="small"
                  sx={{
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      bgcolor: `${stat.color}.lighter`,
                    },
                  }}
                >
                  <Iconify icon="solar:arrow-right-bold" width={16} />
                </IconButton>
              )}
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
