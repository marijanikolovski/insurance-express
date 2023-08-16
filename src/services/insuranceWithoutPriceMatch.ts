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

    const selected_coverages = customerData.coverageId;
    const selected_discounts = customerData.discountId;

    const ages: IAge[] = await ageService.getAllAges();
    const discounts: IDiscount[] = await discountService.getAllDiscoutns();

    const coverages_length = selected_coverages.length;

    // Calculation of the basic price based on the city and age
    const base_price = await basePrice.calculateBasePriceWithoutPriceMatch(
      customerData.cityId,
      customerData.ageId
    );

    let total_price = base_price;

    // Calculation of coveraage for bonus protection
    for (const coverageId of selected_coverages) {
      const coverage = await coverageService.getCoverageById(coverageId);

      if (coverage?.name === 'Bonus Protection') {
        toArray.value_bonus_protection = calculateDiscountsCoverages(
          coverage.value,
          base_price
        );
        total_price += toArray.value_bonus_protection;
      }
    }

    //Calculation of account coverage if the user is under and over 30 years old
    for (const coverageId of selected_coverages) {
      const coverage = await coverageService.getCoverageById(coverageId);

      if (coverage?.name === 'AO+') {
        if (customerData.ageId === ages[0]._id) {
          toArray.value_AO_user_under30 = coverage.value;
          total_price += toArray.value_AO_user_under30;
        } else {
          toArray.value_AO_user_over30 = coverage.value_user_over30;
          total_price += toArray.value_AO_user_over30;
        }
      }
    }

    // Calculation of coverage for glass protection
    for (const coverageId of selected_coverages) {
      const coverage = await coverageService.getCoverageById(coverageId);

      if (coverage?.name === 'Glass protection') {
        toArray.value_glass_protection = calculateDiscountsCoverages(
          coverage.value,
          customerData.vehiclePower
        );
        total_price += toArray.value_glass_protection;
      }
    }

    // Calculation of discount for commercial discount
    for (const discountId of selected_discounts) {
      const discount = await discountService.getDiscountById(discountId)

      if (discount?.name === 'Commercial discount') {
        toArray.value_commercial_discount = calculateDiscountsCoverages(
          discount.value,
          base_price
        );
        total_price -= toArray.value_commercial_discount;
      }
    }

    // Calculation of discount for strong car surcharge
    if (customerData.vehiclePower > 100) {
      for (const discountBse of discounts) {
        if (discountBse.name === 'Strong car surcharge') {
          toArray.value_strong_car_surcharge = calculateDiscountsCoverages(
            discountBse.value,
            customerData.vehiclePower
          );
          total_price += toArray.value_strong_car_surcharge;
        }
      }
    }

    // Calculation of discount for adviser discount
    if (coverages_length >= 2) {
      for (const discountBse of discounts) {
        if (discountBse.name === 'Adviser discount') {
          if (toArray.value_bonus_protection) {
            toArray.value_adviser_discount_bonus = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_bonus_protection
            );
            total_price -= toArray.value_adviser_discount_bonus;
          }

          if (toArray.value_AO_user_under30) {
            toArray.value_adviser_discount_ao_younger = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_AO_user_over30
            );
            total_price -= toArray.value_adviser_discount_ao_younger;
          }

          if (toArray.value_AO_user_over30) {
            toArray.value_adviser_discount_ao_older = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_AO_user_over30
            );
            total_price -= toArray.value_adviser_discount_ao_older;
          }

          if (toArray.value_glass_protection) {
            toArray.value_adviser_discount_glass_protection = calculateDiscountsCoverages(
              discountBse.value,
              toArray.value_glass_protection
            );
            total_price -= toArray.value_adviser_discount_glass_protection;
          }
        }
      }
    }

    // Calculation of discount for summer discount
    if (customerData.vehiclePower > 80) {
      for (const discountBse of discounts) {
        if (discountBse.name === 'Summer discount') {
          toArray.value_sumer_discount = calculateDiscountsCoverages(
            discountBse.value,
            total_price
          );
          total_price -= toArray.value_sumer_discount;
        }
      }
    }

    //The total price minus the value of the voucher
    if (customerData.voucher) {
      toArray.voucher = customerData.voucher;
      total_price -= customerData.voucher;
    }

    // Return the calculated total price, base price, dicounts and coverages
    return {
      value_bonus_protection: toArray.value_bonus_protection,
      value_AO_user_under30: toArray.value_AO_user_under30,
      value_AO_user_over30: toArray.value_AO_user_over30,
      value_glass_protection: toArray.value_glass_protection,
      value_commercial_discount: toArray.value_commercial_discount,
      value_strong_car_surcharge: toArray.value_strong_car_surcharge,
      value_sumer_discount: toArray.value_sumer_discount,
      value_adviser_discount_bonus: toArray.value_adviser_discount_bonus,
      value_adviser_discount_ao_younger: toArray.value_adviser_discount_ao_younger,
      value_adviser_discount_ao_older: toArray.value_adviser_discount_ao_older,
      value_adviser_discount_glass_protection: toArray.value_adviser_discount_glass_protection,
      voucher: toArray.voucher,
      base_price: base_price,
      total_price: total_price,
    };
  }
}

export const insuranceWithoutPriceMatch = new InsuranceWithoutPriceMatch();

