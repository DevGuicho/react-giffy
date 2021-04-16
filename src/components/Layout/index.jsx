import Footer from "components/Footer";
import Header from "components/Header";
import SearchForm from "components/SearchForm";

import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      <SearchForm />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
