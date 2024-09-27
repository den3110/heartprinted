import React, { useState } from 'react';
import { NotificationManager } from "react-notifications";
import { GetUserLogin } from '../../../../services';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import axios from "axios"
import { API_URL } from '../../../../../../config1';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const verificationFunc= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/auth/verification",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: null,
        email: null,
        password: null,
        verificationCode: null,
        formErrors: {
            firstName: "",
            email: "",
            password: "",
            verificationCode: ""
        }
    });

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let updatedFormErrors = { ...formData.formErrors };
        switch (name) {
            case "firstName":
                updatedFormErrors.firstName =
                    value.length < 3 ? "minimum 3 characters required" : "";
                break;
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
        setFormData({ ...formData, formErrors: updatedFormErrors, [name]: value });
    };

    const handleSubmit = async () => {
        let { firstName, email, password } = formData;
        let data = { firstName: firstName, email: email, password: password }
        try {
            let list = await GetUserLogin.getUserRegister(data);
            
        } catch (error) {
            NotificationManager.error("Email is exist", "Input Error");
            
        }
        // if (formValid(formData)) {
        //     if (list) {
        //         NotificationManager.success("Successfully Added New User");
        //         window.location.href = "/login";
        //     }
        // } else {
        //     NotificationManager.error("Please check your Register", "Input Error");
        // }
    };
    const handleOpenDialog = async  () => {
        await handleSubmit()
        setOpen(true);
        verificationFunc({email, password, firstName})
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    const [open, setOpen] = useState(false); // State để kiểm soát việc mở/đóng Dialog

    const { firstName, email, password, formErrors, verificationCode } = formData;

    return (
        <div className="card checkout-step-one">
            <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span className="number">1</span> Login or SignUp
                    </button>
                </h5>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="login-modal login-page-bk">
                                <div className="row">
                                    <div className="col-lg-6 pad-right-0">
                                        <div className="login-modal-left">
                                        </div>
                                    </div>
                                    <div className="col-lg-6 pad-left-0">
                                        <div noValidate>
                                            <h5 className="heading-design-h5">Register Now!</h5>
                                            <fieldset className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" name="firstName" value={firstName || ''} onChange={handleChange} />
                                                {formErrors.firstName.length > 0 && (
                                                    <span className="errorMessage">{formErrors.firstName}</span>
                                                )}
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Enter Email/Mobile number</label>
                                                <input type="text" className="form-control" name="email" value={email || ''} onChange={handleChange} />
                                                {formErrors.email.length > 0 && (
                                                    <span className="errorMessage">{formErrors.email}</span>
                                                )}
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Enter Password</label>
                                                <input type="password" className="form-control" name="password" value={password || ''} onChange={handleChange} />
                                                {formErrors.password.length > 0 && (
                                                    <span className="errorMessage">{formErrors.password}</span>
                                                )}
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleOpenDialog}>Create Your Account</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Enter Verification Code</DialogTitle>
                <DialogContent>
                    You can access email register to complete signup
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Register;

