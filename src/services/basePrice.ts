import { ageService } from './ageSerivce';
import { cityService } from './cityService';

class BasePrice {
  async calculateBasePriceWithPriceMatch(
    cityId: string,
  ): Promise<number> {
    const city = await cityService.getCityById(cityId);

    if (city !== null) {
      return city.value;
    } else {
      throw new Error(`City with ID ${cityId} not found`);
    }
  }

  async calculateBasePriceWithoutPriceMatch(
    cityId: string,
    ageId: string
  ): Promise<number> {
    const city = await cityService.getCityById(cityId);
    if (city === null) {
      throw new Error(`City with ID ${cityId} not found`);
    }

    const age = await ageService.getAgeById(ageId);
    if (age === null) {
      throw new Error(`Age with ID ${ageId} not found`);
    }

    return city.value + age?.value;
  }

}

export const basePrice = new BasePrice();
