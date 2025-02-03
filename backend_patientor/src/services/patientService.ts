import patientData from '../../data/patientData';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    entries: [],
    ...newPatient
  };
  patientData.push(patient);
  return patient;
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient, findById
};