import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div className="wrapper">
      <header>
        <Header/>
      </header>
      <main className="main">
        <Outlet/>
      </main>
      <footer className="footer">
        <Footer/>
      </footer>
    </div>
  );
};
export default Layout;
