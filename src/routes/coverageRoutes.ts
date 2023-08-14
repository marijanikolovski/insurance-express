import express from 'express';
import validateCoverage from '../middleware/coverageValidate';
import coverageController from '../controllers/coverageController';

const coverageRoute = express.Router();

coverageRoute.post('/coverages', validateCoverage, coverageController.crateCoverage);
coverageRoute.get('/coverages', coverageController.getAllCoverages)

export default coverageRoute;