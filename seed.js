const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderModel = require('./models/orderModel');
const foodModel = require('./models/foodModel');
const userModel = require('./models/userModel');

dotenv.config();

async function seedOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Fetch some foods and users
    const foods = await foodModel.find().limit(3);
    const users = await userModel.find().limit(2);

    if (foods.length === 0 || users.length === 0) {
      console.log('No foods or users found. Seed those first.');
      return;
    }

    // Create sample orders
    const orders = [
      {
        foods: [foods[0]._id, foods[1]._id],
        payment: foods[0].price + foods[1].price,
        buyer: users[0]._id,
        status: 'preparing',
      },
      {
        foods: [foods[2]._id],
        payment: foods[2].price,
        buyer: users[1]._id,
        status: 'deliverd',
      },
    ];

    await orderModel.insertMany(orders);
    console.log('Sample orders seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.disconnect();
  }
}

seedOrders();
