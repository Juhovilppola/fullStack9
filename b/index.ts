import express from 'express';
import { calculateBmi } from './bmiCalculator';

import { calculateExercises} from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  
  const result = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  };
  

  res.send(result);
  

});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  if ( !target || isNaN(Number(target)) ) {
    res.status(400).send({ error: 'parameters missing'});
    return;
  }
  
  
  if(!daily_exercises) {
    res.status(400).send({ error: 'parameters missing'});
    return;
  }
  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target)) ;
  res.send(result);
  } catch (error) {
    
    console.log(error);
    res.status(400).send({ error: 'malfromatted parameters'});
  }
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});