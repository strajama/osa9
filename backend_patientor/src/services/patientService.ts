import patientData from '../data/patientData';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient
  };
  patientData.push(patient);
  return patient;
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patientData.find(d => d.id === id);
  if (entry) {
  entry.entries =[];
  }
  return entry;
};

export default {
  getPatients,
  addPatient, findById
};