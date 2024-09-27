import React, { useEffect, useState } from "react";
import "./index.css";
import Slider from "react-slick";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../../store/actions/cartActions";
import { GroceryStampleDetails } from "../../../../services";
import numberWithCommas from "../../../../../../util/number_thousand_separator";

const BestOfferBanner = ({ addToCart }) => {
  const [productlist, setProductList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let list = await GroceryStampleDetails.getProductSuggest();
      if (list) {
        setProductList(list.data);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  const list = productlist?.products;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="section145">
        <div
          className="container container-1"
          id="header-category-bk"
          style={{ maxWidth: "100%" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="main-title-tt">
                <div className="main-title-left">
                  <span>Offers</span>
                  <h2>Suggest for you</h2>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <a href="#" className="best-offer-item">
                <img
                  src="https://f9-zpc.zdn.vn/8938671365555282785/ba56367463f9b2a7ebe8.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-lg-4 col-md-6">
              <a href="#" className="best-offer-item">
                <img
                  src="https://f2-zpc.zdn.vn/3368511878183810319/b5bd219f7412a54cfc03.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-lg-4 col-md-6">
              <a href="#" className="best-offer-item offr-none">
                <img
                  src="https://f9-zpc.zdn.vn/4275139286401155915/d56d474f12c2c39c9ad3.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-md-12">
              <a href="#" className="code-offer-item" style={{width: "100%"}}>
                <img src="img/best-offers/offer-4.jpg" alt="" style={{width: "100%"}} />
              </a>
            </div>
          </div>          <Slider {...settings}>
            {!isLoaded ? (
              <div className="progress-bar-bk">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              productlist?.map((row, index) => (
                <div key={index} className="item">
                  <div className="product">
                    <Link
                      to={{
                        pathname: `/p/${row.slug}/${row.id}`,
                        state: row,
                      }}
                    >
                      <div className="product-header">
                        <span className="badge badge-success">
                          {row.discountPer}% OFF
                        </span>
                        <>
                          <span
                            className="product-image-container product-image-container-42448"
                            style={{ width: "480px" }}
                          >
                            <span
                              className="product-image-wrapper"
                              style={{ paddingBottom: "150%" }}
                            >
                              <img
                                className="product-image-photo"
                                data-catalog_image_hovering="https://routine.vn/media/catalog/product/cache/d0cf4470db45e8932c69fc124d711a7e/1/0/10s23dpa025_m_blue-quan-jean-nam_2__2.jpg"
                                data-original_category_image
                                src={row.photo}
                                loading="lazy"
                                width={480}
                                height={720}
                                alt="10S23DPA025 M/ BLUE 28"
                                style={{ transition: "all 0s ease 0s" }}
                              />
                              <div
                                className="mgn-product-label product-label-container top-right image-layout"
                                style={{ width: "25%", "--spaceX": "92px" }}
                              >
                                <div
                                  className="label-text"
                                  style={{ fontSize: "16px", color: "#000000" }}
                                >
                                  <span />
                                </div>
                              </div>
                            </span>
                          </span>
                        </>
                        {/* <span className="veg text-success mdi mdi-circle" /> */}
                      </div>
                      <div
                        className="product-body"
                        style={{ marginTop: 12, marginBottom: 12 }}
                      >
                        <h4>{row.name}</h4>
                        {/* <h6>
                          <strong>
                            <span className="mdi mdi-approval" /> Available in
                          </strong>{" "}
                        </h6> */}
                      </div>
                    </Link>
                    <div className="product-footer" style={{ height: 40 }}>
                      {/* <button
                        type="button"
                        className="btn btn-secondary btn-sm float-right"
                        onClick={() => addToCart(row)}
                      >
                        <i className="mdi mdi-cart-outline" /> Add To Cart
                      </button> */}
                      <p className="offer-price mb-0">
                        VND
                        {numberWithCommas(
                          row.price -
                            Math.floor((row.price * row.discountPer) / 100)
                        )}{" "}
                        <i className="mdi mdi-tag-outline" />
                        {row.discountPer > 0 && (
                          <>
                            <br />
                            <span className="regular-price">
                              VND{numberWithCommas(row.price)}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addToCart })(BestOfferBanner);
