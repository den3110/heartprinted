import Axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../../config1";
import moment from "moment";
import Button from "@material-ui/core/Button";
import swal from "sweetalert"
import numberWithCommas from "../../../../../util/number_thousand_separator";
import Cookies from "js-cookie";
import _ from "lodash"

const VoucherGift = () => {
  const [data, setData] = useState([]);
  const [data1, setData1]= useState({data: {date_start: 0}})
  const [check, setCheck]= useState()
  const [customerVoucher, setCustomerVoucher]= useState([])

  // const user= JSON.parse(Cookies.get("user")) || ""
  useEffect(() => {
    (async () => {
      const res = await Axios({
        url: API_URL + "/api/voucher/hunting",
        method: "get",
      });
      const result = await res.data;
      setData(result.data);
      return result;
    })();
  }, []);
  useEffect(()=> {
    (async ()=> {
        const res= await Axios({
            url: API_URL+ "/api/voucher/schedule",
            method: "get",
        })
        const result= await res.data
        setData1(result)
        return result
    })()
  }, [])
  useEffect(()=> {
    if(data1.data && data1.data !== null) {
      if(data1.data.date_start) {
          if(moment(data1.data.date_start).valueOf() < moment(new Date()).valueOf()  && moment(data1.data.date_end).valueOf() > moment(new Date()).valueOf() ) {
            setCheck(true)
          }
          else {
            setCheck(false)
          }
      }
    }
    else {
      setCheck(false)
    }
  }, [data1])
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
  useEffect(()=> {
    if(check=== false) {
        swal("Notice", "Chưa đến giờ săn voucher hoặc không có lịch săn voucher bạn vui lòng thử lại sau")
        .then(()=> window.location.href= window.location.origin)
    }
  }, [check])

  const post= async (voucherId)=> {
    const res= await Axios({
        url: API_URL+ "/api/customer/voucher",
        method: "post",
        headers: {
          "Authorization": "Bearer "+ Cookies.get("token")
        },
        data: {
          voucherId
        }
    })
    const result= await res.data 
    const res1= await Axios({
      url: API_URL+ "/api/customer/voucher/has",
      method: "get",
      headers: {
        "Authorization": "Bearer "+ Cookies.get("token")
      }
    })
    const result2= await res1.data
    setCustomerVoucher(result2.data?.[0])
    return result 
  }

  return (
    <section className="not-found-page section-padding">
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 mx-auto text-center  pt-5 pb-5"
            style={{ marginTop: "3rem" }}
          >
            <div className="row">
              {
                check && 
                data.map((item, key) => (
                <div key={key} className="col-lg-4 col-md-12">
                  <div className="pdpt-bg rewards-coupns">
                    <div className="reward-body-dtt">
                      <div className="reward-img-icon">
                        <img src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/07/13/64b130887a45b_com.shopee.vn.png" alt />
                      </div>
                      <span className="rewrd-title">Code: {item.code}</span>
                      <h4 className="cashbk-price">Discount VND{numberWithCommas(item.discount)}</h4>
                      <span className="date-reward">Expires on : {moment(item.expire).format("DD-MM-YYYY HH:mm:ss")}</span>
                        {console.log(customerVoucher?.filter(item2=> item2.code == item.code).length)}
                      
                        <Button disabled={customerVoucher?.filter(item2=> item2.code == item.code).length > 0 ? true : false} onClick={()=> {
                          post(item.id)
                        }} className="mb-1" variant={"contained"} color={"primary"}>Save</Button>
                    </div>
                  </div>
                </div>
              ))
              }
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoucherGift;
