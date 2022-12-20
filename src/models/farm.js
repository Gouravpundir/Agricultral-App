const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const farmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      trim: true,
    },
    crops: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("farm", farmSchema);
