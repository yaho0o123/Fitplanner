import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Users, Trophy, Heart } from 'lucide-react';
import { useEffect } from 'react';

export default function AgeRecommendationPage() {
  const navigate = useNavigate();
  const { userInfo, ageCategory } = useAppContext();

  useEffect(() => {
    if (!userInfo || !ageCategory) {
      navigate('/user-info');
    }
  }, [userInfo, ageCategory, navigate]);

  if (!userInfo || !ageCategory) {
    return null;
  }

  const getAgeIcon = () => {
    switch (ageCategory.category) {
      case '청소년':
        return <Users className="w-10 h-10 text-blue-600" />;
      case '성인':
        return <Trophy className="w-10 h-10 text-green-600" />;
      case '중장년':
        return <Heart className="w-10 h-10 text-purple-600" />;
    }
  };

  const getAgeColor = () => {
    switch (ageCategory.category) {
      case '청소년':
        return 'from-blue-50 to-blue-100';
      case '성인':
        return 'from-green-50 to-green-100';
      case '중장년':
        return 'from-purple-50 to-purple-100';
    }
  };

  const getRecommendations = () => {
    switch (ageCategory.category) {
      case '청소년':
        return [
          '자체 중량 운동 중심 (푸시업, 풀업, 스쿼트)',
          '성장판을 고려한 저강도 운동',
          '올바른 운동 자세 습득',
          '주 3-4회, 회당 40-50분',
        ];
      case '성인':
        return [
          '근력 운동과 유산소 운동 병행',
          '목표에 맞는 강도 조절 가능',
          '다양한 운동 기구 활용',
          '주 4-5회, 회당 60-90분',
        ];
      case '중장년':
        return [
          '관절 부담이 적은 운동 선택',
          '스트레칭과 유연성 운동 강화',
          '저~중강도 운동 중심',
          '주 3-4회, 회당 45-60분',
        ];
    }
  };

  const getPrecautions = () => {
    switch (ageCategory.category) {
      case '청소년':
        return [
          '과도한 중량 운동 피하기',
          '성장에 방해되지 않도록 주의',
          '충분한 휴식과 영양 섭취',
        ];
      case '성인':
        return [
          '워밍업과 쿨다운 필수',
          '부상 방지를 위한 정확한 자세',
          '과도한 운동량 지양',
        ];
      case '중장년':
        return [
          '무리한 운동 강도 피하기',
          '만성 질환 고려하기',
          '의료진과 상담 권장',
        ];
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${getAgeColor()} rounded-full mb-4`}>
            {getAgeIcon()}
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">연령별 운동 추천</h1>
          <p className="text-gray-600">나이에 맞는 최적의 운동 강도를 제안합니다</p>
        </div>

        {/* Age Category */}
        <div className={`bg-gradient-to-br ${getAgeColor()} rounded-xl p-6 mb-6`}>
          <div className="text-center">
            <div className="text-2xl mb-2 text-gray-900">{ageCategory.ageGroup}</div>
            <div className="text-lg text-gray-700">{ageCategory.category}</div>
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-6">
          <h3 className="mb-2 text-indigo-900">추천 운동 방식</h3>
          <p className="text-indigo-800">{ageCategory.recommendation}</p>
        </div>

        {/* Detailed Recommendations */}
        <div className="mb-6">
          <h3 className="mb-4 text-gray-900">세부 권장사항</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <ul className="space-y-3">
              {getRecommendations().map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Precautions */}
        <div className="mb-8">
          <h3 className="mb-4 text-gray-900">주의사항</h3>
          <div className="bg-red-50 rounded-xl p-6">
            <ul className="space-y-2">
              {getPrecautions().map((precaution, index) => (
                <li key={index} className="flex items-start text-red-800">
                  <span className="text-red-600 mr-2">⚠</span>
                  {precaution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate('/injury-check')}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          다음 단계로
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
