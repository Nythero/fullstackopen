type CalculateBmi = (h: number, w: number) => string;
const calculateBmi: CalculateBmi = (h, w) => {
  const hM = h / 100;
  const bmi : number = w / (hM ** 2);
  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi < 17:
      return 'Underweight (Moderate thinness)';
    case bmi < 18.5:
      return 'Underweight (Mild thinness)';
    case bmi < 25:
      return 'Normal range';
    case bmi < 30:
      return 'Overweight (Pre-obese)';
    case bmi < 35:
      return 'Obese (Class I)';
    case bmi < 40:
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
};

export default calculateBmi;

const h = Number(process.argv[2]);
const w = Number(process.argv[3]);
if(!isNaN(h) && !isNaN(w))
  if(h === 0)
    console.log('Please pass a height > 0');
  else
    console.log(calculateBmi(h, w));
else
  console.log('Please pass heigth and weigth as numbers');
