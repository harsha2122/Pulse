// src/sections/overview/pharmacy/view/overview-pharmacy-view.jsx
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { usePharmacyManager, useCategoryDetails } from 'src/hooks/use-pharmacy';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import PharmacyStats from '../pharmacy-stats';
// Import sub-components
import PharmacyFeatured from '../pharmacy-featured';
import PharmacyCategories from '../pharmacy-categories';

// Schema for Pharmacy Configuration
const PharmacyConfigSchema = zod.object({
  name: zod.string().min(1, { message: 'Pharmacy name is required!' }),
  description: zod.string().min(10, { message: 'Description must be at least 10 characters' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  phone: zod.string().min(1, { message: 'Phone number is required!' }),
  email: zod.string().email({ message: 'Invalid email address!' }),
  operating_hours: zod.string().min(1, { message: 'Operating hours are required!' }),
  emergency_contact: zod.string().min(1, { message: 'Emergency contact is required!' }),
  license_number: zod.string().min(1, { message: 'License number is required!' }),
  website: zod.string().optional(),
  special_services: zod.string().optional(),
});

// ----------------------------------------------------------------------

// Category Detail Dialog Component
function CategoryDetailDialog({ category, open, onClose, onNavigateToProducts }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { categoryDetails, loading: detailsLoading } = useCategoryDetails(category?.id);

  const handleViewProducts = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to products page with category filter
      const productsPath = `${paths.dashboard.root}/pharmacy/products?category=${category.id}&categoryName=${encodeURIComponent(category.name)}`;

      if (router?.push) {
        router.push(productsPath);
      } else {
        // Fallback navigation
        if (onNavigateToProducts) {
          onNavigateToProducts(category);
        }
        toast.success(`Opening ${category.name} products...`);
        console.log('Navigate to:', productsPath);
      }
      onClose();
    } catch (error) {
      toast.error('Navigation failed');
      console.error('Navigation error:', error);
    } finally {
      setLoading(false);
    }
  }, [category, router, onClose, onNavigateToProducts]);

  const handleViewSubcategories = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const subcategoryPath = `${paths.dashboard.root}/pharmacy/category/${category.id}/subcategories`;

      if (router?.push) {
        router.push(subcategoryPath);
      } else {
        toast.success(`Viewing ${category.name} subcategories...`);
        console.log('Navigate to:', subcategoryPath);
      }
      onClose();
    } catch (error) {
      toast.error('Navigation failed');
      console.error('Subcategory navigation error:', error);
    } finally {
      setLoading(false);
    }
  }, [category, router, onClose]);

  if (!category) return null;

  const displayCategory = categoryDetails || category;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" gutterBottom>
              {displayCategory.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              {displayCategory.is_featured && (
                <Chip label="Featured" size="small" color="warning" />
              )}
              <Chip
                label={`${displayCategory.product_count || 0} products`}
                size="small"
                color="primary"
              />
            </Stack>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Category Image/Icon */}
          <Box
            sx={{
              height: 120,
              bgcolor: 'grey.50',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={displayCategory.icon}
              alt={displayCategory.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <Box
              sx={{
                width: 80,
                height: 80,
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
                borderRadius: 1,
              }}
            >
              <Iconify icon="solar:pill-bold" width={40} sx={{ color: 'grey.500' }} />
            </Box>
          </Box>

          {/* Category Details */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Category Details
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Products Available:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {displayCategory.product_count || 0} items
                </Typography>
              </Stack>

              {displayCategory.subcategory_count > 0 && (
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Subcategories:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {displayCategory.subcategory_count}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Price Range:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  ₹{displayCategory.min_price || 0} - ₹{displayCategory.max_price || 0}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Description */}
          {displayCategory.description && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayCategory.description}
              </Typography>
            </Box>
          )}

          {/* Quick Stats */}
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" color="primary.main">
                    {displayCategory.product_count || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Products
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" color="success.main">
                    {displayCategory.subcategory_count || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Subcategories
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        {displayCategory.subcategory_count > 0 && (
          <LoadingButton
            variant="outlined"
            loading={loading}
            onClick={handleViewSubcategories}
            startIcon={<Iconify icon="solar:folder-bold" />}
          >
            View Subcategories
          </LoadingButton>
        )}

        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={handleViewProducts}
          startIcon={<Iconify icon="solar:pill-bold" />}
        >
          View Products
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

// Pharmacy Configuration Form Component
function PharmacyConfigForm({ currentConfig, onSuccess, loading: formLoading }) {
  const preview = useBoolean();
  const { config } = usePharmacyManager();

  const defaultValues = useMemo(
    () => ({
      name: currentConfig?.name || '',
      description: currentConfig?.description || '',
      address: currentConfig?.address || '',
      phone: currentConfig?.phone || '',
      email: currentConfig?.email || '',
      operating_hours: currentConfig?.operating_hours || '24/7',
      emergency_contact: currentConfig?.emergency_contact || '',
      license_number: currentConfig?.license_number || '',
      website: currentConfig?.website || '',
      special_services: currentConfig?.special_services || '',
    }),
    [currentConfig]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PharmacyConfigSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const submitData = {
        ...data,
        last_updated: new Date().toISOString().split('T')[0],
        is_active: true,
      };

      if (currentConfig) {
        await config.updateConfig(submitData);
      } else {
        await config.createConfig(submitData);
      }

      reset();
      preview.onFalse();

      toast.success(currentConfig ? 'Pharmacy updated successfully!' : 'Pharmacy created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderBasicInfo = (
    <Card>
      <CardHeader
        title="Basic Information"
        subheader="Essential pharmacy details and identification"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="name"
          label="Pharmacy Name"
          placeholder="e.g., HealthCare Plus Pharmacy"
        />

        <Field.Text
          name="description"
          label="Description"
          multiline
          rows={3}
          placeholder="Brief description of your pharmacy and services..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="license_number"
            label="License Number"
            placeholder="e.g., PH-2024-001"
          />
          <Field.Text
            name="operating_hours"
            label="Operating Hours"
            placeholder="e.g., 24/7, Mon-Fri 9AM-6PM"
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderContactInfo = (
    <Card>
      <CardHeader
        title="Contact Information"
        subheader="How customers can reach your pharmacy"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="address"
          label="Address"
          multiline
          rows={2}
          placeholder="Complete pharmacy address with city and postal code..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="phone"
            label="Phone Number"
            placeholder="e.g., +1 (555) 123-4567"
          />
          <Field.Text
            name="emergency_contact"
            label="Emergency Contact"
            placeholder="e.g., +1 (555) 999-HELP"
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="email"
            label="Email Address"
            placeholder="e.g., info@pharmacy.com"
          />
          <Field.Text
            name="website"
            label="Website (Optional)"
            placeholder="e.g., https://pharmacy.com"
          />
        </Stack>

        <Field.Text
          name="special_services"
          label="Special Services (Optional)"
          multiline
          rows={2}
          placeholder="e.g., Home delivery, Online consultation, Health checkups..."
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Set as Active Configuration"
        sx={{ flexGrow: 1 }}
      />

      <Box display="flex" gap={2}>
        <Button
          color="inherit"
          variant="outlined"
          size="large"
          onClick={preview.onTrue}
          disabled={!isValid}
        >
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting || formLoading || config.loading}
          disabled={!isValid}
        >
          {!currentConfig ? 'Create Configuration' : 'Update Configuration'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={4} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderBasicInfo}
        {renderContactInfo}
        {renderActions}
      </Stack>
    </Form>
  );
}

// ----------------------------------------------------------------------

// Main Pharmacy Overview Component
export function OverviewPharmacyView() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDetailOpen, setCategoryDetailOpen] = useState(false);

  // Use our pharmacy manager hook
  const {
    config,
    categories,
    cart,
    isLoading,
    hasError,
    isPharmacyReady,
    dashboardStats
  } = usePharmacyManager();

  const handleCreateNew = () => {
    config.setConfig(null);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    config.setConfig(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // Updated category click handler to navigate directly to products
  const handleCategoryClick = useCallback((category) => {
    console.log('Category clicked:', category);

    // Navigate directly to products page with category filter
    const productsPath = `${paths.dashboard.root}/pharmacy/products?category=${category.id}&categoryName=${encodeURIComponent(category.name)}`;

    try {
      if (router?.push) {
        router.push(productsPath);
      } else {
        toast.success(`Opening ${category.name} products...`);
        console.log('Navigate to:', productsPath);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: show category detail dialog
      setSelectedCategory(category);
      setCategoryDetailOpen(true);
    }
  }, [router]);

  const handleCategoryDetailClose = () => {
    setCategoryDetailOpen(false);
    setSelectedCategory(null);
  };

  const handleNavigateToProducts = useCallback((category) => {
    const productsPath = `${paths.dashboard.root}/pharmacy/products${
      category ? `?category=${category.id}&categoryName=${encodeURIComponent(category.name)}` : ''
    }`;

    try {
      if (router?.push) {
        router.push(productsPath);
      } else {
        toast.success(`Opening ${category ? category.name : 'all'} products...`);
        console.log('Navigate to:', productsPath);
      }
    } catch (error) {
      toast.error('Navigation failed');
      console.error('Products navigation error:', error);
    }
  }, [router]);

  const handleAddToCart = () => {
    try {
      if (router?.push) {
        router.push(`${paths.dashboard.root}/pharmacy/cart`);
      } else {
        toast.success('Opening cart...');
      }
    } catch (error) {
      toast.info('Cart functionality - Feature coming soon!');
    }
  };

  // Error state
  if (hasError && !config.config) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
              <Iconify icon="solar:wifi-router-minimalistic-bold" width={64} sx={{ color: 'error.main', mb: 2 }} />
              <Typography variant="h6" color="error" gutterBottom>
                Connection Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {config.error || categories.error || 'Failed to load pharmacy data'}
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                startIcon={<Iconify icon="solar:refresh-bold" />}
              >
                Retry
              </Button>
            </Card>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  // Loading state
  if (isLoading && !config.config) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Stack spacing={3} alignItems="center">
              <CircularProgress size={40} thickness={4} />
              <Typography variant="h6" color="text.secondary">
                Loading pharmacy configuration...
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Please wait while we fetch your pharmacy data
              </Typography>
            </Stack>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Pharmacy Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy' },
          ]}
          action={
            !editMode && (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:cart-bold" />}
                  onClick={handleAddToCart}
                  sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
                >
                  View Cart ({cart.itemCount})
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                  sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
                >
                  Configure Pharmacy
                </Button>
              </Stack>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Display success message if configuration was just saved */}
        {config.config && !editMode && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleEdit}
                startIcon={<Iconify icon="solar:pen-bold" />}
              >
                Edit
              </Button>
            }
          >
            Pharmacy configuration is active and ready to serve customers!
          </Alert>
        )}

        {/* Pharmacy Header Section */}
        {config.config && !editMode && (
          <PharmacyFeatured
            config={config.config}
            cartItemCount={cart.itemCount}
            onEdit={handleEdit}
            onViewCart={handleAddToCart}
          />
        )}

        {/* Dashboard Stats */}
        {config.config && !editMode && (
          <PharmacyStats
            stats={dashboardStats}
            onViewProducts={() => handleNavigateToProducts()}
            onViewCart={handleAddToCart}
          />
        )}

        {/* Categories Section */}
        {config.config && !editMode && categories.categories.length > 0 && (
          <PharmacyCategories
            categories={categories.categories}
            loading={categories.loading}
            filters={categories.filters}
            stats={categories.categoriesStats}
            onCategoryClick={handleCategoryClick}
            onFilterChange={categories.updateFilters}
          />
        )}

        {/* Edit Mode Form */}
        {editMode && (
          <>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Box>
                <Typography variant="h4">
                  {config.config ? 'Edit Pharmacy Configuration' : 'Setup Pharmacy Configuration'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {config.config ? 'Update your pharmacy information and settings' : 'Configure your pharmacy details to get started'}
                </Typography>
              </Box>
              <Button
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="solar:arrow-left-bold" />}
                onClick={handleCancel}
                sx={{ mt: { xs: 2, sm: 0 }, minWidth: { xs: '100%', sm: 'auto' } }}
              >
                Cancel
              </Button>
            </Stack>

            <PharmacyConfigForm
              currentConfig={config.config}
              onSuccess={handleFormSuccess}
              loading={config.loading}
            />
          </>
        )}

        {/* Empty State */}
        {!editMode && !config.config && (
          <Card>
            <CardContent>
              <Box
                sx={{
                  py: 10,
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
                    bgcolor: 'primary.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Iconify icon="solar:hospital-bold" width={64} sx={{ color: 'primary.main' }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  Welcome to Pharmacy Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                  Set up your pharmacy configuration to start managing your inventory,
                  categories, and provide excellent healthcare services to your customers.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={handleCreateNew}
                    sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
                  >
                    Setup Pharmacy
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Iconify icon="solar:document-text-bold" />}
                    onClick={() => toast.info('Documentation coming soon!')}
                    sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
                  >
                    View Guide
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Category Detail Dialog - Fallback for when direct navigation fails */}
        <CategoryDetailDialog
          category={selectedCategory}
          open={categoryDetailOpen}
          onClose={handleCategoryDetailClose}
          onNavigateToProducts={handleNavigateToProducts}
        />
      </Container>
    </DashboardContent>
  );
}
