const fieldModel = require("../models/fieldRecord");
const mongoose = require("mongoose");

//________________validation_______________________//
const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

//________________create__________________//
const createFieldRecord = async (req, res) => {
  try {
    // Validate the request body
    if (
      !req.body.farm ||
      !req.body.season ||
      !req.body.date ||
      !req.body.notes
    ) {
      return res
        .status(400)
        .send({ message: `farm, season, date, and note are required` });
    }
    if (!isValidObjectId(req.body.farm)) {
      res.status(400).send({ message: `Invalid farm id` });
      return;
    }
    // Save the field record to the database
    const savedFieldRecord = await fieldModel.create(req.body);

    // Return the saved field record in the response
    res
      .status(201)
      .send({
        stuatus: true,
        msg: `Data created sucessfully`,
        data: savedFieldRecord,
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________get___________________________//

const getFieldRecordById = async (req, res) => {
  try {
    // Validate the request parameter
    if (!req.params.id) {
      return res.status(400).send({ message: `Field record ID is required` });
    }

    // Find the field record with the specified ID
    const fieldRecord = await fieldModel
      .findById(req.params.id)
      .populate("farm")
      .populate("season");
    if (!fieldRecord) {
      return res.status(404).send({ message: `Field record not found` });
    }

    // Return the field record in the response
    res
      .status(200)
      .send({ status: true, message: `Success`, data: fieldRecord });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________update___________________________//

const updateFieldRecord = async (req, res) => {
  try {
    // Find the field record with the specified ID and update it with the request data
    const fieldRecord = await fieldModel.findByIdAndUpdate(
      req.params.id,
      {
        farm: req.body.farm,
        season: req.body.season,
        date: req.body.date,
        notes: req.body.notes,
        activity: req.body.activity,
        cost: req.body.cost,
      },
      { new: true }
    );
    if (!fieldRecord) {
      return res.status(404).send({ message: `Field record not found` });
    }

    // Return the updated field record in the response
    res
      .status(200)
      .send({ status: true, message: `Success`, data: fieldRecord });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________delete___________________________//

const deleteFieldRecord = async (req, res) => {
  try {
    // Validate the request data
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: `Missing field record ID` });
    }

    // Find the field record by ID
    const fieldRecord = await fieldModel.findByIdAndDelete(req.params.id);
    if (!fieldRecord) {
      return res.status(404).send({ error: `Field record not found` });
    }
    // Send a success response
    res
      .status(200)
      .send({ status: true, message: `Field record deleted successfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createFieldRecord,
  getFieldRecordById,
  updateFieldRecord,
  deleteFieldRecord,
};
