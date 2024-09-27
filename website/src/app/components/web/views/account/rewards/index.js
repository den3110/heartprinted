import React, { useEffect, useState } from 'react';
import { GetUserLogin } from '../../../../services';
import '../css/index.css';
import axios from "axios"
import { API_URL } from '../../../../../../config1';
import Axios from 'axios';
import Cookies from 'js-cookie';
import numberWithCommas from '../../../../../../util/number_thousand_separator';
import { Button } from '@material-ui/core';
import moment from "moment"
import {useHistory } from "react-router-dom"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Reward = () => {
  const [user, setUser] = useState("");
  const [customerVoucher, setCustomerVoucher]= useState([])
  const history= useHistory()

  useEffect(() => {
    const fetchData = async () => {
      let email = sessionStorage.getItem("email");
      if (email) {
        let value = await GetUserLogin.getCustomerDetail(email);
        if (value) {
          setUser(value.data);
        }
      }
    };

    fetchData();
  }, []);
  const handleCopyCodeToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };
  useEffect(()=> {
    (async ()=> {
      const res= await Axios({
        url: API_URL+ "/api/customer/voucher/has",
        method: "get",
        headers: {
          "Authorization": "Bearer "+ Cookies.get("token")
        }
      })
      const result= await res.data
      setCustomerVoucher((result.data?.[0]))
      return result
    })()
  }, [])
  
  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  return (
    <div className="wrapper">
      <div className="gambo-Breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-group">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="user-dt">
                <div className="user-img">
                  <img src="/img/avatar/img-5.jpg" alt="" />
                  <div className="img-add">
                    <input type="file" id="file" />
                  </div>
                </div>
                <h4>{user.firstName}</h4>
                <p>+84 {user.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="left-side-tabs">
                <div className="dashboard-left-links">
                  <a href="/account/profile" className="user-item">
                    <i className="mdi mdi-account-outline" />My profile
                  </a>
                  <a href="/account/order/list" className="user-item">
                    <i className="uil uil-box" />My Orders
                  </a>
                  <a href="/account/rewards" className="user-item active">
                    <i className="uil uil-gift" />My Voucher
                  </a>
                  <a className="user-item" onClick={handleLogout}>
                    <i className="uil uil-exit" />Logout
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="dashboard-right">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title-tab">
                      <h4>
                        <i className="uil uil-gift" />My Vouchers
                      </h4>
                    </div>
                  </div>
                  {
                    customerVoucher.map((item, key)=> <div key={key} className="col-lg-4 col-md-12">
                  <div className="pdpt-bg rewards-coupns">
                    <div className="reward-body-dtt">
                      <div className="reward-img-icon">
                        <img src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/07/13/64b130887a45b_com.shopee.vn.png" alt />
                      </div>
                      <span className="rewrd-title">Code: {item.code}</span>
                      <h4 className="cashbk-price">Discount VND{numberWithCommas(item.discount)}</h4>
                      <span className="date-reward">Expires on : {moment(item.expire).format("DD-MM-YYYY HH:mm:ss")}</span>
                      
                      <CopyToClipboard onCopy={()=> alert("Copy success")} text={item.code}>
                      <Button
                        style={{ marginTop: 16 }}
                        disabled={item.is_use === 1}
                         className="mb-1"
                        variant="contained"
                        color="primary"
                      >
                        {item.is_use === 1 ? "Used" : "Copy"}
                      </Button>
                    </CopyToClipboard>
                    </div>
                  </div>
                </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
