import React, { useState } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

const Register = () => {
    const [open, setOpen] = useState(false); // State để kiểm soát việc mở/đóng Dialog
    const [formData, setFormData] = useState({
        firstName: null,
        email: null,
        password: null,
        verificationCode: '',
        isEmailSent: false,
        formErrors: {
            firstName: "",
            email: "",
            password: "",
            verificationCode: ""
        }
    });

    const { firstName, email, password, verificationCode, isEmailSent, formErrors } = formData;

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let updatedFormErrors = { ...formErrors };
        switch (name) {
            case "firstName":
                updatedFormErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                updatedFormErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                updatedFormErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "verificationCode":
                updatedFormErrors.verificationCode =
                    value.length !== 6 ? "verification code must be 6 characters" : "";
                break;
            default:
                break;
        }
        setFormData({ ...formData, formErrors: updatedFormErrors, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { firstName, email, password };
        if (!isEmailSent) {
            try {
                await axios.post('/api/sendEmailVerification', { email });
                setFormData({ ...formData, isEmailSent: true });
                NotificationManager.success("Verification code has been sent to your email");
            } catch (error) {
                NotificationManager.error("Error sending verification code", "Error");
            }
        } else {
            try {
                const response = await axios.post('/api/verifyEmailCode', { email, code: verificationCode });
                if (response.data.success) {
                    await axios.post('/api/registerUser', data);
                    NotificationManager.success("Successfully Added New User");
                }
            } catch (error) {
                NotificationManager.error("Invalid verification code", "Error");
            }
        }
    };

    return (
        <div>
            <h5 className="heading-design-h5">Register Now!</h5>
            <div action='#'>
                <fieldset className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleChange} />
                    {formErrors.firstName.length > 0 && (
                        <span className="errorMessage">{formErrors.firstName}</span>
                    )}
                </fieldset>
                <fieldset className="form-group">
                    <label>Enter Email/Mobile number</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={handleChange} />
                    {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}
                </fieldset>
                <fieldset className="form-group">
                    <label>Enter Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                    {formErrors.password.length > 0 && (
                        <span className="errorMessage">{formErrors.password}</span>
                    )}
                </fieldset>
                {!formData.isEmailVerified && formData.isEmailSent && (
                    <fieldset className="form-group">
                        <label>Enter Verification Code</label>
                        <input type="text" className="form-control" name="verificationCode" value={verificationCode} onChange={handleChange} />
                        {formErrors.verificationCode.length > 0 && (
                            <span className="errorMessage">{formErrors.verificationCode}</span>
                        )}
                    </fieldset>
                )}
                <fieldset className="form-group">
                    <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={handleOpenDialog}>
                        {formData.isEmailSent && !formData.isEmailVerified ? "Verify Email" : "Create Your Account"}
                    </button>
                </fieldset>
             
            </div>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Enter Verification Code</DialogTitle>
                <DialogContent>
                    <input type="text" className="form-control" name="verificationCode" value={verificationCode} onChange={handleChange} />
                    {formErrors.verificationCode.length > 0 && (
                        <span className="errorMessage">{formErrors.verificationCode}</span>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Register;
