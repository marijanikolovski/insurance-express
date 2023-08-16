import express from 'express';
import insuranceController from '../controllers/insuranceController';

const insuranceRoute = express.Router();

insuranceRoute.post('/total', insuranceController.calculatePrice);

export default insuranceRoute;