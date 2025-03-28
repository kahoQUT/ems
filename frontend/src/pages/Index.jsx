import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 text-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
        Welcome to Employee Management System
      </h1>
      <p className="text-lg md:text-xl text-blue-800 mb-8 max-w-xl">
        Streamline your employee, department, and salary management with ease. Secure, fast, and simple.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
      {user ? (
        <>
        <Link
            to="/employees"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
        >
            Manage Employees
        </Link>
        <Link
            to="/departments"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg"
        >
            Manage Departments
        </Link>
        </>
      ):(
        <>
            <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded text-lg"
            >
            Login
            </Link>
        </>
      )}
        
        
      </div>
    </div>
  );
};

export default Index;
