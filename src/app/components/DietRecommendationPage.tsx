import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Apple, Salad, Flame } from 'lucide-react';
import { useEffect } from 'react';

export default function DietRecommendationPage() {
  const navigate = useNavigate();
  const { userInfo, bmiResult } = useAppContext();

  useEffect(() => {
    if (!userInfo || !bmiResult) {
      navigate('/user-info');
    }
  }, [userInfo, bmiResult, navigate]);

  if (!userInfo || !bmiResult) {
    return null;
  }

  const isUnderweight = bmiResult.category === '저체중';
  const dietTitle = isUnderweight ? '체중 증가 식단' : '다이어트 식단';
  const dietDescription = isUnderweight
    ? '건강한 체중 증가를 위한 영양 섭취 가이드'
    : '건강한 체중 감량을 위한 칼로리 조절 가이드';

  const recommendations = isUnderweight
    ? [
        {
          icon: <Apple className="w-8 h-8 text-green-600" />,
          title: '고칼로리 영양식',
          description: '하루 기초대사량 + 500kcal 섭취',
          items: ['견과류, 아보카도', '단백질 쉐이크', '복합 탄수화물'],
        },
        {
          icon: <Salad className="w-8 h-8 text-blue-600" />,
          title: '규칙적인 식사',
          description: '3대 식사 + 2회 간식',
          items: ['하루 5-6회 소량 섭취', '취침 2시간 전 단백질', '충분한 수분 섭취'],
        },
        {
          icon: <Flame className="w-8 h-8 text-orange-600" />,
          title: '근육 증가 중심',
          description: '단백질 체중 1kg당 1.8-2g',
          items: ['닭가슴살, 계란, 생선', '고구마, 현미, 귀리', '우유, 치즈, 요거트'],
        },
      ]
    : [
        {
          icon: <Apple className="w-8 h-8 text-green-600" />,
          title: '칼로리 적자',
          description: '하루 기초대사량 - 500kcal',
          items: ['채소 중심 식단', '저지방 단백질', '정제 탄수화물 제한'],
        },
        {
          icon: <Salad className="w-8 h-8 text-blue-600" />,
          title: '균형 잡힌 식사',
          description: '탄수화물 40% | 단백질 30% | 지방 30%',
          items: ['통곡물 선택', '충분한 채소', '가공식품 제한'],
        },
        {
          icon: <Flame className="w-8 h-8 text-orange-600" />,
          title: '지속 가능한 습관',
          description: '천천히 꾸준히 감량',
          items: ['주 0.5-1kg 감량', '물 2L 이상', '야식 피하기'],
        },
      ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Apple className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">{dietTitle}</h1>
          <p className="text-gray-600">{dietDescription}</p>
        </div>

        {/* Diet Recommendations */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <div className="mb-4">{rec.icon}</div>
              <h3 className="text-lg mb-2 text-gray-900">{rec.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
              <ul className="space-y-2">
                {rec.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                식단 조절은 전문가와 상담 후 진행하는 것을 권장합니다. 극단적인 식단 제한은 건강에 해로울 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate('/age-recommendation')}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          다음 단계로
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
