import React, { useState, useEffect } from "react";
import { GetUserLogin } from "../../components/services";
import { NotificationManager } from "react-notifications";
import Register from "../register";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let updatedFormErrors = { ...formErrors };

    switch (name) {
      case "email":
        updatedFormErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        updatedFormErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }

    setFormErrors(updatedFormErrors);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { email: email, password: password };
    if (formValid({ formErrors, email, password })) {
      let user = await GetUserLogin.getUserLogin(data);
      if (user.success=== true) {
        NotificationManager.success("Success", "Login");
        // await GetUserLogin.authenticate(user.token, email);
        await GetUserLogin.authenticateByCart(user.token, email);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
      } else {
        NotificationManager.error(
          "Please check your email & password",
          "Input Error"
        );
      }
    } else {
      NotificationManager.error("Please check your Login", "Input Error");
    }
  };

  return (
    <div>
      <div className="modal fade login-modal-main" id="bd-example-modal">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content" style={{borderRadius: 10}}>
            <div className="modal-body" style={{borderRadius: 10}}>
              <div className="login-modal">
                <div className="row">
                  <div className="col-lg-6 pad-right-0">
                    <div className="login-modal-left">{/* ... */}</div>
                  </div>
                  <div className="col-lg-6 pad-left-0">
                    <button
                      type="button"
                      className="close close-top-right"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">
                        <i className="mdi mdi-close" />
                      </span>
                      <span className="sr-only">Close</span>
                    </button>
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="login-modal-right">
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div
                            className="tab-pane active"
                            id="login"
                            role="tabpanel"
                          >
                            <h5 className="heading-design-h5">
                              Login to your account
                            </h5>
                            <fieldset className="form-group">
                              <label>Enter Email/Mobile number</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChange}
                              />
                              {formErrors.email.length > 0 && (
                                <span className="errorMessage">
                                  {formErrors.email}
                                </span>
                              )}
                            </fieldset>
                            <fieldset className="form-group">
                              <label>Enter Password</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleChange}
                              />
                              {formErrors.password.length > 0 && (
                                <span className="errorMessage">
                                  {formErrors.password}
                                </span>
                              )}
                            </fieldset>
                            <fieldset className="form-group">
                              <button
                                type="submit"
                                className="btn btn-lg btn-secondary btn-block"
                                onClick={handleSubmit}
                                style={{background: "#2e89ff", borderRadius: 10, fontSize: 16}}
                              >
                                Enter to your account
                              </button>
                            </fieldset>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                Remember me
                              </label>
                            </div>
                            <div className="custom-control" style={{paddingLeft: 0, marginTop: 12}}>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  (window.location.href =
                                    window.location.origin + "/register")
                                }
                              >
                                Register
                              </Button>
                            </div>
                          </div>
                          <div
                            className="tab-pane"
                            id="register"
                            role="tabpanel"
                          >
                            <Register />
                          </div>
                        </div>
                        <div className="clearfix" />
                        <div className="text-center login-footer-tab">
                          <ul className="nav nav-tabs" role="tablist">
                            {/* ... */}
                          </ul>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
