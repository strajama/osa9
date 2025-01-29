import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || !daily_exercises.every(e => !isNaN(Number(e)))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercises = [target, ...daily_exercises];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(exercises);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});