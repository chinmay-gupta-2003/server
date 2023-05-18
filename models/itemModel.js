const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: true,
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

