import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../components/carousel.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";

export default class HomeCarousel extends Component {
  render() {
    return (
      <Carousel
        className="carousel-style"
        dynamicHeight={true}
        showStatus={true}
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
      >
        <div>
          <img src={image1} style={{ height: 500 }} alt="test1" />
        </div>
        <div>
          <img src={image2} style={{ height: 500 }} alt="test2" />
        </div>
        <div>
          <img src={image3} style={{ height: 500 }} alt="test3" />
        </div>
      </Carousel>
    );
  }
}
