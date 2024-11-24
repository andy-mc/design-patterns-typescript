// Interfaz para las estrategias
interface DiscountStrategy {
  calculate(amount: number): number;
}

// Estrategias concretas
class FixedDiscountStrategy implements DiscountStrategy {
  calculate(amount: number): number {
      return amount - 10; // Descuento fijo
  }
}

class PercentageDiscountStrategy implements DiscountStrategy {
  calculate(amount: number): number {
      return amount * 0.9; // 10% de descuento
  }
}

class ThresholdDiscountStrategy implements DiscountStrategy {
  calculate(amount: number): number {
      return amount > 100 ? amount - 20 : amount; // Descuento por umbral
  }
}

// Contexto que usa composición
class ShoppingCart {
  private totalAmount: number;
  private discountStrategy: DiscountStrategy;

  constructor(totalAmount: number, strategy: DiscountStrategy) {
      this.totalAmount = totalAmount;
      this.discountStrategy = strategy;
  }

  setDiscountStrategy(strategy: DiscountStrategy): void {
      this.discountStrategy = strategy; // Composición: cambio de estrategia en tiempo de ejecución
  }

  calculateTotal(): number {
      return this.discountStrategy.calculate(this.totalAmount);
  }
}

// Uso
const cart = new ShoppingCart(120, new FixedDiscountStrategy());
console.log(cart.calculateTotal()); // $110

cart.setDiscountStrategy(new PercentageDiscountStrategy());
console.log(cart.calculateTotal()); // $108

cart.setDiscountStrategy(new ThresholdDiscountStrategy());
console.log(cart.calculateTotal()); // $100