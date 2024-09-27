import React, { useState, useEffect, useCallback } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import "./index.css";
// import Filterbycategory from "./Filtersbycategory";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core/";
import numberWithCommas from "../../../../../util/number_thousand_separator";
import _ from "lodash"
import { useParams } from "react-router-dom";

const Shopdetails = () => {
  const {id }= useParams()
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(12);
  const [isloaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState();

  const dispatch = useDispatch();

  const handleChangeByCategory = useCallback((value) => {
    if (value) {
      setIsLoaded(true);
      setList(value.data);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let url = window.location.href.split("/");
      var lastSegment = url.pop() || url.pop();
      try {
        let p = await GetProductDetails.getAllProductList(lastSegment);
        if (p) {
          setList(p.data.products.filter(item=> item.categoryId == id));
          setIsLoaded(true);
        }
      } catch (e) {
        NotificationManager.error("Empty data in category", "Data");
      }
    };
    fetchData();
  }, [id]);

  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  function sortProducts(products, sortOption) {
    switch (sortOption) {
      case 1: // Relevance (Default: Newest to Oldest)
        return _.orderBy(products, function (e) {
          return e.createdAt;
        });
      case 2: // Price - Low to High
        return _.orderBy(products, function (e) {
          return parseInt(e.price);
        });
      case 3: // Price - High to Low
        return _.orderBy(
          products,
          function (e) {
            return parseInt(e.price);
          },
          "desc"
        );
      case 4: // Discount - High to Low
        return _.orderBy(products, function (e) {
          return parseInt(e.discountPer);
        });
      case 5: // Name - A to Z
        _.orderBy(products, function (e) {
          return parseInt(e.name);
        });
      default: // Relevance (Default: Newest to Oldest)
        return _.orderBy(
          products,
          function (e) {
            return e.createdAt;
          },
          "desc"
        );
    }
  }

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </a>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Product</a>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <div className="all-product-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-top-dt">
                <div className="product-left-title">
                  <h2>All Products</h2>
                </div>
                {/* <Filterbycategory
                  onSelectFilterCategory={handleChangeByCategory}
                /> */}
                <Button
                  className="filter-btn"
                  variant="contained"
                  color="secondary"
                  onClick={() => setList(sortProducts(list, filter))}
                >
                  Filters
                </Button>
                <div className="product-sort">
                  <select
                    style={{height: 40}}
                    className="form-control"
                    onChange={(e) => setFilter(parseInt(e.target.value))}
                  >
                    <option className="item" value={0}>
                      Sort by Products
                    </option>
                    <option className="item" value={1}>
                      Price - Low to High
                    </option>
                    <option className="item" value={2}>
                      Price - High to Low
                    </option>
                    <option className="item" value={3}>
                      Alphabetical
                    </option>
                    <option className="item" value={4}>
                      Saving - High to Low
                    </option>
                    <option className="item" value={5}>
                      Saving - Low to High
                    </option>
                    <option className="item" value={6}>
                      % Off - High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End product */}
      {/* product section */}
      <section className="shop-list section-padding">
        {!isloaded ? (
          <div className="progress-bar-bk">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row no-gutters">
                  {list.slice(0, limit).map((row, index) => (
                    <div key={index} className="col-md-4">
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
                                      style={{
                                        width: "25%",
                                        "--spaceX": "92px",
                                      }}
                                    >
                                      <div
                                        className="label-text"
                                        style={{
                                          fontSize: "16px",
                                          color: "#000000",
                                        }}
                                      >
                                        <span />
                                      </div>
                                    </div>
                                  </span>
                                </span>
                              </>

                              {/* <span className="veg text-success mdi mdi-circle" /> */}
                            </div>
                          </Link>
                          <div className="product-body" style={{margin: "12px 0"}}>
                            <h4>{row.name}</h4>
                            {/* <h6>
                          <strong>
                            <span className="mdi mdi-approval" /> Available in
                          </strong>{" "}
                        </h6> */}
                          </div>
                          <div
                            className="product-footer"
                            style={{ height: 40 }}
                          >
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
                                  Math.floor(
                                    (row.price * row.discountPer) / 100
                                  )
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
                    </div>
                  ))}
                </div>

                <div className="more-product-btn">
                  {limit <= list.length && (
                    <button
                      className="show-more-btn hover-btn"
                      onClick={onLoadMore}
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* end product section */}
    </div>
  );
};

export default Shopdetails;
