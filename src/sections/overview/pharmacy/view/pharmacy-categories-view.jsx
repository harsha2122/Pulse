// src/sections/overview/pharmacy/view/pharmacy-category-products-view.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  usePharmacyCart,
  useCategoryDetails,
  usePharmacyProducts,
  usePharmacySubcategories
} from 'src/hooks/use-pharmacy';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Product Card Component
function ProductCard({ product, onAddToCart, isInCart, cartQuantity }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await onAddToCart(product.id, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleViewProduct = () => {
    // Navigate to product detail page
    toast.info(`Viewing ${product.name} details...`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ position: 'relative', pt: '75%' }}>
        <Box
          component="img"
          src={product.image_url}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Badges */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            flexWrap: 'wrap',
          }}
        >
          {product.is_bestseller && (
            <Chip
              label="Bestseller"
              size="small"
              sx={{
                bgcolor: 'error.main',
                color: 'error.contrastText',
                fontSize: '0.6rem',
                height: 20,
              }}
            />
          )}
          {product.discount_percentage > 0 && (
            <Chip
              label={`${product.discount_percentage}% OFF`}
              size="small"
              sx={{
                bgcolor: 'success.main',
                color: 'success.contrastText',
                fontSize: '0.6rem',
                height: 20,
              }}
            />
          )}
        </Stack>

        {/* Cart Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            },
          }}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? (
            <CircularProgress size={20} />
          ) : (
            <Iconify
              icon={isInCart ? "solar:cart-check-bold" : "solar:cart-plus-bold"}
              width={20}
            />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand */}
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 40,
          }}
        >
          {product.name}
        </Typography>

        {/* Unit */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.unit}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Iconify icon="solar:star-bold" width={16} sx={{ color: 'warning.main' }} />
          <Typography variant="body2" fontWeight="medium">
            {product.rating}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ({product.review_count})
          </Typography>
        </Stack>

        {/* Price */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            ₹{product.price}
          </Typography>
          {product.original_price !== product.price && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ₹{product.original_price}
            </Typography>
          )}
        </Stack>

        {/* Prescription Required */}
        {product.is_prescription_required && (
          <Chip
            label="Prescription Required"
            size="small"
            color="warning"
            sx={{ mb: 2, alignSelf: 'flex-start' }}
          />
        )}

        {/* Actions */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleViewProduct}
            sx={{ flex: 1 }}
          >
            View
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddToCart}
            disabled={adding}
            sx={{ flex: 1 }}
            startIcon={
              adding ? (
                <CircularProgress size={16} />
              ) : (
                <Iconify icon="solar:cart-plus-bold" width={16} />
              )
            }
          >
            {isInCart ? `In Cart (${cartQuantity})` : 'Add'}
          </Button>
        </Stack>

        {/* Delivery Info */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {product.delivery_info}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function PharmacyCategoryProductsView() {
  const router = useRouter();
  const { categoryId } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  // Hooks
  const { categoryDetails, loading: categoryLoading } = useCategoryDetails(categoryId);
  const { subcategories, loading: subcategoriesLoading } = usePharmacySubcategories({
    category: categoryId
  });
  const { products, loading: productsLoading, updateFilters } = usePharmacyProducts({
    category: categoryId,
    search: searchQuery,
    ordering: sortBy,
    subcategory: selectedSubcategory !== 'all' ? selectedSubcategory : undefined,
  });
  const { addToCart, isInCart, getItemQuantity } = usePharmacyCart();

  // Update filters when search or sort changes
  useEffect(() => {
    updateFilters({
      category: categoryId,
      search: searchQuery,
      ordering: sortBy,
      subcategory: selectedSubcategory !== 'all' ? selectedSubcategory : undefined,
    });
  }, [categoryId, searchQuery, sortBy, selectedSubcategory, updateFilters]);

  const handleSubcategoryChange = useCallback((subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  }, []);

  const handleAddToCart = useCallback(async (productId, quantity) => {
    await addToCart(productId, quantity);
  }, [addToCart]);

  const handleBackToCategories = () => {
    router.push(`${paths.dashboard.root}/pharmacy`);
  };

  if (categoryLoading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress size={40} />
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  if (!categoryDetails) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography variant="h6" color="error">
              Category not found
            </Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={categoryDetails.name}
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy', href: `${paths.dashboard.root}/pharmacy` },
            { name: categoryDetails.name },
          ]}
          action={
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:arrow-left-bold" />}
              onClick={handleBackToCategories}
            >
              Back to Categories
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Category Header */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
              <Box
                component="img"
                src={categoryDetails.icon}
                alt={categoryDetails.name}
                sx={{ width: 80, height: 80, borderRadius: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {categoryDetails.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {categoryDetails.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={`${categoryDetails.product_count} Products`}
                    variant="outlined"
                  />
                  <Chip
                    label={`${categoryDetails.subcategory_count} Subcategories`}
                    variant="outlined"
                  />
                  <Chip
                    label={`₹${categoryDetails.min_price} - ₹${categoryDetails.max_price}`}
                    variant="outlined"
                    color="success"
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              {/* Search */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:magnifer-bold" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Sort By */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price: Low to High</MenuItem>
                    <MenuItem value="-price">Price: High to Low</MenuItem>
                    <MenuItem value="-rating">Rating</MenuItem>
                    <MenuItem value="-created_at">Newest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Results Count */}
              <Grid item xs={12} md={5}>
                <Typography variant="body2" color="text.secondary">
                  {products.length} products found
                  {selectedSubcategory !== 'all' && (
                    <> in {subcategories.find(s => s.id === parseInt(selectedSubcategory, 10))?.name}</>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Subcategory Tabs */}
        {!subcategoriesLoading && subcategories.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Tabs
                value={selectedSubcategory}
                onChange={(e, value) => handleSubcategoryChange(value)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={`All (${categoryDetails.product_count})`}
                  value="all"
                />
                {subcategories.map((subcategory) => (
                  <Tab
                    key={subcategory.id}
                    label={`${subcategory.name} (${subcategory.product_count})`}
                    value={subcategory.id.toString()}
                  />
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {productsLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={isInCart(product.id)}
                  cartQuantity={getItemQuantity(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!productsLoading && products.length === 0 && (
          <Box
            sx={{
              py: 12,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: 3,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Iconify icon="solar:pill-cross-bold" width={64} sx={{ color: 'grey.500' }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery
                ? `No products match "${searchQuery}" in this category.`
                : 'No products available in this category yet.'
              }
            </Typography>
            {searchQuery && (
              <Button
                variant="outlined"
                onClick={() => setSearchQuery('')}
                startIcon={<Iconify icon="solar:refresh-bold" />}
              >
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Container>
    </DashboardContent>
  );
}
