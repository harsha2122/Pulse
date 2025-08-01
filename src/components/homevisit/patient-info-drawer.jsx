// src/components/homevisit/patient-info-drawer.jsx
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import { GENDER_OPTIONS, PatientInfoSchema, DEFAULT_PATIENT_VALUES } from 'src/_mock/homevisit';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';

export function PatientInfoDrawer({ open, onClose, onNext }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const defaultValues = useMemo(() => DEFAULT_PATIENT_VALUES, []);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PatientInfoSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onNext(data);
      toast.success('Patient information saved successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 480,
          maxWidth: '100%',
          borderRadius: 0,
        }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: '#E8F5E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:user-bold" width={20} sx={{ color: '#4CAF50' }} />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Add Patient Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter patient details for consultation
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            <Box sx={{ p: 2 }}>
              <Form methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Field.Text
                    name="patientName"
                    label="Patient Name"
                    placeholder="Enter patient full name"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:user-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field.Text
                        name="age"
                        label="Age"
                        placeholder="Age"
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: 'text.secondary' }}>
                              <Iconify icon="solar:calendar-bold" width={20} />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field.Select
                        name="gender"
                        label="Gender"
                        options={GENDER_OPTIONS}
                      />
                    </Grid>
                  </Grid>

                  <Field.Text
                    name="contactNumber"
                    label="Contact Number"
                    placeholder="Enter contact number"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:phone-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Field.Text
                    name="address"
                    label="Address"
                    placeholder="Enter complete address"
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>
                          <Iconify icon="solar:map-point-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Field.Text
                    name="medicalHistory"
                    label="Medical History (Optional)"
                    placeholder="Any relevant medical history..."
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>
                          <Iconify icon="solar:document-text-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />
                </Stack>
              </Form>
            </Box>
          </Scrollbar>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.neutral' }}>
          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:arrow-right-bold" />}
              onClick={onSubmit}
              loading={isSubmitting}
              disabled={!isValid}
              sx={{
                bgcolor: '#4CAF50',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: '#4CAF50',
                  opacity: 0.9,
                },
              }}
            >
              Next: Schedule Appointment
            </LoadingButton>

            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={handleClose}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}
