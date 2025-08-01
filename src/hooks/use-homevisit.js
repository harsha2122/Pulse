// src/hooks/use-homevisit.js
import { useMemo, useState, useEffect, useCallback } from 'react';

// import { homevisitAPI } from 'src/api/homevisit';
import { MOCK_HEALTHCARE_DATA } from 'src/_mock/homevisit';

// Main homevisit hook
export const useHomevisit = () => {
  const [healthcareData, setHealthcareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealthcareData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay for demo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In production, replace with actual API call
      // const response = await homevisitAPI.getHealthcareServices();
      // setHealthcareData(response.data);

      // For now, using mock data
      setHealthcareData(MOCK_HEALTHCARE_DATA);
    } catch (err) {
      console.error('Error fetching healthcare data:', err);
      setError(err.message || 'Failed to fetch healthcare data');
      // Fallback to mock data on error
      setHealthcareData(MOCK_HEALTHCARE_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthcareData();
  }, [fetchHealthcareData]);

  const updateCategorySelection = useCallback((categoryId) => {
    setHealthcareData(prevData => ({
      ...prevData,
      serviceCategories: prevData.serviceCategories.map(cat => ({
        ...cat,
        isActive: cat.id === categoryId
      }))
    }));
  }, []);

  const updateDurationSelection = useCallback((durationId) => {
    setHealthcareData(prevData => ({
      ...prevData,
      durationOptions: prevData.durationOptions.map(option => ({
        ...option,
        isActive: option.id === durationId
      }))
    }));
  }, []);

  const activeCategory = useMemo(() =>
    healthcareData?.serviceCategories?.find(cat => cat.isActive),
    [healthcareData]
  );

  const activeDuration = useMemo(() =>
    healthcareData?.durationOptions?.find(option => option.isActive),
    [healthcareData]
  );

  return {
    healthcareData,
    loading,
    error,
    activeCategory,
    activeDuration,
    updateCategorySelection,
    updateDurationSelection,
    refetch: fetchHealthcareData,
  };
};

// Patient management hook
export const usePatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPatient = useCallback(async (patientData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // const response = await homevisitAPI.createPatient(patientData);

      const newPatient = {
        id: Date.now().toString(),
        ...patientData,
        createdAt: new Date().toISOString(),
      };

      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err) {
      console.error('Error creating patient:', err);
      setError(err.message || 'Failed to create patient');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePatient = useCallback(async (patientId, patientData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // const response = await homevisitAPI.updatePatient(patientId, patientData);

      setPatients(prev => prev.map(patient =>
        patient.id === patientId
          ? { ...patient, ...patientData, updatedAt: new Date().toISOString() }
          : patient
      ));
    } catch (err) {
      console.error('Error updating patient:', err);
      setError(err.message || 'Failed to update patient');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    patients,
    loading,
    error,
    createPatient,
    updatePatient,
  };
};

// Appointment management hook
export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAppointment = useCallback(async (appointmentData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // const response = await homevisitAPI.createAppointment(appointmentData);

      const newAppointment = {
        id: `APT${Date.now()}`,
        ...appointmentData,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };

      setAppointments(prev => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err.message || 'Failed to create appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelAppointment = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // await homevisitAPI.cancelAppointment(appointmentId);

      setAppointments(prev => prev.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'cancelled', updatedAt: new Date().toISOString() }
          : appointment
      ));
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError(err.message || 'Failed to cancel appointment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    createAppointment,
    cancelAppointment,
  };
};

// Booking management hook
export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = useCallback(async (bookingData) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // const response = await homevisitAPI.createBooking(bookingData);

      const newBooking = {
        id: `BK${Date.now()}`,
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In production, replace with actual API call
      // await homevisitAPI.cancelBooking(bookingId);

      setBookings(prev => prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled', updatedAt: new Date().toISOString() }
          : booking
      ));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.message || 'Failed to cancel booking');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
  };
};

// Time slots hook
export const useTimeSlots = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = useCallback(async (date, serviceType) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // In production, replace with actual API call
      // const response = await homevisitAPI.getAvailableTimeSlots(date, serviceType);
      // setAvailableSlots(response.data);

      // Mock available slots
      const mockSlots = [
        { id: 1, label: '09:00 AM - 12:00 PM', value: '09:00-12:00', available: true },
        { id: 2, label: '12:00 PM - 06:00 PM', value: '12:00-18:00', available: true },
        { id: 3, label: '06:00 PM - 09:00 PM', value: '18:00-21:00', available: false },
      ];

      setAvailableSlots(mockSlots);
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setError(err.message || 'Failed to fetch available time slots');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    availableSlots,
    loading,
    error,
    fetchAvailableSlots,
  };
};

// Combined hook for form management
export const useHomevisitForms = () => {
  const { createPatient } = usePatient();
  const { createAppointment } = useAppointments();
  const { createBooking } = useBookings();

  const [patientInfo, setPatientInfo] = useState(null);
  const [formStep, setFormStep] = useState('patient'); // patient, appointment, booking

const handlePatientSubmit = useCallback(async (patientData) => {
  const patient = await createPatient(patientData);
  setPatientInfo(patient);
  setFormStep('appointment');
  return patient;
}, [createPatient]);

const handleAppointmentSubmit = useCallback(async (appointmentData) => {
  const appointment = await createAppointment({
    ...appointmentData,
    patientId: patientInfo?.id,
    serviceType: 'Home Visit',
  });
  return appointment;
}, [createAppointment, patientInfo]);


const handleBookingSubmit = useCallback(async (bookingData) => {
  const booking = await createBooking(bookingData);
  return booking;
}, [createBooking]);

  const resetForms = useCallback(() => {
    setPatientInfo(null);
    setFormStep('patient');
  }, []);

  return {
    patientInfo,
    formStep,
    setFormStep,
    handlePatientSubmit,
    handleAppointmentSubmit,
    handleBookingSubmit,
    resetForms,
  };
};
