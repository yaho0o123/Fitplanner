import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl mb-4">404</div>
          <h1 className="text-3xl mb-2 text-gray-900">페이지를 찾을 수 없습니다</h1>
          <p className="text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
