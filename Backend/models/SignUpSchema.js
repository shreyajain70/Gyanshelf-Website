const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Gender: {
        type: String,
        required: true,
        validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender not Valid...")
            }
        }

    },
    DOB: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: Number,
        required: true
    },
    VillageTown: {
        type: String,
        required: true,
        trim: true
    },
    PostOffice: {
        type: String,
        required: true,
        trim: true
    },
    Tehsil: {
        type: String,
        required: true,
        trim: true
    },
    Distt: {
        type: String,
        required: true,
        trim: true
    },
    State: {
        type: String,
        required: true,
        trim: true
    },
    PinCode: {
        type: Number,
        required: true,
        trim: true
    },
    EmailID: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("EmailID not Valid...")
            }
        }
    },
    Password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password not Valid...")
            }
        }
    },
    resetOTP: { type: String },
    resetOTPExpiry: { type: Date },

}, { timestamps: true })

const SignUpSchema = mongoose.model("SignUpGyanShelf", UserSchema);
module.exports = SignUpSchema;