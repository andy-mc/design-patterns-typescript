interface Request {
  userId?: number;
}

interface Handler {
  setNext(handler: Handler): void;
  handle(request: Request): void;
}

export {
  Request,
  Handler
}
