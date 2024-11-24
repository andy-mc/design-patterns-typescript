import { Context } from 'aws-lambda';

class Logger {
    private context?: Context;

    addContext(context: Context) {
        this.context = context;
    }

    private formatMessage(message: string, meta?: Record<string, unknown>) {
        return {
            message,
            timestamp: new Date().toISOString(),
            requestId: this.context?.awsRequestId,
            ...meta
        };
    }

    info(message: string, meta?: Record<string, unknown>) {
        console.log(JSON.stringify(this.formatMessage(message, meta)));
    }

    error(message: string, meta?: Record<string, unknown>) {
        console.error(JSON.stringify(this.formatMessage(message, meta)));
    }
}

export const logger = new Logger(); 