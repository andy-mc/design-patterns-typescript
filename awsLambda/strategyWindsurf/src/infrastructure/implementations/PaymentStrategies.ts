import { v4 as uuidv4 } from 'uuid';
import { IPaymentStrategy, IPaymentResponse } from '../../core/interfaces/IPaymentStrategy';

export class CreditCardPaymentStrategy implements IPaymentStrategy {
  async pay(amount: number): Promise<IPaymentResponse> {
    console.log(`Processing credit card payment for amount: ${amount}`);
    
    return {
      success: true,
      amount,
      paymentMethod: 'credit_card',
      transactionId: uuidv4(),
      timestamp: new Date().toISOString()
    };
  }
}

export class CashPaymentStrategy implements IPaymentStrategy {
  async pay(amount: number): Promise<IPaymentResponse> {
    console.log(`Processing cash payment for amount: ${amount}`);
    
    return {
      success: true,
      amount,
      paymentMethod: 'cash',
      transactionId: uuidv4(),
      timestamp: new Date().toISOString()
    };
  }
}
