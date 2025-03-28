import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const DepartmentList = ({ departments, setDepartments, setEditingDepartment }) => {
  const { user } = useAuth();

  return (
    <div>
      {departments.map((dept) => (
        <div key={dept._id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-lg">{dept.name}</h2>
          <p>Status: <span className={dept.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{dept.status}</span></p>
          <div className="mt-2">
            <button
              onClick={() => setEditingDepartment(dept)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
