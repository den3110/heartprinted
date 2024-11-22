const nodemailer = require("nodemailer");

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail", // Hoặc dịch vụ bạn sử dụng (như SMTP)
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Hàm gửi email
async function sendOrderEmail(user) {
    // Nội dung email
    const htmlContent = `
        <h1>Order Confirmation</h1>
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address}, ${user.city}, ${user.zipCode}</p>
        <p><strong>Payment Method:</strong> ${user.method}</p>
        <p><strong>Total:</strong> ${user.total?.toFixed(2)}EUR</p>
        <p><strong>Transfer content:</strong> ${user.orderID}</p>
        <p>Thank you for your order!</p>
    `;

    // Thiết lập nội dung email
    const mailOptions = {
        from: process.env.MAIL_USERNAME, // Địa chỉ email gửi
        to: user.email, // Địa chỉ người nhận
        subject: "Order Confirmation", // Tiêu đề email
        html: htmlContent, // Nội dung email HTML
    };

    // Gửi email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
}

async function sendPaymentSuccess(user) {
    // Nội dung email
    const htmlContent = `
        <h1>Order Confirmation</h1>
        <p><strong>Transfer content:</strong> ${user.orderID}</p>
        <p><strong>Your order is successfully, Thanks for your order</p>
    `;

    // Thiết lập nội dung email
    const mailOptions = {
        from: process.env.MAIL_USERNAME, // Địa chỉ email gửi
        to: user.email, // Địa chỉ người nhận
        subject: "Order Confirmation", // Tiêu đề email
        html: htmlContent, // Nội dung email HTML
    };

    // Gửi email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
}

module.exports = { sendOrderEmail, sendPaymentSuccess };
