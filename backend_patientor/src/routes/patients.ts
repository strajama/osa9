import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { Response, NextFunction, Request } from 'express';
import { NewPatientSchema, errorMiddleware } from '../utils';
import { z } from 'zod';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('Fetching all patients!');
  res.send(patientService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next:NextFunction) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    req.body = newPatient;
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
    next(error);
    }
  }
};

patientRouter.post('/', newPatientParser, (req:Request<unknown, unknown, NewPatient>, 
  res:Response<Patient>) => {
    const newPatient = NewPatientSchema.parse(req.body);
    newPatient.entries = [];
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
});

patientRouter.get('/:id', (req, res) => {
  console.log('Fetching patient with id: ', req.params.id);
  const patient = patientService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.use(errorMiddleware);

export default patientRouter;