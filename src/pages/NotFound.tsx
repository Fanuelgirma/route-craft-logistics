
import { useNavigate } from 'react-router-dom';
import ActionButton from '@/components/ui/ActionButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-logistic-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page not found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <ActionButton 
          variant="primary"
          onClick={() => navigate('/customers')}
        >
          Go to Customers
        </ActionButton>
      </div>
    </div>
  );
};

export default NotFound;
