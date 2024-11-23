// Interfaz de estrategia
interface DiscountStrategy {
  calculateDiscount(context: DiscountContextInterface): number;
}

// Interfaz que el Contexto proporciona a las estrategias
interface DiscountContextInterface {
  getTotalAmount(): number;
}

// Estrategias concretas
class FixedDiscountStrategy implements DiscountStrategy {
  calculateDiscount(context: DiscountContextInterface): number {
      // Aplica un descuento fijo de $10
      return context.getTotalAmount() - 10;
  }
}

class PercentageDiscountStrategy implements DiscountStrategy {
  calculateDiscount(context: DiscountContextInterface): number {
      // Aplica un 10% de descuento
      return context.getTotalAmount() * 0.9;
  }
}

class ThresholdDiscountStrategy implements DiscountStrategy {
  calculateDiscount(context: DiscountContextInterface): number {
      // Si el monto total supera $100, aplica un descuento de $20
      const total = context.getTotalAmount();
      return total > 100 ? total - 20 : total;
  }
}

// Contexto (clase principal)
class ShoppingCart implements DiscountContextInterface {
  private totalAmount: number;
  private strategy: DiscountStrategy;

  constructor(initialAmount: number) {
      this.totalAmount = initialAmount;
  }

  // Implementación de la interfaz DiscountContextInterface
  getTotalAmount(): number {
      return this.totalAmount;
  }

  // Setter para asignar la estrategia
  setDiscountStrategy(strategy: DiscountStrategy): void {
      this.strategy = strategy;
  }

  // Método para calcular el total después de aplicar el descuento
  calculateTotal(): number {
      if (!this.strategy) {
          throw new Error("No discount strategy set");
      }
      return this.strategy.calculateDiscount(this);
  }
}

// Cliente
const cart = new ShoppingCart(120);

cart.setDiscountStrategy(new FixedDiscountStrategy());
console.log(cart.calculateTotal()); // $110

cart.setDiscountStrategy(new PercentageDiscountStrategy());
console.log(cart.calculateTotal()); // $108

cart.setDiscountStrategy(new ThresholdDiscountStrategy());
console.log(cart.calculateTotal()); // $100