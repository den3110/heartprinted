import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../../store/actions/cartActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import numberWithCommas from "../../../../../../util/number_thousand_separator";

const TopSamples = ({ addToCart }) => {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const viewedProducts =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];

    if (viewedProducts.length > 0) {
      setList(viewedProducts);
      setIsLoaded(true);
    } else {
      // Nếu chưa có dữ liệu trong localStorage, bạn có thể thực hiện fetching dữ liệu từ API ở đây
      // Nếu muốn thực hiện fetching, hãy sử dụng hàm GroceryStampleDetails.getAllGroceryStaple() như cách bạn đã viết ở trên.
      // Sau khi fetching xong, hãy lưu dữ liệu vào state productlist và cập nhật vào localStorage tương tự như cách bạn đã làm trong component Singleproduct.
      // Sau khi setProductList và setIsLoaded, bạn có thể cập nhật dữ liệu vào localStorage để sử dụng lần sau.
      // Ví dụ:
      // const fetchData = async () => {
      //   let list = await GroceryStampleDetails.getAllGroceryStaple();
      //   if (list) {
      //     setProductList(list.data);
      //     setIsLoaded(true);
      //     localStorage.setItem("viewedProducts", JSON.stringify(list.data));
      //   }
      // };
      // fetchData();
    }
  }, []);

  const settings = {
    dots: false,
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
          dots: false,
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
      {/* New Item slider */}
      <section className="product-items-slider section-padding">
        <div
          className="container container-1"
          id="header-category-bk"
          style={{ maxWidth: "100%" }}
        >
          <div className="section-header" style={{ marginBottom: 12 }}>
            <span>You just watched</span>
          </div>
          <Slider {...settings}>
            {!isLoaded ? (
              <div className="progress-bar-bk">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              list?.map((row, index) => (
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
                        {numberWithCommas(row.price -
                          Math.floor((row.price * row.discountPer) / 100))}{" "}
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
      </section>

      {/* End New item slider */}
    </div>
  );
};

export default connect(null, { addToCart })(TopSamples);
