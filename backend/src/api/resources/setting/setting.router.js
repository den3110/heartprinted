import express from "express"
import settingController from "./setting.controller";

export const settingRouter = express.Router();

settingRouter.route("/").get(settingController.getSetting)
settingRouter.route("/payment/status").put(settingController.updateModePayment)
settingRouter.route("/key").put(settingController.updateKey)
settingRouter.route("/info").get(settingController.getInfoPayment)
settingRouter.route("/discount").post(settingController.createDiscount)