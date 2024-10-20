import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { GetCustomerDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";

const View = () => {
  const [getList, setGetList] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    gender: "",
  });

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    let list = await GetCustomerDetails.getAllCustomerList();
    setGetList(list.data);
  };

  const handleDeleteById = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete Customer from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if(success== null) {
        setLoading(false);
      }
      if (success) {
        let value = await GetCustomerDetails.getCustomerDeleteById(id);
        if (value) {
          NotificationManager.success(value.msg, "Status");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    });
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleChangeAddPopup = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCustomer = () => {
    // Xử lý thêm khách hàng vào cơ sở dữ liệu ở đây
    // ...

    // Đóng popup và làm mới danh sách khách hàng
    setIsAddPopupOpen(false);
    getCustomer();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 col-md-9 col-lg-6">
          <h2 className="mt-30 page-title">Customer</h2>
        </div>
        <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
          <Button variant="contained" onClick={handleBack}>
            <i className="fas fa-arrow-left" /> Back
          </Button>
        </div>
      </div>
      <ol className="breadcrumb mb-30">
        <li className="breadcrumb-item">
          <a href="index.html">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Customer</li>
      </ol>
      <div className="row justify-content-between">
        <div className="col-lg-3 col-md-4">
          <div className="bulk-section mt-30">
            <div className="input-group">
              <select id="action" name="action" className="form-control">
                <option selected>Bulk Actions</option>
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
                <option value={3}>Delete</option>
              </select>
              <div className="input-group-append">
                <button className="status-btn hover-btn" type="submit">
                  Áp dụng 
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="bulk-section mt-30">
            <div className="search-by-name-input">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="input-group">
              <select
                id="categeory"
                name="categeory"
                className="form-control"
              >
                <option selected>Hoạt động </option>
                <option value={1}>Không hoạt động</option>
              </select>
              <div className="input-group-append">
                <button className="status-btn hover-btn" type="submit">
                  Tìm người dùng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            <div className="card-title-2">
              <h4>Tất cả người dùng cấp 2</h4>
            </div>
            <div className="card-body-table">
              <div className="table-responsive">
                <table className="table ucp-table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>ID</th>
                      <th>Họ</th>
                      <th>Tên</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getList.map((row, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.phone}</td>
                        <td>{row.email}</td>
                        <td className="action-btns">
                          {/* <Edit state={row} /> */}
                          <Typography
                            className="delete-btn"
                            onClick={() => handleDeleteById(row.id)}
                          >
                            <i className="fas fa-trash-alt" />
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
                    
      {/* Popup Thêm Customer */}
      {isAddPopupOpen && (
        <div className="add-customer-popup">
          <div className="add-customer-content">
            <h2>Thêm người dùng</h2>
            <div className="form-group">
              <label>Họ</label>
              <TextField
                type="text"
                className="form-control"
                name="firstName"
                value={newCustomer.firstName}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Tên</label>
              <TextField
                type="text"
                className="form-control"
                name="lastName"
                value={newCustomer.lastName}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <TextField
                type="text"
                className="form-control"
                name="phone"
                value={newCustomer.phone}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <TextField
                type="text"
                className="form-control"
                name="email"
                value={newCustomer.email}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <TextField
                type="text"
                className="form-control"
                name="address"
                value={newCustomer.address}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <TextField
                type="password"
                className="form-control"
                name="password"
                value={newCustomer.password}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <label>Giớp tính</label>
              <TextField
                type="text"
                className="form-control"
                name="gender"
                value={newCustomer.gender}
                onChange={handleChangeAddPopup}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                onClick={handleAddCustomer}
              >
                Thêm
              </button>
              <button
                className="btn btn-danger btn-block"
                onClick={handleCloseAddPopup}
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
