import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import VoucherSchedule from "./VoucherSchedule";
import get_setting from "../../../../../api/get_setting";
import update_modepayment from "../../../../../api/update_modepayment";
import update_key from "../../../../../api/update_key";
import swal from "sweetalert";
import change_password from "../../../../../api/change_password";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import create_discount from "../../../../../api/create_discount";

const View = () => {
  const history = useHistory();
  const [isLive, setIsLive] = useState(false);
  const [setting, setSetting] = useState(null);

  // Các trạng thái cho các input key
  const [clientKeyDemo, setClientKeyDemo] = useState("");
  const [secretKeyDemo, setSecretKeyDemo] = useState("");
  const [clientKeyLive, setClientKeyLive] = useState("");
  const [secretKeyLive, setSecretKeyLive] = useState("");

  // States for password change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  // Hàm thay đổi trạng thái của switch
  const handleSwitchChange = async (event) => {
    const data = await update_modepayment(event.target.checked);
    setIsLive(data?.data?.mode_payment);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validatePasswords = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Mật khẩu mới không khớp.");
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordError("Mật khẩu mới phải ít nhất 6 ký tự.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = async () => {
    if (validatePasswords()) {
      try {
        // Here you can call an API to update the password
        // Example: await update_password({ oldPassword, newPassword });
        const data = await change_password({ oldPassword, newPassword });
        if (data?.ok === true) {
          swal("Thông báo", "Cập nhật mật khẩu thành công!", "success");
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          swal(
            "Thông báo",
            "Cập nhật mật khẩu thất bại!, mật khẩu cũ không chính xác",
            "error"
          );
        }
      } catch (error) {
        swal("Thông báo", error?.response?.data?.error, "error");

        console.error(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await get_setting();
        setIsLive(response?.data?.mode_payment);
        setClientKeyDemo(response?.data?.client_key_demo);
        setSecretKeyDemo(response?.data?.secret_key_demo);
        setClientKeyLive(response?.data?.client_key_live);
        setSecretKeyLive(response?.data?.secret_key_live);
        setDiscountCode(response?.data?.discount);
        setDiscountAmount(response?.data?.amount);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Cài đặt hệ thống</h2>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div>
      </div>
      <ol className="breadcrumb mb-30">
        <li className="breadcrumb-item">Dashboard</li>
      </ol>
      <div className="row justify-content-between">
        <div className="col-lg-3 col-md-4">
          <div className="bulk-section mt-30">
            <div className="input-group">
              <div className="input-group-append">
                {/* <VoucherSchedule /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn"></div>
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            <div className="card-title-2">
              <h4>All Voucher</h4>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <Box mb={1}>
                  <Card>
                    <Typography variant="h6" sx={{ padding: 2 }}>
                      Thanh toán
                    </Typography>

                    <Box
                      sx={{ display: "flex", alignItems: "center", padding: 2 }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isLive}
                            onChange={handleSwitchChange}
                            color="primary"
                          />
                        }
                        label={isLive ? "Live" : "Demo"}
                      />
                    </Box>

                    <Box sx={{ padding: 2 }}>
                      <Typography>
                        Chế độ hiện tại:{" "}
                        <strong>{isLive ? "Live" : "Demo"}</strong>
                      </Typography>
                    </Box>

                    {/* Các input cho client key và secret key */}
                    <Box sx={{ padding: 2, mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Client Key Demo"
                        variant="outlined"
                        value={clientKeyDemo}
                        onChange={(e) => setClientKeyDemo(e.target.value)}
                        style={{ marginBottom: 10 }}
                      />
                      <br />
                      <TextField
                        fullWidth
                        label="Secret Key Demo"
                        variant="outlined"
                        value={secretKeyDemo}
                        onChange={(e) => setSecretKeyDemo(e.target.value)}
                        style={{ marginBottom: 10 }}
                      />
                      <TextField
                        fullWidth
                        label="Client Key Live"
                        variant="outlined"
                        value={clientKeyLive}
                        onChange={(e) => setClientKeyLive(e.target.value)}
                        style={{ marginBottom: 10 }}
                      />
                      <TextField
                        fullWidth
                        label="Secret Key Live"
                        variant="outlined"
                        value={secretKeyLive}
                        onChange={(e) => setSecretKeyLive(e.target.value)}
                        style={{ marginBottom: 10 }}
                      />
                    </Box>
                    <Button
                      onClick={async () => {
                        try {
                          const res = await update_key({
                            client_key_demo: clientKeyDemo,
                            secret_key_demo: secretKeyDemo,
                            client_key_live: clientKeyLive,
                            secret_key_live: secretKeyLive,
                          });
                          if (res.ok === true) {
                            swal(
                              "Thông báo",
                              "Cập nhật thành công!",
                              "success"
                            );
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Lưu
                    </Button>

                    {/* Password Change Section */}
                    <Box sx={{ padding: 2, mt: 4 }}>
                      <Typography variant="h6">Đổi mật khẩu</Typography>

                      {/* Old Password Field */}
                      <TextField
                        fullWidth
                        label="Mật khẩu cũ"
                        variant="outlined"
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{ marginBottom: 10 }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </Button>
                          ),
                        }}
                      />

                      {/* New Password Field */}
                      <TextField
                        fullWidth
                        label="Mật khẩu mới"
                        variant="outlined"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ marginBottom: 10 }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </Button>
                          ),
                        }}
                      />

                      {/* Confirm New Password Field */}
                      <TextField
                        fullWidth
                        label="Xác nhận mật khẩu mới"
                        variant="outlined"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        style={{ marginBottom: 10 }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </Button>
                          ),
                        }}
                      />
                      {passwordError && (
                        <FormHelperText error>{passwordError}</FormHelperText>
                      )}
                      <Button
                        onClick={handlePasswordChange}
                        variant="contained"
                        color="secondary"
                        fullWidth
                      >
                        Đổi mật khẩu
                      </Button>
                    </Box>
                  </Card>
                </Box>
                <Box sx={{ padding: 2, mt: 4 }}>
                  <Typography variant="h6">Tạo mã giảm giá</Typography>

                  {/* Nhập mã giảm giá */}
                  <TextField
                    fullWidth
                    label="Mã giảm giá"
                    variant="outlined"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    style={{ marginBottom: 10 }}
                  />

                  {/* Nhập số tiền giảm giá */}
                  <TextField
                    fullWidth
                    label="Số tiền giảm giá"
                    variant="outlined"
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    style={{ marginBottom: 10 }}
                  />

                  {/* Nút lưu mã giảm giá */}
                  <Button
                    onClick={async () => {
                      try {
                        const data = await create_discount({
                          discount: discountCode,
                          amount: parseFloat(discountAmount),
                        });
                        if (data?.ok === true) {
                          swal(
                            "Thông báo",
                            "Tạo mã giảm giá thành công!",
                            "success"
                          );
                          // setDiscountCode("");
                          // setDiscountAmount("");
                        } else {
                          swal(
                            "Thông báo",
                            "Tạo mã giảm giá thất bại!",
                            "error"
                          );
                        }
                      } catch (error) {
                        console.error(error);
                        swal(
                          "Thông báo",
                          "Đã xảy ra lỗi khi tạo mã giảm giá.",
                          "error"
                        );
                      }
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Tạo mã giảm giá
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
