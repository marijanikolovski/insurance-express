import express from 'express';
import validateCity from '../middleware/cityValidate';
import cityController from '../controllers/cityController';

const cityRoute = express.Router();

cityRoute.post('/cities', validateCity, cityController.crateCity);
cityRoute.get('/cities', cityController.getAllCities)

export default cityRoute;