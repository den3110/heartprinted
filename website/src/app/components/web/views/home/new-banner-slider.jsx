import React from "react"
import {Link } from "react-router-dom"

const NewBannerSlider = () => {
  return (
    <div className="home-banner" style={{ paddingTop: "35px !important" }}>
      <Link to="#"></Link>
      <div className="home-banner-item">
        <Link to="#">
          <img
            src="https://routine.vn/pub/media/wysiwyg/ECOM_600x950_2.jpg"
            alt="Giảm 50% cho sản phẩm thứ 2"
          />
        </Link>
        <Link
          className="btn"
          style={{ textTransform: "uppercase" }}
          to="#"
        >
          Xem ngay
        </Link>
      </div>
      <Link to="#"></Link>
      <div className="home-banner-item">
        <Link to="#">
          <img
            src="https://routine.vn/pub/media/wysiwyg/Untitled-2-01.jpg"
            alt="Áo khoác giá tốt 399k/áo khi mua từ 2 áo"
          />
        </Link>
        <Link
          className="btn"
          style={{ textTransform: "uppercase" }}
          to="/promotion/ao-khoac-399k"
        >
          Xem ngay
        </Link>
      </div>
      <Link to="#"></Link>
      <div className="home-banner-item">
        <Link to="#">
          <img
            src="https://routine.vn/pub/media/wysiwyg/ECOM_600x950_copy_2.jpg"
            alt="Mua 1 tặng 1"
          />
        </Link>
        <Link
          className="btn"
          style={{ textTransform: "uppercase" }}
          to="#"
        >
          Xem ngay
        </Link>
      </div>
    </div>
  );
};

export default NewBannerSlider;
