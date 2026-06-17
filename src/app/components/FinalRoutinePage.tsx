import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, Calendar, Dumbbell, TrendingUp, Download, Share2 } from 'lucide-react';

export default function FinalRoutinePage() {
  const navigate = useNavigate();
  const { userInfo, bmiResult, workoutSplit, workoutRoutines } = useAppContext();

  useEffect(() => {
    if (!userInfo || !workoutRoutines || workoutRoutines.length === 0) {
      navigate('/user-info');
    }
  }, [userInfo, workoutRoutines, navigate]);

  if (!userInfo || !workoutRoutines || workoutRoutines.length === 0) {
    return null;
  }

  const handleExport = () => {
    // Create a simple text export
    let exportText = '=== 나만의 운동 프로그램 ===\n\n';
    exportText += `이름: 사용자\n`;
    exportText += `나이: ${userInfo.age}세\n`;
    exportText += `BMI: ${bmiResult?.bmi.toFixed(1)} (${bmiResult?.category})\n`;
    exportText += `목표: ${userInfo.goal}\n`;
    exportText += `운동 분할: ${workoutSplit?.type}\n\n`;
    
    workoutRoutines.forEach((routine) => {
      exportText += `\n[${routine.day}]\n`;
      exportText += `${routine.name}\n`;
      exportText += '─────────────────────\n';
      routine.exercises.forEach((ex, idx) => {
        exportText += `${idx + 1}. ${ex.exerciseName}\n`;
        exportText += `   ${ex.sets}세트 × ${ex.reps}회`;
        if (ex.weight && ex.weight > 0) {
          exportText += ` @ ${ex.weight}kg`;
        }
        exportText += '\n';
      });
    });

    // Download as text file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '운동프로그램.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl mb-2 text-gray-900">운동 프로그램 완성!</h1>
            <p className="text-gray-600">맞춤형 운동 루틴이 생성되었습니다</p>
          </div>

          {/* User Summary */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-sm text-blue-600 mb-1">나이</div>
              <div className="text-2xl text-blue-900">{userInfo.age}세</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-sm text-green-600 mb-1">BMI</div>
              <div className="text-2xl text-green-900">{bmiResult?.bmi.toFixed(1)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-sm text-purple-600 mb-1">목표</div>
              <div className="text-lg text-purple-900">{userInfo.goal}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <div className="text-sm text-orange-600 mb-1">운동 빈도</div>
              <div className="text-lg text-orange-900">{workoutSplit?.type}</div>
            </div>
          </div>

          {/* Workout Routines */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              주간 운동 스케줄
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {workoutRoutines.map((routine) => (
                <div key={routine.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg text-gray-900">{routine.day}</h3>
                    <Dumbbell className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{routine.name}</p>
                  
                  <div className="space-y-3">
                    {routine.exercises.map((exercise, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-gray-900">{exercise.exerciseName}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {exercise.sets}세트 × {exercise.reps}회
                              {exercise.weight && exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                            {idx + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="mb-4 text-indigo-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              성공적인 운동을 위한 팁
            </h3>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                운동 전 5-10분 워밍업 필수
              </li>
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                정확한 자세가 중량보다 중요
              </li>
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                충분한 휴식과 수면 확보
              </li>
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                꾸준함이 가장 중요한 요소
              </li>
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                운동 후 단백질 섭취 권장
              </li>
              <li className="flex items-start text-indigo-800">
                <span className="text-indigo-600 mr-2">✓</span>
                주기적인 중량과 강도 조절
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={handleExport}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              다운로드
            </button>
            
            <button
              onClick={() => alert('공유 기능은 준비 중입니다.')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              공유하기
            </button>

            <button
              onClick={() => navigate('/tracking')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <TrendingUp className="w-5 h-5" />
              기록 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
