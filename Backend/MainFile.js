const express = require("express");
const App = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./Database/ConnectDB");

// Load environment variables
dotenv.config();

// Middleware
App.use(BodyParser.json());

// ✅ Allowed origins (local + prod)
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PROD,
];

// ✅ CORS setup
const CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
App.use(cors(CorsOptions));

// Routes
const SignUpRoute = require("./routes/SignUpRoute");
const LoginRoute = require("./routes/LoginRoute");
const dashboardRoutes = require("./routes/DashboardGetUserDetails");
const SellRoute = require("./routes/SellPageRoute");
const GetBookCards = require("./routes/GetBookCards");
const UpdateProfile = require("./routes/UpdateProfile");
const BookDetailsRoute = require("./routes/BookDetailsRoute");
const CartRoute = require("./routes/AddtoCart");
const BooksPostedRoute = require("./routes/BooksPosted");
const ForgetPassword = require("./routes/ForgetPassword");

App.use("/SignUp", SignUpRoute);
App.use("/Login", LoginRoute);
App.use("/Dashboard", dashboardRoutes);
App.use("/SellPage", SellRoute);
App.use("/PostedBooks", GetBookCards);
App.use("/UpdateProfile", UpdateProfile);
App.use("/books", BookDetailsRoute);
App.use("/AddToCart", CartRoute);
App.use("/BooksPosted", BooksPostedRoute);
App.use("/ForgetPassword", ForgetPassword);

// Database + Server

ConnectDB().then(() => {
  const PORT = process.env.PORT || 5000; // ✅ now from .env
  App.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
