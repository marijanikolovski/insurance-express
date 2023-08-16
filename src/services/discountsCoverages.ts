export function calculateDiscountsCoverages(percentage: number, price: number): number {
  return percentage * price / 100
}