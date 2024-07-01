import patients from '../../data/patients';
import {Entry,EntryWithoutId, NewPatientEntry, NonSensitivePatient, PatientEntry, patient} from '../types';
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
  console.log('adding patient');
  console.log(newPatientEntry);
  patients.push(newPatientEntry);
  return newPatientEntry;
};
const addEntryToPatient = (entry: EntryWithoutId, patientId: string): Entry => {
  const id = uuid();
  if(!id || !isString(id)) {
    throw new Error ('faild to generate id');
  }

  const patient = patients.find((patient) => patient.id === patientId);
  const newEntry = {
    id: id,
    ...entry
  };
  if(patient) {
  patient?.entries.push(newEntry);
  } else {
    throw new Error ('patient not found');
  }

  return newEntry;

};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntryToPatient
};

