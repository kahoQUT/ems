const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find({ status: 'Active' }).populate('department');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const addEmployee = async (req, res) => {
    const { name, email, department, salary, phone } = req.body;
    try {
      const employee = await Employee.create({ name, email, department, salary, phone });
      const populatedEmployee = await employee.populate('department');
      res.status(201).json(populatedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    const { name, email, department, salary, phone } = req.body;
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.phone = phone || employee.phone;
      employee.department = department || employee.department;
      employee.salary = salary ?? employee.salary;
  
      const updated = await employee.save();
      const populatedEmployee = await updated.populate('department');
      res.json(populatedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
const deleteEmployee = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      await employee.remove();
      res.json({ message: 'Employee deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };