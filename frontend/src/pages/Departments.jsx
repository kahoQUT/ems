import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import DepartmentForm from '../components/DepartmentForm';
import DepartmentList from '../components/DepartmentList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.token) return;

    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get('/api/departments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        alert('Failed to fetch departments.');
        navigate('/login');
      }
    };
    fetchDepartments();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <DepartmentForm
        departments={departments}
        setDepartments={setDepartments}
        editingDepartment={editingDepartment}
        setEditingDepartment={setEditingDepartment}
      />
      <DepartmentList
        departments={departments}
        setDepartments={setDepartments}
        setEditingDepartment={setEditingDepartment}
      />
    </div>
  );
};

export default Departments;
