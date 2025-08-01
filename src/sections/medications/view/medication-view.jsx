// ============================================
// src/sections/medications/view/medications-view.jsx
// Standalone Medications Page (Dark Mode Compatible)
// ============================================

import { useState } from 'react';

import {
  Box,
  Fab,
  Card,
  Chip,
  Stack,
  Select,
  Avatar,
  Tooltip,
  Divider,
  MenuItem,
  useTheme,
  Container,
  Typography,
  IconButton,
  FormControl
} from '@mui/material';

import { useMedication } from 'src/hooks/use-medication';

import { formatDate, formatFrequency } from 'src/_mock/medications';

import { Iconify } from 'src/components/iconify';

export function MedicationsView() {
  const [statusFilter, setStatusFilter] = useState('all');
  const theme = useTheme();
  const {
    medications,
    loading,
    filterMedications,
    patient
  } = useMedication();

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    filterMedications(status);
  };

  const handleAddMedication = () => {
    console.log('Add medication - Open dialog/modal');
  };

  const handleRefillAlert = () => {
    console.log('Show refill alerts');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'discontinued': return 'error';
      case 'completed': return 'info';
      case 'on_hold': return 'warning';
      default: return 'default';
    }
  };

  const getStatusBadgeText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'discontinued': return 'Discontinued';
      case 'completed': return 'Completed';
      case 'on_hold': return 'On Hold';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <Typography>Loading medications...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Iconify icon="solar:pill-bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Medications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your medications and prescriptions
            </Typography>
          </Box>
        </Stack>

        {/* Patient Info */}
        <Card
          sx={{
            p: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.lighter',
            border: 1,
            borderColor: 'primary.main',
            color: theme.palette.mode === 'dark' ? 'primary.contrastText' : 'inherit'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {patient?.first_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  color: theme.palette.mode === 'dark' ? 'primary.contrastText' : 'inherit'
                }}
              >
                {patient?.first_name} {patient?.last_name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'primary.contrastText' : 'text.secondary',
                  opacity: theme.palette.mode === 'dark' ? 0.8 : 1
                }}
              >
                Patient ID: {patient?.patient_id} • Age: {patient?.age} • Blood Group: {patient?.blood_group}
              </Typography>
            </Box>
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
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
              <Select
                value={statusFilter}
                onChange={handleFilterChange}
                displayEmpty
                sx={{
                  '& .MuiSelect-select': {
                    color: 'text.primary'
                  }
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="discontinued">Discontinued</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
              </Select>
            </FormControl>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleRefillAlert}
            >
              <IconButton color="primary" size="small">
                <Iconify icon="solar:bell-bold" />
              </IconButton>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                Refill Alerts
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Medications List */}
      <Box>
        {medications.length === 0 ? (
          <Card sx={{ p: 5, textAlign: 'center' }}>
            <Iconify
              icon="solar:pill-bold"
              sx={{
                fontSize: 64,
                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                mb: 2
              }}
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No medications found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {statusFilter === 'all'
                ? 'Start by adding your first medication'
                : `No ${statusFilter} medications found`}
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {medications.map((medication, index) => (
              <Card
                key={medication.id}
                sx={{
                  p: { xs: 2, sm: 3 },
                  border: 1,
                  borderColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                  transition: 'all 0.2s',
                  bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: (t) => t.shadows[4],
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {/* Header Row */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                  spacing={2}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: theme.palette.mode === 'dark' ? 'success.dark' : 'success.lighter',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Iconify
                        icon="solar:pill-bold"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'success.light' : 'success.main',
                          fontSize: { xs: 20, sm: 24 }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {medication.medication_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {medication.generic_name}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      label={getStatusBadgeText(medication.status)}
                      color={getStatusColor(medication.status)}
                      variant="filled"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <IconButton size="small">
                      <Iconify icon="eva:more-horizontal-fill" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Dosage Info Card */}
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                    border: theme.palette.mode === 'dark' ? 1 : 0,
                    borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'transparent'
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 4 }}
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        Dosage
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="text.primary">
                        {medication.dosage}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        Frequency
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="text.primary">
                        {formatFrequency(medication.frequency)}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Indication */}
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'success.dark' : 'success.lighter',
                    border: 1,
                    borderColor: theme.palette.mode === 'dark' ? 'success.main' : 'success.light'
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Iconify
                      icon="solar:lock-bold"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'success.light' : 'success.dark',
                        fontSize: 16,
                        mt: 0.2
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'success.light' : 'success.dark',
                          fontWeight: 600
                        }}
                      >
                        Indication
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'success.contrastText' : 'success.dark'
                        }}
                      >
                        {medication.indication}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Instructions */}
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'info.dark' : 'info.lighter',
                    border: 1,
                    borderColor: theme.palette.mode === 'dark' ? 'info.main' : 'info.light'
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Iconify
                      icon="solar:clipboard-text-bold"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'info.light' : 'info.dark',
                        fontSize: 16,
                        mt: 0.2
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'info.light' : 'info.dark',
                          fontWeight: 600
                        }}
                      >
                        Instructions
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'info.contrastText' : 'info.dark'
                        }}
                      >
                        {medication.instructions}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Bottom Info Grid */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 4 }}
                  sx={{ mb: 2 }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Refills Remaining
                    </Typography>
                    <Typography
                      variant="h6"
                      color={medication.refills_remaining <= 1 ? 'error.main' : 'text.primary'}
                    >
                      {medication.refills_remaining}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Last Refill
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {formatDate(medication.last_refill_date)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Pharmacy
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {medication.pharmacy}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                {/* Footer */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:user-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Prescribed by {medication.prescribed_by}
                    </Typography>
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    Added {formatDate(medication.created_at)}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Floating Action Button */}
      <Tooltip title="Add New Medication" placement="left">
        <Fab
          color="primary"
          onClick={handleAddMedication}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000
          }}
        >
          <Iconify icon="eva:plus-fill" />
        </Fab>
      </Tooltip>

      {/* Add Record Label */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 90 },
          right: { xs: 16, sm: 24 },
          zIndex: 999
        }}
      >
        <Typography
          variant="caption"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
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
