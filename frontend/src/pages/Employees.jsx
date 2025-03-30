import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/employees', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees(response.data);
        const res = await axiosInstance.get('/api/departments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDepartments(res.data);
      } catch (error) {
        alert('Failed to fetch employees.');
        navigate('/login');
      }
    };
    fetchEmployees();
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-6">
      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
        departments={departments}
      />
      <EmployeeList employees={employees} setEmployees={setEmployees} setEditingEmployee={setEditingEmployee} />
    </div>
  );
}

export default Employees;
