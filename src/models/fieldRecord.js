const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const fieldRecordSchema = new mongoose.Schema({
  farm: {
    type: ObjectId,
    ref: "farm",
    required: true,
  },
  season: {
    type: ObjectId,
    ref: "season",
    required: true,
  },

  activity: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("field", fieldRecordSchema);
