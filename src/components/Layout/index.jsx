import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
