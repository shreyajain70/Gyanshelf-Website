import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../api";
import { SpinnerButton } from "../../SpinnerButton";


export const SignUpPage = () => {
  const [showLoginDetails, setShowLoginDetails] = useState(false);

  // Personal & Address states
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [VillageTown, setVillageTown] = useState("");
  const [PostOffice, setPostOffice] = useState("");
  const [Tehsil, setTehsil] = useState("");
  const [Distt, setDistt] = useState("");
  const [State, setState] = useState("");
  const [PinCode, setPinCode] = useState("");
  const [EmailID, setEmailID] = useState("");
  const [Password, setPassword] = useState("");

  // Extra states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [mobileError, setMobileError] = useState("");

  // Validation
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (MobileNumber.length !== 10) {
      setMobileError("📱 Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(EmailID)) {
      setMessage({
        text: "📧 Please enter a valid Gmail address (example@gmail.com).",
        type: "error",
      });
      return false;
    }

    if (!passwordRegex.test(Password)) {
      setMessage({
        text: "🔒 Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character.",
        type: "error",
      });
      return false;
    }

    setMobileError("");
    return true;
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNumber(value);
    setMobileError(value.length && value.length !== 10 ? "📱 Mobile number must be exactly 10 digits." : "");
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setShowLoginDetails(true);
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "Please wait...", type: "info" });

    try {
      const response = await api.post("/api/SignUp", {
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
        Password,
      });
      console.log("Submitted Data:", response.data);
      setMessage({
        text: "✅ Account created successfully! Log in to access your dashboard.",
        type: "success",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error Submitting:", err);
      setMessage({ text: "❌ Submission failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignUp-Container">
      <h1 className="SignUp-Title">SignUp</h1>

      {!showLoginDetails && (
        <form>
          <div className="PersonalDetails-Div">
            <h3 className="Section-Title">Personal Details</h3>
            <div className="Form-Group">
              <label>First Name:</label>
              <input type="text" required value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Last Name:</label>
              <input type="text" required value={LastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Gender:</label>
              <select required value={Gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
            <div className="Form-Group">
              <label>Date of Birth:</label>
              <input type="date" required value={DOB} onChange={(e) => setDOB(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Mobile Number:</label>
              <input type="text" required value={MobileNumber} onChange={handleMobileChange} />
              {mobileError && <p className="error-text">{mobileError}</p>}
            </div>
          </div>

          <div className="Address-Div">
            <h3 className="Section-Title">Address Details</h3>
            <div className="Form-Group">
              <label>Village/Town:</label>
              <input type="text" required value={VillageTown} onChange={(e) => setVillageTown(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Post Office:</label>
              <input type="text" required value={PostOffice} onChange={(e) => setPostOffice(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Tehsil:</label>
              <input type="text" required value={Tehsil} onChange={(e) => setTehsil(e.target.value)} />
            </div>
            <div className="Form-Group">
              <label>Distt:</label>
              <select value={Distt} onChange={(e) => setDistt(e.target.value)}>
                <option>Select an option</option>
                <option>Bilaspur</option>
                <option>Chamba</option>
                <option>Hamirpur</option>
                <option>Kangra</option>
                <option>Kinnaur</option>
                <option>Kullu</option>
                <option>Lahaul and Spiti</option>
                <option>Mandi</option>
                <option>Shimla</option>
                <option>Sirmaur</option>
                <option>Solan</option>
                <option>Una</option>
              </select>
            </div>
            <div className="Form-Group">
              <label>State:</label>
              <select value={State} onChange={(e) => setState(e.target.value)}>
                <option>Select an option</option>
                <option>Himachal Pradesh</option>
              </select>
            </div>
            <div className="Form-Group">
              <label>Pin Code:</label>
              <input type="number" value={PinCode} onChange={(e) => setPinCode(e.target.value)} />
            </div>
          </div>

          <button className="Next-Btn" onClick={handleNextClick}>NEXT</button>
        </form>
      )}

      {showLoginDetails && (
        <div className="ReqLoginDetails-Div">
          <h3>Login Details</h3>
          <form onSubmit={SubmitData}>
            <div className="Form-Group">
              <label>Email ID:</label>
              <input type="email" required placeholder="Set EmailID" value={EmailID} onChange={(e) => setEmailID(e.target.value)} />
            </div>
            <div className="Form-Group password-field">
              <label>Password:</label>
              <div className="password-input-wrapper">
                <input type={showPassword ? "text" : "password"} required placeholder="Set Password" className="SignUp-password-input" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {!submitted && <button className="Submit-Btn" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>}
          </form>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </div>
      )}

      <p>
        <span className="login-link">
          Already have an account? <Link to={"/Login"}>Login</Link>
        </span>
      </p>
    </div>
  );
};
