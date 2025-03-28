
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Employee = require('../models/Employee');
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;

describe('Employee Controller', () => {
  afterEach(() => {
    sinon.restore(); // <-- This resets all stubs/mocks after each test
  });


describe('addEmployee Function Test', () => {

  it('should create a new employee successfully', async () => {
    // Mock request data
    const req = {
      body: { name: "Ben Davis", department: new mongoose.Types.ObjectId(), salary: 70000, email: "1@1.com", phone: '12341234' }
    };

    // Mock employee that would be created
    const createdEmployee = { _id: new mongoose.Types.ObjectId(), ...req.body, populate: sinon.stub().resolvesThis()};

    // Stub Employee.create to return the created
    const createStub = sinon.stub(Employee, 'create').resolves(createdEmployee);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addEmployee(req, res);

    // Assertions
    expect(createStub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdEmployee)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Employee.create to throw an error
    const createStub = sinon.stub(Employee, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: "Ben Davis", department: new mongoose.Types.ObjectId(), salary: 70000, email: "1@1.com", phone: '12341234' }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addEmployee(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});


describe('Update Function Test', () => {

  it('should update employee successfully', async () => {
    // Mock employee data
    const employeeId = new mongoose.Types.ObjectId();
    const existingEmployee = {
      _id: employeeId,
      name: "Old Name",
      department: new mongoose.Types.ObjectId(),
      salary: 80000, 
      email: "old@1.com",
      phone: "12341234",
      save: sinon.stub().resolvesThis(), // Mock save method
      populate: sinon.stub().resolvesThis()
    };
    // Stub Employee.findById to return mock employee
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(existingEmployee);

    // Mock request & response
    const req = {
      params: { id: employeeId },
      body: { name: "New Name", salary: 60000 }
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateEmployee(req, res);

    // Assertions
    expect(existingEmployee.name).to.equal("New Name");
    expect(existingEmployee.salary).to.equal(60000);
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if Employee is not found', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEmployee(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEmployee(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });

});



describe('GetEmployee Function Test', () => {

  it('should return employees for the given user', async () => {

    // Mock employees data
    const employees = [
      { _id: new mongoose.Types.ObjectId(), email: "1@1.com", department: { name: 'HR' } },
      { _id: new mongoose.Types.ObjectId(), email: "2@2.com", department: { name: 'HR' } }
    ];

    // Stub employee.find to return mock employees
    const populateStub = sinon.stub().resolves(employees);
    const findStub = sinon.stub(Employee, 'find').returns({ populate: populateStub });

    // Mock request & response
    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getEmployees(req, res);

    // Assertions
    expect(findStub.calledOnce).to.be.true;
    expect(populateStub.calledWith('department')).to.be.true;
    expect(res.json.calledWith(employees)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

  it('should return 500 on error', async () => {
    // Stub Employee.find to throw an error
    const findStub = sinon.stub(Employee, 'find').throws(new Error('DB Error'));

    // Mock request & response
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getEmployees(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findStub.restore();
  });

});



describe('DeleteEmployee Function Test', () => {

  it('should delete a Employee successfully', async () => {
    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock Employee found in the database
    const employee = { remove: sinon.stub().resolves() };

    // Stub Employee.findById to return the mock Employee
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(employee);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(employee.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Employee deleted' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if employee is not found', async () => {
    // Stub employee.findById to return null
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub employee.findById to throw an error
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

});
});