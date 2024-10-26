import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import sliderimg from "../../images/dwa1.png";
import slider4 from "../../images/dwa3.png";
import prod3 from "../../images/dwa4.png";
import prod4 from "../../images/dwa5.png";

const Silder = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="slider-background" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "313.53px" }}
            className=""
            src={slider4}
            alt="First slide"
          />
          <div className="">
            <h3 className="slider-title">Bonjour, bienvenue sur shop !</h3>
            <p className="slider-text">Riha dl3bar pro max</p>
          </div>
        </div>
      </Carousel.Item>
      
      <Carousel.Item className="slider-background3" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "373.53px" }}
            className=""
            src={prod3}
            alt="First slide"
          />
          <div className="">
            <h3 className="slider-title">weld Howara living the Dream.</h3>
            <p className="slider-text">From chilhood dreams to fragmant realities</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background2" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "313.53px" }}
            className=""
            src={sliderimg}
            alt="First slide"
          />
          <div className="">
            <h3 className="slider-title">Riha b ahsan taman</h3>
            <p className="slider-text">matl9ach bhal had taman</p>
          </div>
        </div>
      </Carousel.Item>

      

      <Carousel.Item className="slider-background4" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "373.53px" }}
            className=""
            src={prod4}
            alt="First slide"
          />
          <div className="">
            <h3 className="slider-title">n3awdha matl9ach b7al had taman finma mchiti.</h3>
            <p className="slider-text">Prix exclusif pour vous</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Silder;
