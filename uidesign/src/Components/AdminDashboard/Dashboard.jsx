import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DashboardBookCards } from "../Cards/DashbordBookCards";
import ClassDropDown from "./ClassDropdown";
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

  // ====== Inline BoardDropDown ======
  const boardOptions = ["HP Board", "CBSE", "ICSE", "ISC"];

  const BoardDropDown = ({ selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTermDropdown, setSearchTermDropdown] = useState("");
    const dropdownRef = useRef(null);

    const filteredOptions = boardOptions.filter((option) =>
      option.toLowerCase().includes(searchTermDropdown.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleOutsideClick(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
      <div className="board-dropdown" ref={dropdownRef}>
        <div
          className="board-dropdown__header"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`board-dropdown__selected ${
              selected === "Select by Board" ? "placeholder" : ""
            }`}
          >
            {selected}
          </span>
          <span className={`board-dropdown__arrow ${isOpen ? "open" : ""}`} />
        </div>
        {isOpen && (
          <div className="board-dropdown__menu">
            <input
              type="text"
              className="board-dropdown__search"
              placeholder="Search..."
              value={searchTermDropdown}
              onChange={(e) => setSearchTermDropdown(e.target.value)}
              autoFocus
            />
            <ul className="board-dropdown__list" role="listbox" tabIndex={-1}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option}
                    className={`board-dropdown__item ${
                      option === selected ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                      setSearchTermDropdown("");
                    }}
                    role="option"
                    aria-selected={option === selected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelected(option);
                        setIsOpen(false);
                        setSearchTermDropdown("");
                      }
                    }}
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="board-dropdown__item no-results">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };
  // ====== End Inline BoardDropDown ======

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
