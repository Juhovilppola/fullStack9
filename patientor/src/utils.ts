import { NewPatientEntry, Gender, Entry } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object 
  && 'occupation' in object && 'entries' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
  
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
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

export default toNewPatientEntry;