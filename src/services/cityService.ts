import { ICity } from "../types/cityType";
import City from "../models/City";

class CityService {
  async createCity(cityData: ICity): Promise<ICity> {
    try {
      const city = new City(cityData);
      await city.save();
      return city;
    } catch (error) {
      throw new Error('Could not crate city');
    }
  }

  async getAllCities(): Promise<ICity[]> {
    try {
      const cities = await City.find();
      return cities;
    } catch (error) {
      throw new Error('Could not retrieve cities');
    }
  }
}

export const cityService = new CityService();
