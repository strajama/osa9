import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { Response, NextFunction, Request } from 'express';
import { NewPatientEntrySchema, errorMiddleware } from '../utils';
import { z } from 'zod';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  console.log('Fetching all patients!');
  res.send(patientService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next:NextFunction) => {
  try {
    const newPatient = NewPatientEntrySchema.parse(req.body);
    req.body = newPatient;
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
    next(error);
    }
  }
};

patientRouter.post('/', newPatientParser, (req:Request<unknown, unknown, NewPatientEntry>, 
  res:Response<PatientEntry>) => {
    const newPatientEntry = NewPatientEntrySchema.parse(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.use(errorMiddleware);

export default patientRouter;