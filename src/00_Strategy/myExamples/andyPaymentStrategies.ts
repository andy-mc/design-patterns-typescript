
interface IPaymentResponse {
  success: boolean;
  amount: number;
  paymentMethod: string;
}

interface IPaymentStrategy {
  pay(amount: number): IPaymentResponse;
}

class CreditCardPaymentStrategy implements IPaymentStrategy {
  pay(amount: number): IPaymentResponse {
    console.log(`Paying ${amount} with credit card`);

    return {
      success: true,
      amount,
      paymentMethod: "credit card",
    };
  }
}

class CashPaymentStrategy implements IPaymentStrategy {
  pay(amount: number): IPaymentResponse {
    console.log(`Paying ${amount} with cash`);

    return {
      success: true,
      amount,
      paymentMethod: "cash",
    };
  }
}

class PaymentEngine {
  private strategy: IPaymentStrategy;

  setStrategy(strategy: IPaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number) {
    if (!this.strategy) {
      throw new Error("Strategy not set");
    }

    return this.strategy.pay(amount);
  }
}

const creditCardPaymentStrategy = new CreditCardPaymentStrategy();
const cashPaymentStrategy = new CashPaymentStrategy();

const paymentEngine = new PaymentEngine();

paymentEngine.setStrategy(creditCardPaymentStrategy);
paymentEngine.pay(100);

paymentEngine.setStrategy(cashPaymentStrategy);
paymentEngine.pay(100);
