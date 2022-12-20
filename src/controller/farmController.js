const mongoose = require("mongoose");
const farmModel = require("../models/farm");

//___________________validation______________________//

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

//___________________create farm__________________//

const createFarm = async (req, res) => {
  try {
    // Validate the request body
    if (!req.body.name || !req.body.location || !req.body.size) {
      res.status(400).send({ message: `Missing required fields` });
      return;
    }

    // Create a new farm
    const farm = await farmModel.create(req.body);
    res
      .status(201)
      .send({ status: true, msg: `Data created sucessfully`, data: farm });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//________________get farm______________________//
const getFarm = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid farm id` });
      return;
    }

    // Get the farm with the specified id
    const farm = await farmModel.findById(req.params.id).populate("user");
    if (!farm) {
      res.status(404).send({ message: `Farm not found` });
      return;
    }
    res.status(200).send({ status: true, msg: `Success`, data: farm });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________update___________________//
const updateFarm = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid farm id` });
      return;
    }

    // Update the farm with the specified id
    const farm = await farmModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!farm) {
      res.status(404).send({ message: `Farm not found` });
      return;
    }
    res
      .status(200)
      .send({ status: true, msg: `Data updated sucessfully`, data: farm });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//__________________________delete farm_____________________//

const markFarmInactive = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid farm id` });
      return;
    }

    // Mark the farm with the specified id as inactive
    const farm = await farmModel.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        new: true,
      }
    );
    if (!farm) {
      res.status(404).send({ message: `Farm not found` });
      return;
    }
    res.status(201).send({ status: true, msg: `Farm deleted sucessfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createFarm, getFarm, updateFarm, markFarmInactive };
