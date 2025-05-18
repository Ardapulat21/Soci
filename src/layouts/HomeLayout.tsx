import HomePage from "../pages/HomePage";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <div className="bg-linear-to-r/decreasing from-indigo-200">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};
export default HomeLayout;
