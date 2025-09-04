import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";

export const BookDetails = ({ userId, onCartUpdate }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch book details
  useEffect(() => {
    api.get(`/api/books/${id}`)
      .then(res => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Add book to cart
  const handleAddToCart = () => {
    api.post("/api/AddToCart/cart", { userId, bookId: book._id })
      .then(() => {
        alert(`✅ "${book.Title}" added to cart!`);
        if (onCartUpdate) onCartUpdate(); // update sidebar count
      })
      .catch(err => alert(err.response?.data?.message || "❌ Failed to add"));
  };

  if (loading) return <h2 className="bd-loading">Loading book details...</h2>;
  if (!book) return <h2 className="bd-notfound">Book not found</h2>;

  return (
    <div className="bd-container">
      <div className="bd-card">
        <div className="bd-main-section">
          <img src={book.FrontImage?.[0]} alt={book.Title} className="bd-front-image" />
          {book.BackImage?.[0] && <img src={book.BackImage[0]} alt={book.Title} className="bd-back-image" />}

          <div className="bd-info">
            <h1 className="bd-title">{book.Title}</h1>
            <p><strong>Class:</strong> {book.Class}</p>
            <p><strong>Board:</strong> {book.Board}</p>
            <p><strong>Edition:</strong> {book.Edition}</p>
            <p><strong>MRP:</strong> ₹{book.MRP}</p>
            <p><strong>Quality:</strong> {book.Quality}</p>
            <p><strong>Description:</strong> {book.Description}</p>
          </div>
        </div>

        {book.userId && (
          <div className="bd-seller-info">
            <h3>Seller Details</h3>
            <p><strong>Name:</strong> {book.userId.FirstName} {book.userId.LastName}</p>
            <p><strong>Email:</strong> {book.userId.EmailID}</p>
            <p><strong>Phone:</strong> {book.userId.MobileNumber}</p>
            <p><strong>Location:</strong> {book.userId.VillageTown}, {book.userId.Distt}, {book.userId.State} - {book.userId.PinCode}</p>
          </div>
        )}

        {/* <div className="bd-action-buttons">
          <button className="bd-add-cart-btn" onClick={handleAddToCart}>🛒 Add to Wishlist</button>
          <Link to="/dashboard" className="bd-back-btn">⬅ Back</Link>
        </div> */}

        <div className="bd-action-buttons">
  <button className="bd-wishlist-btn" onClick={handleAddToCart}>
    <div id="bd-container-stars">
      <div id="bd-stars"></div>
    </div>
    <strong>🛒 Add to Wishlist</strong>
    <div id="bd-glow">
      <div className="bd-circle"></div>
      <div className="bd-circle"></div>
    </div>
  </button>
  <Link to="/dashboard" className="bd-back-btn">⬅ Back</Link>
</div>

      </div>
    </div>
  );
};
