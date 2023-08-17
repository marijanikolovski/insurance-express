import { ageService } from './ageSerivce';
import { cityService } from './cityService';

class BasePrice {
  private static CITY_NOT_FOUND_ERROR = (cityId: string) =>
    'City with ID ${cityId} not found';

  private static AGE_NOT_FOUND_ERROR = (ageId: string) =>
    `Age with ID ${ageId} not found`;

  async calculateBasePriceWithPriceMatch(
    cityId: string,
  ): Promise<number> {
    const city = await cityService.getCityById(cityId);

    if (city !== null) {
      return city.value;
    } else {
      throw new Error(BasePrice.CITY_NOT_FOUND_ERROR(cityId));
    }
  }

  async calculateBasePriceWithoutPriceMatch(
    cityId: string,
    ageId: string
  ): Promise<number> {
    const city = await cityService.getCityById(cityId);
    if (city === null) {
      throw new Error(BasePrice.CITY_NOT_FOUND_ERROR(cityId));
    }

    const age = await ageService.getAgeById(ageId);
    if (age === null) {
      throw new Error(BasePrice.AGE_NOT_FOUND_ERROR(ageId));
    }

    return city.value + age?.value;
  }

}

export const basePrice = new BasePrice();
