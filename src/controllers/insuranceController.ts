import { Request, Response, request } from 'express';
import { insuranceWithPriceMatch } from "../services/insuranceWirhriceMatch";
import { CustomerData } from '../valueObjects/customerData';
import { ICustomerData } from '../types/customerDataType';
import { insuranceWithoutPriceMatch } from '../services/insuranceWithoutPriceMatch';

class InsuranceController {
  async calculatePrice(
    req: Request,
    res: Response
  ): Promise<void> {

    const {
      name,
      ageId,
      cityId,
      vehiclePower,
      voucher,
      priceMatch,
      discountId,
      coverageId } = req.body

    const data: ICustomerData = {
      name,
      ageId,
      cityId,
      vehiclePower,
      voucher,
      priceMatch,
      discountId,
      coverageId
    }

    const customer = CustomerData.createFromRequest(data);

    if (req.body.priceMatch) {
      const result = await insuranceWithPriceMatch.calculationWithPriceMatch(customer);
      res.json(result);
    } else {
      const result = await insuranceWithoutPriceMatch.calculationWithoutPriceMatch(customer);
      res.json(result);
    }
  };
}

export default new InsuranceController();