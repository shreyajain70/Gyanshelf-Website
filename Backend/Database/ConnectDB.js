const mongoose = require('mongoose');
require('dotenv').config(); // load .env variables

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database Connected Successfully");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
};

module.exports = ConnectDB;
