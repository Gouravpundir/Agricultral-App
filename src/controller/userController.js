const userModel = require("../models/user");
const mongoose = require("mongoose");

//_____________________validations__________________//

const isvalidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isVAlidEmail = function (email) {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
};

const isValidPassword = function (password) {
  password = password.trim();
  if (password.length < 8 || password.length > 15) {
    return false;
  }
  return true;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

//_______________createUser____________________//
const createUser = async (req, res) => {
  try {
    // Validate the request body
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400).send({ message: `Missing required fields` });
      return;
    }

    if (!isvalidRequestBody(req.body)) {
      res
        .status(400)
        .send({ status: false, msg: `request body cant't be empty` });
      return;
    }
    const { name, email, password } = req.body;

    if (!isVAlidEmail(email)) {
      res
        .status(400)
        .send({ status: false, msg: `Please provide valid E-mail` });
      return;
    }

    if (!isValidPassword(password)) {
      res
        .status(400)
        .send({ status: false, msg: `Please provide valid password` });
      return;
    }

    let uniqueNameAndEmail = await userModel.find({
      $or: [{ email: req.body.email }, { name: req.body.name }],
    });

    if (uniqueNameAndEmail.length !== 0) {
      if (uniqueNameAndEmail[0].email == req.body.email) {
        return res.status(400).send({
          status: false,
          data: `Email Id Already Exists,Please Input Another Email Id`,
        });
      } else {
        return res.status(400).send({
          status: false,
          data: `Name is Already Exists,Please Input Another phone Number`,
        });
      }
    }
    // Create a new user
    const user = await userModel.create(req.body);
    res.status(201).send({ status: true, msg: `Sucess`, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//_________________ger user ____________________//

const getUser = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid user id` });
      return;
    }

    // Get the user with the specified id
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: `User not found` });
      return;
    }
    res.status(200).send({ status: true, message: `Success`, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//____________________update user________________________//

const updateUser = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid user id` });
      return;
    }

    // Update the user with the specified id
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).send({ message: `User not found` });
      return;
    }
    res.status(200).send({ status: true, message: `Success`, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//_______________delete user______________________//

const deleteUser = async (req, res) => {
  try {
    // Validate the request parameters
    if (!isValidObjectId(req.params.id)) {
      res.status(400).send({ message: `Invalid user id` });
      return;
    }

    // Delete the user with the specified id
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send({ message: `User not found` });
      return;
    }
    res.status(200).send({ status: true, msg: `Success` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
