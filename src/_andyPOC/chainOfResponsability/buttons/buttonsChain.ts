
import { Handler, Request } from "../chainOfResponsability.interfaces";

class ButtonsChain implements Handler {
  constructor(private next?: Handler) {}

  setNext(handler: Handler): void {
    this.next = handler;
  }

  handle(request: Request): void {
    console.log('ButtonsChain');
  }
}

class Button extends ButtonsChain {
  handle(request: Request): void {
    console.log('Button');
  }
}

class SubPanel extends ButtonsChain {
  handle(request: Request): void {
    console.log('SubPanel');
  }
}
class Panel extends ButtonsChain {
  handle(request: Request): void {
    console.log('Panel');
  }
}

class Ventana extends ButtonsChain {
  handle(request: Request): void {
    console.log('Ventana');
  }
}

export {
  ButtonsChain,
  Button,
  SubPanel,
  Panel,
  Ventana
}
