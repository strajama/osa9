import diagnoseData from '../data/diagnoseData';
import { DiagnoseEntry } from '../types';

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoseData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};