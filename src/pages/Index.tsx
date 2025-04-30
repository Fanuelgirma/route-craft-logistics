
import { useNavigate as useReactRouterNavigate, useEffect } from 'react-router-dom';

const Index = () => {
  const navigate = useReactRouterNavigate();
  
  // Redirect to customers page
  useEffect(() => {
    navigate('/customers');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-600">Redirecting to Customers...</p>
    </div>
  );
};

export default Index;
