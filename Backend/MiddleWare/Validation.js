const Validator = require("validator");

const UserValidation = (req) => {
    const { FirstName, LastName, Gender, DOB, MobileNumber, VillageTown, PostOffice, Tehsil, Distt, State, PinCode, EmailID, Password } = req.body;

    if (!FirstName || !LastName) {
        throw new Error("Names are not valid");
    } 
    else if (!Validator.isEmail(EmailID)) {
        throw new Error("Email id not valid");
    } 
    else if (!Validator.isStrongPassword(Password)) {
        throw new Error("Password is not strong");
    } 
    else if (!Validator.isMobilePhone(MobileNumber.toString(), "any")) {
        throw new Error("Mobile number is not valid");
    }
};
module.exports = UserValidation;
