import { ICustomerData } from "../types/customerDataType";

export class CustomerData implements ICustomerData {
  private _voucher: number = 0;
  private _priceMatch: number = 0;
  private _discountId: string[] = [];
  private _coverageId: string[] = [];

  constructor(
    public name: string,
    public ageId: string,
    public cityId: string,
    public vehiclePower: number
  ) { }

  get voucher(): number {
    return this._voucher;
  }

  set voucher(value: number) {
    this._voucher = value;
  }

  get priceMatch(): number {
    return this._priceMatch;
  }

  set priceMatch(value: number) {
    this._priceMatch = value;
  }

  get discountId(): string[] {
    return this._discountId;
  }

  set discountId(value: string[]) {
    this._discountId = value;
  }

  get coverageId(): string[] {
    return this._coverageId;
  }

  set coverageId(value: string[]) {
    this._coverageId = value;
  }

  static createFromRequest(data: ICustomerData): CustomerData {
    const customerData = new CustomerData(
      data.name,
      data.ageId,
      data.cityId,
      data.vehiclePower
    );

    customerData.voucher = data.voucher ?? customerData.voucher;
    customerData.priceMatch = data.priceMatch ?? customerData.priceMatch;
    customerData.discountId = data.discountId ?? customerData.discountId;
    customerData.coverageId = data.coverageId ?? customerData.coverageId;

    return customerData;
  }
}