import React from "react";
import Slider from "../../Components/Home/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import DiscountSection from "../../Components/Home/DiscountSection";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import BrandFeatured from "../../Components/Brand/Brandfeatured";

const HomePage = () => {
  return <div className="font" style={{minHeight:'670px'}}>
    <Slider/>
    <HomeCategory/>
    <CardProductsContainer title="Best-seller" btntitle="plus..." pathText="/products"/>
    <DiscountSection/>
    <CardProductsContainer title="new" btntitle="plus..." pathText="/products"/>
    <BrandFeatured  title="marque" btntitle="plus..."/>
    </div>;
};

export default HomePage;
