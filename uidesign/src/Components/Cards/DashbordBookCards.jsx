import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export const DashboardBookCards = ({
  userId,
  searchTerm = "",
  selectedBoard = "Select by Board",
  selectedClass = "Select by Class",
  selectedEdition = "Select by Edition",
  onCartUpdate
}) => {
  const [books, setBooks] = useState([]);

  // Fetch posted books
  useEffect(() => {
    api.get("/api/PostedBooks")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("❌ Error fetching books:", err));
  }, []);

  const getQualityClass = (quality) => {
    switch (quality?.toLowerCase()) {
      case "excellent": return "book-excellent";
      case "good": return "book-good";
      case "fair": return "book-fair";
      default: return "";
    }
  };

  // Calculate price based on quality
  const calculatePrice = (mrp, quality) => {
    if (quality === "Excellent") return (mrp * 0.5).toFixed(0);
    if (quality === "Good") return (mrp * 0.35).toFixed(0);
    if (quality === "Fair") return (mrp * 0.25).toFixed(0);
    return mrp;
  };

  // Add book to cart
  const handleAddToCart = (book) => {
    api.post("/api/AddToCart/cart", { userId, bookId: book._id })
      .then(() => {
        alert(`✅ "${book.Title}" added to cart!`);
        if (onCartUpdate) onCartUpdate();
      })
      .catch((err) => {
        alert(err.response?.data?.message || "❌ Failed to add to cart");
      });
  };

  // Filter books based on search and dropdowns
  const filteredBooks = books.filter((book) => {
    const matchTitle = book.Title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBoard = selectedBoard === "Select by Board" || book.Board === selectedBoard;
    const matchClass = selectedClass === "Select by Class" || book.Class === selectedClass;
    const matchEdition = selectedEdition === "Select by Edition" || book.Edition === selectedEdition;

    return matchTitle && matchBoard && matchClass && matchEdition;
  });

  return (
    <div className="dashboard-books-section">
      <h1 className="dashboard-books-heading">
        📚 Explore Books on <span>GyanShelf</span>
      </h1>

      <div className="dashboard-books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const finalPrice = calculatePrice(book.MRP, book.Quality);

            return (
              <div
                key={book._id}
                className={`dashboard-book-card ${getQualityClass(book.Quality)}`}
              >
                <div className="dashboard-book-image-container">
                  <img
                    src={book.FrontImage[0]}
                    alt={book.Title}
                    className="dashboard-book-image"
                  />
                  <div className="dashboard-image-overlay">
                    <Link to={`/books/${book._id}`}>
                      <span className="dashboard-overlay-text">
                        View Seller Details
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="dashboard-book-content">
                  <h2 className="dashboard-book-title">{book.Title}</h2>

                  <div className="dashboard-book-pricing">
                    <p className="dashboard-book-price">
                      MRP: ₹<s>{book.MRP}</s>
                    </p>
                    <p className="dashboard-book-our-price">
                      Our Price:{" "}
                      <span className="dashboard-price-value">₹{finalPrice}</span>
                    </p>
                  </div>

                  <p className="dashboard-book-description">{book.Description}</p>

                  <div className="dashboard-book-info">
                    <span className="dashboard-book-quality">
                      Book Quality: {book.Quality}
                    </span>
                  </div>

                  <p className="dashboard-book-meta">
                    <b>{book.Class} | {book.Board} | {book.Edition}</b>
                  </p>
                  {/* 
                  <button
                    className="dashboard-add-to-cart"
                    onClick={() => handleAddToCart(book)}
                  >
                    🛒Add to Wishlist
                  </button> */}

                  <button
                    className="dashboard-wishlist-btn"
                    onClick={() => handleAddToCart(book)}
                  >
                    <div id="dashboard-container-stars">
                      <div id="dashboard-stars"></div>
                    </div>
                    <strong>🛒 Add to Wishlist</strong>
                    <div id="dashboard-glow">
                      <div className="dashboard-circle"></div>
                      <div className="dashboard-circle"></div>
                    </div>
                  </button>

                </div>
              </div>
            );
          })
        ) : (
          <p className="dashboard-no-results">No books found for selected filters.</p>
        )}
      </div>
    </div>
  );
};
