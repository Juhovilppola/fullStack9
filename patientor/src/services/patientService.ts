import patients from '../../data/patients';
import {NewPatientEntry, NonSensitivePatient, PatientEntry, patient} from '../types';
import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const getPatients = ():NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}; 

const getPatient =(id: string): patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id = uuid();
  if(!id || !isString(id)) {
    throw new Error ('failed to generate id');
  }
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient
};

