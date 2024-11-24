import { SQSEvent, SQSRecord, Context } from 'aws-lambda';
import { PaymentEngine } from '../core/domain/PaymentEngine';
import { CreditCardPaymentStrategy, CashPaymentStrategy } from '../infrastructure/implementations/PaymentStrategies';

interface PaymentRequest {
  paymentMethod: 'credit_card' | 'cash';
  amount: number;
}

export const handler = async (event: SQSEvent, context: Context) => {
  console.log('Processing payment event:', JSON.stringify(event));

  try {
    const responses = await Promise.all(
      event.Records.map((record: SQSRecord) => processPayment(record))
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ results: responses })
    };
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
};

async function processPayment(record: SQSRecord) {
  const paymentEngine = new PaymentEngine();
  const request: PaymentRequest = JSON.parse(record.body);

  switch (request.paymentMethod) {
    case 'credit_card':
      paymentEngine.setStrategy(new CreditCardPaymentStrategy());
      break;
    case 'cash':
      paymentEngine.setStrategy(new CashPaymentStrategy());
      break;
    default:
      throw new Error(`Unsupported payment method: ${request.paymentMethod}`);
  }

  return await paymentEngine.processPayment(request.amount);
}
