import { ICoverage } from "../types/coverageType";
import { IDiscount } from "../types/discoutntType";
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
    const { cityId, voucher, priceMatch } = customerData;

    const coverages = await coverageService.getAllCoverages();
    const discounts = await discountService.getAllDiscoutns();

    const base_price = await basePrice.calculateBasePriceWithPriceMatch(cityId);

    let total_price: number = base_price;

    total_price = this.applyVoucher(total_price, voucher, toArray);

    total_price = this.applyBonusProtectionCoverages(
      total_price,
      'Bonus Protection',
      base_price,
      coverages,
      toArray);

    total_price = this.applyCommercialDiscount(
      total_price,
      'Commercial discount',
      priceMatch,
      discounts,
      base_price,
      toArray);

    const message = base_price < priceMatch ?
      'Price match is greater than the base value.' :
      'Price match must be higher than the base price.';

    const result = {
      message: message,
      ...toArray,
      priceMatch,
      base_price,
      total_price,
    };

    return result;
  }

  private applyVoucher(
    totalPrice: number,
    voucher: number | undefined,
    toArray: Record<string, any>
  ): number {
    if (voucher) {
      toArray['voucher'] = voucher;
      return totalPrice - voucher;
    }
    return totalPrice;
  }

  private applyBonusProtectionCoverages(
    totalPrice: number,
    coverageName: string,
    basePrice: number,
    coverages: ICoverage[],
    toArray: Record<string, any>
  ): number {
    for (const coverageBase of coverages) {
      if (coverageBase.name === coverageName) {
        toArray['value_bonus_protection'] = calculateDiscountsCoverages(
          coverageBase.value,
          basePrice
        );
        totalPrice += toArray['value_bonus_protection'];
      }
    }
    return totalPrice;
  }

  private applyCommercialDiscount(
    totalPrice: number,
    discoutnName: string,
    priceMatch: number,
    discounts: IDiscount[],
    basePrice: number,
    toArray: Record<string, any>
  ): number {
    if (totalPrice > priceMatch) {
      for (const discount of discounts) {
        if (discount.name === discoutnName) {
          toArray['value_commercial_discount'] = calculateDiscountsCoverages(
            discount.value,
            basePrice
          );
          totalPrice -= toArray['value_commercial_discount'];
        }
      }
    }
    if (totalPrice > priceMatch) {
      return basePrice;
    }
    return totalPrice;
  }
}

export const insuranceWithPriceMatch = new InsuranceWithPriceMatch();
