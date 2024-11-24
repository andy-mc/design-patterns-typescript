import { PaymentMethod } from '../core/types/PaymentEvent';
import { IPaymentStrategy } from '../core/interfaces/IPaymentStrategy';
import { CreditCardPaymentStrategy } from './implementations/CreditCardPaymentStrategy';
import { CashPaymentStrategy } from './implementations/CashPaymentStrategy';

export class PaymentStrategyFactory {
    static createStrategy(paymentMethod: PaymentMethod): IPaymentStrategy {
        switch (paymentMethod) {
            case 'CREDIT_CARD':
                return new CreditCardPaymentStrategy();
            case 'CASH':
                return new CashPaymentStrategy();
            default:
                throw new Error(`Unsupported payment method: ${paymentMethod}`);
        }
    }
} 