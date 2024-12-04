const Employee = require('../models/Employee');

exports.getDepartmentHeadcount = async (req, res) => {
  try {
    const headcount = await Employee.aggregate([
      { $group: { 
        _id: '$department', 
        count: { $sum: 1 } 
      }}
    ]);
    
    res.json(headcount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalEmployees = async (req, res) => {
  try {
    const total = await Employee.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};