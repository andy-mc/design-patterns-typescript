import { SQSEvent, SQSRecord, Context } from 'aws-lambda';
import { PaymentService } from '../services/PaymentService';
import { PaymentEvent } from '../core/types/PaymentEvent';
import { logger } from '../infrastructure/logger/logger';

const paymentService = new PaymentService();

const processRecord = async (record: SQSRecord) => {
    try {
        const paymentEvent: PaymentEvent = JSON.parse(record.body);
        return await paymentService.processPayment(paymentEvent);
    } catch (error) {
        logger.error('Failed to process record', { error, record });
        throw error;
    }
};

export const handler = async (event: SQSEvent, context: Context) => {
    logger.addContext(context);
    
    try {
        const results = await Promise.allSettled(
            event.Records.map(record => processRecord(record))
        );

        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
            logger.error('Some payments failed', { failures });
            throw new Error('Some payments failed to process');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Payments processed successfully',
                results
            })
        };
    } catch (error) {
        logger.error('Handler execution failed', { error });
        throw error;
    }
}; 