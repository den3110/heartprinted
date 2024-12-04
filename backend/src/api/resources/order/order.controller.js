import mailer from "../../../mailer";
import { db } from "../../../models";
import { sendOrderEmail, sendPaymentSuccess } from "../../../service/MailService";
import fs from "fs"
var Sequelize = require("sequelize");
const path = require("path");
const puppeteer = require("puppeteer");
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

// Hàm tạo PDF từ HTML
const generatePDF = async (htmlContent) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  const pdfPath = path.join(__dirname, "invoice.pdf");
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
};

// Hàm gửi email kèm file PDF
const pdfFile = async (data) => {
  const { shipping, total } = data;

  // Nội dung HTML cho file PDF
  const htmlContent = `
    <html>
      <body>
        <h1>Hóa đơn</h1>
        <p>Người nhận: ${shipping?.name || "Không xác định"}</p>
        <p>Email: ${shipping?.email || "Không xác định"}</p>
        <p>Địa chỉ: ${shipping?.address?.address_line_1 || "Không xác định"}</p>
        <p>Tổng số tiền: ${total} ${data.currency || ""}</p>
      </body>
    </html>
  `;

  // Tạo file PDF từ HTML
  const pdfPath = await generatePDF(htmlContent);
  return pdfPath;
}


export default {
  async index(req, res) {
    try {
      let id;
      if (req.user) {
        id = req.user.id;
      } else {
        id = 0;
      }
      const {
        customerId,
        method,
        orderID,
        shipping,
        product,
        total,
        deliveryCharge,
        currency,
        payload
      } = req.body;
      let status = "";
      
      if (method == "paypal") {
        const data= await db.setting.findOne()
        let client_key
        let secret_key
        let paypal_api
        console.log(data.mode_payment)
        if(data.mode_payment=== true) {
          client_key=data.client_key_live
          secret_key=data.secret_key_live
          paypal_api=process.env.PAYPAL_API_LIVE
        }
        else {
          client_key=data.client_key_demo
          secret_key=data.secret_key_demo
          paypal_api=process.env.PAYPAL_API_DEMO
        }
        const auth = Buffer.from(
          `${client_key}:${secret_key}`
        ).toString("base64");
        
        try {
          // Gọi PayPal API để kiểm tra trạng thái của order
          const response = await fetch(
            `${paypal_api}/v2/checkout/orders/${orderID}`,
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          // Kiểm tra trạng thái thanh toán
          // console.log("data.status", data.status);
          if (data.status === "COMPLETED") {
            // Xử lý lưu đơn hàng vào database, hoặc các hành động cần thiết
            status = data.status;
            await sendOrderEmail(req.body, pdfFile(req.body))
            
            if (id) {
              await db.product.destroy({ where: { user_id: id } });
            }
          } else {
            status = data.status;
          }
        } catch (error) {
          status = "error";
          console.error("Error checking PayPal order status:", error);
          return res.status(500).json({ errors: ["Error adding cart"] });
        }
      }
      if(method == "banking") {
        await sendOrderEmail(req.body, pdfFile(req.body))
        status = "waiting"
      }
      if(method == "credit") {
        await sendOrderEmail(req.body, pdfFile(req.body))
        status = "waiting"
      }
      // console.log(voucherId)
      await db.Order.create({
        custId: id,
        number: orderID,
        grandtotal: total,
        paymentmethod: method,
        deliveryFee: deliveryCharge,
        status: status,
        unit: currency,
      })
        .then((order) => {
          if (order) {
            return db.Address.create({
              orderId: order.id,
              custId: 1,
              fullname: shipping ? shipping.name : "",
              phone: shipping ? shipping.phone : "",
              email: shipping ? shipping.email : "",
              discrict: shipping?.address
                ? shipping?.address?.address_line_1
                : "",
              city: shipping?.address ? shipping?.admin_area_1 : "",
              states: shipping?.address ? shipping?.country_code : "",
              shipping: shipping?.address
                ? shipping.address?.address_line_1 +
                  shipping.address?.admin_area_2 +
                  shipping.address?.admin_area_1
                : "",
            }).then((p) => [order, p]);
          }
        })
        .then(([order, p]) => {
                let cartEntries = [];
                payload?.map(item=> {
                    const id= generateRandomString(12);
                    JSON.parse(item?.image)?.map(item2=> cartEntries.push({
                        orderId: order.id,
                        addressId: p.id,
                        photo: item2.product,
                        name: id.toString()
                    }))
                })
                // for (var i = 0; i < payload?.length; i++) {
                //     cartEntries.push({
                //         orderId: order.id,
                //         addressId: p.id,
                //         photo: payload?.image[i].product,
                //     })
                // }
                return db.Cart.bulkCreate(cartEntries).then((r) => [r])
        })
        .then((success) => {
          // mailer.sendUserOrder(deliveryAddress?.email ||"", "You have ordered successfully, ordered at "+ new Date())
          res
            .status(200)
            .json({ success: true, ok: true, status: "COMPLETED", orderID: orderID});
        })
        .catch(function (err) {
          // mailer.sendUserOrder(deliveryAddress?.email ||"", "You have ordered failed, ordered at "+ new Date())
          console.log(err);
          res.status(500).json({ errors: ["Error adding cart"] });
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err });
    }
  },

  async getAllOrderList(req, res, next) {
    let limit = 10;
    let sort = ["createdAt", "DESC"];
    let offset = 0;
    let page = 1;
    if (req.query.limit != undefined) {
      limit = parseInt(req.query.limit);
    }
    if (req.query.page != undefined) {
      page = req.query.page;
      if (page < 1) page = 1;
    }
    if (req.query.sort) {
      if (req.query.sort == "name") {
        sort = ["name"];
      }
    }
    try {
      db.Order.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: db.Address }, { model: db.Cart }],
      })
        .then((list) => {
          res.status(200).json({ success: true, order: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      res.status(500).json({ errors: "" + err });
    }
  },

  async statusUpdate(req, res, next) {
    try {
      const { id, status, deliverydate } = req.body;
      db.Order.findOne({ where: { id: id } })
        .then((list) => {
          if (req.body?.status === "delieverd") {
            // mailer.sendUserOrder(
            //   req.body?.email || "",
            //   `Your #ORDER-${list.number} have delivered successfully, delivered at ` +
            //     req.body?.deliverydate
            // );
          }
          if (req.body?.status === "processing") {
            // mailer.sendUserOrder(
            //   req.body?.email || "",
            //   `Your #ORDER-${list.number} is processing, delivered at ` +
            //     req.body?.deliverydate
            // );
          }
          if (req.body?.status === "shipping") {
            // mailer.sendUserOrder(
            //   req.body?.email || "",
            //   `Your #ORDER-${list.number} is shipping, shipping at ` +
            //     req.body?.deliverydate
            // );
          }
          if (req.body?.status === "cancel") {
            // mailer.sendUserOrder(
            //   req.body?.email || "",
            //   `Your #ORDER-${list.number} is canceled, reason: ${
            //     req.body?.reason || ""
            //   }, cancel at ` + req.body?.deliverydate
            // );
          }
          return db.Order.update(
            {
              status: status,
              deliverydate: deliverydate ? deliverydate : list.deliverydate,
              reason: req.body.reason || "",
            },
            { where: { id: id } }
          );
        })
        .then((success) => {
          res
            .status(200)
            .json({ success: true, msg: "Successfully Updated Status" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      res.status(500).json({ errors: "" + err });
    }
  },

  async getAllOrderListById(req, res, next) {
    try {
      db.Order.findAll({
        where: { custId: req.body.id },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Address,
            include: [{ model: db.Cart, include: [{ model: db.product }] }],
          },
        ],
      })
        .then((list) => {
          res.status(200).json({ success: true, order: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      res.status(500).json({ errors: "" + err });
    }
  },
  async getAllOrderStatus(req, res, next) {
    try {
      db.Order.findAll({
        where: { status: req.body.status },
        order: [["createdAt", "DESC"]],
        include: [{ model: db.Address, include: [{ model: db.Cart }] }],
      })
        .then((list) => {
          res.status(200).json({ success: true, order: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      res.status(500).json({ errors: "" + err });
    }
  },
  async getAllOrderCount(req, res, next) {
    try {
      db.Order.findAll({
        attributes: [
          "status",
          [Sequelize.fn("COUNT", Sequelize.col("status")), "total"],
        ],
        group: ["status"],
      })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      res.status(500).json({ errors: "" + err });
    }
  },
  async getOrderPayment(req, res) {
    const { id } = req.user;
    try {
      const data = await db.Order.findAll({
        where: {
          custId: id,
        },
      });
      return res.status(200).json({ ok: true, data });
    } catch (error) {
      return res.status(500).json({ err, ok: false });
    }
  },
  async deleteOrder(req, res) {
    const { id } = req.body;
    try {
      await db.Order.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ err, ok: false });
    }
  },
  async updateOrder(req, res) {
    try {
      await sendPaymentSuccess({email: req.body?.Addresses?.[0]?.email, orderID: req.body?.number})
      await db.Order.update({status: "COMPLETED"}, {where: { id: req.body.id }});
      return res.status(200).json({ ok: true });
      
    } catch (error) {
      return res.status(500).json({ err, ok: false });
    }
  }
};
