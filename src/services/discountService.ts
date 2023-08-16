import { IDiscount } from "../types/discoutntType";
import Discount from "../models/Discount";

class DiscountService {
  async createDiscount(discountData: IDiscount): Promise<IDiscount> {
    try {
      const discoutn = new Discount(discountData);
      await discoutn.save();
      return discoutn;
    } catch (error) {
      throw new Error('Could not crate city');
    }
  }

  async getAllDiscoutns(): Promise<IDiscount[]> {
    try {
      const discounts = await Discount.find();
      return discounts;
    } catch (error) {
      throw new Error('Could not retrieve discounts');
    }
  }

  async getDiscountById(id: string): Promise<IDiscount | null> {
    try {
      const discount = await Discount.findById(id);
      return discount;
    } catch (error) {
      throw new Error('Could not retrieve discount');
    }
  }
}

export const discountService = new DiscountService();
