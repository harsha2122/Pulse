import { useMemo, useState } from 'react';

import {
  Box,
  Fab,
  Card,
  Chip,
  Stack,
  Alert,
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

import { Iconify } from 'src/components/iconify';

// Mock data from your utils
const mockPatient = {
  first_name: "John",
  last_name: "Doe",
  patient_id: "PAT2024001"
};

const mockAllergies = [
  {
    id: 1,
    allergen: "Penicillin",
    allergy_type: "drug",
    severity: "severe",
    symptoms: "Skin rash, difficulty breathing, swelling",
    onset_date: "2020-03-15",
    diagnosed_by: "Dr. Sarah Wilson",
    treatment: "Immediate discontinuation, antihistamines",
    notes: "Patient carries epinephrine auto-injector"
  },
  {
    id: 2,
    allergen: "Peanuts",
    allergy_type: "food",
    severity: "moderate",
    symptoms: "Hives, nausea, stomach cramps",
    onset_date: "2018-06-10",
    diagnosed_by: "Dr. Michael Brown",
    treatment: "Avoidance, antihistamines as needed",
    notes: "Patient careful about food labels"
  },
  {
    id: 3,
    allergen: "Shellfish",
    allergy_type: "food",
    severity: "mild",
    symptoms: "Mild digestive upset",
    onset_date: "2019-08-22",
    diagnosed_by: "Dr. James Smith",
    treatment: "Avoidance recommended",
    notes: "Patient can tolerate small amounts occasionally"
  }
];

export function AllergiesView() {
  const theme = useTheme();
  const [allergyTypeFilter, setAllergyTypeFilter] = useState('all');
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);

  const allergies = mockAllergies;
  const patient = mockPatient;
  const loading = false;

  // Filter allergies based on type
  const filteredAllergies = useMemo(() => {
    if (allergyTypeFilter === 'all') return allergies;
    return allergies.filter(allergy => allergy.allergy_type === allergyTypeFilter);
  }, [allergies, allergyTypeFilter]);

  // Get severe allergies count
  const severeAllergies = useMemo(() =>
    allergies.filter(allergy =>
      allergy.severity === 'severe' || allergy.severity === 'life_threatening'
    ), [allergies]
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'severe':
      case 'life_threatening':
        return 'error';
      case 'moderate':
        return 'warning';
      case 'mild':
        return 'info';
      default:
        return 'default';
    }
  };

  const getAllergyIcon = (type) => {
    switch (type) {
      case 'drug':
        return 'solar:pill-bold';
      case 'food':
        return 'solar:hamburger-bold';
      case 'environmental':
        return 'solar:leaf-bold';
      case 'contact':
        return 'solar:hand-bold';
      default:
        return 'solar:danger-triangle-bold';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'severe':
        return 'SEVERE';
      case 'life_threatening':
        return 'CRITICAL';
      case 'moderate':
        return 'MODERATE';
      case 'mild':
        return 'MILD';
      default:
        return severity.toUpperCase();
    }
  };

