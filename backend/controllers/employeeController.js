const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find().populate('department');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const addEmployee = async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;
    try {
      const employee = await Employee.create({ firstName, lastName, email, department, salary });
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      employee.firstName = firstName || employee.firstName;
      employee.lastName = lastName || employee.lastName;
      employee.email = email || employee.email;
      employee.department = department || employee.department;
      employee.salary = salary ?? employee.salary;
  
      const updated = await employee.save();
      res.json(updated);
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