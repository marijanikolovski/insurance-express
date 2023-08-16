import { IAge } from "../types/ageType";
import Age from "../models/Age";

class AgeService {
  async createAge(ageData: IAge): Promise<IAge> {
    try {
      const age = new Age(ageData);
      await age.save();
      return age;
    } catch (error) {
      throw new Error('Could not crate age');
    }
  }

  async getAllAges(): Promise<IAge[]> {
    try {
      const cities = await Age.find();
      return cities;
    } catch (error) {
      throw new Error('Could not retrieve age');
    }
  }

  async getAgeById(id: string): Promise<IAge | null> {
    try {
      const age = await Age.findById(id);
      return age;
    } catch (error) {
      throw new Error('Could not retrieve city');
    }
  }

}

export const ageService = new AgeService();
