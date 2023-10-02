export interface ResultObject {
  perioidLength: number;
    trainingdays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (args: string[], target: number):ResultObject => {
  if (args.length < 4) throw new Error('Not enough arguments');
  //args.splice(0,3)
  //console.log(args)
  const array = args
  if(isNaN(target)) throw new Error ('Provided values were not numbers!')
  
  const object = {
    perioidLength: array.length,
    trainingdays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: target,
    average: 0
  }
  let total = 0
  
  
  array.map(hours => {
     const value = Number(hours)
     if(isNaN(value)) throw new Error ('Provided values were not numbers!')
    if(value > 0 ) {
      object.trainingdays = object.trainingdays + 1
      total = total + value
    }
    
  })
  object.average = total/object.perioidLength
  if(object.average > object.target) {
    object.success = true
  }
  if(object.average < 1) {
    object.rating = 1
    object.ratingDescription = 'bad'
    
  } else if (object.average > 2) {
    object.rating = 3
    object.ratingDescription = 'you are the best'
    
  } else {
    object.ratingDescription = 'not too bad but could be better'
    object.rating = 2
    
  }
  
  

  return object
}
/*
try {
  
  console.log(calculateExercises(process.argv,))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}*/
