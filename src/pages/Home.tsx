import Contents from "../layouts/Contents";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const Home = () => {
  return (
    <div className="bg-linear-to-r/decreasing from-indigo-200">
      <Header />
      <Contents />
      <Footer />
    </div>
  );
};
export default Home;
