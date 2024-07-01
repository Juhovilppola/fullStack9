import { NewPatientEntry, Gender, Entry, EntryWithoutId, Discharge, Diagnosis, HealthCheckRating, SickLeave } from "./types";

 const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object 
  && 'occupation' in object ) {
    if('entries' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newEntry;
    } else {
      const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries([])
      };
      return newEntry;
    }
  }

  throw new Error('Incorrect data: some fields are missing');
  
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEntry = (entry: Entry): boolean => {
  if(!entry.type) {
    throw new Error ('missing entry type');
  }

  if(entry.type === 'HealthCheck') {
    return true;
  } else if (entry.type === 'Hospital') {
    return true;
  } else if (entry.type ==='OccupationalHealthcare'){
    return true;
  } else {
    throw new Error ('Incorrect entry type');
  }
} ;

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn|| !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation|| !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};
const parseEntries = (entries: unknown): Entry[] =>{
  if(!entries || !Array.isArray(entries)){
    throw new Error('Incorrect or missing entries');
  } else {
    entries.forEach((entry)=> {
    if(!isEntry(entry as Entry)){
      throw new Error ('Incorrect or missing entry type');
    } 
  });
  }
  return entries as Entry[];
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('description' in object && 'date' in object && 'specialist' in object 
    && 'type' in object) {

      switch (object.type) {
        case "Hospital":
          if('discharge' in object) {
            const newEntry : EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type
            };
            return newEntry;
          
          }
          throw new Error('incorrect or missing data');
        case "HealthCheck":
          if('healthCheckRating' in object) {
            const newEntry : EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parsehealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type
            };
            return newEntry;
          
          }
          throw new Error('incorrect or missing data');
        case "OccupationalHealthcare":
          if('employerName' in object && 'sickLeave' in object) {
            const newEntry : EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployerName(object.employerName),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type,
            sickLeave: parseSickLeave(object.sickLeave)
            };
            return newEntry;
          
          }
          throw new Error('incorrect or missing data');
        default:
          throw new Error ('missing or invalid type');
      }
      }
   
  
    
  

  throw new Error('Incorrect data: some fields are missing');
  
}; 



const parseDescription = (description: unknown): string  => {
  if (!description|| !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};


const parseSpecialist = (specialist: unknown): string =>  {
  if (!specialist|| !isString(specialist)) {
    throw new Error('Incorrect or missing ssn');
  }

  return specialist;
};



const parseDischarge = (discharge: unknown): Discharge => {

  if(!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ("date" in discharge && "criteria" in discharge ) {
    const newDischarge: Discharge = {
      date: parseDate(discharge.date),
      criteria: parseCriteria(discharge.criteria)

    };
    return newDischarge;
  }

  throw new Error ('Incorret or missing data in discharge');
};



const isHealthCheckRating = (param: number):param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v as number).includes(param);

  
};

const parsehealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!HealthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing healthcheckrating ' + healthCheckRating);
  }

  
  return healthCheckRating;
};



const parseEmployerName = (employerName: unknown): string => {
  if (!employerName|| !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave =>  {
  if(!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    const newSickLeave: SickLeave = {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate)

    };
    return newSickLeave;
  }

  throw new Error ('Incorret or missing data in sick leave');
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria|| !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

export default toNewPatientEntry;
