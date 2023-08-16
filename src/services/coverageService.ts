import Coverage from "../models/Coverage";
import { ICoverage } from "../types/coverageType";

class CoverageService {
  async createCoverage(coverageData: ICoverage): Promise<ICoverage> {
    try {
      const coverage = new Coverage(coverageData);
      await coverage.save();
      return coverage;
    } catch (error) {
      throw new Error('Could not crate city');
    }
  }

  async getAllCoverages(): Promise<ICoverage[]> {
    try {
      const coverages = await Coverage.find();
      return coverages;
    } catch (error) {
      throw new Error('Could not retrieve coverages');
    }
  }

  async getCoverageById(id: string): Promise<ICoverage | null> {
    try {
      const coverage = await Coverage.findById(id);
      return coverage;
    } catch (error) {
      throw new Error('Could not retrieve coverage');
    }
  }
}

export const coverageService = new CoverageService();
