const seasonModel = require("../models/season");

//___________________create___________________________//
const createSeason = async (req, res) => {
  try {
    // Validate the request body
    let { seasonName, startDate, endDate } = req.body;
    if (!seasonName || !startDate || !endDate) {
      return res
        .status(400)
        .send({ message: `Name, start date, and end date are required` });
    }

    // Check if a season with the same name already exists
    const existingSeason = await seasonModel.findOne({
      seasonName: seasonName,
    });
    if (existingSeason) {
      return res
        .status(400)
        .send({ message: `A season with this name already exists` });
    }

    // Save the season to the database
    const savedSeason = await seasonModel.create(req.body);

    // Return the saved season in the response
    res
      .status(201)
      .send({
        status: true,
        message: `Data created successfully`,
        data: savedSeason,
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________get___________________________//

const getSeasonById = async (req, res) => {
  try {
    // Validate the request parameter
    if (!req.params.id) {
      return res.status(400).send({ message: `Season ID is required` });
    }

    // Find the season with the specified ID
    const season = await seasonModel.findById(req.params.id).populate("farm");
    if (!season) {
      return res.status(404).send({ message: `Season not found` });
    }

    // Return the season in the response
    res.status(200).send({ status: true, message: `Success`, data: season });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________update___________________________//

const updateSeason = async (req, res) => {
  try {
    // Check if a season with the same name already exists
    const existingSeason = await seasonModel.findOne({ name: req.body.name });
    if (existingSeason && existingSeason._id != req.params.id) {
      return res
        .status(400)
        .send({ message: `A season with this name already exists` });
    }

    // Find the season with the specified ID and update it with the request data
    const season = await seasonModel.findByIdAndUpdate(
      req.params.id,
      {
        seasonName: req.body.seasonName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        properties: req.body.properties,
      },
      { new: true }
    );
    if (!season) {
      return res.status(404).send({ message: `Season not found` });
    }

    // Return the updated season in the response
    res.status(200).send({ status: true, message: `Success`, data: season });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//___________________delete___________________________//

const deleteSeason = async (req, res) => {
  try {
    // Validate the request parameter
    if (!req.params.id) {
      return res.status(400).send({ message: `Season ID is required` });
    }

    // Find the season with the specified ID
    const season = await seasonModel.findByIdAndDelete(req.params.id);
    if (!season) {
      return res.status(404).send({ message: `Season not found` });
    }

    // Return a success message in the response
    res
      .status(200)
      .send({ status: true, message: `Season deleted successfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createSeason, getSeasonById, updateSeason, deleteSeason };
