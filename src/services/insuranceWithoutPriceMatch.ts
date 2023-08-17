import { IAge } from "../types/ageType";
import { IDiscount } from "../types/discoutntType";
import { CustomerData } from "../valueObjects/customerData";
import { NoPriceMatchCalculation } from "../valueObjects/noPriceMatchCalculation";
import { ageService } from "./ageSerivce";
import { basePrice } from "./basePrice";
import { coverageService } from "./coverageService";
import { discountService } from "./discountService";
import { calculateDiscountsCoverages } from "./discountsCoverages";

class InsuranceWithoutPriceMatch {
  async calculationWithoutPriceMatch(customerData: CustomerData): Promise<Record<string, any>> {
    const noPriceMatchCalculate = new NoPriceMatchCalculation();
    const toArray = noPriceMatchCalculate.toArray();
    const { cityId, ageId, voucher, coverageId, discountId, vehiclePower } = customerData;

    const selected_coverages = coverageId;
    const selected_discounts = discountId;

    const ages: IAge[] = await ageService.getAllAges();
    const discounts: IDiscount[] = await discountService.getAllDiscoutns();

    const coverages_length = selected_coverages.length;

    const base_price = await basePrice.calculateBasePriceWithoutPriceMatch(cityId, ageId);

    let total_price = base_price;

    total_price = await this.applyBonusGlassCoverage(
      total_price,
      selected_coverages,
      toArray,
      'Bonus Protection',
      base_price,
    );

    total_price = await this.applyAOCoverage(
      total_price,
      selected_coverages,
      toArray,
      'AO+',
      ageId,
      ages)

    total_price = await this.applyBonusGlassCoverage(
      total_price,
      selected_coverages,
      toArray,
      'Glass protection',
      vehiclePower,
    );

    total_price = await this.applayComercialDiscount(
      total_price,
      'Commercial discount',
      selected_discounts,
      toArray,
      base_price)

    total_price = this.applayStrongCarSurchare(
      total_price,
      vehiclePower,
      discounts,
      toArray,
      'Strong car surcharge',
    )

    total_price = this.applayAdviserDiscount(
      coverages_length,
      'Adviser discount',
      discounts,
      toArray,
      total_price)

    total_price = this.applaySumerDiscount(
      total_price,
      vehiclePower,
      discounts,
      toArray,
      'Summer discount',
    )

    total_price = this.applayVoucher(
      voucher,
      toArray,
      total_price
    )
    return {
      ...toArray,
      base_price,
      total_price,
    };
  }

  private async applyBonusGlassCoverage(
    totalPrice: number,
    selected_coverages: string[],
    toArray: Record<string, any>,
    coverageName: string,
    calculationValue: number
  ): Promise<number> {
    for (const coverageId of selected_coverages) {
      const coverage = await coverageService.getCoverageById(coverageId);
      if (coverage?.name === coverageName) {
        const coverageTotal = calculateDiscountsCoverages(coverage.value, calculationValue);
        toArray[`value_${coverageName.toLowerCase().replace(' ', '_')}`] = coverageTotal;
        totalPrice += coverageTotal;
      }
    }
    return totalPrice;
  };

  private async applyAOCoverage(
    totalPrice: number,
    selected_coverages: string[],
    toArray: Record<string, any>,
    discountName: string,
    ageId: string,
    ages: IAge[]
  ): Promise<number> {
    for (const coverageId of selected_coverages) {
      const coverage = await coverageService.getCoverageById(coverageId);
      if (coverage?.name === discountName) {
        if (ageId == ages[0]._id) {
          const coverageTotal = coverage.value;
          toArray['value_AO_user_under30'] = coverageTotal;
          totalPrice += coverageTotal;
        } else {
          const coverageTotal = coverage.value_user_over30;
          toArray['value_AO_user_over30'] = coverageTotal;
          totalPrice += coverageTotal;
        }
      }
    }
    return totalPrice;
  };

  private async applayComercialDiscount(
    totalPrice: number,
    discountName: string,
    selected_discounts: string[],
    toArray: Record<string, any>,
    basePrice: number,
  ): Promise<number> {
    for (const discountId of selected_discounts) {
      const discount = await discountService.getDiscountById(discountId)
      if (discount?.name === discountName) {
        toArray.value_commercial_discount = calculateDiscountsCoverages(
          discount.value,
          basePrice
        );
        totalPrice -= toArray.value_commercial_discount;
      }
    }
    return totalPrice;
  }

  private applayStrongCarSurchare(
    totalPrice: number,
    vehiclePower: number,
    discounts: IDiscount[],
    toArray: Record<string, any>,
    discountName: string,
  ): number {
    if (vehiclePower > 100) {
      for (const discount of discounts) {
        if (discount?.name === discountName) {
          const discoutnTotal = calculateDiscountsCoverages(discount.value, vehiclePower);
          toArray['value_strong_car_surcharge'] = discoutnTotal;
          totalPrice += discoutnTotal;
        }
      }
    }
    return totalPrice;
  };

  private applaySumerDiscount(
    totalPrice: number,
    vehiclePower: number,
    discounts: IDiscount[],
    toArray: Record<string, any>,
    discountName: string,
  ): number {
    if (vehiclePower > 80) {
      for (const discount of discounts) {
        if (discount?.name === discountName) {
          const discoutnTotal = calculateDiscountsCoverages(discount.value, totalPrice);
          toArray['value_sumer_discount'] = discoutnTotal;
          totalPrice -= discoutnTotal;
        }
      }
    }
    return totalPrice;
  };

  private applayAdviserDiscount(
    coverages_length: number,
    discountName: string,
    discounts: IDiscount[],
    toArray: Record<string, any>,
    totalPrice: number
  ): number {
    if (coverages_length >= 2) {
      for (const discountBse of discounts) {
        if (discountBse.name === discountName) {
          if (toArray.value_bonus_protection) {
            toArray.value_adviser_discount_bonus = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_bonus_protection
            );
            totalPrice -= toArray.value_adviser_discount_bonus;
          }

          if (toArray.value_AO_user_under30) {
            toArray.value_adviser_discount_ao_younger = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_AO_user_under30
            );
            totalPrice -= toArray.value_adviser_discount_ao_younger;
          }

          if (toArray.value_AO_user_over30) {
            toArray.value_adviser_discount_ao_older = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_AO_user_over30
            );
            totalPrice -= toArray.value_adviser_discount_ao_older;
          }

          if (toArray.value_glass_protection) {
            toArray.value_adviser_discount_glass_protection = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_glass_protection
            );
            totalPrice -= toArray.value_adviser_discount_glass_protection;
          }
        }
      }
    }
    return totalPrice;
  }

  private applayVoucher(
    voucher: number,
    toArray: Record<string, any>,
    totalPrice: number
  ): number {
    if (voucher) {
      toArray.voucher = voucher;
      totalPrice -= voucher;
    }
    return totalPrice;
  }
}

export const insuranceWithoutPriceMatch = new InsuranceWithoutPriceMatch();

