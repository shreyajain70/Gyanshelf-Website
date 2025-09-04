import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa"; // ✅ Dashboard icon
import api from "../../api";

export const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/Login");
  };

  useEffect(() => {
    api
      .get("/api/PostedBooks")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return;

    const filteredBooks = books.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    navigate("/SearchResults", { state: { results: filteredBooks } });
  };

  return (
    <header className="header">
      <nav className="header-nav">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/Home" className="header-logo">
            <img src="/GyanShelfLogo.png" alt="Logo" />
            <span>GyanShelf</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="header-links">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="header-search">
          <input
            type="text"
            className="header-search-input"
            placeholder="Search books by title, author, class, edition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>

        {/* Auth Buttons */}
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <Link to="/Dashboard" className="btn-auth-Dashboard">
                <FaTachometerAlt /> {/* ✅ Icon */}
                <span>Dashboard</span>
              </Link>
              <button className="btn-auth" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/SignUp" className="reward-btn-signup">
                <div className="IconContainer">
                  <div className="coin"></div>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8H9L12 2Z"></path>
                  </svg>
                </div>
                <span className="text">Sign Up</span>
              </Link>
              <Link to="/Login" className="reward-btn-login">
                <div className="IconContainer">
                  <div className="coin"></div>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 17l5-5-5-5v10z"></path>
                  </svg>
                </div>
                <span className="text">Login</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
