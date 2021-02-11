const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no firstName, lastName and departmentId args', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.departmentId).to.exist;
    });

  });

  it('should throw an error if "firstName", "lastName" or "departmentId" are not a string', () => {
    const cases = [{}, []];

    for (let firstName of cases) {
      const emp = new Employee({ firstName });

      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });

    };

    for (let lastName of cases) {
      const emp = new Employee({ lastName });

      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });

    };

    for (let departmentId of cases) {
      const emp = new Employee({ departmentId });

      emp.validate(err => {
        expect(err.errors.departmentId).to.exist;
      });

    };

  });

  it('should not throw an error if "firstName", "lastName" and "departmentId" are okay', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', departmentId: 'IT' },
      { firstName: 'Amanda', lastName: 'Doe', departmentId: 'Marketing' },
      { firstName: 'Emma', lastName: 'Cowell', departmentId: 'Testing' }
    ];

    for (let arg of cases) {
      const emp = new Employee(arg);

      emp.validate(err => {
        expect(err).to.not.exist;
      });

    };

  });

});