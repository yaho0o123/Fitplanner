import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Calendar, Dumbbell } from 'lucide-react';

export default function WorkoutSplitPage() {
  const navigate = useNavigate();
  const { userInfo, setWorkoutSplit } = useAppContext();
  const [selectedSplit, setSelectedSplit] = useState<'주3회' | '주4회' | '주5회'>('주4회');

  useEffect(() => {
    if (!userInfo) {
      navigate('/user-info');
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  const workoutSplits = {
    주3회: {
      schedule: [
        { day: '월요일', focus: '상체 + 코어' },
        { day: '수요일', focus: '하체 + 유산소' },
        { day: '금요일', focus: '전신 + 복근' },
      ],
      description: '초보자 및 바쁜 일정에 적합',
      duration: '회당 60분',
    },
    주4회: {
      schedule: [
        { day: '월요일', focus: '상체 (가슴, 어깨)' },
        { day: '화요일', focus: '하체 (스쿼트, 런지)' },
        { day: '목요일', focus: '상체 (등, 팔)' },
        { day: '금요일', focus: '복근 + 유산소' },
      ],
      description: '균형 잡힌 근육 발달',
      duration: '회당 60-75분',
    },
    주5회: {
      schedule: [
        { day: '월요일', focus: '가슴' },
        { day: '화요일', focus: '등' },
        { day: '수요일', focus: '어깨' },
        { day: '목요일', focus: '하체' },
        { day: '금요일', focus: '팔 + 복근' },
      ],
      description: '집중적인 근육 발달',
      duration: '회당 75-90분',
    },
  };

  const handleNext = () => {
    setWorkoutSplit({
      type: selectedSplit,
      schedule: workoutSplits[selectedSplit].schedule,
    });
    navigate('/exercise-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
            <Calendar className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">운동 분할 선택</h1>
          <p className="text-gray-600">주간 운동 스케줄을 선택해주세요</p>
        </div>

        {/* Split Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {(['주3회', '주4회', '주5회'] as const).map((split) => (
            <button
              key={split}
              onClick={() => setSelectedSplit(split)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedSplit === split
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-center mb-4">
                <div className={`text-3xl mb-2 ${
                  selectedSplit === split ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {split}
                </div>
                <p className="text-sm text-gray-600">{workoutSplits[split].description}</p>
                <p className="text-xs text-gray-500 mt-1">{workoutSplits[split].duration}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                selectedSplit === split
                  ? 'border-indigo-600 bg-indigo-600'
                  : 'border-gray-300'
              } flex items-center justify-center`}>
                {selectedSplit === split && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Schedule Details */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <h3 className="mb-4 text-indigo-900 flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            주간 운동 스케줄
          </h3>
          <div className="space-y-3">
            {workoutSplits[selectedSplit].schedule.map((day, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-gray-900">{day.day}</div>
                    <div className="text-sm text-gray-600">{day.focus}</div>
                  </div>
                </div>
                <Dumbbell className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="mb-3 text-blue-900">운동 분할 선택 팁</h3>
          <ul className="space-y-2">
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>주3회:</strong> 운동 초보자이거나 시간이 부족한 경우</span>
            </li>
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>주4회:</strong> 균형 잡힌 근육 발달을 원하는 경우</span>
            </li>
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>주5회:</strong> 집중적인 근육 발달과 충분한 시간이 있는 경우</span>
            </li>
          </ul>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          운동 선택하기
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
