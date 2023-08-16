import { CustomerData } from "../valueObjects/customerData";
import { PriceMatchCalculation } from "../valueObjects/priceMatchCalculation";
import { basePrice } from "./basePrice";
import { coverageService } from "./coverageService";
import { discountService } from "./discountService";
import { calculateDiscountsCoverages } from "./discountsCoverages";

class InsuranceWithPriceMatch {
  async calculationWithPriceMatch(customerData: CustomerData): Promise<Record<string, any>> {
    const priceMatchCalculate = new PriceMatchCalculation();
    const toArray = priceMatchCalculate.toArray();

    const coverages = await coverageService.getAllCoverages();
    const discounts = await discountService.getAllDiscoutns();

    const base_price = await basePrice.calculateBasePriceWithPriceMatch(customerData.cityId)

    let message: string;
    let total_price: number = base_price;


    if (customerData.voucher) {
      toArray['voucher'] = customerData.voucher;
      total_price -= customerData.voucher;
    }

    if (base_price < customerData.priceMatch) {
      for (const coverageBase of coverages) {
        if (coverageBase.name !== 'Bonus Protection') {
          continue;
        }

        toArray['value_bonus_protection'] = calculateDiscountsCoverages(
          coverageBase.value,
          base_price
        );
        total_price += toArray['value_bonus_protection'];
      }

      if (total_price > customerData.priceMatch) {
        for (const discount of discounts) {
          if (discount.name !== 'Commercial discount') {
            continue;
          }

          toArray['value_commercial_discount'] = calculateDiscountsCoverages(
            discount.value,
            base_price
          );
          total_price -= toArray['value_commercial_discount'];
        }
      }

      if (total_price > customerData.priceMatch) {
        total_price = base_price;
      }
      message = 'Price match is greater than the base value.';
    } else {
      message = 'Price match must be higher than the base price.';
    }

    return {
      message: message,
      price_match: customerData.priceMatch,
      value_commercial_discount: toArray['value_commercial_discount'],
      value_bonus_protection: toArray['value_bonus_protection'],
      voucher: toArray['voucher'],
      base_price_without_age: base_price,
      total_price: total_price,
    };
  }
}

export const insuranceWithPriceMatch = new InsuranceWithPriceMatch();

