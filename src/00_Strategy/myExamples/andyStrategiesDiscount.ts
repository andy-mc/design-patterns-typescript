
interface IDiscountContextInterface {
  getTotalAmount(): number,
}

interface IDiscountStrategy {
  calculateDiscount(context: IDiscountContextInterface): number
}

class FixedDiscount implements IDiscountStrategy {
  calculateDiscount(context: IDiscountContextInterface): number {
    return context.getTotalAmount() - 10;
  }
}

class Discount implements IDiscountContextInterface {
  private totalAmount: number
  private discountStrategy: IDiscountStrategy

  constructor(totalAmount: number) {    
    this.totalAmount = totalAmount;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  setDiscountStrategy(strategy: IDiscountStrategy): void {
    this.discountStrategy = strategy;
  }

  calculateDiscount(): number {
    return this.discountStrategy.calculateDiscount(this);
  }
}

const discount = new Discount(100);
console.log('amount 111', discount.getTotalAmount())

discount.setDiscountStrategy(new FixedDiscount());
const discountAmount = discount.calculateDiscount();
console.log('discountAmount:', discountAmount)
console.log('amount 222', discount.getTotalAmount())

