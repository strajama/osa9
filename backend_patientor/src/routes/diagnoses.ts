import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnosis } from '../types';
import { Response } from 'express';
import { errorMiddleware } from '../utils';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('Fetching all diagnoses!');
  res.send(diagnoseService.getDiagnoses());
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

diagnoseRouter.use(errorMiddleware);

export default diagnoseRouter;