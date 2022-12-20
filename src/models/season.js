const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const seasonSchema = new mongoose.Schema({
  seasonName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  farm: {
    type: ObjectId,
    ref: "farm",
    required: true,
  },
});

module.exports = mongoose.model("season", seasonSchema);
