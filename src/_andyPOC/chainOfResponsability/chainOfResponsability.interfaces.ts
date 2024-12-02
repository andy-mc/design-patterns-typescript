interface Request {
  userId?: number;
}

interface Event {
  handles: string;
}

interface Handler {
  setNext(handler: Handler): void;
  handle(request: Request | Event): void;
}

export {
  Request,
  Event,
  Handler
}
