import mongoose from "mongoose";

const marketPriceSchema = new mongoose.Schema({
  records:[{
  state: String,
  district: String,
  market: String,
  commodity: String,
  variety: String,
  grade: String,
  arrival_date: Date,
  min_price: Number,
  max_price: Number,
  modal_price: Number,
  icon:String
  }]
});

const marketPrice = mongoose.model('marketprice', marketPriceSchema);

export default marketPrice;