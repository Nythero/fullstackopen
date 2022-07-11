type TrainingDays = (ths : Array<number>) => number;
const trainingDays : TrainingDays = (ths) =>
  ths.reduce(
    (tds : number, th : number) => (th > 0)? tds + 1 : tds,
    0
  );

type Sum = (ns : Array<number>) => number;
const sum : Sum = (ns) =>
  ns.reduce((t, n) => t + n, 0);

type Success = (ths : Array<number>, t : number) => boolean;
const success : Success = ths =>
	average(ths) > t;

type Average = (ns : Array<number>) => number;
const average : Average = ns =>
   (ns.length !== 0)? sum(ns) / ns.length : 0;


type Rating = (ths : Array<number>, t : number) => Array<number|string>;
const rating : Rating = (ths, t) => {
  switch(true) {
    case average(ths) > t :
      return [3, 'Good job'];
    case average(ths) > t * 0.5 :
      return [2, 'Keep pushing you\'re nearly there'];
    default:
      return [1, 'You gotta pump those numbers up. Those are rookie numbers'];
  }
};

export type ExerciseResponse = {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};
type ExerciseCalculator = (ths: Array<number>, t: number) => ExerciseResponse;
 const exerciseCalculator : ExerciseCalculator = (ths, t)  => {
  const r : Array<number | string> = rating(ths, t);
  const ratingNumber : number = r[0] as number;
  const ratingDescription : string = r[1] as string;
  return {
    periodLength: ths.length,
    trainingDays: trainingDays(ths),
    success: success(ths, t),
    rating: ratingNumber,
    ratingDescription,
    target: t,
    average: average(ths)
  };
};

export default exerciseCalculator;

const t = Number(process.argv[2]);
const ths: Array<number> = process.argv.slice(3).map((th : string) => Number(th));
if(!isNaN(t) && !ths.some((th : number) => isNaN(th)))
  console.log(exerciseCalculator(ths, t));
else
  console.log('Pass the target hours and training hours as numbers');
