
const express = require("express");
const router = express.Router();

const cropController=require('../controller/cropController')
const farmController=require('../controller/farmController')
const seasonController=require('../controller/seasonController')
const fieldController=require('../controller/fieldController')
const userController=require('../controller/userController')


//user
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//farm
router.post('/farms', farmController.createFarm);
router.get('/farms/:id', farmController.getFarm);
router.put('/farms/:id', farmController.updateFarm);
router.delete('/farms/:id', farmController.markFarmInactive);

//crop
router.post('/crops', cropController.createCrop);
router.get('/crops/:id', cropController.getCrop);
router.put('/crops/:id', cropController.updateCrop);
router.get('/crops', cropController.cropProfit);
router.delete('/crops/:id', cropController.deleteCrop);

//season
router.post('/seasons', seasonController.createSeason);
router.get('/seasons/:id', seasonController.getSeasonById);
router.put('/seasons/:id', seasonController.updateSeason);
router.delete('/seasons/:id', seasonController.deleteSeason);

//field
router.post('/fields', fieldController.createFieldRecord);
router.get('/fields/:id', fieldController.getFieldRecordById);
router.put('/fields/:id', fieldController.updateFieldRecord);
router.delete('/fields/:id', fieldController.deleteFieldRecord);

module.exports = router;