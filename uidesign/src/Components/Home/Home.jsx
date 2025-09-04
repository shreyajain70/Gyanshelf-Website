import React from "react";
import { Link } from "react-router-dom";
import { HomeBookCards } from "../Cards/HomeBookCards";
import { OurVision } from "./OurVision";


export const Home = () => {
  return (
    <>
      <div className="home-container">
        
        {/* Left Section (Text) */}
        <div className="home-content">
          <h1 className="home-title">Old Books. New Vibes</h1>
          <h3 className="home-subtitle">
            Join our community to exchange second-hand books — give what you don’t need, get what you do.
          </h3>
          <h4 className="home-tagline">
            "A simple way to give stories a second life and connect with readers like you."
          </h4>
          <h6 className="home-footer">A product of The Himalayan Devs</h6>

          {/* Action Section */}
          <div className="home-actions">
            <button className="btn-get-started"><Link to={"/Login"}>Get Started</Link></button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="image-container">
          <img
            src="/HomeBookIllustration.png"
            alt="Book exchange banner"
            className="image-banner"
          />
        </div>

      
      </div>
       <OurVision></OurVision>
       <HomeBookCards></HomeBookCards>
    </>
  );
};
