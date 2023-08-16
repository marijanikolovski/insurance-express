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
}

export const basePrice = new BasePrice();
