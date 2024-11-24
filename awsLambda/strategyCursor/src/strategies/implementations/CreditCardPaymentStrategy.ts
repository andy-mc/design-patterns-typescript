import { v4 as uuidv4 } from 'uuid';
import { IPaymentStrategy } from '../../core/interfaces/IPaymentStrategy';
import { IPaymentResponse } from '../../core/interfaces/IPaymentResponse';
import { logger } from '../../infrastructure/logger/logger';

export class CreditCardPaymentStrategy implements IPaymentStrategy {
    async pay(amount: number): Promise<IPaymentResponse> {
        try {
            logger.info('Processing credit card payment', { amount });
            
            // Aquí iría la integración real con el procesador de pagos
            await this.simulatePaymentProcessing();

            return {
                success: true,
                amount,
                paymentMethod: 'credit_card',
                transactionId: uuidv4(),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            logger.error('Credit card payment failed', { error, amount });
            throw error;
        }
    }

    private async simulatePaymentProcessing(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
} 