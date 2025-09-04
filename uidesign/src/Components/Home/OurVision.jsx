// src/components/OurVision.jsx
import React from "react";

export const OurVision = () => {
  const visionPoints = [
    "Provide an open platform for school students to buy and sell books",
    "Ensure fair pricing based on book condition (Excellent – 50%, Good – 35%, Fair – 25% of MRP)",
    "Promote sustainability by encouraging book reuse",
    "Build a trusted community where students connect directly",
    "Empower learners with affordable and accessible study material",
  ];

  return (
    <div className="vision-wrapper">
      <h1 className="vision-title">Our Vision</h1>

      <p className="vision-intro">
        At <b>Gyanshlf</b>, our purpose is to create a free and open platform
        where students can exchange books with transparency and trust. Sellers
        can post books based on their condition, and buyers can purchase them at
        fair prices. All communication and transactions are directly between
        students — we charge no fees or commissions. Our goal is to make
        knowledge more affordable, sustainable, and accessible for everyone.
      </p>

      <div className="vision-container">
        <div className="vision-palette">
          {visionPoints.map((point, index) => (
            <div className={`vision-color color-${index + 1}`} key={index}>
              <span>{point}</span>
            </div>
          ))}
        </div>

        <div className="vision-stats">
          <span>100% Free & Student-Driven</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M4 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S5.5 9.83 5.5 9 4.83 7.5 4 7.5zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
