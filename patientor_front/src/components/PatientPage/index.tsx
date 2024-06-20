//import axios from "axios";
import { Entry, Patient } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { useMatch } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from "@mui/icons-material/Female";
import WorkIcon from '@mui/icons-material/Work';






const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const match = useMatch("/patients/:id");
  

  useEffect(() => {
    
    
    const fetchPatient = async () => {
      
      const patient = await patientService.getSingle(match?.params.id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [match]);

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
const Entriess = (entry: Entry)  => {
 
  return(
    <div>
      {entry.date}
      <div>
        {entry.description}
        <ul>
          { entry.diagnosisCodes && entry.diagnosisCodes.map((code, idx) => {
            return(
            <li key={idx}> {code} </li>
            );
         })}
        </ul>
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
        {<WorkIcon/>}    {patient.occupation}
      </p>
      ssn: {patient.ssn}
      <h3>entries</h3>

      {patient.entries.map((entry) => {
        return(
        <Entriess {...entry}/>
        );
      })}
    </div>
   
  );
};

export default PatientPage;
