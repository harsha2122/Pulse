// src/sections/overview/pharmacy/pharmacy-categories.jsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PharmacyCategories({
  categories,
  loading,
  filters,
  stats,
  onCategoryClick,
  onFilterChange,
}) {
  const router = useRouter();

  // Handle category click to navigate to product view
  const handleCategoryClick = (category) => {
    // Navigate to pharmacy product view page with category filter
    router.push(`/pharmacy/products?category=${category.id}&categoryName=${encodeURIComponent(category.name)}`);

    // Also call the original onCategoryClick if provided
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  // Color mapping for categories
  const getCategoryColors = (index) => {
    const colors = [
      { bg: 'error.lighter', border: 'error.light', text: 'error.main' },
      { bg: 'success.lighter', border: 'success.light', text: 'success.main' },
      { bg: 'info.lighter', border: 'info.light', text: 'info.main' },
      { bg: 'warning.lighter', border: 'warning.light', text: 'warning.main' },
      { bg: 'secondary.lighter', border: 'secondary.light', text: 'secondary.main' },
      { bg: 'primary.lighter', border: 'primary.light', text: 'primary.main' },
    ];
    return colors[index % colors.length];
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title="Pharmacy Categories"
        subheader={`${stats.total} categories available with ${stats.totalProducts} total products`}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              color={filters.is_featured ? 'primary' : 'inherit'}
              onClick={() => onFilterChange({ is_featured: !filters.is_featured })}
              startIcon={<Iconify icon={filters.is_featured ? 'solar:star-bold' : 'solar:star-outline'} />}
            >
              {filters.is_featured ? 'Show All' : 'Featured Only'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={() => toast.info('Add category feature coming soon!')}
            >
              Add Category
            </Button>
          </Stack>
        }
      />
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {categories.map((category, index) => {
              const colors = getCategoryColors(index);

              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                  <Card
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => theme.shadows[12],
                        borderColor: colors.border,
                        '& .category-icon': {
                          transform: 'scale(1.1)',
                        },
                        '& .category-title': {
                          color: colors.text,
                        },
                        '& .category-stats': {
                          bgcolor: colors.bg,
                          borderColor: colors.border,
                        },
                      },
                    }}
                  >
                    {/* Featured Badge */}
                    {category.is_featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'warning.main',
                          color: 'warning.contrastText',
                          fontSize: '0.6rem',
                          height: 20,
                          zIndex: 1,
                        }}
                      />
                    )}

                    <CardContent sx={{
                      textAlign: 'center',
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      pb: '16px !important'
                    }}>
                      {/* Category Icon */}
                      <Box
                        component="img"
                        src={category.icon}
                        alt={category.name}
                        className="category-icon"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1.5,
                          bgcolor: colors.bg,
                          border: '1px solid',
                          borderColor: colors.border,
                          mx: 'auto',
                          mb: 1.5,
                          p: 1,
                          transition: 'transform 0.3s ease',
                          objectFit: 'contain',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />

                      {/* Fallback Icon */}
                      <Box
                        className="category-icon"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1.5,
                          bgcolor: colors.bg,
                          border: '1px solid',
                          borderColor: colors.border,
                          mx: 'auto',
                          mb: 1.5,
                          display: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <Iconify icon="solar:pill-bold" width={24} sx={{ color: colors.text }} />
                      </Box>

                      {/* Category Name */}
                      <Typography
                        className="category-title"
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: '0.875rem',
                          lineHeight: 1.3,
                          transition: 'color 0.3s ease',
                          minHeight: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          mb: 1.5,
                        }}
                      >
                        {category.name}
                      </Typography>

                      {/* Category Stats */}
                      <Stack spacing={0.5} alignItems="center" sx={{ mt: 'auto' }}>
                        <Chip
                          label={`${category.product_count} items`}
                          size="small"
                          className="category-stats"
                          sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontSize: '0.7rem',
                            height: 22,
                            border: '1px solid',
                            borderColor: colors.border,
                            transition: 'all 0.3s ease',
                          }}
                        />

                        {category.subcategory_count > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.65rem' }}
                          >
                            {category.subcategory_count} subcategories
                          </Typography>
                        )}

                        <Typography
                          variant="caption"
                          color="success.main"
                          sx={{ fontSize: '0.65rem', fontWeight: 'bold' }}
                        >
                          ₹{category.min_price} - ₹{category.max_price}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && categories.length === 0 && (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Iconify icon="solar:folder-cross-bold" width={40} sx={{ color: 'grey.500' }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              No categories found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {filters.is_featured
                ? 'No featured categories available. Try showing all categories.'
                : 'Start by adding your first pharmacy category.'
              }
            </Typography>
            {filters.is_featured ? (
              <Button
                variant="outlined"
                onClick={() => onFilterChange({ is_featured: false })}
                startIcon={<Iconify icon="solar:eye-bold" />}
              >
                Show All Categories
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => toast.info('Add category feature coming soon!')}
                startIcon={<Iconify icon="solar:add-circle-bold" />}
              >
                Add Category
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
