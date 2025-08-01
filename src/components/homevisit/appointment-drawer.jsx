import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import { TIME_SLOTS, AppointmentSchema, DEFAULT_APPOINTMENT_VALUES } from 'src/_mock/homevisit';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';

export function AppointmentDrawer({ open, onClose, patientInfo, onSubmit: onAppointmentSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const defaultValues = useMemo(() => DEFAULT_APPOINTMENT_VALUES, []);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(AppointmentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const submitData = {
        ...patientInfo,
        ...data,
        serviceType: 'Home Visit',
        bookingDate: new Date().toISOString().split('T')[0],
      };

      await onAppointmentSubmit(submitData);
      reset();
      setSelectedTimeSlot('');
      onClose();
      toast.success('Home visit appointment scheduled successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot.value);
    setValue('timeSlot', timeSlot.value);
  };

  const handleClose = () => {
    reset();
    setSelectedTimeSlot('');
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
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
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
                <Iconify icon="solar:calendar-add-bold" width={20} sx={{ color: '#4CAF50' }} />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Schedule Appointment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select your preferred date and time
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Stack>

          {patientInfo && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: '#E8F5E8',
                border: '1px solid #4CAF5020',
              }}
            >
              <Typography variant="subtitle2" fontWeight={600} color="#4CAF50" sx={{ mb: 0.5 }}>
                Patient: {patientInfo.patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact: {patientInfo.contactNumber}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            <Box sx={{ p: 2 }}>
              <Form methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Field.DatePicker
                    name="selectedDate"
                    label="Select Preferred Date"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:calendar-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Select Preferred Time *
                    </Typography>
                    <Grid container spacing={1}>
                      {TIME_SLOTS.map((timeSlot) => (
                        <Grid item xs={12} key={timeSlot.id}>
                          <Card
                            onClick={() => handleTimeSlotSelect(timeSlot)}
                            sx={{
                              p: 1.5,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              bgcolor: selectedTimeSlot === timeSlot.value ? '#E8F5E8' : 'background.paper',
                              border: selectedTimeSlot === timeSlot.value ? '2px solid #4CAF50' : '1px solid',
                              borderColor: selectedTimeSlot === timeSlot.value ? '#4CAF50' : 'divider',
                              borderRadius: 1,
                              '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: theme.shadows[2],
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight={selectedTimeSlot === timeSlot.value ? 600 : 400}
                              color={selectedTimeSlot === timeSlot.value ? '#4CAF50' : 'text.primary'}
                              textAlign="center"
                            >
                              {timeSlot.label}
                            </Typography>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>

                  <Field.Text
                    name="specialInstructions"
                    label="Special Instructions (Optional)"
                    placeholder="Any special instructions for the doctor..."
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
              startIcon={<Iconify icon="solar:check-circle-bold" />}
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
              Confirm Appointment
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
