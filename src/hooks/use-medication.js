// src/hooks/use-medication.js

import { useState, useEffect, useCallback } from 'react';

import {
  mockNotes,
  mockVitals,
  mockPatient,
  mockAllergies,
  mockDocuments,
  mockMedications
} from 'src/_mock/medications';

export function useMedication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Medications state
  const [medications, setMedications] = useState(mockMedications);
  const [medicationFilter, setMedicationFilter] = useState('all');

  // Allergies state
  const [allergies, setAllergies] = useState(mockAllergies);
  const [allergyFilter, setAllergyFilter] = useState('all');

  // Vitals state
  const [vitals, setVitals] = useState(mockVitals);
  const [vitalsDateRange, setVitalsDateRange] = useState('30'); // days

  // Documents state
  const [documents, setDocuments] = useState(mockDocuments);
  const [documentFilter, setDocumentFilter] = useState('all');

  // Notes state
  const [notes, setNotes] = useState(mockNotes);
  const [notesFilter, setNotesFilter] = useState('all');

  // Patient state
  const [patient] = useState(mockPatient);

  // Medication methods
  const getMedications = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredMedications = [...mockMedications];

      if (filters.status && filters.status !== 'all') {
        filteredMedications = filteredMedications.filter(med => med.status === filters.status);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredMedications = filteredMedications.filter(med =>
          med.medication_name.toLowerCase().includes(searchTerm) ||
          med.generic_name.toLowerCase().includes(searchTerm) ||
          med.indication.toLowerCase().includes(searchTerm)
        );
      }

      setMedications(filteredMedications);
    } catch (err) {
      setError('Failed to fetch medications');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMedication = useCallback(async (medicationData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const newMedication = {
        id: medications.length + 1,
        patient: patient.id,
        created_at: new Date().toISOString(),
        status: 'active',
        refills_remaining: 0,
        last_refill_date: null,
        notes: '',
        ...medicationData
      };

      setMedications(prev => [newMedication, ...prev]);
      return newMedication;
    } catch (err) {
      setError('Failed to add medication');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [medications.length, patient.id]);

  // Allergy methods
  const getAllergies = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      let filteredAllergies = [...mockAllergies];

      if (filters.type && filters.type !== 'all') {
        filteredAllergies = filteredAllergies.filter(allergy => allergy.allergy_type === filters.type);
      }

      if (filters.severity && filters.severity !== 'all') {
        filteredAllergies = filteredAllergies.filter(allergy => allergy.severity === filters.severity);
      }

      setAllergies(filteredAllergies);
    } catch (err) {
      setError('Failed to fetch allergies');
    } finally {
      setLoading(false);
    }
  }, []);

  const addAllergy = useCallback(async (allergyData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const newAllergy = {
        id: allergies.length + 1,
        patient: patient.id,
        created_at: new Date().toISOString(),
        is_active: true,
        ...allergyData
      };

      setAllergies(prev => [newAllergy, ...prev]);
      return newAllergy;
    } catch (err) {
      setError('Failed to add allergy');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [allergies.length, patient.id]);

  // Vitals methods
  const getVitals = useCallback(async (dateRange = '30') => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      // Filter vitals based on date range
      const daysAgo = parseInt(dateRange, 10);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

      const filteredVitals = mockVitals.filter(vital =>
        new Date(vital.recorded_date) >= cutoffDate
      );

      setVitals(filteredVitals);
      setVitalsDateRange(dateRange);
    } catch (err) {
      setError('Failed to fetch vitals');
    } finally {
      setLoading(false);
    }
  }, []);

  const addVital = useCallback(async (vitalData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 700));

      const newVital = {
        id: vitals.length + 1,
        patient: patient.id,
        recorded_date: new Date().toISOString(),
        recorded_by: {
          id: 7,
          username: "current_user",
          first_name: "Current",
          last_name: "User"
        },
        ...vitalData
      };

      // Calculate BMI if height and weight are provided
      if (newVital.height && newVital.weight) {
        const heightInMeters = newVital.height / 100;
        newVital.bmi = parseFloat((newVital.weight / (heightInMeters * heightInMeters)).toFixed(1));
      }

      setVitals(prev => [newVital, ...prev]);
      return newVital;
    } catch (err) {
      setError('Failed to add vital signs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [vitals.length, patient.id]);

  // Documents methods
  const getDocuments = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredDocuments = [...mockDocuments];

      if (filters.type && filters.type !== 'all') {
        filteredDocuments = filteredDocuments.filter(doc => doc.document_type === filters.type);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredDocuments = filteredDocuments.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm) ||
          doc.description.toLowerCase().includes(searchTerm)
        );
      }

      setDocuments(filteredDocuments);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (documentData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newDocument = {
        id: documents.length + 1,
        patient: patient.id,
        uploaded_at: new Date().toISOString(),
        uploaded_by: {
          id: 1,
          username: "current_user",
          first_name: "Current",
          last_name: "User"
        },
        file_size: Math.floor(Math.random() * 1000000) + 100000,
        mime_type: "application/pdf",
        is_sensitive: false,
        tags: [],
        ...documentData
      };

      setDocuments(prev => [newDocument, ...prev]);
      return newDocument;
    } catch (err) {
      setError('Failed to upload document');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documents.length, patient.id]);

  // Notes methods
  const getNotes = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      let filteredNotes = [...mockNotes];

      if (filters.type && filters.type !== 'all') {
        filteredNotes = filteredNotes.filter(note => note.note_type === filters.type);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredNotes = filteredNotes.filter(note =>
          note.title.toLowerCase().includes(searchTerm) ||
          note.content.toLowerCase().includes(searchTerm)
        );
      }

      setNotes(filteredNotes);
    } catch (err) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(async (noteData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const newNote = {
        id: notes.length + 1,
        patient: patient.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: {
          id: 1,
          username: "current_user",
          first_name: "Current",
          last_name: "User"
        },
        is_confidential: false,
        tags: [],
        ...noteData
      };

      setNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError('Failed to add note');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notes.length, patient.id]);

  // Filter methods
  const filterMedications = useCallback((status) => {
    setMedicationFilter(status);
    getMedications({ status });
  }, [getMedications]);

  const filterAllergies = useCallback((type) => {
    setAllergyFilter(type);
    getAllergies({ type });
  }, [getAllergies]);

  const filterDocuments = useCallback((type) => {
    setDocumentFilter(type);
    getDocuments({ type });
  }, [getDocuments]);

  const filterNotes = useCallback((type) => {
    setNotesFilter(type);
    getNotes({ type });
  }, [getNotes]);

  // Initialize data on mount
  useEffect(() => {
    getMedications();
    getAllergies();
    getVitals();
    getDocuments();
    getNotes();
  }, [getAllergies, getDocuments, getMedications, getNotes, getVitals]);

  return {
    // Loading and error states
    loading,
    error,

    // Patient data
    patient,

    // Medications
    medications,
    medicationFilter,
    getMedications,
    addMedication,
    filterMedications,

    // Allergies
    allergies,
    allergyFilter,
    getAllergies,
    addAllergy,
    filterAllergies,

    // Vitals
    vitals,
    vitalsDateRange,
    getVitals,
    addVital,

    // Documents
    documents,
    documentFilter,
    getDocuments,
    uploadDocument,
    filterDocuments,

    // Notes
    notes,
    notesFilter,
    getNotes,
    addNote,
    filterNotes,

    // Utility methods
    setError,
    clearError: () => setError(null)
  };
}
