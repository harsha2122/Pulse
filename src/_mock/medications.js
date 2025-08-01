// ============================================

// Complete Mock Data & Utility Functions
// ============================================

// MEDICATION CONSTANTS
export const MEDICATION_FREQUENCIES = [
  'once_daily',
  'twice_daily',
  'three_times_daily',
  'four_times_daily',
  'every_other_day',
  'weekly',
  'as_needed',
  'other'
];

export const MEDICATION_ROUTES = [
  'oral',
  'injection',
  'topical',
  'inhaled',
  'nasal',
  'other'
];

export const MEDICATION_STATUSES = [
  'active',
  'discontinued',
  'completed',
  'on_hold'
];

export const ALLERGY_TYPES = [
  'drug',
  'food',
  'environmental',
  'contact',
  'other'
];

export const ALLERGY_SEVERITIES = [
  'mild',
  'moderate',
  'severe',
  'life_threatening'
];

export const DOCUMENT_TYPES = [
  'medical_report',
  'prescription',
  'imaging',
  'insurance_card',
  'identity_proof',
  'consent_form',
  'discharge_summary',
  'other'
];

export const NOTE_TYPES = [
  'clinical',
  'nursing',
  'administrative',
  'social_work',
  'therapy',
  'discharge',
  'consultation',
  'other'
];

// MOCK PATIENT DATA
export const mockPatient = {
  id: 1,
  patient_id: "PAT2024001",
  first_name: "John",
  last_name: "Doe",
  age: 35,
  gender: "male",
  blood_group: "O+",
  mobile_primary: "+91-9876543210",
  email: "john.doe@email.com"
};

// MOCK MEDICATIONS DATA
export const mockMedications = [
  {
    id: 1,
    patient: 1,
    medication_name: "Lisinopril",
    generic_name: "Lisinopril",
    dosage: "10mg",
    frequency: "once_daily",
    route: "oral",
    start_date: "2024-01-15",
    end_date: null,
    prescribed_by: "Dr. James Smith",
    indication: "Hypertension",
    instructions: "Take with or without food, preferably at the same time each day",
    side_effects: "Dizziness, dry cough, hyperkalemia",
    status: "active",
    pharmacy: "City Pharmacy",
    refills_remaining: 3,
    last_refill_date: "2024-06-01",
    notes: "Monitor blood pressure regularly",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    patient: 1,
    medication_name: "Metformin",
    generic_name: "Metformin Hydrochloride",
    dosage: "500mg",
    frequency: "twice_daily",
    route: "oral",
    start_date: "2024-02-01",
    end_date: null,
    prescribed_by: "Dr. Sarah Wilson",
    indication: "Type 2 Diabetes",
    instructions: "Take with meals to reduce stomach upset",
    side_effects: "Nausea, diarrhea, metallic taste",
    status: "active",
    pharmacy: "HealthMart Pharmacy",
    refills_remaining: 5,
    last_refill_date: "2024-05-15",
    notes: "Check HbA1c every 3 months",
    created_at: "2024-02-01T09:15:00Z"
  },
  {
    id: 3,
    patient: 1,
    medication_name: "Atorvastatin",
    generic_name: "Atorvastatin Calcium",
    dosage: "20mg",
    frequency: "once_daily",
    route: "oral",
    start_date: "2024-03-01",
    end_date: null,
    prescribed_by: "Dr. James Smith",
    indication: "High Cholesterol",
    instructions: "Take at bedtime",
    side_effects: "Muscle pain, liver problems",
    status: "active",
    pharmacy: "City Pharmacy",
    refills_remaining: 2,
    last_refill_date: "2024-05-20",
    notes: "Monitor liver function",
    created_at: "2024-03-01T14:20:00Z"
  }
];

