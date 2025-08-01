// src/sections/overview/homevisit/view/overview-homevisit-view.jsx
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useHomevisit, useHomevisitForms } from 'src/hooks/use-homevisit';

import { SERVICE_CATEGORIES } from 'src/_mock/homevisit';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ActionCard } from 'src/components/homevisit/action-card';
import { WelcomeCard } from 'src/components/homevisit/welcome-card';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { BookingDrawer } from 'src/components/homevisit/booking-drawer';
import { DurationOptions } from 'src/components/homevisit/duration-options';
import { PatientInfoCard } from 'src/components/homevisit/patient-info-card';
import { AppointmentDrawer } from 'src/components/homevisit/appointment-drawer';
import { ServiceCategories } from 'src/components/homevisit/service-categories';
// Import new modular components
import { PatientInfoDrawer } from 'src/components/homevisit/patient-info-drawer';
import { HealthcarePackages } from 'src/components/homevisit/healthcare-package';
import { DeliveryLocationCard } from 'src/components/homevisit/delivery-location-card';

// Main component
export function OverviewHomevisitView() {
  // Hooks
  const {
    healthcareData,
    loading,
    error,
    activeCategory,
    activeDuration,
    updateCategorySelection,
    updateDurationSelection,
  } = useHomevisit();

  const {
    patientInfo,
    handlePatientSubmit,
    handleAppointmentSubmit,
    handleBookingSubmit,
    resetForms,
  } = useHomevisitForms();

  // UI state
  const bookingDrawer = useBoolean();
  const patientInfoDrawer = useBoolean();
  const appointmentDrawer = useBoolean();

  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [showHomeVisitContent, setShowHomeVisitContent] = useState(false);

  // Event handlers
  const handleCategorySelect = (category) => {
    if (category.name === SERVICE_CATEGORIES.HOME_VISIT) {
      setShowHomeVisitContent(true);
    } else {
      setShowHomeVisitContent(false);
    }
    updateCategorySelection(category.id);
  };

  const handleDurationSelect = (duration) => {
    updateDurationSelection(duration.id);
  };

  const handleBookService = (pkg) => {
    setSelectedPackageForBooking(pkg);
    bookingDrawer.onTrue();
  };

  const handleAddPatientInfo = () => {
    patientInfoDrawer.onTrue();
  };

  const handlePatientInfoNext = async (data) => {
    try {
      await handlePatientSubmit(data);
      appointmentDrawer.onTrue();
 } catch (e) {
  toast.error('Failed to save patient information');
}
  };

  const handleBackToServices = () => {
    setShowHomeVisitContent(false);
    resetForms();
    updateCategorySelection(1); // Reset to first category
  };

 const onBookingSubmit = async (data) => {
  await handleBookingSubmit(data);
};

const onAppointmentSubmit = async (data) => {
  await handleAppointmentSubmit(data);
};

  // Loading state
  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography>Loading healthcare services...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  // Home Visit Content
  const renderHomeVisitContent = () => (
    <Stack spacing={2}>
      {/* Back button */}
      <Card sx={{ borderRadius: 1 }}>
        <CardContent sx={{ py: 1.5 }}>
          <Button
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
            onClick={handleBackToServices}
            sx={{ color: 'text.secondary' }}
          >
            Back to Healthcare Services
          </Button>
        </CardContent>
      </Card>

      {/* Home Visit Header */}
      <Card sx={{ bgcolor: '#4CAF50', color: 'white', borderRadius: 1 }}>
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
              <Iconify icon="solar:home-bold" width={24} sx={{ color: 'white' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                Home Visit
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Our qualified doctors will visit your home for consultation and treatment.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Delivery Location */}
      <DeliveryLocationCard />

      {/* Patient Information Section */}
      <Card sx={{ borderRadius: 1 }}>
        <CardContent sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2196F3' }}>
            Patient Information
          </Typography>
          <ActionCard
            title="Add Patient Information"
            subtitle="Tap to enter patient details"
            icon="solar:user-plus-bold"
            onClick={handleAddPatientInfo}
          />
        </CardContent>
      </Card>

      {/* Schedule Appointment Section */}
      <Card sx={{ borderRadius: 1 }}>
        <CardContent sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2196F3' }}>
            Schedule Appointment
          </Typography>
          <ActionCard
            title="Select Preferred Date"
            subtitle={patientInfo ? 'Choose your appointment time' : 'Add patient info first'}
            icon="solar:calendar-add-bold"
            onClick={() => {
              if (!patientInfo) {
                toast.error('Please add patient information first');
                return;
              }
              appointmentDrawer.onTrue();
            }}
            disabled={!patientInfo}
          />
        </CardContent>
      </Card>

      {/* Patient Info Display */}
      {patientInfo && <PatientInfoCard patientInfo={patientInfo} />}
    </Stack>
  );

  // Healthcare Services Overview
  const renderHealthcareOverview = () => (
    <Stack spacing={2}>
      {/* Current Healthcare Data Overview */}
      {healthcareData && (
        <Card sx={{ mb: 2, borderRadius: 1 }}>
          <CardContent sx={{ py: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Typography variant="h6">Current Home Healthcare Services</Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:pen-bold" />}
                  onClick={() => console.log('Edit services')}
                  sx={{ borderRadius: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => console.log('Add new service')}
                  sx={{ borderRadius: 1 }}
                >
                  Add Service
                </Button>
              </Stack>
            </Stack>

            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                <strong>Center:</strong> {healthcareData.centerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Available Categories:</strong> {healthcareData.serviceCategories?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Duration Options:</strong> {healthcareData.durationOptions?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Healthcare Packages:</strong> {healthcareData.healthcarePackages?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Last Updated:</strong> {new Date(healthcareData.lastUpdated).toLocaleDateString()}
              </Typography>
              {healthcareData.description && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Description:</strong> {healthcareData.description}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Welcome Card */}
      <WelcomeCard />

      {/* Delivery Location */}
      <DeliveryLocationCard />

      {/* Service Categories */}
      {healthcareData?.serviceCategories && (
        <ServiceCategories
          categories={healthcareData.serviceCategories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {/* Duration Options (only show for non-Home Visit services) */}
      {healthcareData?.durationOptions &&
       activeCategory?.name !== SERVICE_CATEGORIES.HOME_VISIT && (
        <DurationOptions
          durations={healthcareData.durationOptions}
          onDurationSelect={handleDurationSelect}
        />
      )}

      {/* Healthcare Packages (only show for non-Home Visit services) */}
      {healthcareData?.healthcarePackages &&
       activeCategory?.name !== SERVICE_CATEGORIES.HOME_VISIT && (
        <HealthcarePackages
          packages={healthcareData.healthcarePackages}
          onBookService={handleBookService}
        />
      )}
    </Stack>
  );

  // Empty state
  const renderEmptyState = () => (
    <Card sx={{ borderRadius: 1 }}>
      <CardContent>
        <Box
          sx={{
            py: 8,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:health-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.disabled" gutterBottom>
            No Healthcare Services Found
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
            Set up your home healthcare services to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => console.log('Setup healthcare services')}
            sx={{ borderRadius: 1 }}
          >
            Setup Healthcare Services
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={showHomeVisitContent ? "Home Visit Service" : "Home Healthcare Management"}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Healthcare', href: paths.dashboard.healthcare?.root },
            { name: showHomeVisitContent ? 'Home Visit' : 'Home Healthcare' },
          ]}
          action={
            !showHomeVisitContent && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => console.log('Add new healthcare service')}
                sx={{ borderRadius: 1 }}
              >
                Add New Service
              </Button>
            )
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        {/* Main Content */}
        {showHomeVisitContent ? renderHomeVisitContent() :
         healthcareData ? renderHealthcareOverview() : renderEmptyState()}

        {/* Drawers */}
        <BookingDrawer
          open={bookingDrawer.value}
          onClose={bookingDrawer.onFalse}
          selectedPackage={selectedPackageForBooking}
          onSubmit={onBookingSubmit}
        />

        <PatientInfoDrawer
          open={patientInfoDrawer.value}
          onClose={patientInfoDrawer.onFalse}
          onNext={handlePatientInfoNext}
        />

        <AppointmentDrawer
          open={appointmentDrawer.value}
          onClose={appointmentDrawer.onFalse}
          patientInfo={patientInfo}
          onSubmit={onAppointmentSubmit}
        />
      </Container>
    </DashboardContent>
  );
}