const formatAllergyType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

 const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  const handleFilterChange = (event) => {
    const type = event.target.value;
    setAllergyTypeFilter(type);
  };

  const handleAddAllergy = () => {
    setIsAddingAllergy(true);
    setTimeout(() => setIsAddingAllergy(false), 1000);
    console.log('Add allergy - Open dialog');
  };

  const handleCriticalInfo = () => {
    console.log('Show critical allergy information');
  };

  // Dark mode aware colors
  const getCardBgColor = (severity) => {
    const isDark = theme.palette.mode === 'dark';
    if (severity === 'severe' || severity === 'life_threatening') {
     return isDark ? `${theme.palette.error.dark}20` : theme.palette.error.lighter;
    }
    return isDark ? theme.palette.background.paper : 'white';
  };

  const getCardBorderColor = (severity) => {
    if (severity === 'severe' || severity === 'life_threatening') {
      return theme.palette.error.main;
    }
    return theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[200];
  };

  const getIconBgColor = (severity) => {
    const isDark = theme.palette.mode === 'dark';
    if (severity === 'severe' || severity === 'life_threatening') {
      return theme.palette.error.main;
    }
    const severityColor = getSeverityColor(severity);
    return isDark ? theme.palette[severityColor].dark : theme.palette[severityColor].lighter;
  };

  const getIconColor = (severity) => {
    const isDark = theme.palette.mode === 'dark';
    if (severity === 'severe' || severity === 'life_threatening') {
      return 'white';
    }
    const severityColor = getSeverityColor(severity);
    return isDark ? theme.palette[severityColor].light : theme.palette[severityColor].main;
  };

  const getTextColor = (severity, variant = 'primary') => {
    const isDark = theme.palette.mode === 'dark';
    if (severity === 'severe' || severity === 'life_threatening') {
      return variant === 'secondary' ? theme.palette.error.light : theme.palette.error.main;
    }
    return variant === 'secondary' ? theme.palette.text.secondary : theme.palette.text.primary;
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <Typography>Loading allergies...</Typography>
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
            <Iconify icon="solar:danger-triangle-bold" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Allergies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage allergies and adverse reactions
            </Typography>
          </Box>
        </Stack>

        {/* Patient Info */}
        <Card
          sx={{
            p: 2,
            bgcolor: theme.palette.mode === 'dark'
              ? `${theme.palette.error.dark}30`
              : theme.palette.error.lighter,
            border: 1,
            borderColor: 'error.main'
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40 }}>
              {patient?.first_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {patient?.first_name} {patient?.last_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Patient ID: {patient?.patient_id} • Total Allergies: {allergies.length} • Severe: {severeAllergies.length}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Box>

      {/* Critical Alert */}
      {severeAllergies.length > 0 && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          icon={<Iconify icon="solar:danger-triangle-bold" />}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            CRITICAL ALLERGIES ALERT
          </Typography>
          <Typography variant="body2">
            This patient has {severeAllergies.length} severe allerg{severeAllergies.length === 1 ? 'y' : 'ies'}.
            Review emergency protocols and ensure epinephrine is available.
          </Typography>
        </Alert>
      )}

      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 250 } }}>
              <Select
                value={allergyTypeFilter}
                onChange={handleFilterChange}
                displayEmpty
              >
                <MenuItem value="all">Allergy Type</MenuItem>
                <MenuItem value="drug">Drug</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="environmental">Environmental</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleCriticalInfo}
            >
              <IconButton color="error" size="small">
                <Iconify icon="solar:danger-triangle-bold" />
              </IconButton>
              <Typography variant="body2" color="error.main" fontWeight={600}>
                Critical Info
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Allergies List */}
      <Box>
        {filteredAllergies.length === 0 ? (
          <Card sx={{ p: 5, textAlign: 'center' }}>
            <Iconify icon="solar:shield-check-bold" sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No allergies recorded
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {allergyTypeFilter === 'all'
                ? 'Add known allergies to keep your medical records complete'
                : `No ${allergyTypeFilter} allergies found`}
            </Typography>
          </Card>
        ) : (
          <Stack spacing={2}>
            {filteredAllergies.map((allergy) => (
              <Card
                key={allergy.id}
                sx={{
                  p: { xs: 2, sm: 3 },
                  border: 2,
                  borderColor: getCardBorderColor(allergy.severity),
                  bgcolor: getCardBgColor(allergy.severity),
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: (t) => t.shadows[6],
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
                        bgcolor: getIconBgColor(allergy.severity),
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Iconify
                        icon={getAllergyIcon(allergy.allergy_type)}
                        sx={{
                          color: getIconColor(allergy.severity),
                          fontSize: { xs: 20, sm: 24 }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        color={getTextColor(allergy.severity)}
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        {allergy.allergen}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={getTextColor(allergy.severity, 'secondary')}
                      >
                        {formatAllergyType(allergy.allergy_type)}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      label={getSeverityLabel(allergy.severity)}
                      color={getSeverityColor(allergy.severity)}
                      variant="filled"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <IconButton size="small">
                      <Iconify icon="eva:more-horizontal-fill" />
                    </IconButton>
                  </Stack>
                </Stack>

                {/* Symptoms Card */}
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark'
                      ? `${theme.palette.warning.dark}30`
                      : theme.palette.warning.lighter,
                    border: 1,
                    borderColor: theme.palette.mode === 'dark'
                      ? theme.palette.warning.dark
                      : theme.palette.warning.light
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Iconify
                      icon="solar:danger-triangle-bold"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.warning.light
                          : theme.palette.warning.dark,
                        fontSize: 18,
                        mt: 0.2
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        color={theme.palette.mode === 'dark'
                          ? theme.palette.warning.light
                          : theme.palette.warning.dark}
                        fontWeight={600}
                      >
                        Symptoms
                      </Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.mode === 'dark'
                          ? theme.palette.warning.light
                          : theme.palette.warning.dark}
                      >
                        {allergy.symptoms}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Treatment Card */}
                <Card
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: theme.palette.mode === 'dark'
                      ? `${theme.palette.success.dark}30`
                      : theme.palette.success.lighter,
                    border: 1,
                    borderColor: theme.palette.mode === 'dark'
                      ? theme.palette.success.dark
                      : theme.palette.success.light
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Iconify
                      icon="solar:medical-kit-bold"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.success.light
                          : theme.palette.success.dark,
                        fontSize: 18,
                        mt: 0.2
                      }}
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        color={theme.palette.mode === 'dark'
                          ? theme.palette.success.light
                          : theme.palette.success.dark}
                        fontWeight={600}
                      >
                        Treatment
                      </Typography>
                      <Typography
                        variant="body2"
                        color={theme.palette.mode === 'dark'
                          ? theme.palette.success.light
                          : theme.palette.success.dark}
                      >
                        {allergy.treatment}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Critical Notes for Severe Allergies */}
                {(allergy.severity === 'severe' || allergy.severity === 'life_threatening') && allergy.notes && (
                  <Card
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark'
                        ? `${theme.palette.error.dark}40`
                        : theme.palette.error.lighter,
                      border: 2,
                      borderColor: 'error.main'
                    }}
                  >
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <Iconify
                        icon="solar:siren-bold"
                        sx={{
                          color: theme.palette.mode === 'dark'
                            ? theme.palette.error.light
                            : theme.palette.error.dark,
                          fontSize: 18,
                          mt: 0.2
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          color={theme.palette.mode === 'dark'
                            ? theme.palette.error.light
                            : theme.palette.error.dark}
                          sx={{ fontWeight: 700 }}
                        >
                          🚨 CRITICAL NOTES
                        </Typography>
                        <Typography
                          variant="body2"
                          color={theme.palette.mode === 'dark'
                            ? theme.palette.error.light
                            : theme.palette.error.dark}
                          fontWeight={600}
                        >
                          {allergy.notes}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                )}

                {/* Regular Notes for Non-Severe Allergies */}
                {allergy.severity !== 'severe' && allergy.severity !== 'life_threatening' && allergy.notes && (
                  <Card
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[100]
                    }}
                  >
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <Iconify icon="solar:note-bold" sx={{ color: 'text.secondary', fontSize: 16, mt: 0.2 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Notes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {allergy.notes}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                )}

                <Divider sx={{ mb: 2 }} />

                {/* Footer Info */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:calendar-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Onset {formatDate(allergy.onset_date)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:user-bold" sx={{ color: 'text.secondary', fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Diagnosed by {allergy.diagnosed_by}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Floating Action Button */}
      <Tooltip title="Add New Allergy" placement="left">
        <Fab
          color="primary"
          onClick={handleAddAllergy}
          disabled={isAddingAllergy}
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
