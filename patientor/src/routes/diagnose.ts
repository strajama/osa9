import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { DiagnoseEntry } from '../types';
import { Response } from 'express';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
  console.log('Fetching all diagnoses!');
  res.send(diagnoseService.getDiagnoses());
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default diagnoseRouter;