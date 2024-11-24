export type PaymentMethod = 'CREDIT_CARD' | 'CASH';

export interface PaymentEvent {
    paymentMethod: PaymentMethod;
    amount: number;
    userId: string;
    metadata?: Record<string, unknown>;
} 