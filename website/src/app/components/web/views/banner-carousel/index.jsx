import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from '../category';
import "./index.css"

export default class Bannerslider extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div>
                {/* <Category /> */}
                {/* <Slider {...settings}>
                    <div className="owl-item">
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 5 / 2}} src="https://routine.vn/media/banner/tmp/images/LOVE_DESKTOP.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 5 / 2}} src="https://routine.vn/media/banner/tmp/images/ACTIVEWEAR_-_MAIN_KV_1.jpg" alt="supermarket" />
                    </div>
                    <div className="owl-item">
                        <img className="owl-item-img-" style={{width: "100%", aspectRatio: 5 / 2}} src="https://routine.vn/media/banner/tmp/images/banner-cfl-01.jpg" alt="supermarket" />
                    </div>
                </Slider> */}
            </div>
        )
    }
}
