import React, { Component } from 'react'
import Bannerslider from '../banner-carousel';
import Topsavers from './top-section';
import Bestofferbanner from './best-offers-banner';
import Topstample from './top-stample';
import "./index.css"
import NewBannerSlider from './new-banner-slider';
import HomeVideo from './home-video';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <Bannerslider />
                <NewBannerSlider />
                <HomeVideo />
                <Topsavers />
                <Bestofferbanner />
                <Topstample />
            </div>
        )
    }
}
