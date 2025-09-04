import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../Main";
import { Home } from "./Home/Home";
import { AboutUs } from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import { LoginPage } from "./UserLogin/LoginPage";
import { SignUpPage } from "./UserLogin/SignUpPage";
import { SellPage } from "./Pages/SellPage";
import Dashboard from "./AdminDashboard/Dashboard";
import { UpdateProfile } from "./AdminDashboard/UpdateProfile";
import YourCart from "./Cards/YourCart";
import { BookDetails } from "./Cards/BookDetails";
import { SearchResults } from "./SearchResults ";
import { BooksPosted } from "./AdminDashboard/BooksPosted";
import ForgotPassword from "./UserLogin/ForgetPassword";


export const FullRouter = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Main />}>
          {/* Default route (when site opens) */}
          <Route index element={<Home />} />

          {/* Other pages */}
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<LoginPage></LoginPage>} />
          <Route path="/SignUp" element={<SignUpPage></SignUpPage>} />
          <Route path="/DashBoard" element={<Dashboard></Dashboard>} />
          <Route path="/SellPage" element={<SellPage></SellPage>} />
          <Route path="/books/:id" element={<BookDetails userId={localStorage.getItem("userId")}></BookDetails>} />
          <Route path="/UpdateProfile" element={<UpdateProfile></UpdateProfile>}></Route>
          <Route path="/AddToCart" element={<YourCart userId={localStorage.getItem("userId")}></YourCart>} ></Route>
          <Route path="/SearchResults" element={<SearchResults></SearchResults>} />
          <Route path="/BooksPosted" element={<BooksPosted></BooksPosted>} />
          <Route path="/ForgetPassword" element={<ForgotPassword></ForgotPassword>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
