import { createContext, useContext, useState, ReactNode } from 'react';
import { UserInfo, BMIResult, AgeCategory, WorkoutSplit, WorkoutRoutine, TrackingData } from '../types';

interface AppContextType {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  bmiResult: BMIResult | null;
  setBMIResult: (result: BMIResult) => void;
  ageCategory: AgeCategory | null;
  setAgeCategory: (category: AgeCategory) => void;
  workoutSplit: WorkoutSplit | null;
  setWorkoutSplit: (split: WorkoutSplit) => void;
  workoutRoutines: WorkoutRoutine[];
  setWorkoutRoutines: (routines: WorkoutRoutine[]) => void;
  trackingData: TrackingData[];
  setTrackingData: (data: TrackingData[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [bmiResult, setBMIResult] = useState<BMIResult | null>(null);
  const [ageCategory, setAgeCategory] = useState<AgeCategory | null>(null);
  const [workoutSplit, setWorkoutSplit] = useState<WorkoutSplit | null>(null);
  const [workoutRoutines, setWorkoutRoutines] = useState<WorkoutRoutine[]>([]);
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        bmiResult,
        setBMIResult,
        ageCategory,
        setAgeCategory,
        workoutSplit,
        setWorkoutSplit,
        workoutRoutines,
        setWorkoutRoutines,
        trackingData,
        setTrackingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
