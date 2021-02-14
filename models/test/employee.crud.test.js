const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

let fakeDB;
describe('Employee', () => {

  before(async () => {

    try {
      fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    mongoose.models = {};
    await mongoose.disconnect();
    await fakeDB.stop();
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', departmentId: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      await testEmpThree.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 3;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' });
      const expectedFirstName = 'Amanda';
      const expectedLastName = 'Doe';
      const expectedDepartmentId = 'Marketing';
      expect(employee.firstName).to.be.equal('Amanda');
      expect(employee.lastName).to.be.equal('Doe');
      expect(employee.departmentId).to.be.equal('Marketing');
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', departmentId: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      await testEmpThree.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Doe', departmentId: 'IT' }, { $set: { firstName: '=John=', lastName: '=Doe=', departmentId: '=IT=' } });
      const updatedEmployee = await Employee.findOne({ firstName: '=John=', lastName: '=Doe=', departmentId: '=IT=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', departmentId: 'IT' });
      employee.firstName = '=John=';
      employee.lastName = '=Doe=';
      employee.departmentId = '=IT=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=John=', lastName: '=Doe=', departmentId: '=IT=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Updated!', departmentId: 'Updated!' } });
      const employee = await Employee.find({ firstName: 'Updated!', lastName: 'Updated!', departmentId: 'Updated!' });
      expect(employee.length).to.be.equal(3);
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', departmentId: 'IT' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      await testEmpThree.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      const removedEmployee = await Employee.findOne({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
    });

  });

});