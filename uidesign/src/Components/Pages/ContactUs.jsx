import React from 'react';

export function ContactUs() {
  return (
    <div className="contact-page">
      <div className="contact-text">
        <div className="text">
          <h1>Welcome to GyanShelf! </h1>
          <p> For questions, suggestions, or feedback, contact us via form or email. We value your input and will reply quickly. Join our book-loving community today!</p>
        </div>

        <div className="one-image">

          <img src="https://imgs.search.brave.com/fa0VMlQpilMszLk8Y2VyvAE4gEdcVBgQhzViVrEwdwg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ByaW5nYm9hcmQu/Y29tL2Jsb2cvd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDYv/d2hhdC1kb2VzLWEt/Y29kZXItZG8tMjAy/Mi1jYXJlZXItZ3Vp/ZGUuanBn" alt="Customer Support" />
        </div>
      </div>

      <div className="contact-options">
        <div className="option">
          <span className="icon">🌐</span>
          <h3>EmailID </h3>
          <p>gyanshelf@gmail.com</p>
        </div>

        <div className="option">
          <span className="icon">📞</span>
          <h3>Mobile Number</h3>
          <p>+91-7591035124</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;