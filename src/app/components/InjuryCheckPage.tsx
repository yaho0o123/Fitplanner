import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function InjuryCheckPage() {
  const navigate = useNavigate();
  const { userInfo } = useAppContext();

  useEffect(() => {
    if (!userInfo) {
      navigate('/user-info');
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  const hasInjuries = !userInfo.injuries.includes('없음');

  const injuryGuidance: { [key: string]: string[] } = {
    '허리': [
      '데드리프트, 굿모닝 등 허리에 부담 가는 운동 제외',
      '코어 강화 운동으로 대체',
      '플랭크, 버드독 추천',
    ],
    '무릎': [
      '스쿼트, 런지 등 무릎 굴곡 운동 제한',
      '레그 익스텐션, 레그 컬로 대체',
      '충격이 적은 사이클 추천',
    ],
    '어깨': [
      '오버헤드 프레스, 숄더 프레스 제외',
      '사이드 레터럴 레이즈 등 저강도 운동',
      '로테이터 커프 강화 운동',
    ],
    '손목': [
      '푸시업, 벤치 프레스 시 손목 보호대 착용',
      '덤벨 운동 시 중량 조절',
      '손목 스트레칭 필수',
    ],
    '발목': [
      '점프 동작, 달리기 제한',
      '앉아서 하는 운동 중심',
      '발목 테이핑 또는 보호대 착용',
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            hasInjuries ? 'bg-orange-100' : 'bg-green-100'
          }`}>
            <ShieldAlert className={`w-10 h-10 ${hasInjuries ? 'text-orange-600' : 'text-green-600'}`} />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">부상 여부 확인</h1>
          <p className="text-gray-600">안전한 운동을 위한 부상 부위 고려</p>
        </div>

        {/* Injury Status */}
        <div className={`rounded-xl p-6 mb-6 ${
          hasInjuries ? 'bg-orange-50 border-2 border-orange-200' : 'bg-green-50 border-2 border-green-200'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            {hasInjuries ? (
              <>
                <XCircle className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl text-orange-900">부상 있음</h2>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl text-green-900">부상 없음</h2>
              </>
            )}
          </div>
          <div className="text-center">
            {hasInjuries ? (
              <p className="text-orange-800">
                다음 부위: <span className="font-semibold">{userInfo.injuries.join(', ')}</span>
              </p>
            ) : (
              <p className="text-green-800">모든 운동을 안전하게 진행할 수 있습니다</p>
            )}
          </div>
        </div>

        {/* Injury-Specific Guidance */}
        {hasInjuries && (
          <div className="mb-8">
            <h3 className="mb-4 text-gray-900">부위별 운동 가이드</h3>
            <div className="space-y-4">
              {userInfo.injuries
                .filter(injury => injury !== '없음')
                .map((injury) => (
                  <div key={injury} className="bg-gray-50 rounded-xl p-6">
                    <h4 className="mb-3 text-gray-900">{injury} 부상</h4>
                    <ul className="space-y-2">
                      {injuryGuidance[injury]?.map((guide, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="text-indigo-600 mr-2">•</span>
                          {guide}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* General Safety Tips */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="mb-4 text-blue-900">안전 운동 수칙</h3>
          <ul className="space-y-2">
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">✓</span>
              운동 전후 충분한 스트레칭
            </li>
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">✓</span>
              통증이 느껴지면 즉시 중단
            </li>
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">✓</span>
              정확한 자세로 천천히 실행
            </li>
            <li className="flex items-start text-blue-800">
              <span className="text-blue-600 mr-2">✓</span>
              무리한 중량보다 올바른 동작
            </li>
            {hasInjuries && (
              <li className="flex items-start text-blue-800">
                <span className="text-blue-600 mr-2">✓</span>
                전문의와 상담 후 운동 시작 권장
              </li>
            )}
          </ul>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate('/workout-split')}
          className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          다음 단계로
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
