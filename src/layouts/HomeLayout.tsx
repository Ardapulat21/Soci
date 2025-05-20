import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <div className="bg-linear-to-r/decreasing from-indigo-200">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default HomeLayout;
