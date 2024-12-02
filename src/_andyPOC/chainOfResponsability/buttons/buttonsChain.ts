
import { Handler, Request } from "../chainOfResponsability.interfaces";

class ButtonsChain implements Handler {
  constructor(private next: Handler) {}

  setNext(handler: Handler): void {
    this.next = handler;
  }

  handle(request: Request): void {
    console.log('ButtonsChain');
  }
}

export {
  ButtonsChain
}
