const express = require('express');
const EmployeeController = require('../controllers/employee.controller');
const router = express.Router();

router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getOne);

router.post('/employees', EmployeeController.addOne);

router.put('/employees/:id', EmployeeController.changeOne);

router.delete('/employees/:id', EmployeeController.deleteOne);

module.exports = router;
