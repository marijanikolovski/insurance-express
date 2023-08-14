import express from 'express';
import validateDiscount from '../middleware/discountValidate';
import discoutnController from '../controllers/discoutnController';

const discountRoute = express.Router();

discountRoute.post('/discounts', validateDiscount, discoutnController.crateDiscoutn);
discountRoute.get('/discounts', discoutnController.getAllDiscounts)

export default discountRoute;