import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/employees', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        alert('Failed to fetch employees.'+error);
      }
    };
    fetchEmployees();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />
      <EmployeeList employees={employees} setEmployees={setEmployees} setEditingEmployee={setEditingEmployee} />
    </div>
  );
}

export default Employees;
