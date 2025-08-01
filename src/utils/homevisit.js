
// import { z as zod } from 'zod';

// // Validation Schemas
// export const PatientInfoSchema = zod.object({
//   patientName: zod.string().min(1, { message: 'Patient name is required!' }),
//   age: zod.string().min(1, { message: 'Age is required!' }),
//   gender: zod.string().min(1, { message: 'Gender is required!' }),
//   contactNumber: zod.string().min(10, { message: 'Valid contact number is required!' }),
//   address: zod.string().min(1, { message: 'Address is required!' }),
//   medicalHistory: zod.string().optional(),
// });

// export const BookingSchema = zod.object({
//   patientName: zod.string().min(1, { message: 'Patient name is required!' }),
//   contactNumber: zod.string().min(10, { message: 'Valid contact number is required!' }),
//   selectedDate: zod.string().min(1, { message: 'Date is required!' }),
//   timeSlot: zod.string().min(1, { message: 'Time slot is required!' }),
//   specialInstructions: zod.string().optional(),
// });

// export const AppointmentSchema = zod.object({
//   selectedDate: zod.string().min(1, { message: 'Date is required!' }),
//   timeSlot: zod.string().min(1, { message: 'Time slot is required!' }),
//   specialInstructions: zod.string().optional(),
// });

// // Constants
// export const TIME_SLOTS = [
//   { id: 1, label: '09:00 AM - 12:00 PM', value: '09:00-12:00' },
//   { id: 2, label: '12:00 PM - 06:00 PM', value: '12:00-18:00' },
//   { id: 3, label: '06:00 PM - 09:00 PM', value: '18:00-21:00' },
// ];

// export const GENDER_OPTIONS = [
//   { value: 'male', label: 'Male' },
//   { value: 'female', label: 'Female' },
//   { value: 'other', label: 'Other' },
// ];

// export const SERVICE_CATEGORIES = {
//   NURSING_CARE: 'Nursing Care',
//   HOME_VISIT: 'Home Visit',
// };

// export const BOOKING_STATUS = {
//   PENDING: 'pending',
//   CONFIRMED: 'confirmed',
//   CANCELLED: 'cancelled',
//   COMPLETED: 'completed',
// };

// export const APPOINTMENT_STATUS = {
//   SCHEDULED: 'scheduled',
//   CONFIRMED: 'confirmed',
//   CANCELLED: 'cancelled',
//   COMPLETED: 'completed',
// };

// // Default Values
// export const DEFAULT_PATIENT_VALUES = {
//   patientName: '',
//   age: '',
//   gender: '',
//   contactNumber: '',
//   address: '',
//   medicalHistory: '',
// };

// export const DEFAULT_BOOKING_VALUES = {
//   patientName: '',
//   contactNumber: '',
//   selectedDate: '',
//   timeSlot: '',
//   specialInstructions: '',
// };

// export const DEFAULT_APPOINTMENT_VALUES = {
//   selectedDate: '',
//   timeSlot: '',
//   specialInstructions: '',
// };

