import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import api from "../../api";

export const BooksPosted = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const userId = localStorage.getItem("userId");

  // Fetch user's posted books
  useEffect(() => {
    const fetchBooks = async () => {
      if (!userId) return;
      try {
        const res = await api.get("/api/BooksPosted/my-posted-books", {
          headers: { userId },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userId]);

  // Calculate price based on quality
  const calculatePrice = (mrp, quality) => {
    if (quality === "Excellent") return (mrp * 0.5).toFixed(0);
    if (quality === "Good") return (mrp * 0.35).toFixed(0);
    if (quality === "Fair") return (mrp * 0.25).toFixed(0);
    return mrp;
  };

  // Handle book deletion
  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      setDeleting(bookId);
      const res = await api.delete(`/api/BooksPosted/delete-book/${bookId}`, {
        headers: { userId },
      });
      alert(res.data.message || "Book deleted");

      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <h2 className="loading-message">Loading your books...</h2>;
  if (!books.length) return <h2 className="no-books-message">No books posted yet.</h2>;

  return (
    <div className="books-posted-container">
      <h1>📚 Books You Posted</h1>
      <div className="books-posted-grid">
        {books.map((book) => {
          const finalPrice = calculatePrice(book.MRP, book.Quality);

          return (
            <div key={book._id} className="book-card">
              {book.FrontImage.length > 0 && <img src={book.FrontImage[0]} alt={book.Title} />}
              <h3>{book.Title}</h3>
              <p>{book.Description}</p>
              <p>
                <strong>Class:</strong> {book.Class} | <strong>Board:</strong> {book.Board}
              </p>
              <div className="price-section">
                <span className="mrp">MRP : ₹{book.MRP}</span>
                <span className="our-price">Our Price : ₹{finalPrice}</span>
              </div>
              <div className="book-quality">Quality: {book.Quality}</div>
              <button
                onClick={() => handleDelete(book._id)}
                disabled={deleting === book._id}
                className="remove-btn"
              >
                <MdDelete size={18} />
                {deleting === book._id ? "Deleting..." : "Remove"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
