
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-6">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
