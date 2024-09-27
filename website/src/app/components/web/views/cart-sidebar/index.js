import React, { useState } from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import "./index.css";
import numberWithCommas from "../../../../../util/number_thousand_separator";
// import { Link } from "react-router-dom";

const CartSidebar = ({
  cartItems,
  incrementToCart,
  decreaseToCart,
  removeFromCart,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleHide = () => {
    setToggle(!toggle);
  };
  // console.log(cartItems)

  return (
    <div>
      <div
        data-toggle="offcanvas"
        className="btn btn-link border-none d-flex align-items-center"
      >
        <a className="action showcart" data-bind="scope: 'minicart_content'">
          
          <span class="mdi mdi-cart-outline" style={{fontSize: 20, color: "#fff"}}></span>
        </a>
        <small className="cart-value">{cartItems.length}</small>
      </div>
      <div className="cart-sidebar" style={{borderLeft: "1px solid #e7e7e7"}}>
        <div className="bs-canvas-header side-cart-header p-3 ">
          <div className="d-inline-block  main-cart-title">
            My Cart <span>({cartItems.length} Items)</span>
          </div>
          <button
            type="button"
            className="bs-canvas-close close"
            data-toggle="offcanvas"
          >
            <i className="mdi mdi-close"></i>
          </button>
        </div>
        <div className="cart-sidebar-body" style={{overflowX: "hidden"}}>
          {cartItems.map((row, index) => (
            <div className="item" key={index}>
              <div className="product">
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
              </div>
              <div className="cart-text">
                <h4 style={{fontSize: 16}}>{row.name}</h4>
                <div className="cart-radio">
                  <ul className="kggrm-now">
                    <li style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10, color: "#fff", background: "#2e89ff", width: "max-content"}}>
                      {/* <input type="radio" id="a1" name="cart1" /> */}
                      <label>{row.unitSize}</label>
                    </li>
                  </ul>
                </div>
                <div
                  className="qty-group"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="quantity buttons_added w-100 d-flex">
                    <input
                      style={{padding: 10, background: "#2e89ff", width: 40, height: 40, color: "#fff", border: "none", outline: "none"}}
                      type="button"
                      defaultValue="-"
                      className="minus minus-btn"
                      onClick={() => decreaseToCart(row)}
                    />
                    <input
                      type="number"
                      value={row.qty}
                      className="input-text qty text"
                      disabled
                      style={{height: 39, flex: 1}}
                    />
                    <input
                      style={{padding: 10, background: "#2e89ff", width: 40, height: 40, color: "#fff", border: "none", outline: "none"}}
                      type="button"
                      defaultValue="+"
                      className="plus plus-btn"
                      onClick={() => incrementToCart(row)}
                    />
                    <button
                      style={{padding: 10, background: "#f00", width: 40, height: 40, color: "#fff", border: "none", outline: "none"}}

                      type="button"
                      className="cart-close-btn"
                      onClick={() => removeFromCart(row)}
                    >
                      <i className="mdi mdi-close" />
                    </button>
                  </div>
                  <div className="cart-item-price mt-2 mb-2 w-100">
                    VND
                    {numberWithCommas(row.qty *
                      (row.price -
                        Math.floor((row.price * row.discountPer) / 100)))}
                    {row.discountPer > 0 && (
                      <span>VND{numberWithCommas(row.price * row.qty)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-sidebar-footer">
          <div className="cart-store-details">
            <p>
              Sub Total{" "}
              <strong className="float-right">
                VND
                {numberWithCommas(cartItems.reduce(
                  (sum, i) =>
                    (sum +=
                      i.qty *
                      (i.price - Math.floor((i.price * i.discountPer) / 100))),
                  0
                ))}
              </strong>
            </p>
            {/* <p>
              Delivery Charges{" "}
              <strong className="float-right text-danger">+ 0</strong>
            </p> */}
            <h6>
              Your total savings{" "}
              <strong className="float-right text-danger">
                VND
                {numberWithCommas(cartItems.reduce(
                  (sum, i) =>
                    (sum +=
                      i.qty *
                      (i.price - Math.floor((i.price * i.discountPer) / 100))),
                  0
                ))}
              </strong>
            </h6>
          </div>
          {
            <a
              href="/checkout"
              style={{ opacity: cartItems.length > 0 ? 1 : 0 }}
            >
              <button
                className="btn btn-secondary btn-lg btn-block text-left"
                type="button"
              >
                <span className="float-left" style={{color: "#fff"}}>
                  <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                </span>
                <span className="float-right" style={{color: "#fff"}}>
                  <strong>
                    VND
                    {numberWithCommas(cartItems.reduce(
                      (sum, i) =>
                        (sum +=
                          i.qty *
                          (i.price -
                            Math.floor((i.price * i.discountPer) / 100))),
                      0
                    ))}
                  </strong>{" "}
                  <span className="mdi mdi-chevron-right" />
                </span>
              </button>
            </a>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, {
  incrementToCart,
  decreaseToCart,
  removeFromCart,
})(CartSidebar);
