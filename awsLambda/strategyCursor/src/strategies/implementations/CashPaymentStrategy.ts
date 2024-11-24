import { v4 as uuidv4 } from 'uuid';
import { IPaymentStrategy } from '../../core/interfaces/IPaymentStrategy';
import { IPaymentResponse } from '../../core/interfaces/IPaymentResponse';
import { logger } from '../../infrastructure/logger/logger';

export class CashPaymentStrategy implements IPaymentStrategy {
    async pay(amount: number): Promise<IPaymentResponse> {
        try {
            logger.info('Processing cash payment', { amount });
            
            return {
                success: true,
                amount,
                paymentMethod: 'cash',
                transactionId: uuidv4(),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            logger.error('Cash payment failed', { error, amount });
            throw error;
        }
    }
} 