const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    plantingDate: {
      type: Date,
      required: true,
      trim: true,
    },
    harvestDate: {
      type: Date,
      required: true,
      trim: true,
    },
    costPerUnit: {
      type: Number,
      required: true,
    },
    yield: {
      type: Number,
      required: true,
    },
    farm: {
      type: ObjectId,
      ref: "farm",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("crop", cropSchema);
