import React from "react";
import HomeCarousel from "../components/HomeCarousel";
import ProductCategories from "../components/ProductCategories";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeCarousel />
      <ProductCategories />
      <Footer/>
    </div>
  );
}
