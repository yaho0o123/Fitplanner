import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Filter, Search } from 'lucide-react';
import { Exercise } from '../types';

export default function ExerciseSelectionPage() {
  const navigate = useNavigate();
  const { userInfo, workoutSplit } = useAppContext();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<'전체' | '상체' | '하체' | '복근' | '유산소'>('전체');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!userInfo || !workoutSplit) {
      navigate('/user-info');
    }
  }, [userInfo, workoutSplit, navigate]);

  if (!userInfo || !workoutSplit) {
    return null;
  }

  // Mock exercise database
  const exercises: Exercise[] = [
    // 상체 운동
    { id: '1', name: '벤치 프레스', category: '상체', equipment: '바벨', difficulty: '중급' },
    { id: '2', name: '덤벨 플라이', category: '상체', equipment: '덤벨', difficulty: '초급' },
    { id: '3', name: '푸시업', category: '상체', equipment: '맨몸', difficulty: '초급' },
    { id: '4', name: '풀업', category: '상체', equipment: '철봉', difficulty: '중급' },
    { id: '5', name: '바벨 로우', category: '상체', equipment: '바벨', difficulty: '중급' },
    { id: '6', name: '덤벨 숄더 프레스', category: '상체', equipment: '덤벨', difficulty: '초급' },
    { id: '7', name: '사이드 레터럴 레이즈', category: '상체', equipment: '덤벨', difficulty: '초급' },
    { id: '8', name: '바이셉 컬', category: '상체', equipment: '덤벨', difficulty: '초급' },
    { id: '9', name: '트라이셉 익스텐션', category: '상체', equipment: '덤벨', difficulty: '초급' },
    
    // 하체 운동
    { id: '10', name: '바벨 스쿼트', category: '하체', equipment: '바벨', difficulty: '중급' },
    { id: '11', name: '레그 프레스', category: '하체', equipment: '머신', difficulty: '초급' },
    { id: '12', name: '런지', category: '하체', equipment: '덤벨', difficulty: '초급' },
    { id: '13', name: '레그 컬', category: '하체', equipment: '머신', difficulty: '초급' },
    { id: '14', name: '레그 익스텐션', category: '하체', equipment: '머신', difficulty: '초급' },
    { id: '15', name: '카프 레이즈', category: '하체', equipment: '머신', difficulty: '초급' },
    
    // 복근 운동
    { id: '16', name: '플랭크', category: '복근', equipment: '맨몸', difficulty: '초급' },
    { id: '17', name: '크런치', category: '복근', equipment: '맨몸', difficulty: '초급' },
    { id: '18', name: '레그 레이즈', category: '복근', equipment: '맨몸', difficulty: '중급' },
    { id: '19', name: '러시안 트위스트', category: '복근', equipment: '덤벨', difficulty: '중급' },
    { id: '20', name: '마운틴 클라이머', category: '복근', equipment: '맨몸', difficulty: '중급' },
    
    // 유산소 운동
    { id: '21', name: '러닝머신', category: '유산소', equipment: '머신', difficulty: '초급' },
    { id: '22', name: '사이클', category: '유산소', equipment: '머신', difficulty: '초급' },
    { id: '23', name: '버피', category: '유산소', equipment: '맨몸', difficulty: '중급' },
    { id: '24', name: '점프로프', category: '유산소', equipment: '줄넘기', difficulty: '초급' },
  ];

  // Filter exercises based on injuries
  const filteredByInjury = exercises.filter((exercise) => {
    if (userInfo.injuries.includes('없음')) return true;
    
    // Exclude exercises based on injuries
    if (userInfo.injuries.includes('허리') && ['바벨 스쿼트', '바벨 로우'].includes(exercise.name)) {
      return false;
    }
    if (userInfo.injuries.includes('무릎') && ['바벨 스쿼트', '런지', '레그 프레스'].includes(exercise.name)) {
      return false;
    }
    if (userInfo.injuries.includes('어깨') && ['덤벨 숄더 프레스', '벤치 프레스'].includes(exercise.name)) {
      return false;
    }
    if (userInfo.injuries.includes('손목') && ['푸시업', '벤치 프레스'].includes(exercise.name)) {
      return false;
    }
    
    return true;
  });

  // Filter by category and search
  const filteredExercises = filteredByInjury.filter((exercise) => {
    const matchesCategory = filterCategory === '전체' || exercise.category === filterCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleNext = () => {
    if (selectedExercises.length === 0) {
      alert('최소 1개 이상의 운동을 선택해주세요.');
      return;
    }
    navigate('/intensity-setting');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급':
        return 'bg-green-100 text-green-700';
      case '중급':
        return 'bg-yellow-100 text-yellow-700';
      case '고급':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2 text-gray-900">운동 선택</h1>
            <p className="text-gray-600">원하는 운동을 선택해주세요 (다중 선택 가능)</p>
            <div className="mt-4 inline-block bg-indigo-50 px-4 py-2 rounded-lg">
              <span className="text-indigo-700">선택된 운동: {selectedExercises.length}개</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="운동 이름 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="전체">전체</option>
                  <option value="상체">상체</option>
                  <option value="하체">하체</option>
                  <option value="복근">복근</option>
                  <option value="유산소">유산소</option>
                </select>
              </div>
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-h-[500px] overflow-y-auto p-2">
            {filteredExercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleToggleExercise(exercise.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedExercises.includes(exercise.id)
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900">{exercise.name}</h3>
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 ${
                    selectedExercises.includes(exercise.id)
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {selectedExercises.includes(exercise.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-gray-600">{exercise.equipment}</span>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {exercise.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={selectedExercises.length === 0}
            className={`w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg ${
              selectedExercises.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            강도 설정하기
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
