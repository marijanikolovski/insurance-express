export class NoPriceMatchCalculation {
  private _valueBonusProtection: number = 0;
  private _valueUserUnder30: number = 0;
  private _valueUserOver30: number = 0;
  private _valueGlassProtection: number = 0;
  private _valueCommercialDiscount: number = 0;
  private _valueStrongCarSurcharge: number = 0;
  private _valueAdviserDiscountBonus: number = 0;
  private _valueSumerDiscount: number = 0;
  private _valueAdviserDiscountAoYounger: number = 0;
  private _valueAdviserDiscountAoOlder: number = 0;
  private _valueAdviserDiscountGlassProtection: number = 0;
  private _voucher: number = 0;

  get valueBonusProtection(): number {
    return this._valueBonusProtection;
  }

  get valueUserUnder30(): number {
    return this._valueUserUnder30;
  }

  get valueUserOver30(): number {
    return this._valueUserOver30;
  }

  get valueGlassProtection(): number {
    return this._valueGlassProtection;
  }

  get valueCommercialDiscount(): number {
    return this._valueCommercialDiscount;
  }

  get valueStrongCarSurcharge(): number {
    return this._valueStrongCarSurcharge;
  }

  get valueAdviserDiscountBonus(): number {
    return this._valueAdviserDiscountBonus;
  }

  get valueSumerDiscount(): number {
    return this._valueSumerDiscount;
  }

  get valueAdviserDiscountAoYounger(): number {
    return this._valueAdviserDiscountAoYounger;
  }

  get valueAdviserDiscountAoOlder(): number {
    return this._valueAdviserDiscountAoOlder;
  }

  get valueAdviserDiscountGlassProtection(): number {
    return this._valueAdviserDiscountGlassProtection;
  }

  get voucher(): number {
    return this._voucher;
  }

  set voucher(value: number) {
    this._voucher = value;
  }

  set valueAdviserDiscountAoYounger(value: number) {
    this._valueAdviserDiscountAoYounger = value;
  }

  set valueAdviserDiscountAoOlder(value: number) {
    this._valueAdviserDiscountAoOlder = value;
  }

  set valueAdviserDiscountGlassProtection(value: number) {
    this._valueAdviserDiscountGlassProtection = value;
  }


  toArray(): Record<string, number> {
    return {
      'value_bonus_protection': this._valueBonusProtection,
      'value_AO_user_under30': this._valueUserUnder30,
      'value_AO_user_over30': this._valueUserOver30,
      'value_glass_protection': this._valueGlassProtection,
      'value_commercial_discount': this._valueCommercialDiscount,
      'value_strong_car_surcharge': this._valueStrongCarSurcharge,
      'value_sumer_discount': this._valueSumerDiscount,
      'value_adviser_discount_bonus': this._valueAdviserDiscountBonus,
      'value_adviser_discount_ao_younger': this._valueAdviserDiscountAoYounger,
      'value_adviser_discount_ao_older': this._valueAdviserDiscountAoOlder,
      'value_adviser_discount_glass_protection': this._valueAdviserDiscountGlassProtection,
      'voucher': this._voucher,
    };
  }
}
