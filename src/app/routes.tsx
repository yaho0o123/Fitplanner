import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import HomePage from "./components/HomePage";
import UserInfoPage from "./components/UserInfoPage";
import BMIResultPage from "./components/BMIResultPage";
import DietRecommendationPage from "./components/DietRecommendationPage";
import AgeRecommendationPage from "./components/AgeRecommendationPage";
import InjuryCheckPage from "./components/InjuryCheckPage";
import WorkoutSplitPage from "./components/WorkoutSplitPage";
import ExerciseSelectionPage from "./components/ExerciseSelectionPage";
import IntensitySettingPage from "./components/IntensitySettingPage";
import FinalRoutinePage from "./components/FinalRoutinePage";
import TrackingPage from "./components/TrackingPage";
import NotFoundPage from "./components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "user-info", Component: UserInfoPage },
      { path: "bmi-result", Component: BMIResultPage },
      { path: "diet-recommendation", Component: DietRecommendationPage },
      { path: "age-recommendation", Component: AgeRecommendationPage },
      { path: "injury-check", Component: InjuryCheckPage },
      { path: "workout-split", Component: WorkoutSplitPage },
      { path: "exercise-selection", Component: ExerciseSelectionPage },
      { path: "intensity-setting", Component: IntensitySettingPage },
      { path: "final-routine", Component: FinalRoutinePage },
      { path: "tracking", Component: TrackingPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
