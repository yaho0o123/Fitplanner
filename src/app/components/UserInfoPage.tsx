import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, User, Ruler, Weight, Target, AlertCircle } from 'lucide-react';

export default function UserInfoPage() {
  const navigate = useNavigate();
  const { setUserInfo, setBMIResult } = useAppContext();

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState<'근육증가' | '체중감량' | '체력향상' | '건강유지'>('근육증가');
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>([]);

  const injuries = ['없음', '허리', '무릎', '어깨', '손목', '발목'];

  const handleInjuryToggle = (injury: string) => {
    if (injury === '없음') {
      setSelectedInjuries(['없음']);
    } else {
      const filtered = selectedInjuries.filter(i => i !== '없음');
      if (selectedInjuries.includes(injury)) {
        setSelectedInjuries(filtered.filter(i => i !== injury));
      } else {
        setSelectedInjuries([...filtered, injury]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userInfo = {
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      goal,
      injuries: selectedInjuries.length === 0 ? ['없음'] : selectedInjuries,
    };

    setUserInfo(userInfo);

    // Calculate BMI
    const heightInMeters = parseInt(height) / 100;
    const bmi = parseInt(weight) / (heightInMeters * heightInMeters);

    let category: '저체중' | '정상' | '과체중' | '비만';
    let needsDiet = false;

    if (bmi < 18.5) {
      category = '저체중';
      needsDiet = true;
    } else if (bmi < 25) {
      category = '정상';
      needsDiet = false;
    } else if (bmi < 30) {
      category = '과체중';
      needsDiet = true;
    } else {
      category = '비만';
      needsDiet = true;
    }

    setBMIResult({ bmi, category, needsDiet });
    navigate('/bmi-result');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">기본 정보 입력</h1>
          <p className="text-gray-600">맞춤 운동 프로그램을 위한 정보를 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <User className="w-5 h-5" />
              나이
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="예: 25"
              required
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <Ruler className="w-5 h-5" />
              키 (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="예: 170"
              required
              min="100"
              max="250"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <Weight className="w-5 h-5" />
              몸무게 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="예: 70"
              required
              min="30"
              max="300"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <Target className="w-5 h-5" />
              운동 목표
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['근육증가', '체중감량', '체력향상', '건강유지'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    goal === g
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Injuries */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-gray-700">
              <AlertCircle className="w-5 h-5" />
              부상 여부
            </label>
            <div className="grid grid-cols-3 gap-3">
              {injuries.map((injury) => (
                <button
                  key={injury}
                  type="button"
                  onClick={() => handleInjuryToggle(injury)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedInjuries.includes(injury)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {injury}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            다음 단계로
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
