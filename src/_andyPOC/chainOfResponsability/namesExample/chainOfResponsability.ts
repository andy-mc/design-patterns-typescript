import {
  Request,
  Handler
} from '../chainOfResponsability.interfaces';

class ChainOfResponsability implements Handler {
  constructor(private next: Handler | null = null) {}

  handle(request: Request): void {
    if (this.next) {
      this.next.handle(request);
    }
  }

  setNext(handler: Handler): void {
    this.next = handler;
  }
}

class Juan extends ChainOfResponsability {
  handle(request: Request): void {
    if (request.userId) {
      console.log('Hola Soy Juan');

      if (request.userId === 1) {
        return;
      }

      super.handle(request);
    }
  }
}

class Pedro extends ChainOfResponsability {
  handle(request: Request): void {
    if (request.userId) {
      console.log('Hola Soy Pedro');

      if (request.userId === 2) {
        return;
      }

      super.handle(request);
    }
  }
}

class Maria extends ChainOfResponsability {
  handle(request: Request): void {
    if (request.userId) {
      console.log('Hola Soy Maria');
      super.handle(request);
    }
  }
}

export {
  ChainOfResponsability,
  Juan,
  Pedro,
  Maria
};