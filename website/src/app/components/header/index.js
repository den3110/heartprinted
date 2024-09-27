import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Login from "../../auth/login";
import Cartsidebar from "../web/views/cart-sidebar";
import { GetUserLogin } from "../../components/services";
import "./index.css";
import get_detail_voucher from "../../../api/get_categories";

const Navigation = ({ history }) => {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [searchtxt, setSearchtxt] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchtxt") {
      setSearchtxt(value);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    history.push(`/product/catalogsearch/result/${searchtxt}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cookies = await GetUserLogin.isAuthenticate();
      setToken(cookies);
      const email = sessionStorage.getItem("email");
      if (email) {
        const user = await GetUserLogin.getCustomerDetail(email);
        if (user) {
          setUserName(user.data.firstName);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await get_detail_voucher();
        console.log("result", result);
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <header className="header clearfix bg-dark">
        <nav className="navbar navbar-light navbar-expand-lg bg-faded osahan-menu">
          <div
            className="container-fluid justify-content-between d-flex gap-20"
            style={{ borderBottom: "1px solid #e7e7e7" }}
          >
            <div>
              <Link className="navbar-brand" to="/">
                <img
                  style={{ width: 80 }}
                  src="https://res.cloudinary.com/cockbook/image/upload/v1692940937/single/z4632199152859_dad394451a5b88ca2fcee448e0dee6f8_vh4w0p.jpg"
                  alt="logo"
                />
              </Link>
            </div>

            <button
              className="navbar-toggler navbar-toggler-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="navbar-collapse"
              id="navbarNavDropdown"
              style={{ flexGrow: 0 }}
            >
              <div
                className="navbar-nav mr-auto mt-2 mt-lg-0 top-categories-search-main"
                style={{ flex: 1 }}
              >
                <ul className="nav" style={{ marginRight: 12 }}>
                  {categories.map((category, index) => (
                    <li className="nav-item" key={index}>
                      <Link
                        className="nav-link"
                        style={{ color: "white" }}
                        to={`/c/${category.slug.toLowerCase()}/${category.id}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <form
                  className="top-categories-search"
                  onSubmit={handleClickSearch}
                  style={{ flex: 1 }}
                >
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search products"
                      aria-label="Search products"
                      type="text"
                      name="searchtxt"
                      value={searchtxt}
                      onChange={handleChange}
                      style={{ borderBottom: "1px solid #000", width: 250 }}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary d-flex align-items-center"
                        type="submit"
                      >
                        <i
                          style={{ fontSize: 22 }}
                          className="mdi mdi-magnify"
                        />{" "}
                        Search
                      </button>
                    </span>
                  </div>
                </form>
              </div>

              <div className="my-2 my-lg-0">
                <ul className="list-inline main-nav-right d-flex align-items-center">
                  <li className="list-inline-item">
                    {!token ? (
                      <Link
                        to="#"
                        data-target="#bd-example-modal"
                        data-toggle="modal"
                        className="btn btn-link"
                        style={{ marginLeft: 12 }}
                      >
                        <span
                          className="mdi mdi-account"
                          style={{ color: "#fff", fontSize: 22 }}
                        ></span>
                      </Link>
                    ) : (
                      <div className="dropdown">
                        <button
                          style={{boxShadow: "none"}}
                          className="btn btn-account dropdown-toggle d-flex align-items-center gap-10"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span
                            className="mdi mdi-account"
                            style={{ color: "#fff", fontSize: 22 }}
                          ></span>
                          <span
                            style={{
                              marginLeft: 12,
                              fontSize: 16,
                              color: "#fff",
                            }}
                          >
                            {userName}
                          </span>
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link className="dropdown-item" to="/account/profile">
                            <i
                              className="mdi mdi-account-outline"
                              aria-hidden="true"
                            ></i>
                            My Profile
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/account/order/list"
                          >
                            <i
                              className="mdi mdi-format-list-bulleted"
                              aria-hidden="true"
                            ></i>{" "}
                            Orders List
                          </Link>

                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            <i className="mdi mdi-lock" aria-hidden="true"></i>{" "}
                            Logout
                          </span>
                        </div>
                      </div>
                    )}
                  </li>
                  <li className="list-inline-item cart-btn">
                    {sessionStorage.getItem("_sid") && <Cartsidebar />}
                  </li>
                  <li className="list-inline-item">
                    {sessionStorage.getItem("_sid") && (
                      <Link to={"/voucher/gift"}>
                        <span
                          className="btn btn-link border-none"
                          style={{ color: "#fff" }}
                        >
                          <i
                            style={{ width: 22, color: "#fff" }}
                            className="mdi mdi-sale"
                          ></i>{" "}
                          Earn voucher
                        </span>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* login popup */}
      <Login />
    </div>
  );
};

export default withRouter(Navigation);
