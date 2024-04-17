import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const pageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
    </>
  );
};

export default pageLayout;
