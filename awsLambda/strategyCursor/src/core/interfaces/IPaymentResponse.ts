export interface IPaymentResponse {
    success: boolean;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    timestamp: string;
} 