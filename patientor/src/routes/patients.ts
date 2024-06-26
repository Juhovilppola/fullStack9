import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry }  from '../utils';
//import { NewPatientEntry } from '../types';



const router = express.Router();

router.get('/', (_req, res) => {

  res.send(patientService.getPatients());
});
router.post('/', (req, res) => {
  try {
    
    const newPatientEntry = toNewPatientEntry(req.body) ;

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
 try {
  const newEntry = toNewEntry(req.body);
  const addedEntry = patientService.addEntryToPatient(newEntry, req.params.id);
  res.json(addedEntry);
 } catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
  
});

export default router;