import { Request, Response, NextFunction } from 'express';
import { IAge } from '../types/ageType';
import { ageService } from '../services/ageSerivce';

class AgeController {
  async crateAge(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { age, value } = req.body;
      const ageData: IAge = { age, value };
      const ages = await ageService.createAge(ageData);
      res.status(201).json(ages);
    } catch (error) {
      next(error)
    }
  }

  async getAllAges(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const ages: IAge[] = await ageService.getAllAges();
      res.json(ages);
    } catch (error) {
      next(error);
    }
  }
}


export default new AgeController();