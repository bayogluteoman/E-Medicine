import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Pharmacies from "./pages/Pharmacies";
import axios from "axios";

function App() {
  axios.defaults.headers.common = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/products" element={<Products />} />
      <Route path="/productDetails/:id" element={<ProductDetails />} />
      <Route path="/pharmacies" element={<Pharmacies />} />-
    </Routes>
  );
}

export default App;
