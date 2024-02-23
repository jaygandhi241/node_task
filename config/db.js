const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect("mongodb://127.0.0.1:27017/node-task", {
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = connectDatabase;
 