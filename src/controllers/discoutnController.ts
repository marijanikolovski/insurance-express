import { Request, Response, NextFunction } from 'express';
import { IDiscount } from '../types/discoutntType';
import { discountService } from '../services/discountService';

class DiscoutnController {
  async crateDiscoutn(
    req: Request, 
    res: Response, 
    next: NextFunction): Promise<void> {
    try {
      const { name, value, description } = req.body;
      const discountData: IDiscount = { name, value, description };
      const discount = await discountService.createDiscount(discountData);
      res.status(201).json(discount);
    } catch (error) {
      next(error)
    }
  }

  async getAllDiscounts(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const discoutns: IDiscount[] = await discountService.getAllDiscoutns();
      res.json(discoutns);
    } catch (error) {
      next(error);
    }
  }
}

export default new DiscoutnController();