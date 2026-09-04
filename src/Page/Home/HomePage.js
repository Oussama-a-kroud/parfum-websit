import React from "react";
import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import DiscountSection from "../../Components/Home/DiscountSection";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import PackPromoSection from "../../Components/Home/PackPromoSection";

const HomePage = () => {
  return (
    <div className="font" style={{ minHeight: '670px' }}>
      <Slider />
      <HomeCategory />
      <CardProductsContainer title="Best-seller" btntitle="plus..." pathText="/products" />
      <PackPromoSection />
      <DiscountSection />
      <CardProductsContainer title="Nouveautés" btntitle="plus..." pathText="/products" />
    </div>
  );
};

export default HomePage;
