// models/price-match-calculation.model.ts
export class PriceMatchCalculation {
  private _valueBonusProtection: number = 0;
  private _valueCommercialDiscount: number = 0;
  private _voucher: number = 0;

  get valueBonusProtection(): number {
    return this._valueBonusProtection;
  }

  get valueCommercialDiscount(): number {
    return this._valueCommercialDiscount;
  }

  get voucher(): number {
    return this._voucher;
  }

  toArray(): Record<string, number> {
    return {
      'value_bonus_protection': this._valueBonusProtection,
      'value_commercial_discount': this._valueCommercialDiscount,
      'voucher': this._voucher,
    };
  }
}
