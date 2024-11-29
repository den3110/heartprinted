import fs from "fs";
import sharp from "sharp";
import path from "path";
import { db } from "../../../models";
import { Sequelize } from "sequelize";
export default {
  async getSetting(req, res) {
    const data= await db.setting.findOne({

    })
    return res.status(200).json({ok: true, data})
  },
  async updateModePayment(req, res) {
    try {
        await db.setting.update({mode_payment: req.body.mode}, {where: {id: 1}}  )
        const data= await db.setting.findOne({

        })
        return res.status(200).json({ok: true, data})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ok: false, message: error.message})
    }
  },
  async updateKey(req, res) {
    try {
        await db.setting.update({...req.body}, {where: {id: 1}}  )
        const data= await db.setting.findOne({

        })
        return res.status(200).json({ok: true, data})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ok: false, message: error.message})
    }
  },
  async updateBank(req, res) {
    try {
        await db.setting.update({...req.body}, {where: {id: 1}}  )
        const data= await db.setting.findOne({

        })
        return res.status(200).json({ok: true, data})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ok: false, message: error.message})
    }
  },
  async getInfoPayment(req, res) {
    
    try {
        // Retrieve the payment mode and keys from the database or configuration
        const settings = await db.setting.findOne(); // Assuming you have a settings table or model
    
        // Check if settings exist and mode_payment is available
        if (!settings) {
          return res.status(404).json({ ok: false, message: 'Settings not found' });
        }
    
        const { mode_payment, client_key_live, secret_key_live, client_key_demo, secret_key_demo } = settings;
    
        // Determine which keys to return based on the mode_payment value
        const data = mode_payment
          ? { key: client_key_live }
          : { key: client_key_demo };
    
        // Return the data with an OK response
        return res.status(200).json({ ok: true, data });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: 'An error occurred while retrieving payment info' });
      }
    },
    async createDiscount(req, res) {
      try {
        await db.setting.update({discount: req.body.discount, amount: req.body.amount}, {where: {id: 1}}  )
        return res.status(200).json({ok: true, message: 'Discount and amount updated successfully'})
      } catch (error) {
        return res.status(500).json({ok: false, message: error.message})
      }
    }
};
