import React, { useState, useEffect } from "react";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import numberWithCommas from "../../../../../util/number_thousand_separator";
import _ from "lodash";

const Productview = ({ addToCart }) => {
  const [list, setList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [categorybyproduct, setCategoryByProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [limit, setLimit] = useState(6);
  const { id } = useParams();

  const getFilterByProduct = async () => {
    setIsLoaded(false);
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    try {
      let p = await GetProductDetails.getProductByFilter(lastSegment);
      if (p) {
        setAllList(p.data);
        const a = p.data.map((item) => item.products);
        setList(a.flat());
        setIsLoaded(true);
      }
    } catch (e) {
      NotificationManager.error("Empty data in category", "Data");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFilterByProduct();
  }, [id]);

  useEffect(() => {
    getFilterByProduct();
  }, [limit]);
  const {id: searchId }= useParams()
  
  const handleFilterCategory = async (row) => {
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();

    let data = { id: row.id, name: toLowerCaseNonAccentVietnamese(toNonAccentVietnamese(searchId)) };
    let category = await GetProductDetails.getProductBySubcategory(data);
    if (category) {
      setCategoryByProduct(category.data);
      if(category.data?.length > 0 ) {
        setList(category.data[0].products);
      }
      else {
        setList([])
      }
      setIsLoaded(true);
      setToggle(true);
    } else {
      NotificationManager.error("Empty data in category", "Undefined");
    }
  };

  const onLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
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
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" /> <a href="#">Search</a>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <section className="shop-list section-padding">
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col-md-3">
              <div className="shop-filters">
                <div id="accordion">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          All Category{" "}
                          <span className="mdi mdi-chevron-down float-right" />
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body card-shop-filters">
                        {isLoaded
                          ? allList.map((row, index) => {
                              return (
                                <div className="card-body" key={index}>
                                  <div
                                    className="list-group bs-canvas-close"
                                    aria-label="Close"
                                    onClick={() => handleFilterCategory(row)}
                                  >
                                    <span className="list-group-item list-group-item-action">
                                      {row.sub_name}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="shop-head">
                <a href="/">
                  <span className="mdi mdi-home" /> Home
                </a>{" "}
                <span className="mdi mdi-chevron-right" />{" "}
                <a href="#">Products</a>{" "}
                <div className="btn-group float-right mt-2">
                  <div type="button" className="btn btn-dark">
                    Sort by Products &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <select
                    onChange={(e) => {
                      e.persist();
                      console.log(e.target.value);
                      setList(sortProducts(list, parseInt(e.target?.value)));
                    }}
                  >
                    <option value={1}>Relevance</option>
                    <option value={2}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                    <option value={4}>Discount (High to Low)</option>
                    <option value={5}>Name (A to Z)</option>
                  </select>
                </div>
                <h5 className="mb-3">Search product</h5>
              </div>
              {!isLoaded ? (
                <div className="progress-bar-bk">
                  <CircularProgress color="secondary" />
                </div>
              ) : toggle ? (
                <div className="row no-gutters">
                  {categorybyproduct ? (
                    list.slice(0, limit).map((row, index) => (
                      <div key={index} className="col-md-4">
                        <div className="item">
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
                              </div>
                             
                            </Link>
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
                            <div className="product-footer">
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm float-right"
                                onClick={() => addToCart(row)}
                              >
                                <i className="mdi mdi-cart-outline" /> Add To
                                Cart
                              </button>
                              <p className="offer-price mb-0">
                                $
                                {numberWithCommas(
                                  row.price -
                                    Math.floor(
                                      (row.price * row.discountPer) / 100
                                    )
                                )}{" "}
                                <i className="mdi mdi-tag-outline" />
                                <br />
                                <span className="regular-price">
                                  ${numberWithCommas(row.price)}{" "}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-danger">
                      Empty item in this category
                    </div>
                  )}
                </div>
              ) : (
                <div className="row no-gutters">
                  {list ? (
                    list.slice(0, limit).map((row, index) => (
                      <div key={index} className="col-md-4">
                        <div className="item">
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
                              </div>
                              <div className="product-body">
                                <h5>{row.name}</h5>
                                {/* <h6>
                                    <strong>
                                      <span className="mdi mdi-approval" />{" "}
                                      Available in
                                    </strong>{" "}
                                    - {row.unitSize}
                                  </h6> */}
                              </div>
                            </Link>
                            <div className="product-footer">
                              <p className="offer-price mb-0">
                                $
                                {numberWithCommas(
                                  row.price -
                                    Math.floor(
                                      (row.price * row.discountPer) / 100
                                    )
                                )}{" "}
                                <i className="mdi mdi-tag-outline" />
                                <br />
                                <span className="regular-price">
                                  ${numberWithCommas(row.price)}{" "}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-danger">
                      Empty item in this category
                    </div>
                  )}
                </div>
              )}

              <div className="more-product-btn">
                <button
                  className="show-more-btn hover-btn"
                  onClick={onLoadMore}
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* end product section */}
    </div>
  );
};

export default connect(null, { addToCart })(Productview);

function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

function toNonAccentVietnamese(str) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str;
}