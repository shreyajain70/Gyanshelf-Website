  import React, { useState } from "react";
  import api from "../../api"; // import axios instance

  export const SellPage = () => {
    const [showBookQuality, setShowBookQuality] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    // 🔹 Form states
    const [formData, setFormData] = useState({
      Title: "",
      Description: "",
      Class: "",
      Board: "",
      Edition: "",
      MRP: "",
      userId: localStorage.getItem("userId"),
    });

    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);

    // 🔹 handle inputs
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextClick = (e) => {
      e.preventDefault();
      setShowBookQuality(true);
    };

    const handleQualityClick = (quality) => {
      setSelectedQuality(quality);
    };

    // 🔹 Handle Agree Click
    const handleAgreeClick = () => {
      if (!selectedQuality) {
        alert("⚠️ Please select the condition of the book first.");
        return;
      }
      setAgreed(true);
    };

    // 🔹 Final Post
    const handlePost = async () => {
      if (!selectedQuality || !agreed) {
        alert("Please select quality and agree to the rules");
        return;
      }

      try {
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
        });

        data.append("Quality", selectedQuality);
        data.append("IAgree", agreed);

        if (frontImage) data.append("FrontImage", frontImage);
        if (backImage) data.append("BackImage", backImage);

        const res = await api.post("/SellPage/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(res.data.message || "✅ Book uploaded successfully!");
        console.log("Uploaded book:", res.data.book);

        // reset
        setShowBookQuality(false);
        setSelectedQuality("");
        setAgreed(false);
        setFormData({
          Title: "",
          Description: "",
          Class: "",
          Board: "",
          Edition: "",
          MRP: "",
          userId: localStorage.getItem("userId"),
        });
        setFrontImage(null);
        setBackImage(null);
      } catch (err) {
        console.error("❌ Upload failed:", err);
        alert("Failed to upload book");
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        {/* ===== Step 1: Book Details Form ===== */}
        {!showBookQuality && (
          <div className="sell-page">
            <form className="sell-form" onSubmit={handleNextClick}>
              <h2 className="form-title">Sell Your Book</h2>

              <div className="form-group">
                <label className="form-label">Title of the Book</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description of the Book</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Class</label>
                <select
                  className="form-select"
                  required
                  name="Class"
                  value={formData.Class}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  <option>Class 5</option>
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>Class 11 Medical</option>
                  <option>Class 11 NonMedical</option>
                  <option>Class 11 Commerce</option>
                  <option>Class 11 Arts</option>
                  <option>Class 12 Medical</option>
                  <option>Class 12 NonMedical</option>
                  <option>Class 12 Commerce</option>
                  <option>Class 12 Arts</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Board</label>
                <select
                  className="form-select"
                  required
                  name="Board"
                  value={formData.Board}
                  onChange={handleChange}
                >
                  <option value="">Select Board</option>
                  <option>HP Board</option>
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>ISC</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Edition</label>
                <select
                  className="form-select"
                  required
                  name="Edition"
                  value={formData.Edition}
                  onChange={handleChange}
                >
                  <option value="">Select Edition</option>
                  <option>2025 Edition</option>
                  <option>2024 Edition</option>
                  <option>2023 Edition</option>
                  <option>2022 Edition</option>
                  <option>2021 Edition</option>
                  <option>2020 Edition</option>
                  <option>2019 Edition</option>
                  <option>2018 Edition</option>
                  <option>2017 Edition</option>
                  <option>2016 Edition</option>
                  <option>2015 Edition</option>
                </select>
              </div>

              {/* Upload Front Cover */}
              <div className="form-group file-upload">
                <input
                  type="file"
                  id="frontCover"
                  className="file-upload-input"
                  required
                  onChange={(e) => setFrontImage(e.target.files[0])}
                />
                <label htmlFor="frontCover" className="file-upload-label">
                  Upload Front Cover
                </label>
                {frontImage && <p className="upload-success">✅ Front Image selected</p>}
              </div>

              {/* Upload Back Cover */}
              <div className="form-group file-upload">
                <input
                  type="file"
                  id="backCover"
                  className="file-upload-input"
                  required
                  onChange={(e) => setBackImage(e.target.files[0])}
                />
                <label htmlFor="backCover" className="file-upload-label">
                  Upload Back Cover
                </label>
                {backImage && <p className="upload-success">✅ Back Image selected</p>}
              </div>

              <div className="form-group">
                <label className="form-label">MRP of Book</label>
                <input
                  type="number"
                  className="form-input"
                  required
                  name="MRP"
                  value={formData.MRP}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-btn">
                Next
              </button>
            </form>
          </div>
        )}

        {/* ===== Step 2: Book Quality Section ===== */}
        {showBookQuality && (
          <div className="book-quality-container">
            {/* Div 1 */}
            <div className="book-quality-section">
              <h2 className="book-quality-heading">Price Based on Book Quality</h2>
              <div className="book-quality-info">
                <p>
                  If the book is in <b>Excellent</b> condition, the price will be{" "}
                  <b>50% of its original value (MRP)</b>.
                </p>
                <p>
                  If the book is in <b>Good</b> condition, the price will be{" "}
                  <b>35% of its original value (MRP)</b>.
                </p>
                <p>
                  If the book is in <b>Fair</b> condition, the price will be{" "}
                  <b>25% of its original value (MRP)</b>.
                </p>
              </div>
              <div className="book-quality-buttons">
                <h3>Select the Quality of your Book.</h3>

                <button
                  type="button"
                  className={`quality-btn ${selectedQuality === "Excellent" ? "selected" : ""
                    }`}
                  onClick={() => handleQualityClick("Excellent")}
                >
                  Excellent
                </button>

                <button
                  type="button"
                  className={`quality-btn ${selectedQuality === "Good" ? "selected" : ""
                    }`}
                  onClick={() => handleQualityClick("Good")}
                >
                  Good
                </button>

                <button
                  type="button"
                  className={`quality-btn ${selectedQuality === "Fair" ? "selected" : ""
                    }`}
                  onClick={() => handleQualityClick("Fair")}
                >
                  Fair
                </button>

                {selectedQuality && (
                  <p className="selected-message">
                    ✅ You selected: <b>{selectedQuality}</b> condition.
                  </p>
                )}
              </div>
            </div>

            {/* Div 2 */}
            <div className="book-instructions-section">
              <h1 className="instructions-heading">Instructions, you must agree-</h1>
              <div className="instructions-content">
                <ul>
                  <li>✅ Select the correct condition (Excellent, Good, or Fair).</li>
                  <li>✅ Do not misrepresent the book’s quality.</li>
                  <li>✅ Honesty builds community trust.</li>
                  <li>✅ Fraudulent listings may lead to account restrictions.</li>
                  <h4>By proceeding, you agree to:</h4>
                  <li>Be truthful in selecting the right book quality.</li>
                  <li>Respect the trust of fellow members.</li>
                  <li>Take responsibility for your listing.</li>
                </ul>
                <h5 className="honesty-note">
                  🔒 Your honesty keeps this platform safe and fair for everyone.
                </h5>

                {/* Inside book-instructions-section */}
{!agreed && (
  <button className="agree-btn" onClick={handleAgreeClick}>
    I agree
  </button>
)}

{agreed && (
  <>
    {loading ? (
      <div className="loader-wrapper">
        <div className="book-loader">
          <div className="book"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
        </div>
    <span className="sell-page-loader-text">
  ⏳ Posting your book... <span className="dots"></span>
</span>

      </div>
    ) : (
      <button className="post-btn" onClick={handlePost}>
        Post
      </button>
    )}
  </>
)}

              </div>
            </div>
          </div>
        )}
      </>
    );
  };
