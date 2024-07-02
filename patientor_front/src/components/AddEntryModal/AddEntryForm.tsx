import { useState, SyntheticEvent } from "react";

import {  TextField,  Grid, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Input } from '@mui/material';

import { Diagnosis, EntryWithoutId} from "../../types";
import * as React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}



const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealth] = useState('');
  const [diagnosis, setDiagnosis] = React.useState<string[]>([]);
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickleaveStart, setSickleaveStart] = useState('');
  const [sickleaveEnd, setSickleaveEnd] = useState('');


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  console.log(diagnoses);

 

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch(type) {
      case "HealthCheck":
    
        onSubmit({
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheckRating),
          type: 'HealthCheck',
          diagnosisCodes: diagnosis
        });
        break;
      case "Hospital":
        onSubmit({
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          },
          diagnosisCodes: diagnosis,
          type: 'Hospital'
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          description,
          date,
          specialist,
          sickLeave: {
            startDate: sickleaveStart,
            endDate: sickleaveEnd
          },
          diagnosisCodes: diagnosis,
          employerName,
          type: 'OccupationalHealthcare'
        });
        break;
      default: 
      throw new Error('entry type not selected');

    }
  };

  const handleChange = (event: SelectChangeEvent<typeof type>) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setType(
      value
    );
  };

  const types = ['HealthCheck', 'OccupationalHealthcare', 'Hospital'];

  const EntryForm = () => {
      return (
        <div>
          <form onSubmit={addEntry}>
            <TextField
              label="description"
              fullWidth 
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <label>date</label>
            <Input
              fullWidth
              type="date"
              id="date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            
             <TextField
              label="specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <SelectDiagnosis/>
            {SpecialForm()}
    
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    
   
  };

  const SelectDiagnosis = () =>  {

    const handleChange = (event: SelectChangeEvent<typeof diagnosis>) => {
      const {
        target: { value },
      } = event;
      setDiagnosis(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Diagnosis codes
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={diagnosis}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnose) => (
              <MenuItem
                key={diagnose.code}
                value={diagnose.code}
                
              >
                {diagnose.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };
    
  
  

  const SpecialForm = () => {
    console.log(type);
    if(type === 'HealthCheck'){

      return ( 
      <div>
        <div>
        <input
        type="radio"
        id="0"
        name="rating"
        value="0"    
        onChange={( target ) => setHealth(target.target.value)}
        />
        Healthy
        </div>
        <div>
        <input
        type="radio"
        id="1"
        name="rating"
        value="1"
        onChange={( target ) => setHealth(target.target.value)}
        />
        Low risk
        </div>
        <div>
        <input
        type="radio"
        id="2"
        name="rating"
        value="2"
        onChange={( target ) => setHealth(target.target.value)}
        />
        High Risk
        </div>
        <input
        type="radio"
        id="3"
        name="rating"
        value="3"
        onChange={( target ) => setHealth(target.target.value)}
        />
        Critical Risk
        </div>);
    } else if (type === 'Hospital') {
      return (
        <div>
          <b>Discharge: </b>
          <p></p>
          <label>date</label>
          <Input
            fullWidth
            type="date"
            id="dischargeDate"
            placeholder="YYYY-MM-DD"
            value={dischargeDate}
            onChange={({target}) => setDischargeDate(target.value)}
          />
        <TextField
        label="Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({target}) => setDischargeCriteria(target.value)}
        />
        </div>
      );
     } else if ( type === 'OccupationalHealthcare') {
      return (
        <div>
          <TextField
      label="Employer name"
      fullWidth
      value={employerName}
      onChange={({target}) => setEmployerName(target.value)}
      />
      <b>Sickleave: </b>
      <p></p>
      <label>start date:</label>
      <Input
        fullWidth
        type="date"
        value={sickleaveStart}
        onChange={({target}) => setSickleaveStart(target.value)}
      />
      <label>end date</label>
      <Input
        fullWidth
        type="date"
        value={sickleaveEnd}
        onChange={({target}) => setSickleaveEnd(target.value)}
      />
      </div>
      );
     } else {
      return null;
     }
     };
    
  const SelectEntry = () => {
    return ( 
      <div>
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="types">Entry</InputLabel>
      <Select
        labelId="types"
        id="types"
        value={type}
        onChange={handleChange}
        input={<OutlinedInput label="Type" />}
        MenuProps={MenuProps}
      >
        {types.map((type) => (
          <MenuItem
            key={type}
            value={type}
            
          >
            {type}
          </MenuItem>
        ))}
      </Select>
      
    </FormControl>
    
    </div>

    );
  };

  return (
    <div>
    <SelectEntry/>
    {EntryForm()}
    </div>
    
  );


};

export default AddEntryForm;