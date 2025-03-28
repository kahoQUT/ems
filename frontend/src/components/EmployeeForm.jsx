import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EmployeeForm = ({ employees, departments, setEmployees, editingEmployee, setEditingEmployee }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', salary: '', department:'', phone:'' });
  
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        salary: editingEmployee.salary || '',
        department: editingEmployee.department?._id || '',
        phone: editingEmployee.phone || ''
      });
    } else {
      setFormData({ name: '', email: '', salary: '', department:'', phone:'' });
    }
  }, [editingEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const response = await axiosInstance.put(`/api/employees/${editingEmployee._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees(employees.map((employee) => (employee._id === response.data._id ? response.data : employee)));
      } else {
        const response = await axiosInstance.post('/api/employees', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees([...employees, response.data]);
      }
      setEditingEmployee(null);
      setFormData({ name: '', email: '', salary: '', department:'', phone:'' });
    } catch (error) {
      alert('Failed to save employee.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingEmployee ? 'Update Employee' : 'Create Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
