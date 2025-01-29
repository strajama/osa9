interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const inputNumbers: number[] = [];
    for (let i = 2; i < args.length; i++) {
      if (isNaN(Number(args[i]))) {
        throw new Error('Provided values were not numbers!');
      }
      inputNumbers.push(Number(args[i]));
    }
    return inputNumbers;
  };

const calculateRating = (target: number, exercises: number[]): { rating: number, ratingDescription: string } => {
    const average = exercises.reduce((a, b) => a + b, 0) / exercises.length;
    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Excellent';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'You need to work harder';
    }

    return { rating, ratingDescription };
};

export const calculateExercises = (inputNumbers: number[]): Result => {
        const target = inputNumbers[0];
        const exercises = inputNumbers.slice(1);
        const { rating, ratingDescription } = calculateRating(target, exercises);
        const result = {} as Result;
        result.periodLength = exercises.length ;
        result.trainingDays =  exercises.filter(e => e > 0).length ;
        result.success = exercises.every(e => e >= target) ;
        result.rating = rating ;
        result.ratingDescription = ratingDescription ;
        result.target =  target ;
        result.average = exercises.reduce((a, b) => a + b, 0) / exercises.length ;
        return result;
    };
  if (require.main === module) {
    try {
      const inputNumbers = parseArguments(process.argv);
      console.log(calculateExercises(inputNumbers));
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
  }
