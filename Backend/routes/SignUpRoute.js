const UserValidation = require("../MiddleWare/Validation");
const SignUpSchema = require("../models/SignUpSchema");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    UserValidation(req);
    const { FirstName, LastName, Gender, DOB, MobileNumber, VillageTown, PostOffice, Tehsil, Distt, State, PinCode, EmailID, Password } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new SignUpSchema({
      FirstName,
      LastName,
      Gender,
      DOB,
      MobileNumber,
      VillageTown,
      PostOffice,
      Tehsil,
      Distt,
      State,
      PinCode,
      EmailID,
      Password: hashedPassword
    });

    await newUser.save();

    console.log("User Registered:", EmailID);
    res.status(201).json({ message: "Account created successfully!" });

  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
