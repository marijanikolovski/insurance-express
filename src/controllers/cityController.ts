import { Request, Response, NextFunction } from 'express';
import { ICity } from '../types/cityType';
import { cityService } from '../services/cityService';

class CityController {
  async crateCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { _id, name, value } = req.body;
      const cityData: ICity = { _id, name, value };
      const city = await cityService.createCity(cityData);
      res.status(201).json(city);
    } catch (error) {
      next(error)
    }
  }

  async getAllCities(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const cities: ICity[] = await cityService.getAllCities();
      res.json(cities);
    } catch (error) {
      next(error);
    }
  }
}

export default new CityController();