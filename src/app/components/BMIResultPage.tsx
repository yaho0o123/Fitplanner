import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useEffect } from 'react';

export default function BMIResultPage() {
  const navigate = useNavigate();
  const { userInfo, bmiResult, setAgeCategory } = useAppContext();

  useEffect(() => {
    if (!userInfo || !bmiResult) {
      navigate('/user-info');
    }
  }, [userInfo, bmiResult, navigate]);

  if (!userInfo || !bmiResult) {
    return null;
  }

  const handleNext = () => {
    // Determine age category
    let category: '청소년' | '성인' | '중장년';
    let ageGroup: string;
    let recommendation: string;

    if (userInfo.age <= 18) {
      category = '청소년';
      ageGroup = '18세 이하';
      recommendation = '성장기에 맞는 저강도 자체 중량 운동';
    } else if (userInfo.age <= 49) {
      category = '성인';
      ageGroup = '19-49세';
      recommendation = '근력과 체력 향상을 위한 그대로 진행';
    } else {
      category = '중장년';
      ageGroup = '50세 이상';
      recommendation = '관절 건강을 고려한 약강도 중심 운동';
    }

    setAgeCategory({ category, ageGroup, recommendation });

    if (bmiResult.needsDiet) {
      navigate('/diet-recommendation');
    } else {
      navigate('/age-recommendation');
    }
  };

  const getBMIColor = () => {
    switch (bmiResult.category) {
      case '저체중':
        return 'text-blue-600';
      case '정상':
        return 'text-green-600';
      case '과체중':
        return 'text-orange-600';
      case '비만':
        return 'text-red-600';
    }
  };

  const getBMIIcon = () => {
    switch (bmiResult.category) {
      case '저체중':
        return <TrendingDown className="w-16 h-16" />;
      case '정상':
        return <Minus className="w-16 h-16" />;
      case '과체중':
      case '비만':
        return <TrendingUp className="w-16 h-16" />;
    }
  };

  const getBMIDescription = () => {
    switch (bmiResult.category) {
      case '저체중':
        return '체중이 부족합니다. 근육 증가와 영양 섭취가 필요합니다.';
      case '정상':
        return '건강한 체중입니다. 현재 상태를 유지하세요!';
      case '과체중':
        return '체중이 다소 높습니다. 유산소와 식단 조절이 권장됩니다.';
      case '비만':
        return '체중 감량이 필요합니다. 다이어트 프로그램을 추천합니다.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
            <Activity className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">BMI 분석 결과</h1>
          <p className="text-gray-600">당신의 체질량 지수 분석이 완료되었습니다</p>
        </div>

        {/* BMI Score */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">BMI 지수</p>
            <div className="text-6xl mb-4 text-indigo-600">
              {bmiResult.bmi.toFixed(1)}
            </div>
            <div className={`inline-flex items-center gap-2 ${getBMIColor()}`}>
              {getBMIIcon()}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <div className={`text-center p-6 rounded-xl border-2 ${
            bmiResult.category === '정상' ? 'border-green-300 bg-green-50' :
            bmiResult.category === '저체중' ? 'border-blue-300 bg-blue-50' :
            bmiResult.category === '과체중' ? 'border-orange-300 bg-orange-50' :
            'border-red-300 bg-red-50'
          }`}>
            <div className="text-2xl mb-2">{bmiResult.category}</div>
            <p className="text-gray-700">{getBMIDescription()}</p>
          </div>
        </div>

        {/* BMI Scale */}
        <div className="mb-8">
          <div className="h-3 rounded-full overflow-hidden flex">
            <div className="flex-1 bg-blue-400"></div>
            <div className="flex-1 bg-green-400"></div>
            <div className="flex-1 bg-orange-400"></div>
            <div className="flex-1 bg-red-400"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>&lt;18.5</span>
            <span>18.5-25</span>
            <span>25-30</span>
            <span>≥30</span>
          </div>
        </div>

        {/* User Info Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="mb-4 text-gray-900">입력 정보</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">나이</p>
              <p className="text-gray-900">{userInfo.age}세</p>
            </div>
            <div>
              <p className="text-gray-600">키</p>
              <p className="text-gray-900">{userInfo.height}cm</p>
            </div>
            <div>
              <p className="text-gray-600">몸무게</p>
              <p className="text-gray-900">{userInfo.weight}kg</p>
            </div>
            <div>
              <p className="text-gray-600">목표</p>
              <p className="text-gray-900">{userInfo.goal}</p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          다음 단계로
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
