import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  nama_lengkap: {
    type: String,
  },
  alamat: {
    type: String,
  },
  orderId: {
    type: String,
    required: true,
  },
  brand: { type: String },
  type: { type: String },
  quantity: { type: String },
  image: { type: String },
  grossAmount: {
    type: Number,
    required: true,
  },
  storeId: {
    type: String,
  },
  status: {
    type: String,
  },
});

const paymentModel = mongoose.model("payment", transactionSchema);

export default paymentModel;
