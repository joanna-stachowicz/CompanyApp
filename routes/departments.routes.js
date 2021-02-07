const express = require('express');
const DepartmentController = require('../controllers/department.controller');
const router = express.Router();

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getOne);

router.post('/departments', DepartmentController.addOne);

router.put('/departments/:id', DepartmentController.changeOne);

router.delete('/departments/:id', DepartmentController.deleteOne);

module.exports = router;
