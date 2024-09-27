import React from "react";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import apply_voucher from "../../../../../../api/apply_voucher";
import get_detail_voucher from "../../../../../../api/get_detail_voucher";
import swal from "sweetalert";
import { FaTag } from "react-icons/fa";
import moment from "moment";

const AddVoucher = (props) => {
  const [customerVoucher, setCustomerVoucher]= useState([])
  const { dataVoucher, setDataVoucher, isVoucherApply, setIsVoucherApply }= props;
  const [voucher, setVoucher] = useState("");
  const isVoucher = voucher.trim().length > 0 ? true : false;
  const isValidVoucher = dataVoucher.id ? true : false;

  

  return (
    <div style={{ width: "100%", padding: "1.25rem" }}>
      <TextField
        value={voucher}
        onChange={(e) => setVoucher(e.target.value)}
        type="text"
        style={{ width: "100%", height: 40 }}
        placeholder={"Type voucher here"}
      />
      {isVoucher && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 12,
          }}
        >
          <Button
            onClick={async () => {
              const res = await apply_voucher({ code: voucher.trim() });
              if (res.ok === true) {
                const res2 = await get_detail_voucher(res.data.id);
                setDataVoucher(res2.data);
              } else if(res.used=== true) {
                swal(
                  "Notice",
                  "Voucher đã được sử dụng, vui lòng thử lại bằng voucher khác",
                  "error"
                );
              } else {
                swal(
                  "Notice",
                  "Voucher không hợp lệ hoặc đã hết hạn",
                  "error"
                );
              }
            }}
            variant="contained"
            color="primary"
          >
            Check voucher
          </Button>
        </div>
      )}
      {isValidVoucher && (
        <div
          style={{
            display: "inline-block",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            width: "100%",
            marginTop: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>
              <FaTag />
            </span>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {dataVoucher.discount}VND off
            </span>
            <span
              style={{
                marginLeft: "10px",
                backgroundColor: "#f2f2f2",
                padding: "2px 5px",
                borderRadius: "3px",
              }}
            >
              {dataVoucher.code}
            </span>
          </div>
          <div style={{ marginTop: "5px", color: "#888" }}>
            Expires on: {moment(dataVoucher.expire).format("DD-MM-YYYY")}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              marginTop: 12,
            }}
          >
            <Button
              onClick={async () => {
                setIsVoucherApply(true);
              }}
              variant="contained"
              color="primary"
            >
              {isVoucherApply ? "Applied" : "Use"}
            </Button>
            {isVoucherApply && (
              <Button
                onClick={() => setIsVoucherApply(false)}
                style={{ marginRight: 12 }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVoucher;
