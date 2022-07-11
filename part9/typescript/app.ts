import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercise, 
  { ExerciseResponse } from './exerciseCalculator';
const app = express();

type BMI = {
  weight: number,
  height: number,
  bmi: string
};
app.use(express.json());
app.get('/bmi', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);
  if(isNaN(h) || isNaN(w))
    return res.status(400).json({ error: 'The height or the weight is not a number' });
  if(h === 0)
    return res.status(400).json({ error: 'The height can\'t be 0' });
  const bmi : string = calculateBmi(h, w);
  const response : BMI = { weight: w, height: h, bmi };
  return res.status(200).json(response);
});

interface BMIRequest extends express.Request {
  body: {
    daily_exercises: Array<number>,
    target: number
  }
}
app.post('/exercises', (req: BMIRequest, res) => {
  if(!Array.isArray(req.body.daily_exercises))
    return res.status(400).json({ error: 'daily_exercises should be a list of numbers' });
  const daily_exercises : Array<number> =
    req.body.daily_exercises.map(e => Number(e));
  const target = Number(req.body.target);
  if(isNaN(target) || daily_exercises.some(n => isNaN(n)))
    return res.status(400).json({ error: 'daily_exercises should be a list of numbers and target should be a number' });

  const response : ExerciseResponse = calculateExercise(daily_exercises, target);
  return res.status(200).json(response);
});


export default app;
