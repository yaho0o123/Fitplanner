import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { Calendar, Dumbbell, Apple, MessageCircle, Plus, CheckCircle2, TrendingUp, Home } from 'lucide-react';
import { TrackingData } from '../types';

export default function TrackingPage() {
  const navigate = useNavigate();
  const { userInfo, trackingData, setTrackingData } = useAppContext();
  const [activeTab, setActiveTab] = useState<'workout' | 'meal' | 'coaching'>('workout');
  const [todayWeight, setTodayWeight] = useState('');
  const [todayNotes, setTodayNotes] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/user-info');
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  const today = new Date().toISOString().split('T')[0];
  const todayData = trackingData.find(d => d.date === today);

  const handleWorkoutComplete = () => {
    const updated = trackingData.filter(d => d.date !== today);
    updated.push({
      date: today,
      workoutCompleted: true,
      mealLogged: todayData?.mealLogged || false,
      notes: todayNotes,
      weight: todayWeight ? parseFloat(todayWeight) : undefined,
    });
    setTrackingData(updated);
    alert('운동 완료! 잘하셨습니다! 💪');
  };

  const handleMealLog = () => {
    const updated = trackingData.filter(d => d.date !== today);
    updated.push({
      date: today,
      workoutCompleted: todayData?.workoutCompleted || false,
      mealLogged: true,
      notes: todayNotes,
      weight: todayWeight ? parseFloat(todayWeight) : undefined,
    });
    setTrackingData(updated);
    alert('식단 기록 완료!');
  };

  const getStreak = () => {
    const sortedData = [...trackingData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    for (const data of sortedData) {
      if (data.workoutCompleted) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2 text-gray-900">운동 기록 및 관리</h1>
              <p className="text-gray-600">꾸준한 기록으로 목표를 달성하세요</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              홈으로
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-200 rounded-full mb-3">
                <TrendingUp className="w-6 h-6 text-green-700" />
              </div>
              <div className="text-2xl mb-1 text-green-900">{getStreak()}일</div>
              <div className="text-sm text-green-600">연속 운동</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full mb-3">
                <Dumbbell className="w-6 h-6 text-blue-700" />
              </div>
              <div className="text-2xl mb-1 text-blue-900">{trackingData.filter(d => d.workoutCompleted).length}</div>
              <div className="text-sm text-blue-600">총 운동 일수</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full mb-3">
                <Apple className="w-6 h-6 text-purple-700" />
              </div>
              <div className="text-2xl mb-1 text-purple-900">{trackingData.filter(d => d.mealLogged).length}</div>
              <div className="text-sm text-purple-600">식단 기록</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-200 rounded-full mb-3">
                <Calendar className="w-6 h-6 text-orange-700" />
              </div>
              <div className="text-2xl mb-1 text-orange-900">{new Date().getDate()}일</div>
              <div className="text-sm text-orange-600">오늘</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('workout')}
              className={`px-6 py-3 transition-colors ${
                activeTab === 'workout'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                운동
              </div>
            </button>
            <button
              onClick={() => setActiveTab('meal')}
              className={`px-6 py-3 transition-colors ${
                activeTab === 'meal'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5" />
                식단
              </div>
            </button>
            <button
              onClick={() => setActiveTab('coaching')}
              className={`px-6 py-3 transition-colors ${
                activeTab === 'coaching'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                코칭
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="mb-8">
            {/* Workout Tab */}
            {activeTab === 'workout' && (
              <div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg mb-4 text-indigo-900">오늘의 운동</h3>
                  <div className="space-y-3 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">벤치 프레스</span>
                        <span className="text-gray-600">3세트 × 10회</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">덤벨 플라이</span>
                        <span className="text-gray-600">3세트 × 12회</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">푸시업</span>
                        <span className="text-gray-600">3세트 × 15회</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleWorkoutComplete}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    운동 완료
                  </button>
                </div>

                {todayData?.workoutCompleted && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                      <p className="text-green-700">오늘 운동을 완료했습니다! 🎉</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Meal Tab */}
            {activeTab === 'meal' && (
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg mb-4 text-green-900">식단 기록</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-2 text-gray-700">아침</div>
                      <div className="text-sm text-gray-600">오트밀, 계란 2개, 바나나</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-2 text-gray-700">점심</div>
                      <div className="text-sm text-gray-600">닭가슴살 샐러드, 고구마</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-2 text-gray-700">저녁</div>
                      <div className="text-sm text-gray-600">연어 구이, 브로콜리, 현미밥</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">오늘의 체중 (kg)</label>
                    <input
                      type="number"
                      value={todayWeight}
                      onChange={(e) => setTodayWeight(e.target.value)}
                      placeholder="예: 70"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <button
                    onClick={handleMealLog}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    식단 기록하기
                  </button>
                </div>

                {todayData?.mealLogged && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                      <p className="text-green-700">오늘 식단을 기록했습니다!</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Coaching Tab */}
            {activeTab === 'coaching' && (
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg mb-4 text-blue-900">AI 코칭 피드백</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="mb-2 text-blue-900">💪 운동 조언</div>
                      <p className="text-sm text-gray-700">
                        현재 {getStreak()}일 연속 운동 중입니다! 훌륭합니다. 
                        꾸준함이 가장 중요한 요소이니 이 페이스를 유지하세요.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                      <div className="mb-2 text-green-900">🥗 영양 조언</div>
                      <p className="text-sm text-gray-700">
                        {userInfo.goal === '근육증가' 
                          ? '근육 증가를 위해 체중 1kg당 2g의 단백질 섭취를 권장합니다.'
                          : userInfo.goal === '체중감량'
                          ? '체중 감량을 위해 칼로리 적자를 유지하되, 영양소는 충분히 섭취하세요.'
                          : '균형 잡힌 식단으로 건강을 유지하세요.'}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="mb-2 text-purple-900">💤 회복 조언</div>
                      <p className="text-sm text-gray-700">
                        충분한 수면(7-8시간)과 휴식은 근육 회복과 성장에 필수적입니다.
                        과도한 운동은 오히려 역효과를 낼 수 있으니 주의하세요.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <label className="block mb-2 text-gray-900">메모</label>
                  <textarea
                    value={todayNotes}
                    onChange={(e) => setTodayNotes(e.target.value)}
                    placeholder="오늘의 운동 소감이나 특이사항을 기록하세요..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="mb-4 text-gray-900">최근 활동</h3>
            {trackingData.length === 0 ? (
              <p className="text-gray-500 text-center py-8">아직 기록이 없습니다. 오늘부터 시작해보세요!</p>
            ) : (
              <div className="space-y-2">
                {trackingData.slice(-5).reverse().map((data, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-gray-900">{data.date}</div>
                        {data.weight && (
                          <div className="text-sm text-gray-600">체중: {data.weight}kg</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {data.workoutCompleted && (
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">운동</span>
                      )}
                      {data.mealLogged && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">식단</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
