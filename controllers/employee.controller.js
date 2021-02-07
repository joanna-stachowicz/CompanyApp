const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('departmentId'));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand).populate('departmentId');
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await (await Employee.findById(req.params.id).populate('departmentId'));
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, departmentId } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, departmentId: departmentId });
    await newEmployee.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { firstName, lastName, departmentId } = req.body;
  try {
    const dep = await (Employee.findById(req.params.id));
    if (dep) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, departmentId: departmentId } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const dep = await (Employee.findById(req.params.id));
    if (dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};