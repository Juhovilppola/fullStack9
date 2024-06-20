import { useState, useEffect } from 'react';

import { Diary} from "./types";
import { getAllDiaries, createDiary} from './diaryService';
import axios from 'axios';

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisi, setNewVisi] = useState('');
  const [newComm, setNewComm] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
      //console.log(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    createDiary({ date: newDate, visibility: newVisi,weather: newWeather, comment: newComm })
    .then((data) => {
      setDiaries(diaries.concat(data))
      console.log(data)
      setError(null)
    })
    .catch((error) => {
      if(axios.isAxiosError(error)){
        console.log(error.response?.data)
        setError(error.response?.data)
      } else {
        setError('something went wrong')
      }
      
      

    })
  
    
   // console.log(error)
    setNewDate('')
    setNewVisi('')
    setNewComm('')
    setNewWeather('')
  };

  return (
    <div>
      <h1> Add new </h1>
      <div style = {{color: "red "}}> {error}</div>
      <form onSubmit={diaryCreation}>
       <p> Date <input type = "date"  min="2000-01-01" max="2030-12-31"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /></p>
         <p> Visibility:  g
          
        <label>reat</label>
         <input type="radio" name="visibility"
          value="great"
          onChange={() => setNewVisi('great')} 
        /> 
        <label>  good</label>
        <input type="radio" name="visibility"
          value="good"
          onChange={() => setNewVisi('good')}
          />
           <label>  ok</label>
        <input type="radio" name="visibility"
          value="ok"
          onChange={() => setNewVisi('ok')}
          />
             <label>  poor</label>
        <input type="radio" name="visibility"
          value="poor"
          onChange={() => setNewVisi('poor')}
          />
          
         
          </p>
            
        <p> Weather:   
          <label> sunny </label>
        <input type="radio" name="weather"
          value="sunny"
          onChange={() => setNewWeather('sunny')}
          />
            <label> rainy </label>
        <input type="radio" name="weather"
          value="rainy"
          onChange={() => setNewWeather('rainy')}
          />
            <label> coludy </label>
        <input type="radio" name="weather"
          value="cloudy"
          onChange={() => setNewWeather('cloudy')}
          />
            <label> stormy </label>
        <input type="radio" name="weather"
          value="stormy"
          onChange={() => setNewWeather('stormy')}
          />
            <label> windy </label>
        <input type="radio" name="weather"
          value="windy"
          onChange={() => setNewWeather('windy')}
          /></p>
        <p> Comment <input
          value={newComm}
          onChange={(event) => setNewComm(event.target.value)} 
        /></p>
        <button type='submit'>add</button>
      </form>
      
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>
        )}
      </ul>
    </div>
  )
}
export default App
