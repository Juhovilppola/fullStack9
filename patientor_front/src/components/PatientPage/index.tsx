//import axios from "axios";
import { Diagnosis, Entry, Patient, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, EntryWithoutId } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useMatch } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";
import { Box, Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import entryForm from "./addEntryFrom";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";






const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const match = useMatch("/patients/:id");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  

  useEffect(() => {
    
    
    const fetchPatient = async () => {
      
      const patient = await patientService.getSingle(match?.params.id as string);
      setPatient(patient);
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatient();
  }, [match]);



  const submitNewEntry = async (values: EntryWithoutId) => {
    if(!patient) {
      throw new Error ('no patient');
    }
    try {

      const entry = await patientService.createEntry(values, patient.id as string);
      const tempPatient = patient;
      tempPatient?.entries.push(entry);
      setPatient(tempPatient);
      setModalOpen(false);
  
    } catch (e: unknown) {
      //SET ERROR JUTUT LISÄTÄ JOTTA NE TULOSTUU
      
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  

  

  if(!patient){
    return (
      <div>
        Patient not found
      </div>
    );
  }

  console.log(patient);

  let gender = null;
  if(patient.gender === "male"){
    gender = <MaleIcon/>;
  } else {
    gender = <FemaleIcon/>;
  }
  const EntryDetails: React.FC <{ entry: Entry}>  = ({entry})  => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryD entry = {entry}/>;
      case "HealthCheck":
        return <HealthEntryD entry = {entry}/>;
      case "OccupationalHealthcare":
        return <OccupationalEntryD entry = {entry}/>;
      default:
        return (entry);
    }
    };


const Entriess: React.FC <{ entry: Entry}>  = ({entry})  => {

  const Diagnosess = ({code}: {code: string}) => {

    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
  
    return(
      <li>
        {code} {diagnose?.name}
      </li>
    );
  };
 
  
 
  return(
    <div>
      <Box border={"1px solid black"}
      padding={"10px"}
      margin={"5px"}>
      {entry.date} {entry.type}
      <div>
      <i> {entry.description} </i>
      <div>
        <ul>
          { entry.diagnosisCodes && entry.diagnosisCodes.map((code, id) => {
            return(
            <Diagnosess key={id} code={code}/>
            );
            
         })}
         </ul>
         </div>
         <EntryDetails entry={entry}/>
      </div>
      <b>diagnose by: </b> {entry.specialist}
      </Box>
    </div>
  );

};

const HospitalEntryD: React.FC <{ entry: HospitalEntry}>  = ({entry})  => {
  return (
    <div>
      <b>Hospital</b>
      <p></p>
      <b>{entry.discharge.date} </b>{entry.discharge.criteria}
    </div>
  );
  
};
const HealthEntryD: React.FC <{ entry: HealthCheckEntry}>  = ({entry})  => {
  let color = "green";
  if(entry.healthCheckRating === 1) {
    color = "yellow";
  } else if (entry.healthCheckRating === 2){
    color = "red";
  } else if (entry.healthCheckRating === 3){
      color = "black";
  } else {
    color = "green";
  }

  return (
    <div >
      <b>Health Check</b>
    <FavoriteIcon sx={{color}}/>
    </div>
  );
  
};
const OccupationalEntryD: React.FC <{ entry: OccupationalHealthcareEntry}>  = ({entry})  => {
  return (
  
   <div>
      <b>Occupational Healthcare</b>
      <p></p>
      <b>Employer: </b>{entry.employerName} 
      <div>
      {entry.sickLeave && <p>Sick leave start date: {entry.sickLeave?.startDate} </p>}
      {entry.sickLeave && <p>Sick leave end date: {entry.sickLeave.endDate}</p>}
        </div>
       
    </div>
  );
  
};


  return (
    <div>
      <h1>
        {patient.name} {gender}
      </h1>
      <p>
        Occupation:   {patient.occupation}
      </p>
      ssh: {patient.ssn}
      <h3>entries</h3>
      <Box>
      {patient.entries.map((entry, id) => {
        return(
        <Entriess key = {id} entry = {entry}/>
        );
      })}
      </Box>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
   
  );
};

export default PatientPage;
