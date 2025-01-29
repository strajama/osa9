const parseArgumentsForBmi = (args: string[]): {height:number, weight:number} => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

  export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 16) {
      return 'Underweight (Severe thinness)';
    } else if (bmi < 17) {
      return 'Underweight (Moderate thinness)';
    } else if (bmi < 18.5) {
      return 'Underweight (Mild thinness)';
    } else if (bmi < 25) {
      return 'Normal range';
    } else if (bmi < 30) {
      return 'Overweight (Pre-obese)';
    } else if (bmi < 35) {
      return 'Obese (Class I)';
    } else if (bmi < 40) {
      return 'Obese (Class II)';
    } else {
      return 'Obese (Class III)';
    }
  };

  if (require.main === module) {
    try {
      // console.log(calculateBmi(180, 74))
      // console.log(calculateBmi(170, 74))
      // console.log(calculateBmi(180, 54))
      // console.log(calculateBmi(150, 74))
      // console.log(calculateBmi(180, 59))
      // console.log(calculateBmi(220, 74))
      // console.log(calculateBmi(140, 74))
      // console.log(calculateBmi(130, 74))
      const inputNumbers = parseArgumentsForBmi(process.argv);
      console.log(calculateBmi(inputNumbers.height, inputNumbers.weight));
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
  }

