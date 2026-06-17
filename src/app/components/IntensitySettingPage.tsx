import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Activity, Plus, Minus } from 'lucide-react';
import { ExerciseSet, WorkoutRoutine } from '../types';

export default function IntensitySettingPage() {
  const navigate = useNavigate();
  const { userInfo, workoutSplit, setWorkoutRoutines } = useAppContext();
  
  // Mock exercises data (same as ExerciseSelectionPage)
  const mockExercises = [
    { id: '1', name: '벤치 프레스', category: '상체' as const },
    { id: '2', name: '덤벨 플라이', category: '상체' as const },
    { id: '3', name: '푸시업', category: '상체' as const },
    { id: '4', name: '풀업', category: '상체' as const },
    { id: '5', name: '바벨 로우', category: '상체' as const },
    { id: '10', name: '바벨 스쿼트', category: '하체' as const },
    { id: '11', name: '레그 프레스', category: '하체' as const },
    { id: '12', name: '런지', category: '하체' as const },
    { id: '16', name: '플랭크', category: '복근' as const },
    { id: '17', name: '크런치', category: '복근' as const },
    { id: '21', name: '러닝머신', category: '유산소' as const },
  ];

  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>(
    mockExercises.map(ex => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: 3,
      reps: 10,
      weight: 0,
    }))
  );

  useEffect(() => {
    if (!userInfo || !workoutSplit) {
      navigate('/user-info');
    }
  }, [userInfo, workoutSplit, navigate]);

  if (!userInfo || !workoutSplit) {
    return null;
  }

  const handleSetChange = (exerciseId: string, field: 'sets' | 'reps' | 'weight', value: number) => {
    setExerciseSets(prev =>
      prev.map(set =>
        set.exerciseId === exerciseId
          ? { ...set, [field]: Math.max(0, value) }
          : set
      )
    );
  };

  const handleIncrement = (exerciseId: string, field: 'sets' | 'reps' | 'weight') => {
    setExerciseSets(prev =>
      prev.map(set =>
        set.exerciseId === exerciseId
          ? { ...set, [field]: set[field] + (field === 'weight' ? 5 : 1) }
          : set
      )
    );
  };

  const handleDecrement = (exerciseId: string, field: 'sets' | 'reps' | 'weight') => {
    setExerciseSets(prev =>
      prev.map(set =>
        set.exerciseId === exerciseId
          ? { ...set, [field]: Math.max(0, set[field] - (field === 'weight' ? 5 : 1)) }
          : set
      )
    );
  };

  const handleNext = () => {
    // Create workout routines based on split
    const routines: WorkoutRoutine[] = workoutSplit.schedule.map((day, index) => ({
      id: `routine-${index}`,
      name: `${day.day} - ${day.focus}`,
      day: day.day,
      exercises: exerciseSets.filter((_, i) => i % workoutSplit.schedule.length === index),
    }));

    setWorkoutRoutines(routines);
    navigate('/final-routine');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
              <Activity className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl mb-2 text-gray-900">운동 강도 설정</h1>
            <p className="text-gray-600">각 운동의 세트, 횟수, 중량을 설정하세요</p>
          </div>

          {/* Intensity Guide */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="mb-3 text-blue-900">강도 설정 가이드</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-700 mb-1"><strong>초보자</strong></p>
                <p className="text-blue-600">3세트 × 8-12회</p>
              </div>
              <div>
                <p className="text-blue-700 mb-1"><strong>중급자</strong></p>
                <p className="text-blue-600">4세트 × 10-15회</p>
              </div>
              <div>
                <p className="text-blue-700 mb-1"><strong>고급자</strong></p>
                <p className="text-blue-600">5세트 × 12-20회</p>
              </div>
            </div>
          </div>

          {/* Exercise Settings */}
          <div className="space-y-4 mb-8 max-h-[500px] overflow-y-auto">
            {exerciseSets.map((exerciseSet) => (
              <div key={exerciseSet.exerciseId} className="bg-gray-50 rounded-xl p-6">
                <h3 className="mb-4 text-gray-900">{exerciseSet.exerciseName}</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Sets */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">세트</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(exerciseSet.exerciseId, 'sets')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={exerciseSet.sets}
                        onChange={(e) => handleSetChange(exerciseSet.exerciseId, 'sets', parseInt(e.target.value) || 0)}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                      <button
                        onClick={() => handleIncrement(exerciseSet.exerciseId, 'sets')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Reps */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">횟수</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(exerciseSet.exerciseId, 'reps')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={exerciseSet.reps}
                        onChange={(e) => handleSetChange(exerciseSet.exerciseId, 'reps', parseInt(e.target.value) || 0)}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                      <button
                        onClick={() => handleIncrement(exerciseSet.exerciseId, 'reps')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">중량 (kg)</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(exerciseSet.exerciseId, 'weight')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={exerciseSet.weight}
                        onChange={(e) => handleSetChange(exerciseSet.exerciseId, 'weight', parseInt(e.target.value) || 0)}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        step="5"
                      />
                      <button
                        onClick={() => handleIncrement(exerciseSet.exerciseId, 'weight')}
                        className="w-10 h-10 bg-white rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            최종 루틴 생성
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
