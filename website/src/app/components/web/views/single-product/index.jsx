import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import parse from "html-react-parser";
import { GetProductDetails } from "../../../services";
// import Similarproduct from './same-product';
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import "./index.css";
import axios from "axios";
import { API_URL } from "../../../../../config1";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import {Link } from "react-router-dom"
import numberWithCommas from "../../../../../util/number_thousand_separator";

const Singleproduct = ({ addToCart }) => {
  const [product, setProduct] = useState(null);
  const [productSize, setProductSize] = useState([]);
  const [size, setSize] = useState();
  const { id } = useParams();

  // Tạo hàm để lưu sản phẩm vào localStorage
  const saveProductToLocalStorage = (product) => {
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];

    const existingProductIndex = viewedProducts.findIndex((p) => p.id === product.id);

    if (existingProductIndex === -1) {
      viewedProducts.push(product);
      if (viewedProducts.length > 10) {
        viewedProducts.shift();
      }
    } else {
      const existingProduct = viewedProducts[existingProductIndex];
      viewedProducts.splice(existingProductIndex, 1);
      viewedProducts.unshift(existingProduct);
    }

    localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      window.scrollTo(0, 0);
      const url = window.location.href.split("/");
      const lastSegment = url.pop() || url.pop();
      const list = await GetProductDetails.getProductById(lastSegment);

      if (list?.data?.status === "inactive") {
        // Nếu sản phẩm có trạng thái "inactive", hiển thị Notice và không lưu vào localStorage  
        swal("Notice", "Sản phẩm này không có sẵn", "warning");
      } else {
        setProduct(list.data);
        // Lưu sản phẩm vào localStorage khi đã có dữ liệu và không có trạng thái "inactive"
        if (list.data) {
          saveProductToLocalStorage(list.data);
        }
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: API_URL + "/api/product/size",
        method: "get",
        params: {
          productId: id,
        },
      });
      const result = await res.data;
      setProductSize(result.data);
      return result;
    })();
  }, []);

  const settings = {
    customPaging: function (i) {
      return (
        <div id="sync1" className="owl-carousel">
          <div className="item">
            <img
              src={product?.productphotos[i].imgUrl}
              alt=""
              className="ratio ratio-1x1 ratop"
              style={{aspectRatio: 1 / 1, minWidth: 100, height: 100}}
            />
          </div>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    appendDots: (dots) => (
      <ul
        style={{
          position: "static",
          display: "flex",
          justifyContent: "center",
          padding: 10,
          height: 140,
          boxSizing: "border-box",
          overflow: "auto"
        }}
      >
        {dots}
      </ul>
    ),
    slidesToScroll: 1,
  };

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Product</a>{" "}
            </div>
          </div>
        </div>
      </section>

      <section className="shop-single section-padding pt-3" style={{padding: 10, marginBottom: 50}}>
        <div className="container">
          {product && product.status !== "inactive" ? (
            <div className="row">
                         {product.productphotos && product.productphotos.length > 0 && (
                <>
                  <div className="col-md-6" style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
                    <div className="shop-detail-left">
                      <Paper className="shop-detail-slider">
                        <Slider {...settings}>
                          {product.productphotos ? (
                            product.productphotos.map((r, index) => (
                              <div key={index}>
                                <img
                                  src={r.imgUrl}
                                  alt=""
                                  className="img-fluid img-center"
                                  style={{aspectRatio: 1 / 1, width: "100%", height: "auto"}}
                                />
                              </div>
                            ))
                          ) : (
                            <div>Please Upload Image</div>
                          )}
                        </Slider>
                      </Paper>
                    </div>
                  </div>
                </>
              )}
              {product.productphotos.length <= 0 && (
                <>
                  <div
                    className="col-md-6 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "#fff", borderRadius: 10 }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 600 }}>
                      No image of this product
                    </div>
                  </div>
                </>
              )}
              <div className="col-md-6">
                <div className="shop-detail-right">
                  <span className="badge badge-success">
                    {product.discountPer}% OFF
                  </span>
                  <h2>{product.name}</h2>
                  {
                    productSize?.length > 0 && 
                    <h6>
                      <strong>
                        <span className="mdi mdi-approval" /> Available in
                      </strong>{" "}
                      - {productSize.map((item, key)=> <span onClick={()=> setSize(item.size)} style={{cursor: "pointer", padding: 10, backgroundColor: size== item.size ? "#2e89ff": "#f2f0f5", color: size== item.size ? "#fff": "#000", marginLeft: 12}} key={key}>{item.size}</span>)}
                    </h6>
                  }
                  {
                    productSize?.length <= 0 && 
                    <h6>
                      <strong>
                        <span className="mdi mdi-approval" /> No available
                      </strong>{" "}
                    </h6>
                  }

                  {product.discountPer != 0 && (
                    <>
                      <div className="pdp-product__old-price">
                        <span className="space__right--2-unit">
                          Product price:
                        </span>
                        <span className="regular-price">
                          VND{numberWithCommas(product.price)}
                        </span>
                      </div>
                      <div className="pdp-product__new-price">
                        <span className="space__right--2-unit">
                          Selling price:
                        </span>
                        <span className="pdp-product__price--new">
                          VND
                          {numberWithCommas(product.price -
                            Math.floor(
                              (product.price * product.discountPer) / 100
                            ))}
                        </span>
                        <div className="pdp-product__tax-disclaimer">
                          (Inclusive of all taxes)
                        </div>
                      </div>
                    </>
                  )}
                  {product.discountPer == 0 && (
                    <div className="pdp-product__new-price">
                      <span className="space__right--2-unit">Price:</span>
                      <span className="pdp-product__price--new">
                        VND{numberWithCommas(product.price)}
                      </span>
                      <div className="pdp-product__tax-disclaimer">
                        (Inclusive of all taxes)
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => {
                      if(productSize.length <= 0 ) {
                        swal("Notice", "This product is out of size, please try again later", "error")
                      }
                      else if(!sessionStorage.getItem("_sid")) {
                        swal("Notice", "You must be logged in to be able to purchase", "error")
                      }
                      else if(!size) {
                        swal("Notice", "VPlease choose size")
                      }
                      else {
                        if(productSize.length > 0 ) {
                          addToCart({...product, unitSize: size})
                        }
                      }
                    }}
                  >
                    <i className="mdi mdi-cart-outline" /> Add To Cart
                  </button>
                  <h6 className="mb-3 mt-4">Why shop from csm?</h6>
                  <div className="row">
                    <div className="col-md-12 mt-2 mb-2">
                      <div className="feature-box">
                        <i className="mdi mdi-truck-fast" />
                        <h6 className="text-info">
                          <span>Easy Returns &amp; Refunds</span>
                        </h6>
                        <p>
                          Return products at doorstep and get refund in seconds.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="feature-box">
                        <i className="mdi mdi-basket" />
                        <h6 className="text-info">Lowest price guaranteed</h6>
                        <p>
                          Get difference refunded if you find it cheaper
                          anywhere else.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div
                className="col-lg-12 col-md-12 mt-2 position-relative "
                style={{ top: 40 }}
              >
                <div className="pdpt-bg">
                  <div className="pdpt-title">
                    <h4>Product Details</h4>
                  </div>
                  <div className="pdpt-body scrollstyle_4">
                    <div className="pdct-dts-1 short-desc">
                      {parse(product.desc)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Hiển thị Notice và lớp phủ khi sản phẩm có trạng thái "inactive"
            <div className="inactive-product-overlay">
              <h2>Product is not available</h2>
            </div>
          )}
        </div>
      </section>

      {/* More like product */}

      {/* <Similarproduct /> */}
      {/* End Same product */}
    </div>
  );
};

export default connect(null, { addToCart })(Singleproduct);
