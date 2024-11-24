class ShoppingCart {
  private totalAmount: number;

  constructor(totalAmount: number) {
      this.totalAmount = totalAmount;
  }

  getTotalAmount(): number {
      return this.totalAmount;
  }

  calculateDiscount(): number {
      return 0; // Sin descuento por defecto
  }
}

class FixedDiscountCart extends ShoppingCart {
  calculateDiscount(): number {
      return this.getTotalAmount() - 10; // Descuento fijo
  }
}

class PercentageDiscountCart extends ShoppingCart {
  calculateDiscount(): number {
      return this.getTotalAmount() * 0.9; // 10% de descuento
  }
}