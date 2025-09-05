import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../api";

export const HomeBookCards = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all posted books
  useEffect(() => {
    api.get("/PostedBooks")
      .then((res) => {
        console.log("📦 API response:", res.data);

        // ✅ Safely handle different response shapes
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (res.data && Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          setBooks([]); // fallback to empty array
        }
      })
      .catch((err) => console.error("❌ Error fetching books:", err));
  }, []);

  // Calculate price based on quality
  const calculatePrice = (mrp, quality) => {
    if (quality === "Excellent") return (mrp * 0.5).toFixed(0);
    if (quality === "Good") return (mrp * 0.35).toFixed(0);
    if (quality === "Fair") return (mrp * 0.25).toFixed(0);
    return mrp; 
  };

  // Handle click for 'View Details'
  const handleViewDetails = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="books-section">
      <h1 className="books-heading">
        📚 Explore Books on <span>GyanShelf</span>
      </h1>

      <div className="books-grid">
        {books.length === 0 ? (
          <p className="no-books">No books available right now.</p>
        ) : (
          books.map((book) => {
            const finalPrice = calculatePrice(book.MRP, book.Quality);

            return (
              <div key={book._id} className="book-card">
                {/* Book Image */}
                <div className="book-image-container">
                  <img
                    src={book.FrontImage?.[0]}
                    alt={book.Title}
                    className="book-image"
                  />
                  <div className="image-overlay">
                    <button
                      className="overlay-text"
                      onClick={handleViewDetails}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Book Content */}
                <div className="book-content">
                  <h2 className="book-title">{book.Title}</h2>
                  <div className="book-pricing">
                    <p className="book-price">
                      MRP: ₹<s>{book.MRP}</s>
                    </p>
                    <p className="book-our-price">
                      Our Price:{" "}
                      <span className="price-value">₹{finalPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
