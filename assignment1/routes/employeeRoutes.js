const express = require("express");
const Employee = require("../models/employee");
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post("/employees", 
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isISO8601().withMessage('Valid date is required'),
    body('department').notEmpty().withMessage('Department is required')
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      });

      const savedEmployee = await newEmployee.save();
      res.status(201).json({
        message: "Employee created successfully.",
        employee_id: savedEmployee._id, 
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Server error." });
    }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/employees/:id", async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving employee:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.put("/employees/:id", 
  [
    body('position').optional().notEmpty().withMessage('Position cannot be empty'),
    body('salary').optional().isNumeric().withMessage('Salary must be a number')
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const employeeId = req.params.id;
    const { position, salary } = req.body;

    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { position, salary },
        { new: true, runValidators: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }

      res.status(200).json({ message: "Employee details updated successfully." });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Server error." });
    }
});

router.delete("/employees", async (req, res) => {
  const employeeId = req.query.eid;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(204).send(); // No content response 
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
