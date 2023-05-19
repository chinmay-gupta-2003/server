const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    imageurl: {
      type: String,
    },
    cloudId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;

