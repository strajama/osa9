import patientData from '../data/patientData';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (newPatient: NewPatientEntry): PatientEntry => {
  const patient = {
    id: uuid(),
    ...newPatient
  };
  patientData.push(patient);
  return patient;
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient, findById
};