// MOCK ALLERGIES DATA
export const mockAllergies = [
  {
    id: 1,
    patient: 1,
    allergen: "Penicillin",
    allergy_type: "drug",
    severity: "severe",
    symptoms: "Skin rash, difficulty breathing, swelling",
    onset_date: "2020-03-15",
    diagnosed_by: "Dr. Sarah Wilson",
    treatment: "Immediate discontinuation, antihistamines",
    notes: "Patient carries epinephrine auto-injector",
    is_active: true,
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    patient: 1,
    allergen: "Peanuts",
    allergy_type: "food",
    severity: "moderate",
    symptoms: "Hives, nausea, stomach cramps",
    onset_date: "2018-06-10",
    diagnosed_by: "Dr. Michael Brown",
    treatment: "Avoidance, antihistamines as needed",
    notes: "Patient careful about food labels",
    is_active: true,
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 3,
    patient: 1,
    allergen: "Shellfish",
    allergy_type: "food",
    severity: "mild",
    symptoms: "Mild digestive upset",
    onset_date: "2019-08-22",
    diagnosed_by: "Dr. James Smith",
    treatment: "Avoidance recommended",
    notes: "Patient can tolerate small amounts occasionally",
    is_active: true,
    created_at: "2024-01-15T10:30:00Z"
  }
];

// MOCK VITALS DATA
export const mockVitals = [
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
    height: 175.5,
    weight: 70.0,
    bmi: 22.8,
    pain_scale: 2,
    notes: "Patient feeling well, stable vitals",
    recorded_by: {
      id: 7,
      username: "nurse_mary",
      first_name: "Mary",
      last_name: "Johnson"
    }
  },
  {
    id: 2,
    patient: 1,
    recorded_date: "2024-06-15T09:30:00Z",
    blood_pressure_systolic: 118,
    blood_pressure_diastolic: 78,
    heart_rate: 68,
    respiratory_rate: 15,
    temperature: 98.4,
    oxygen_saturation: 99,
    height: 175.5,
    weight: 69.5,
    bmi: 22.6,
    pain_scale: 0,
    notes: "Routine checkup, all normal",
    recorded_by: {
      id: 7,
      username: "nurse_mary",
      first_name: "Mary",
      last_name: "Johnson"
    }
  },
  {
    id: 3,
    patient: 1,
    recorded_date: "2024-06-01T11:45:00Z",
    blood_pressure_systolic: 122,
    blood_pressure_diastolic: 82,
    heart_rate: 75,
    respiratory_rate: 17,
    temperature: 98.8,
    oxygen_saturation: 97,
    height: 175.5,
    weight: 70.2,
    bmi: 22.9,
    pain_scale: 1,
    notes: "Slightly elevated readings, patient reports stress",
    recorded_by: {
      id: 7,
      username: "nurse_mary",
      first_name: "Mary",
      last_name: "Johnson"
    }
  }
];

// MOCK DOCUMENTS DATA
export const mockDocuments = [
  {
    id: 1,
    patient: 1,
    title: "Blood Test Report",
    description: "Complete Blood Count and Lipid Profile",
    document_type: "medical_report",
    file: "https://api.hms.com/media/documents/patient_1_blood_test.pdf",
    file_size: 245760,
    mime_type: "application/pdf",
    document_date: "2024-06-25",
    is_sensitive: false,
    uploaded_by: {
      id: 5,
      username: "dr_smith",
      first_name: "Dr. James",
      last_name: "Smith"
    },
    uploaded_at: "2024-06-25T16:30:00Z",
    tags: ["blood_test", "routine_checkup"]
  },
  {
    id: 2,
    patient: 1,
    title: "X-Ray Chest",
    description: "Chest X-Ray for annual checkup",
    document_type: "imaging",
    file: "https://api.hms.com/media/documents/patient_1_xray.jpg",
    file_size: 1048576,
    mime_type: "image/jpeg",
    document_date: "2024-06-20",
    is_sensitive: false,
    uploaded_by: {
      id: 6,
      username: "radiologist_1",
      first_name: "Dr. Lisa",
      last_name: "Brown"
    },
    uploaded_at: "2024-06-20T11:15:00Z",
    tags: ["xray", "chest", "annual_checkup"]
  },
  {
    id: 3,
    patient: 1,
    title: "MRI Brain Scan",
    description: "MRI scan for headache investigation",
    document_type: "imaging",
    file: "https://api.hms.com/media/documents/patient_1_mri.pdf",
    file_size: 5242880,
    mime_type: "application/pdf",
    document_date: "2024-06-10",
    is_sensitive: true,
    uploaded_by: {
      id: 6,
      username: "radiologist_1",
      first_name: "Dr. Lisa",
      last_name: "Brown"
    },
    uploaded_at: "2024-06-10T14:20:00Z",
    tags: ["mri", "brain", "headache"]
  }
];

