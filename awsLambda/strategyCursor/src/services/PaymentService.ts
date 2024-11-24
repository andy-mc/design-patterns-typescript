import { PaymentEvent } from '../core/types/PaymentEvent';
import { IPaymentResponse } from '../core/interfaces/IPaymentResponse';
import { PaymentStrategyFactory } from '../strategies/PaymentStrategyFactory';
import { logger } from '../infrastructure/logger/logger';

export class PaymentService {
    async processPayment(event: PaymentEvent): Promise<IPaymentResponse> {
        try {
            logger.info('Processing payment', { event });

            const strategy = PaymentStrategyFactory.createStrategy(event.paymentMethod);
            const result = await strategy.pay(event.amount);

            logger.info('Payment processed successfully', { result });
            return result;
        } catch (error) {
            logger.error('Payment processing failed', { error, event });
            throw error;
        }
    }
} 