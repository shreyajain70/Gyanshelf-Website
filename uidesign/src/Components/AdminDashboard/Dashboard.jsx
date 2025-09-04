// src/Pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardBookCards } from "../Cards/DashbordBookCards";
import ClassDropDown from "./ClassDropdown";
import BoardDropDown from "./BoardDropDown.jsx";
import EditionDropDown from "./EditionDropDown";
import {
  FaHome,
  FaShoppingCart,
  FaBook,
  FaUserEdit,
  FaInfoCircle,
  FaSellcast,
} from "react-icons/fa";
import api from "../../api"; // ✅ use api.js with VITE_API_BASE_URL

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("Select by Board");
  const [selectedClass, setSelectedClass] = useState("Select by Class");
  const [selectedEdition, setSelectedEdition] = useState("Select by Edition");

  const userId = localStorage.getItem("userId") || "dummyUser1";

  // Fetch user details
  const fetchUser = () => {
    api
      .get(`/api/Dashboard/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("❌ Error fetching user:", err));
  };

  // Fetch cart count
  const fetchCartCount = () => {
    api
      .get(`/api/AddToCart/cart/${userId}`)
      .then((res) => setCartCount(res.data.length))
      .catch((err) => console.error("❌ Error fetching cart:", err));
  };

  useEffect(() => {
    fetchUser();
    fetchCartCount();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Your Library</div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/AboutUs">
                <FaInfoCircle /> About Us
              </Link>
            </li>
            <li>
              <Link to="/SellPage">
                <FaSellcast /> Sell
              </Link>
            </li>
            <li>
              <Link to="/AddToCart" className="wishlist-link">
                <FaShoppingCart /> Your Wishlist{" "}
                <span className="cart-count">{cartCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/BooksPosted">
                <FaBook /> Books You Posted
              </Link>
            </li>
            <li>
              <Link to="/UpdateProfile">
                <FaUserEdit /> Update Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header>
          <div className="header-row">
            <h1>
              Welcome{" "}
              {user ? `${user.FirstName} ${user.LastName}` : "Loading..."}
            </h1>
          </div>

          {/* Search */}
          <div className="search-bar">
            <input
              type="text"
              className="input"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Filters */}
          <div className="filters-row">
            <ClassDropDown
              selected={selectedClass}
              setSelected={setSelectedClass}
            />
            <BoardDropDown
              selected={selectedBoard}
              setSelected={setSelectedBoard}
            />
            <EditionDropDown
              selected={selectedEdition}
              setSelected={setSelectedEdition}
            />
            <button
              className="view-all-btn"
              onClick={() => window.location.reload()}
            >
              View All
            </button>
          </div>
        </header>

        {/* Book cards */}
        <section className="dashboard-books-wrapper">
          <DashboardBookCards
            userId={userId}
            searchTerm={searchTerm}
            selectedBoard={selectedBoard}
            selectedClass={selectedClass}
            selectedEdition={selectedEdition}
            onCartUpdate={fetchCartCount} // update cart count when adding books
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
