export interface UserInfo {
  age: number;
  height: number;
  weight: number;
  goal: '근육증가' | '체중감량' | '체력향상' | '건강유지';
  injuries: string[];
}

export interface BMIResult {
  bmi: number;
  category: '저체중' | '정상' | '과체중' | '비만';
  needsDiet: boolean;
}

export interface AgeCategory {
  category: '청소년' | '성인' | '중장년';
  ageGroup: string;
  recommendation: string;
}

export interface WorkoutSplit {
  type: '주3회' | '주4회' | '주5회';
  schedule: {
    day: string;
    focus: string;
  }[];
}

export interface Exercise {
  id: string;
  name: string;
  category: '상체' | '하체' | '복근' | '유산소';
  equipment: string;
  difficulty: '초급' | '중급' | '고급';
}

export interface ExerciseSet {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  day: string;
  exercises: ExerciseSet[];
}

export interface TrackingData {
  date: string;
  workoutCompleted: boolean;
  mealLogged: boolean;
  notes: string;
  weight?: number;
}
