import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  if (results.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No books found for your search.
      </h2>
    );
  }

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((book) => (
          <li key={book._id} onClick={() => handleBookClick(book._id)}>
            {/* Book image */}
            {book.FrontImage?.length > 0 ? (
              <img src={book.FrontImage[0]} alt={book.Title} />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}

            {/* Book details */}
            <div className="book-details">
              <h3>{book.Title}</h3>
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Class:</strong> {book.Class}</p>
              <p><strong>Edition:</strong> {book.Edition}</p>
              <p><strong>Our Price:</strong> ₹{book.Price}</p>

              {/* Quality badge inside a circle */}
              <p>
                <strong>Quality:</strong>{" "}
                <span
                  className={`quality-label ${
                    book.Quality?.toLowerCase() === "excellent"
                      ? "excellent"
                      : book.Quality?.toLowerCase() === "good"
                      ? "good"
                      : book.Quality?.toLowerCase() === "fair"
                      ? "fair"
                      : ""
                  }`}
                >
                  {book.Quality || "N/A"}
                </span>
              </p>

              <p className="description"><strong>Description:</strong> {book.Description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
