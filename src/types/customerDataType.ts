export interface ICustomerData {
  name: string;
  ageId: string;
  cityId: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch: number;
  discountId: string[];
  coverageId: string[];
}