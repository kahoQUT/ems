import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const DepartmentForm = ({ departments, setDepartments, editingDepartment, setEditingDepartment }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    status: 'Active'
  });

  useEffect(() => {
    if (editingDepartment) {
      setFormData({
        name: editingDepartment.name || '',
        status: editingDepartment.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        status: 'Active'
      });
    }
  }, [editingDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDepartment) {
        const res = await axiosInstance.put(`/api/departments/${editingDepartment._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setDepartments(
          departments.map((dept) => (dept._id === res.data._id ? res.data : dept))
        );
      } else {
        const res = await axiosInstance.post('/api/departments', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setDepartments([...departments, res.data]);
      }

      setEditingDepartment(null);
      setFormData({ name: '', status: 'Active' });
    } catch (error) {
      alert('Failed to save department.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingDepartment ? 'Edit Department' : 'Add Department'}
      </h1>

      <input
        type="text"
        placeholder="Department Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingDepartment ? 'Update Department' : 'Create Department'}
      </button>
    </form>
  );
};

export default DepartmentForm;
