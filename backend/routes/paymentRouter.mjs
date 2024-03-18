import express from "express";
import { ordersModel } from "../model/orderModels.mjs";
import paymentModel from "../model/paymentModel.mjs";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../middleware/middleware.mjs";
import { boxModel } from "../model/boxModel.mjs";

const router = express.Router();

router.post("/payment", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_lengkap, alamat } = req.body;
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-jZXMTb1aNThX2-exizCpQ2rc",
      clientKey: "SB-Mid-client-2zwerIPtHdJiORBs",
    });

    const lastOrder = await boxModel.findOne({});

    if (!lastOrder) {
      return res.status(400).json({ message: "Tidak ada pesanan sebelumnya" });
    }
    const { items } = lastOrder;
    const grossAmount = items.reduce((total, item) => total + item.totalPrice, 0);

    let parameter = {
      transaction_details: {
        order_id: uuidv4(),
        nama_lengkap,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: nama_lengkap,
        address: alamat,
      },
      enabled_payments: ["bca_va", "bni_va", "permata_va"], // Daftar bank untuk VA
    };
    snap
      .createTransaction(parameter)
      .then(async (transaction) => {
        const newTransaction = new paymentModel({
          orderId: userId,
          nama_lengkap,
          alamat,
          grossAmount,
          brand: items[0].brand,
          type: items[0].type,
          quantity: items.reduce((total, item) => total + item.quantity, 0),
          image: items[0].image,
          transactionId: transaction.transactionId,
          storeId: items[0].storeId,
          status: "Diproses",
        });
        const savedTransaction = await paymentModel.create(newTransaction);
        await boxModel.deleteMany({ orderId: req.user.id });
        res.status(200).json(transaction);
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        return res.status(500).send("Gagal memproses pembayaran: " + error.message);
      });
  } catch (error) {
    console.error("Error processing payment request:", error);
    return res.status(500).json({ message: "Error processing payment request", error });
  }
});

router.get("/my-payment", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const lastOrder = await paymentModel.find({ orderId: userId });
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/payment/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const lastOrder = await paymentModel.findByIdAndUpdate(id, { status: req.body.status });
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Error Can't Change Status" });
  }
});

router.get("/payment", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const lastOrder = await paymentModel.find({ storeId: userId });
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/payment", verifyToken, async (req, res) => {
  try {
    const result = await paymentModel.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;
