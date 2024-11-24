import { IPaymentResponse } from './IPaymentResponse';

export interface IPaymentStrategy {
    pay(amount: number): Promise<IPaymentResponse>;
} 