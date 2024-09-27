import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { GetUserLogin, GetOrderDetails, CartHelper } from "../../../services";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import Deliverydetails from "./delivery";
import Loader from "../../../../loader";
import axios from "axios";
import AddVoucher from "./add-voucher/AddVoucher";
import swal from "sweetalert";
import { API_URL } from "../../../../../config1";
import Axios from "axios";
import Cookies from "js-cookie";
import numberWithCommas from "../../../../../util/number_thousand_separator";
import "./index.css"

const Checkout = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [subTotal, setSubTotal] = useState("");
  const [discount, setDiscount] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [grandTotal, setGrandTotal] = useState("");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [dataVoucher, setDataVoucher] = useState({ id: undefined });
  const [city, setCity] = useState(1);
  const [isVoucherApply, setIsVoucherApply] = useState(false);
  const [orderId, setOrderId] = useState();
  const popupRef = useRef(null);

  useEffect(() => {
    if (isVoucherApply === true) {
      let finalGrandTotal = grandTotal;
      if (parseInt(grandTotal) - parseInt(dataVoucher.discount) < 0) {
        finalGrandTotal = 0;
        setGrandTotal(finalGrandTotal);
      } else {
        setGrandTotal(parseInt(grandTotal) - parseInt(dataVoucher.discount));
      }
    } else if (isVoucherApply === false) {
      calculateTotals();
    }
  }, [isVoucherApply]);
  useEffect(() => {
    if (city == 1) {
      setDeliveryCharge(0);
    } else {
      setDeliveryCharge(50000);
    }
  }, [city]);
  useEffect(() => {
    const fetchCustomerData = async () => {
      let email = sessionStorage.getItem("email");
      if (email) {
        let user = await GetUserLogin.getCustomerDetail(email);
        if (user) {
          setCustomer(user.data);
          setEmail(email);
        }
      }
    };

    fetchCustomerData();
    calculateTotals();
  }, [props.cartItems, deliveryCharge]);

  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeliveryAddress = (value) => {
    setDeliveryAddress(value);
  };
  const calculateTotals = () => {
    let cart = props.cartItems;
    let subTotal = cart.reduce(
      (sum, i) =>
        (sum +=
          i.qty * (i.price - Math.floor((i.price * i.discountPer) / 100))),
      0
    );
    let discount = cart.reduce((sum, i) => (sum += i.discount), 0);
    let grandTotal = subTotal + discount + deliveryCharge;

    setSubTotal(subTotal);
    setDiscount(discount);
    setGrandTotal(grandTotal);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const data = {
      customerId: customer.id || "",
      paymentmethod: paymentmethod || "",
      orderId: Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
      ),
      deliveryAddress: deliveryAddress || "",
      product: props.cartItems,
      grandTotal: grandTotal || "",
      voucherId: dataVoucher.id ? dataVoucher.id : 0,
      deliveryCharge: deliveryCharge || 0,
      email: email || "",
      voucherId: dataVoucher.id || 0,
    };
    if(deliveryAddress.name.length <= 0 || deliveryAddress.phone.length <= 0 || deliveryAddress.district.length <= 0 || deliveryAddress.states.length <= 0) { 
      return swal("Notice" ,"Bạn hãy nhập đủ thông tin", "error")
    }
    if (data) {
      if (dataVoucher.id != 0) {
        const res = await Axios({
          url: API_URL + "/api/customer/voucher",
          method: "put",
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
          data: {
            voucherId: dataVoucher.id || 0,
          },
        });
        const result = await res.data;
      }
      let order = await GetOrderDetails.getOrderCreateByUser(
        JSON.stringify(data)
      );
      if (order) {
        NotificationManager.success("Successfully Ordered", "Order");
        setTimeout(async function () {
          CartHelper.emptyCart();
        }, 1000);
      } else {
        NotificationManager.error("Order is declined", "Order");
        setTimeout(async function () {
          window.location.href = "/failed";
        }, 1000);
      }
    } else {
    }
  };

  const handlePaymentSystem = async () => {
    if (parseInt(grandTotal) <= 1000) {
      return swal(
        "Notice",
        "Số tiền quá ít để thanh toán, Vui lòng thêm sản phẩm để thanh toán",
        "error"
      );
    }
    const res = await axios({
      url: "https://itchy-dirndl-frog.cyclic.app/payment-momo",
      method: "POST",
      data: {
        amount: grandTotal,
        platform: "web",
        url_web: window.location.origin + "/checkout",
      },
    });
    const result = await res.data;
    setOrderId(result?.orderId);
    // window.location.href = result?.payUrl;
    const popup = window.open(
      result?.payUrl,
      "Payment online",
      "width=500,height=500"
    );
    popupRef.current = popup;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      // Thực thi công việc định kỳ sau mỗi 5 giây tại đây
      if (orderId) {
        try {
          const res = await axios({
            url: "https://itchy-dirndl-frog.cyclic.app/payment-status",
            method: "post",
            data: {
              orderId,
            },
          });
          const result = await res.data;
          if (result.resultCode == 0) {
            popupRef.current.close();
            const data = {
              customerId: customer.id,
              paymentmethod: "Pay online",
              orderId: Math.floor(
                Math.random() * Math.floor(Math.random() * Date.now())
              ),
              deliveryAddress: deliveryAddress,
              product: props.cartItems,
              grandTotal,
              voucherId: dataVoucher ? dataVoucher.id : 0,
              deliveryCharge,
              email,
              voucherId: dataVoucher.id || 0,
            };
            if(deliveryAddress.name.length <= 0 || deliveryAddress.phone.length <= 0 || deliveryAddress.district.length <= 0 || deliveryAddress.states.length <= 0) { 
              return swal("Notice" ,"Bạn hãy nhập đủ thông tin", "error")
            }
            if (data) {
              if (dataVoucher.id != 0) {
                const res = await Axios({
                  url: API_URL + "/api/customer/voucher",
                  method: "put",
                  headers: {
                    Authorization: "Bearer " + Cookies.get("token"),
                  },
                  data: {
                    voucherId: dataVoucher.id || 0,
                  },
                });
                const result = await res.data;
              }
              let order = await GetOrderDetails.getOrderCreateByUser(
                JSON.stringify(data)
              );
              if (order) {
                NotificationManager.success("Successfully Ordered", "Order");
                setTimeout(async function () {
                  CartHelper.emptyCart();
                }, 1000);
              } else {
                NotificationManager.error("Order is declined", "Order");
                setTimeout(async function () {
                  window.location.href = "/failed";
                }, 1000);
              }
            }
          }
          else if (
            result.resultCode == 1000 ||
            result.resultCode == 7000 ||
            result.resultCode == 7002
          ) {
          } else {
            popupRef.current.close();
            window.location.href = window.location.origin + "/order/failed";
          }
        } catch (error) {
          popupRef.current.close();
          window.location.href = window.location.origin + "/order/failed";
          console.error("Error:", error);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  // useEffect(()=> {
  //   if(new URLSearchParams(window.location.search).get("resultCode")== 0) {
  //     (async ()=> {

  //       if(customer.id && deliveryAddress && props && grandTotal && dataVoucher && deliveryCharge) {
  //         const data = {
  //           customerId: customer.id,
  //           paymentmethod: "Online payment",
  //           orderId: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
  //           deliveryAddress: deliveryAddress,
  //           product: props.cartItems,
  //           grandTotal,
  //           voucherId: dataVoucher ? dataVoucher.id : 0,
  //           deliveryCharge,

  //         };

  //         if (data) {
  //           let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
  //           if (order) {
  //             NotificationManager.success("Successfully Ordered", "Order");
  //             setTimeout(async function () {
  //               CartHelper.emptyCart();
  //             }, 1000);
  //           } else {
  //             NotificationManager.error("Order is declined", "Order");
  //             setTimeout(async function () {
  //               window.location.href = "/failed";
  //             }, 1000);
  //           }
  //         }
  //       }
  //       else if(customer.id  && props && grandTotal && deliveryCharge && email){

  //         const data = {
  //           customerId: customer.id,
  //           paymentmethod: "Online payment",
  //           orderId: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
  //           deliveryAddress: deliveryAddress,
  //           product: props.cartItems,
  //           grandTotal,
  //           voucherId: dataVoucher ? dataVoucher.id : 0,
  //           deliveryCharge,

  //         };

  //         if (data) {
  //           let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
  //           if (order) {
  //             NotificationManager.success("Successfully Ordered", "Order");
  //             setTimeout(async function () {
  //               CartHelper.emptyCart();
  //             }, 1000);
  //           } else {
  //             NotificationManager.error("Order is declined", "Order");
  //             setTimeout(async function () {
  //               window.location.href = "/failed";
  //             }, 1000);
  //           }
  //         }
  //       }
  //     })()
  //   }
  // }, [dataVoucher, deliveryAddress, props, customer.id, grandTotal, deliveryCharge])

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript();
  }, []);

  const { cartItems } = props;
  const [isNextStep2, setIsNextStep2]= useState(false)

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/">
                <strong>
                  <span className="mdi mdi-home"></span> Home
                </strong>
              </a>{" "}
              <span className="mdi mdi-chevron-right"></span> <a>Checkout</a>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout-page section-padding">
        <div className="container">
          {isLoaded ? <Loader /> : ""}
          <div className="row">
            <div className="col-md-8">
              <div className="checkout-step">
                <div className="accordion" id="accordionExample">
                  <div className="card checkout-step-one">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link checkout-login-bk"
                          disabled
                        >
                          <span className="number">1</span> Login{" "}
                          <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                        </button>
                        <div className="_2jDL7w">
                          <div>
                            <span className="dNZmcB">
                              {customer.firstName}{" "}
                            </span>
                            <span className="_3MeY5j">{email}</span>
                          </div>
                        </div>
                      </h5>
                    </div>
                  </div>
                  {/*  */}
                  <div className="card checkout-step-two">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className={`btn btn-link collapsed `}
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className={`number ${isNextStep2 ? "next-step-2" : "aaa"}`}>2</span> Delivery Address
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <Deliverydetails
                        onSelectDeliveryAddress={handleDeliveryAddress}
                        city={city}
                        setCity={setCity}
                        setIsNextStep2={setIsNextStep2}
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="card checkout-step-three">
                    <div className="card-header" id="headingThree">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className="number">3</span> Add voucher
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="collapseThree"
                      data-parent="#accordionExample"
                    >
                      <AddVoucher
                        dataVoucher={dataVoucher}
                        setDataVoucher={setDataVoucher}
                        isVoucherApply={isVoucherApply}
                        setIsVoucherApply={setIsVoucherApply}
                      />
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <span className="number">4</span> Payment
                        </button>
                      </h5>
                    </div>
                    {/*  */}
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="checkout-step-body">
                        <div className="payment_method-checkout">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="rpt100">
                                <ul className="radio--group-inline-container_1">
                                  <li>
                                    <div className="radio-item_1">
                                      <input
                                        id="cashondelivery1"
                                        value="cash"
                                        name="paymentmethod"
                                        type="radio"
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        htmlFor="cashondelivery1"
                                        className="radio-label_1"
                                      >
                                        Cash on Delivery
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="radio-item_1"
                                      onClick={() => {
                                        // setPaymentMethod("Online payment")
                                        handlePaymentSystem();
                                      }}
                                    >
                                      {/* <input value="card" name="paymentmethod" type="button" onClick={this.handleRadioChange} /> */}
                                      <label
                                        htmlFor="card1"
                                        className="radio-label_1"
                                      >
                                        Pay Online
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              {paymentmethod === "cash" ? (
                                <button
                                  className="next-btn16 hover-btn"
                                  onClick={handlePlaceOrder}
                                >
                                  Confirm Order
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <h5
                  className="card-header"
                  onClick={() => popupRef.current.close()}
                >
                  My Cart{" "}
                  <span className="text-secondary float-right">
                    ({cartItems.length} item)
                  </span>
                </h5>
                {cartItems.map((row, index) => (
                  <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                    <div className="cart-list-product">
                      <img className="img-fluid" src={row.photo} alt="cart" />
                      <span className="badge badge-success">
                        {row.discountPer}% OFF
                      </span>
                      <h5>{row.name}</h5>
                      <h6>
                        <strong>
                          <span className="mdi mdi-approval" /> Available in
                        </strong>{" "}
                        - {row.unitSize} gm
                      </h6>
                      <p className="offer-price mb-0">
                        {row.qty + "*" + numberWithCommas(row.price)}{" "}
                        <i className="mdi mdi-tag-outline" />{" "}
                        <div className="regular-price">VND{numberWithCommas(row.qty  * row.price)}</div>
                        <div>VND{numberWithCommas(row.qty  * row.price * (1- row.discountPer / 100))}</div>

                      </p>
                    </div>
                  </div>
                ))}
                <div className="total-checkout-group">
                  <div className="cart-total-dil">
                    <h4>Sub Total</h4>
                    <span>VND{numberWithCommas(subTotal)}</span>
                  </div>
                  <div className="cart-total-dil pt-3">
                    <h4>Delivery Charges</h4>
                    <span>VND{numberWithCommas(deliveryCharge)}</span>
                  </div>
                </div>
                <div className="cart-total-dil saving-total pt-3" style={{padding: 20}}>
                  <h4>Total Saving</h4>
                  <span>VND{numberWithCommas(discount)}</span>
                </div>
                <div className="main-total-cart pt-3" style={{padding: 20}}>
                  <h2>Total</h2>
                  <span>VND{numberWithCommas(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
})(Checkout);
