import { useMemo, useState, useCallback } from 'react';

import {
  Box,
  Fab,
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Avatar,
  Tooltip,
  useTheme,
  Container,
  Typography
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Mock data directly in component (since imports might not work)
const mockPatient = {
  id: 1,
  patient_id: "PAT2024001",
  first_name: "John",
  last_name: "Doe"
};

const mockVitals = [
  {
    id: 1,
    patient: 1,
    recorded_date: "2024-06-28T14:20:00Z",
    blood_pressure_systolic: 120,
    blood_pressure_diastolic: 80,
    heart_rate: 72,
    respiratory_rate: 16,
    temperature: 98.6,
    oxygen_saturation: 98,
    bmi: 22.8,
    pain_scale: 2
  }
];

// Utility function
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function VitalsView() {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState('30');
  const [isAddingVital, setIsAddingVital] = useState(false);

  // Use mock data
  const vitals = mockVitals;
  const patient = mockPatient;
  const loading = false;

  // Latest vital
  const latestVital = useMemo(() =>
    vitals.length > 0 ? vitals[0] : null,
    [vitals]
  );

  // Vital color calculation
  const getVitalColor = useCallback((vital, type) => {
    if (!vital) return 'info';

    switch (type) {
      case 'bp':
        if (vital.blood_pressure_systolic > 140 || vital.blood_pressure_diastolic > 90) return 'error';
        if (vital.blood_pressure_systolic > 120 || vital.blood_pressure_diastolic > 80) return 'warning';
        return 'success';
      case 'temp':
        if (vital.temperature > 99.5) return 'error';
        if (vital.temperature > 98.6) return 'warning';
        return 'info';
      case 'hr':
        if (vital.heart_rate > 100 || vital.heart_rate < 60) return 'warning';
        return 'success';
      default:
        return 'info';
    }
  }, []);

  // Dark mode aware colors
const getPatientCardBgColor = () =>
  theme.palette.mode === 'dark'
    ? `${theme.palette.error.dark}30`
    : theme.palette.error.lighter;

const getVitalCardBgColor = (color) =>
  theme.palette.mode === 'dark'
    ? `${theme.palette[color].dark}30`
    : theme.palette[color].lighter;

const getVitalTextColor = (color) =>
  theme.palette.mode === 'dark'
    ? theme.palette[color].light
    : theme.palette[color].dark;

const getVitalIconColor = (color) =>
  theme.palette.mode === 'dark'
    ? theme.palette[color].light
    : theme.palette[color].main;

const getLatestReadingBgColor = () =>
  theme.palette.mode === 'dark'
    ? `${theme.palette.primary.dark}30`
    : theme.palette.primary.lighter;

const getLatestReadingTextColor = () =>
  theme.palette.mode === 'dark'
    ? theme.palette.primary.light
    : theme.palette.primary.dark;

 const getMetricCardBgColor = (color) =>
  theme.palette.mode === 'dark'
    ? `${theme.palette[color].dark}30`
    : theme.palette[color].lighter;

  const getMetricTextColor = (color) =>
  theme.palette.mode === 'dark'
    ? theme.palette[color].light
    : theme.palette[color].dark;

const getMetricBorderColor = (color) =>
  theme.palette.mode === 'dark'
    ? theme.palette[color].dark
    : theme.palette[color].main;

  const handleAddVital = useCallback(() => {
    setIsAddingVital(true);
    setTimeout(() => setIsAddingVital(false), 1000);
    console.log('Add vital signs - Open dialog');
  }, []);

  const handleViewHistory = useCallback(() => {
    console.log('View complete history');
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <Typography>Loading vitals...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <Iconify icon="solar:heart-bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Vitals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track vital signs and health metrics
            </Typography>
          </Box>
        </Stack>

        {/* Patient Info */}
        <Card
          sx={{
            p: 2,
            bgcolor: getPatientCardBgColor(),
            border: 1,
            borderColor: 'error.main'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40 }}>
              {patient?.first_name?.charAt(0) || 'P'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {patient?.first_name} {patient?.last_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Patient ID: {patient?.patient_id} • Last Check: {
                  latestVital ? formatDateTime(latestVital.recorded_date) : 'Never'
                }
              </Typography>
            </Box>
            {latestVital && (
              <Chip
                label={`${vitals.length} records`}
                size="small"
                variant="outlined"
                color="error"
              />
            )}
          </Stack>
        </Card>
      </Box>

      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:calendar-bold" />}
              size="small"
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Last 30 Days
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Iconify icon="solar:calendar-bold" />}
              onClick={() => console.log('Change date range')}
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Change Range
            </Button>
          </Stack>
        </Box>
      </Card>

      {latestVital ? (
        <>
          {/* Summary Cards */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              {/* Blood Pressure Card */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: getVitalCardBgColor(getVitalColor(latestVital, 'bp')),
                    border: 2,
                    borderColor: `${getVitalColor(latestVital, 'bp')}.main`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Iconify
                      icon="solar:heart-bold"
                      sx={{ fontSize: 40, color: getVitalIconColor(getVitalColor(latestVital, 'bp')) }}
                    />
                  </Box>
                  <Typography variant="h4" color={getVitalTextColor(getVitalColor(latestVital, 'bp'))} fontWeight={700}>
                    120/80
                  </Typography>
                  <Typography variant="caption" color={getVitalTextColor(getVitalColor(latestVital, 'bp'))} fontWeight={600}>
                    mmHg
                  </Typography>
                  <Typography variant="body2" color={getVitalTextColor(getVitalColor(latestVital, 'bp'))} sx={{ mt: 1, fontWeight: 600 }}>
                    BLOOD PRESSURE
                  </Typography>
                </Card>
              </Grid>

              {/* Heart Rate Card */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: getVitalCardBgColor(getVitalColor(latestVital, 'hr')),
                    border: 2,
                    borderColor: `${getVitalColor(latestVital, 'hr')}.main`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Iconify
                      icon="solar:pulse-bold"
                      sx={{ fontSize: 40, color: getVitalIconColor(getVitalColor(latestVital, 'hr')) }}
                    />
                  </Box>
                  <Typography variant="h4" color={getVitalTextColor(getVitalColor(latestVital, 'hr'))} fontWeight={700}>
                    72
                  </Typography>
                  <Typography variant="caption" color={getVitalTextColor(getVitalColor(latestVital, 'hr'))} fontWeight={600}>
                    bpm
                  </Typography>
                  <Typography variant="body2" color={getVitalTextColor(getVitalColor(latestVital, 'hr'))} sx={{ mt: 1, fontWeight: 600 }}>
                    HEART RATE
                  </Typography>
                </Card>
              </Grid>

              {/* Temperature Card */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: getVitalCardBgColor(getVitalColor(latestVital, 'temp')),
                    border: 2,
                    borderColor: `${getVitalColor(latestVital, 'temp')}.main`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Iconify
                      icon="solar:thermometer-bold"
                      sx={{ fontSize: 40, color: getVitalIconColor(getVitalColor(latestVital, 'temp')) }}
                    />
                  </Box>
                  <Typography variant="h4" color={getVitalTextColor(getVitalColor(latestVital, 'temp'))} fontWeight={700}>
                    98.6
                  </Typography>
                  <Typography variant="caption" color={getVitalTextColor(getVitalColor(latestVital, 'temp'))} fontWeight={600}>
                    °F
                  </Typography>
                  <Typography variant="body2" color={getVitalTextColor(getVitalColor(latestVital, 'temp'))} sx={{ mt: 1, fontWeight: 600 }}>
                    TEMPERATURE
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Latest Reading Details */}
          <Card sx={{ mb: 4, border: 2, borderColor: 'primary.main' }}>
            <Box sx={{ p: 3, bgcolor: getLatestReadingBgColor() }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Iconify
                  icon="solar:shield-check-bold"
                  sx={{
                    fontSize: 24,
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark
                  }}
                />
                <Typography variant="h6" color={getLatestReadingTextColor()} fontWeight={600}>
                  LATEST READING - 28/6/2024 at 14:20
                </Typography>
              </Stack>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Blood Pressure */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('warning'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('warning'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('warning')} fontWeight={600}>
                      120/80 mmHg
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('warning')}>
                      Blood Pressure
                    </Typography>
                  </Card>
                </Grid>

                {/* Heart Rate */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('success'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('success'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('success')} fontWeight={600}>
                      72 bpm
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('success')}>
                      Heart Rate
                    </Typography>
                  </Card>
                </Grid>

                {/* Temperature */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('info'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('info'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('info')} fontWeight={600}>
                      98.6°F
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('info')}>
                      Temperature
                    </Typography>
                  </Card>
                </Grid>

                {/* Oxygen Saturation */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('secondary'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('secondary'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('secondary')} fontWeight={600}>
                      98%
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('secondary')}>
                      Oxygen Sat
                    </Typography>
                  </Card>
                </Grid>

                {/* Respiratory Rate */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('secondary'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('secondary'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('secondary')} fontWeight={600}>
                      16/min
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('secondary')}>
                      Respiratory
                    </Typography>
                  </Card>
                </Grid>

                {/* BMI */}
                <Grid item xs={6} sm={4} md={2}>
                  <Card sx={{
                    p: 2,
                    bgcolor: getMetricCardBgColor('secondary'),
                    textAlign: 'center',
                    border: 1,
                    borderColor: getMetricBorderColor('secondary'),
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}>
                    <Typography variant="body2" color={getMetricTextColor('secondary')} fontWeight={600}>
                      22.8
                    </Typography>
                    <Typography variant="caption" color={getMetricTextColor('secondary')}>
                      BMI
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Pain Scale */}
              <Card
                sx={{
                  p: 3,
                  bgcolor: getMetricCardBgColor('success'),
                  border: 1,
                  borderColor: getMetricBorderColor('success')
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Iconify
                    icon="solar:emoji-happy-bold"
                    sx={{
                      fontSize: 24,
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.success.light
                        : theme.palette.success.dark
                    }}
                  />
                  <Typography variant="body1" color={getMetricTextColor('success')} fontWeight={600}>
                    Pain Scale: 2/10
                  </Typography>
                </Stack>
              </Card>
            </Box>
          </Card>

          {/* Recent Records Section */}
          <Card sx={{ mb: 4 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }} fontWeight={600}>
                Recent Records
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:clock-circle-bold" />}
                onClick={handleViewHistory}
                sx={{
                  p: 2,
                  justifyContent: 'flex-start',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                    View Complete History
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Access all your previous vital records and trends
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Card>
        </>
      ) : (
        /* No Data State */
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Iconify icon="solar:heart-bold" sx={{ fontSize: 80, color: 'grey.400', mb: 3 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }} fontWeight={600}>
            No vital signs recorded
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start tracking your health by recording your first vital signs
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddVital}
            disabled={isAddingVital}
          >
            {isAddingVital ? 'Adding...' : 'Record Vitals'}
          </Button>
        </Card>
      )}

      {/* Floating Action Button */}
      <Tooltip title="Add Vital Signs" placement="left">
        <Fab
          color="primary"
          onClick={handleAddVital}
          disabled={isAddingVital}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <Iconify icon={isAddingVital ? "solar:loading-bold" : "eva:plus-fill"} />
        </Fab>
      </Tooltip>

      {/* Add Record Label */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 90 },
          right: { xs: 16, sm: 24 },
          zIndex: 999,
          opacity: isAddingVital ? 0.5 : 1,
          transition: 'opacity 0.3s'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
            boxShadow: 2
          }}
        >
          Add Record
        </Typography>
      </Box>
    </Container>
  );
}
