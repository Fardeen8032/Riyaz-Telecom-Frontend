import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footor/Footor";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Service from "./Pages/Service/Service";
import Wishlist from "./Pages/Wishlist/Wishlist";
import { WishlistProvider } from "./Context/WishlistContext";

const App = () => {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Service />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>

        <Footer />
      </WishlistProvider>
    </BrowserRouter>
  );
};

export default App;