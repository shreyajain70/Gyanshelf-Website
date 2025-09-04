import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const YourCart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items for a user
  const fetchCartItems = () => {
    api.get(`/api/AddToCart/cart/${userId}`)
      .then(res => { 
        setCartItems(res.data); 
        setLoading(false); 
      })
      .catch(err => { 
        console.error(err); 
        setLoading(false); 
      });
  };

  // Remove a book from the cart
  const handleRemoveFromCart = (bookId) => {
    api.delete(`/api/AddToCart/cart/${userId}/${bookId}`)
      .then(() => fetchCartItems())
      .catch(err => alert("❌ Failed to remove item"));
  };

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  // Calculate price based on quality
  const calculatePrice = (mrp, quality) => {
    if (quality === "Excellent") return (mrp * 0.5).toFixed(0);
    if (quality === "Good") return (mrp * 0.35).toFixed(0);
    if (quality === "Fair") return (mrp * 0.25).toFixed(0);
    return mrp; // fallback
  };

  if (loading) return <h2>Loading cart...</h2>;
  if (cartItems.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div className="yc-container">
      <h1>Your WishList ✨({cartItems.length} items)</h1>
      <div className="yc-grid">
        {cartItems.map(book => {
          const finalPrice = calculatePrice(book.MRP, book.Quality);

          return (
            <div key={book._id} className="yc-card">
              <img src={book.FrontImage[0]} alt={book.Title} className="yc-image" />
              <h2 className="yc-title">{book.Title}</h2>

              <p className="yc-mrp">MRP: ₹<s>{book.MRP}</s></p>
              <p className="yc-price">Our Price: ₹{finalPrice}</p>

              <p className="yc-quality">Quality: {book.Quality}</p>
              <div className="yc-buttons">
                <Link to={`/books/${book._id}`} className="yc-view-btn">
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFromCart(book._id)}
                  className="yc-remove-btn"
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/dashboard" className="yc-back-btn">⬅ Back to Dashboard</Link>
    </div>
  );
};

export default YourCart;
