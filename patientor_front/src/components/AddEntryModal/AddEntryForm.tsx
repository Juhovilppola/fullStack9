import { useState, SyntheticEvent } from "react";

import {  TextField,  Grid, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent,  } from '@mui/material';

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}



const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealth] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
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

 

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch(type) {
      case "HealthCheck":
        onSubmit({
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheckRating),
          type: 'HealthCheck'
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
          employerName,
          type: 'OccupationalHealthcare'
        });
        break;
      default: 
      throw new Error('entry type not selected');

    }
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: 'HealthCheck'
    });
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
            <TextField
              label="date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
             <TextField
              label="specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              label="diagnosis codes"
              fullWidth
              value={diagnosis}
              onChange={({ target }) => setDiagnosis(target.value)}
            />  
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
  // tämä seuraavana

  const SpecialForm = () => {
    console.log(type);
    if(type === 'HealthCheck'){

      return ( <TextField
        label="Healthcheck rating"
        fullWidth
        value={healthCheckRating}
        onChange={({target}) => setHealth(target.value)}
        />);
    } else if (type === 'Hospital') {
      return (
        <div>
          <b>Discharge: </b>
        <TextField
        label="Date"
        fullWidth
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
      <TextField
      label="Sickleave start date"
      fullWidth
      value={sickleaveStart}
      onChange={({target}) => setSickleaveStart(target.value)}
      />
      <TextField
      label="Sickleave end date"
      fullWidth
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

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
         <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
        label="Healthcheck rating"
        fullWidth
        value={healthCheckRating}
        onChange={({target}) => setHealth(target.value)}
        />
        <TextField
          label="diagnosis codes"
          fullWidth
          value={diagnosis}
          onChange={({ target }) => setDiagnosis(target.value)}
        />

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

export default AddEntryForm;