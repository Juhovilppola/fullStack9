import axios from 'axios';
import { Diary, NewDiary } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = (object: NewDiary) => {

  /*try 
    {
      const response = axios
      .post<Diary>(baseUrl,object);
      console.log(response)
    
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.status);
        console.error(error.response);
      } else {
        console.log(error);
      }
    }*/
  
  
  return axios
    .post<Diary>(baseUrl, object)
    .then(response => response.data)
 

  
}