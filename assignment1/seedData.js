const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Employee = require("./models/employee");

const sampleUsers = [
  {
    username: "johndoe",
    email: "johndoe@example.com",
    password: "StrongPass123!",
  },
  {
    username: "janedoe",
    email: "janedoe@example.com",
    password: "SecurePass456@",
  },
];

const sampleEmployees = [
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    position: "Senior Designer",
    salary: 85000,
    date_of_joining: new Date("2023-08-10T00:00:00.000Z"),
    department: "Creative Design",
  },
  {
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    position: "Lead Developer",
    salary: 95000,
    date_of_joining: new Date("2023-08-01T00:00:00.000Z"),
    department: "Software Engineering",
  },
  {
    first_name: "Charlie",
    last_name: "Brown",
    email: "charlie.brown@example.com",
    position: "Product Manager",
    salary: 88000,
    date_of_joining: new Date("2023-09-15T00:00:00.000Z"),
    department: "Product Management",
  }
];

async function seedData() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data (optional, uncomment if you want to reset)
    // await User.deleteMany({});
    // await Employee.deleteMany({});

    // Seed Users with hashed passwords
    for (const user of sampleUsers) {
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = new User({
          username: user.username,
          email: user.email,
          password: hashedPassword
        });

        await newUser.save();
        console.log(`✅ User created: ${user.username}`);
      } else {
        console.log(`ℹ️ User already exists: ${user.username}`);
      }
    }

    // Seed Employees
    for (const employee of sampleEmployees) {
      const existingEmployee = await Employee.findOne({ email: employee.email });

      if (!existingEmployee) {
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        console.log(`✅ Employee created: ${employee.first_name} ${employee.last_name}`);
      } else {
        console.log(`ℹ️ Employee already exists: ${employee.first_name} ${employee.last_name}`);
      }
    }

    console.log("✨ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
}

module.exports = seedData;