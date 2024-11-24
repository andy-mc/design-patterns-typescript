import { IPaymentStrategy, IPaymentResponse } from '../interfaces/IPaymentStrategy';

export class PaymentEngine {
  constructor(private strategy?: IPaymentStrategy) {}

  setStrategy(strategy: IPaymentStrategy): void {
    this.strategy = strategy;
  }

  async processPayment(amount: number): Promise<IPaymentResponse> {
    if (!this.strategy) {
      throw new Error('Payment strategy not set');
    }

    if (amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    try {
      return await this.strategy.pay(amount);
    } catch (error) {
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }
}
