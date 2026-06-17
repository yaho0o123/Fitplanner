import { useNavigate } from 'react-router';
import { Dumbbell, Target, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-6">
              <Dumbbell className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl mb-4 text-gray-900">
              당신만의 맞춤 운동 프로그램
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              체계적인 분석을 통해 나에게 딱 맞는 운동 루틴을 만들어보세요
            </p>
            <button
              onClick={() => navigate('/user-info')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              시작하기
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">개인 맞춤 분석</h3>
              <p className="text-gray-600">
                나이, 체형, 목표에 따른 정밀한 분석
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">과학적 운동 설계</h3>
              <p className="text-gray-600">
                BMI와 건강 상태를 고려한 프로그램
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg mb-2 text-gray-900">체계적 관리</h3>
              <p className="text-gray-600">
                운동, 식단, 코칭을 한 곳에서
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600">
        <p>건강한 몸, 건강한 삶을 위한 첫 걸음</p>
      </footer>
    </div>
  );
}
