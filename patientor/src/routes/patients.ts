import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';
import { Response } from 'express';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  console.log('Fetching all patients!');
  res.send(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientRouter;