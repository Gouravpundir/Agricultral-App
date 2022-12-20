const cropModel = require("../models/crop");
const mongoose = require("mongoose");

//_____________________validations__________________//

const isvalidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

//______________create crop_______________//

const createCrop = async (req, res) => {
  try {
    let requestBody = req.body;
    if (!isvalidRequestBody(requestBody)) {
      res
        .status(400)
        .send({ status: false, msg: `request body cant't be empty` });
      return;
    }
    // Validate the request body
    if (
      !requestBody.cropName ||
      !requestBody.type ||
      !requestBody.plantingDate ||
      !requestBody.harvestDate
    ) {
      res.status(400).send({ message: `Missing required fields` });
      return;
    }

    // Create a new crop
    const crop = await cropModel.create(req.body);
    // let data = await crop.populate("user")
    res
      .status(201)
      .send({ status: true, msg: `Data created sucessfully`, data: crop });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//________________get crop_____________________//

const getCrop = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid crop id` });
      return;
    }

    // Get the crop with the specified id
    const crop = await cropModel.findById(req.params.id).populate("farm");
    if (!crop) {
      res.status(404).send({ message: `Crop not found` });
      return;
    }
    // const profit = crop.sellPrice - crop.buyPrice;
    // crop.profit = profit
    res.status(200).send({ status: true, msg: `success`, data: crop });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//________________update crop__________________//

const updateCrop = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid crop id` });
      return;
    }

    // Update the crop with the specified id
    const crop = await cropModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!crop) {
      res.status(404).send({ message: `Crop not found` });
      return;
    }
    res.status(200).send({ status: true, msg: `Success`, data: crop });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________crop profit_______________________//

const cropProfit = async (req, res) => {
  // get the sellPrice and buyPrice from the request query
  const sellPrice = req.query.sellPrice;
  const buyPrice = req.query.buyPrice;

  // check if sellPrice and buyPrice are provided in the request query
  if (!sellPrice || !buyPrice) {
    return res.status(400).send(`sellPrice and buyPrice are required`);
  }

  // find all crops in the database
  try {
    const crops = await cropModel.find();

    // calculate the profit for each crop
    const calculatedCrops = [];
    for (let i = 0; i < crops.length; i++) {
      const crop = crops[i];
      const profit = sellPrice * crop.yield - buyPrice;
      calculatedCrops.push({
        cropName: crop.cropName,
        type: crop.type,
        plantingDate: crop.plantingDate,
        harvestDate: crop.harvestDate,
        yield: crop.yield,
        costPerUnit: crop.costPerUnit,
        sellPrice: crop.sellPrice,
        buyPrice: crop.buyPrice,
        profit: profit,
      });
    }

    res
      .status(200)
      .send({ status: true, message: `Success`, data: calculatedCrops });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________delete crop___________________//

const deleteCrop = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid crop id` });
      return;
    }

    // Delete the crop with the specified id
    const crop = await cropModel.findByIdAndDelete(req.params.id);
    if (!crop) {
      res.status(404).send({ message: `Crop not found` });
      return;
    }
    res.status(200).send({ status: true, msg: `Data deleted sucessfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createCrop, getCrop, updateCrop, cropProfit, deleteCrop };
