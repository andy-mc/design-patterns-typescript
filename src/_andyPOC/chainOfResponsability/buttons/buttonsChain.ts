
import { Handler, Event } from "../chainOfResponsability.interfaces";

abstract class ButtonsChain implements Handler {
  constructor(private next?: Handler) {}

  setNext(handler: Handler): void {
    this.next = handler;
  }

  handle(event: Event): void {
    if (this.next) {
      this.next.handle(event);
    }
  }
}

class Button extends ButtonsChain {
  handle(event: Event): void {
    if (event.handles === 'button') {
      console.log('Button');
    } else {
      super.handle(event);
    }
  }
}

class SubPanel extends ButtonsChain {
  handle(event: Event): void {
    if (event.handles === 'subPanel') {
      console.log('SubPanel');
    } else {
      super.handle(event);
    }
  }
}
class Panel extends ButtonsChain {
  handle(event: Event): void {
    if (event.handles === 'panel') {
      console.log('Panel');
    } else {
      super.handle(event);
    }
  }
}

class Ventana extends ButtonsChain {
  handle(event: Event): void {
    if (event.handles === 'ventana') {
      console.log('Ventana');
    } else {
      super.handle(event);
    }
  }
}

export {
  ButtonsChain,
  Button,
  SubPanel,
  Panel,
  Ventana
}
