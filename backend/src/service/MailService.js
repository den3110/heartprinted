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
  const dataBank= await db.setting.findOne({})

  const htmlContent = `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Order Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 30px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        color: #333;
                    }
                    h1 {
                        font-size: 24px;
                        color: #007BFF;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.6;
                        margin: 10px 0;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #0056b3;
                    }
                    .bank-details {
                        background-color: #f1f8ff;
                        padding: 15px;
                        border-left: 4px solid #007BFF;
                        margin: 20px 0;
                        border-radius: 5px;
                    }
                    .address {
                        margin-top: 20px;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Vielen Dank für Ihre Bestellung!</h1>
                    <p>Ausgewählte Zahlungsmethode: <span class="highlight">Überweisung</span></p>
                    <p>Sobald wir Ihre Zahlung erhalten haben, wird Ihre Bestellung bearbeitet.</p>
                    <p>Wir haben Ihre Zahlung noch nicht erhalten. Bitte bezahlen Sie die Bestellung. Die Daten finden Sie hier:</p>
                    <div class="bank-details">
                        <p><strong>Bank Name:</strong> ${dataBank?.bank_name}</p>
                        <p><strong>Kontoinhaber:</strong> ${dataBank?.bank_account}</p>
                        <p><strong>IBAN:</strong> ${dataBank?.iban}</p>
                        <p><strong>BIC:</strong> ${dataBank?.bic}</p>
                        <p><strong>Verwendungszweck:</strong> <span class="highlight"> ${
                        user.orderID
                        }</span></p>
                        <p><strong>Gesamtpreis:</strong> ${user.total?.toFixed(2)} €</p>
                    </div>
                    <p class="address">Alles schicken wir Ihnen an diese Adresse:</p>
                    <p class="address"><span class="highlight">van khanh do</span><br>
                        bahnhofstr 37, idstein, 65510</p>
                </div>
            </body>
            </html>

    `;
  // <h1>Order Confirmation</h1>
  //     <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
  //     <p><strong>Email:</strong> ${user.email}</p>
  //     <p><strong>Phone:</strong> ${user.phone}</p>
  //     <p><strong>Address:</strong> ${user.address}, ${user.city}, ${user.zipCode}</p>
  //     <p><strong>Payment Method:</strong> ${user.method}</p>
  //     <p><strong>Total:</strong> ${user.total?.toFixed(2)}EUR</p>
  //     <p><strong>Transfer content:</strong> ${user.orderID}</p>
  //     <p>Thank you for your order!</p>

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
