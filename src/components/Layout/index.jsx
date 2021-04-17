import Header from "components/Header";
import React from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      {children}
      <footer>
        <p>coded bay Luis Vazquez</p>
      </footer>
    </div>
  );
};

export default Layout;