// // Mock Data (for development/fallback)
// export const MOCK_HEALTHCARE_DATA = {
//   id: '1',
//   centerName: 'Advanced Home Healthcare',
//   description: 'Professional healthcare services delivered to your home with trained medical staff.',
//   serviceCategories: [
//     {
//       id: 1,
//       name: 'Nursing Care',
//       description: 'Professional nursing services at home',
//       icon: 'solar:health-bold',
//       color: '#2196F3',
//       bgColor: '#E3F2FD',
//       isActive: true
//     },
//     {
//       id: 2,
//       name: 'Home Visit',
//       description: 'Doctor visits to your home',
//       icon: 'solar:home-bold',
//       color: '#4CAF50',
//       bgColor: '#E8F5E8',
//       isActive: false
//     },
//   ],
//   durationOptions: [
//     {
//       id: 1,
//       name: 'Full Day (12hrs)',
//       description: 'Complete 12-hour service',
//       isActive: true
//     },
//     {
//       id: 2,
//       name: 'Half Day (6hrs)',
//       description: 'Half-day 6-hour service',
//       isActive: false
//     },
//   ],
//   healthcarePackages: [
//     {
//       id: 1,
//       name: 'Full Day Nursing Care',
//       description: 'Complete nursing care for 12 hours with trained medical staff',
//       duration: '12hrs',
//       price: '₹2500',
//       services: [
//         'Medication Administration',
//         'Vital Signs Monitoring',
//         'Wound Care & Dressing',
//         'IV Therapy Management'
//       ],
//       additionalServices: '+4 more services',
//       color: '#2196F3',
//       bgColor: '#E3F2FD',
//     },
//     {
//       id: 2,
//       name: 'Post-Surgery Care',
//       description: 'Specialized post-operative care for recovering patients',
//       duration: '12hrs',
//       price: '₹3000',
//       services: [
//         'Post-operative Monitoring',
//         'Pain Management',
//         'Medication Administration',
//         'Recovery Assistance'
//       ],
//       additionalServices: '+3 more services',
//       color: '#FF9800',
//       bgColor: '#FFF3E0',
//     },
//     {
//       id: 3,
//       name: 'Elderly Care',
//       description: 'Comprehensive care for elderly patients at home',
//       duration: '24hrs',
//       price: '₹4500',
//       services: [
//         'Daily Living Assistance',
//         'Medication Management',
//         'Health Monitoring',
//         'Companionship'
//       ],
//       additionalServices: '+5 more services',
//       color: '#9C27B0',
//       bgColor: '#F3E5F5',
//     },
//   ],
//   isActive: true,
//   lastUpdated: '2024-06-01',
// };

// // Utility Functions
// export const formatDate = (date) => {
//   if (!date) return '';
//   return new Date(date).toLocaleDateString('en-IN');
// };

// export const formatTimeSlot = (timeSlot) => {
//   if (!timeSlot) return '';

//   const matchedSlot = TIME_SLOTS.find(item => item.value === timeSlot);

//   return matchedSlot ? matchedSlot.label : timeSlot;
// };


// export const validateContactNumber = (number) => {
//   const phoneRegex = /^[6-9]\d{9}$/;
//   return phoneRegex.test(number);
// };

// export const generateBookingId = () =>
//   `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

// export const generateAppointmentId = () =>
//   `APT${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

// export const calculateServiceDuration = (timeSlot) => {
//   if (!timeSlot) return 0;
//   const [start, end] = timeSlot.split('-');
//  const startTime = parseInt(start.split(':')[0], 10);
// const endTime = parseInt(end.split(':')[0], 10);
//   return endTime - startTime;
// };

// export const isTimeSlotAvailable = (timeSlot, bookedSlots = []) =>
//   !bookedSlots.includes(timeSlot);

// export const sortPackagesByPrice = (packages) =>
//   [...packages].sort((a, b) => {
//     const priceA = parseInt(a.price.replace(/[^\d]/g, ''), 10);
//     const priceB = parseInt(b.price.replace(/[^\d]/g, ''), 10);
//     return priceA - priceB;
//   });

// export const filterPackagesByCategory = (packages, category) => {
//   if (!category || category === 'All') return packages;
//   return packages.filter(pkg =>
//     pkg.category === category ||
//     pkg.name.toLowerCase().includes(category.toLowerCase())
//   );
// };

// export const getServiceIcon = (serviceName) => {
//   const iconMap = {
//     'Nursing Care': 'solar:health-bold',
//     'Home Visit': 'solar:home-bold',
//     'Elderly Care': 'solar:heart-bold',
//     'Post-Surgery Care': 'solar:medical-kit-bold',
//   };
//   return iconMap[serviceName] || 'solar:stethoscope-bold';
// };

// export const getServiceColor = (serviceName) => {
//   const colorMap = {
//     'Nursing Care': '#2196F3',
//     'Home Visit': '#4CAF50',
//     'Elderly Care': '#9C27B0',
//     'Post-Surgery Care': '#FF9800',
//   };
//   return colorMap[serviceName] || '#2196F3';
// };

// export const getServiceBgColor = (serviceName) => {
//   const bgColorMap = {
//     'Nursing Care': '#E3F2FD',
//     'Home Visit': '#E8F5E8',
//     'Elderly Care': '#F3E5F5',
//     'Post-Surgery Care': '#FFF3E0',
//   };
//   return bgColorMap[serviceName] || '#E3F2FD';
// };
