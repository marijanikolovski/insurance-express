import express from 'express';
import validateAge from '../middleware/ageValidate';
import ageController from '../controllers/ageController';

const ageRoute = express.Router();

ageRoute.post('/age', validateAge, ageController.crateAge);
ageRoute.get('/age', ageController.getAllAges);


export default ageRoute;