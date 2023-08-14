import { Request, Response, NextFunction } from 'express';
import { ICoverage } from '../types/coverageType';
import { coverageService } from '../services/coverageService';

class CoverageController {
  async crateCoverage(
    req: Request, 
    res: Response, 
    next: NextFunction): Promise<void> {
    try {
      const { name, value, value_user_over30, description } = req.body;
      const coverageData: ICoverage = { name, value, value_user_over30, description };
      const coverage = await coverageService.createCoverage(coverageData);
      res.status(201).json(coverage);
    } catch (error) {
      next(error)
    }
  }

  async getAllCoverages(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const coverages: ICoverage[] = await coverageService.getAllCoverages();
      res.json(coverages);
    } catch (error) {
      next(error);
    }
  }
}

export default new CoverageController();