// MOCK NOTES DATA
export const mockNotes = [
  {
    id: 1,
    patient: 1,
    title: "Follow-up Visit",
    content: "Patient reports feeling much better since starting new medication. Blood pressure readings at home have been consistently in normal range. Advised to continue current treatment and return in 3 months.",
    note_type: "clinical",
    is_confidential: false,
    created_by: {
      id: 5,
      username: "dr_smith",
      first_name: "Dr. James",
      last_name: "Smith"
    },
    created_at: "2024-06-28T14:30:00Z",
    updated_at: "2024-06-28T14:30:00Z",
    tags: ["follow_up", "hypertension", "medication_review"]
  },
  {
    id: 2,
    patient: 1,
    title: "Nursing Assessment",
    content: "Patient alert and oriented x3. Ambulating without assistance. Vital signs stable. No complaints of pain or discomfort.",
    note_type: "nursing",
    is_confidential: false,
    created_by: {
      id: 7,
      username: "nurse_mary",
      first_name: "Mary",
      last_name: "Johnson"
    },
    created_at: "2024-06-28T11:15:00Z",
    updated_at: "2024-06-28T11:15:00Z",
    tags: ["assessment", "vitals", "ambulation"]
  },
  {
    id: 3,
    patient: 1,
    title: "Dietary Consultation",
    content: "Discussed diabetic diet plan with patient. Provided educational materials about carbohydrate counting. Patient demonstrates good understanding of meal planning.",
    note_type: "clinical",
    is_confidential: false,
    created_by: {
      id: 8,
      username: "nutritionist_jane",
      first_name: "Jane",
      last_name: "Wilson"
    },
    created_at: "2024-06-20T10:00:00Z",
    updated_at: "2024-06-20T10:00:00Z",
    tags: ["nutrition", "diabetes", "education"]
  }
];

// UTILITY FUNCTIONS
export const formatFrequency = (frequency) => {
  const frequencyMap = {
    once_daily: "Once Daily",
    twice_daily: "Twice Daily",
    three_times_daily: "Three Times Daily",
    four_times_daily: "Four Times Daily",
    every_other_day: "Every Other Day",
    weekly: "Weekly",
    as_needed: "As Needed",
    other: "Other"
  };
  return frequencyMap[frequency] || frequency;
};

export const formatRoute = (route) => {
  const routeMap = {
    oral: "Oral",
    injection: "Injection",
    topical: "Topical",
    inhaled: "Inhaled",
    nasal: "Nasal",
    other: "Other"
  };
  return routeMap[route] || route;
};

export const formatStatus = (status) => {
  const statusMap = {
    active: "Active",
    discontinued: "Discontinued",
    completed: "Completed",
    on_hold: "On Hold"
  };
  return statusMap[status] || status;
};

export const getSeverityColor = (severity) => {
  const colorMap = {
    mild: "warning",
    moderate: "info",
    severe: "error",
    life_threatening: "error"
  };
  return colorMap[severity] || "default";
};

export const getSeverityLabel = (severity) => {
  const labelMap = {
    mild: "MILD",
    moderate: "MODERATE",
    severe: "SEVERE",
    life_threatening: "CRITICAL"
  };
  return labelMap[severity] || severity.toUpperCase();
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / (k ** i)).toFixed(1))} ${sizes[i]}`;
};
