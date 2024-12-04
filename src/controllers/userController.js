const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      department 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      department
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: user._id 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { role, department } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (department) query.department = department;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent password update through this method
    delete updateData.password;

    const user = await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({ 
      message: 'User updated successfully', 
      user 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating user', 
      error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({ 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting user', 
      error: error.message 
    });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      id, 
      { isActive }, 
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.json({ 
      message: 'User status updated', 
      user 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating user status', 
      error: error.message 
    });
  }
};