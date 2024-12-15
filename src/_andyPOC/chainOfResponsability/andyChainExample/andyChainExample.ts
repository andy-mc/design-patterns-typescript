interface ComponentWithContextualHelp {
  showHelp(): void;
}

abstract class ComponentCOR implements ComponentWithContextualHelp {
  constructor(private container: Container | null, public toottipText: string) {}

  showHelp(): void {
    if (!this.container) {
      console.log("No help available");
      return;
    }

    if (this.toottipText) {
      console.log(this.toottipText);
    } else {
      this.container.showHelp();
    }
  }
}

class Container {
  constructor(private children: ComponentCOR[]) {}

  add(child: ComponentCOR): void {
    this.children.push(child);
  }

  showHelp(): void {
    this.children.forEach((child) => child.showHelp());
  }
}

class Button extends ComponentCOR {
  constructor(container: Container | null, toottipText: string) {
    super(container, toottipText);
  }
}

class Panel extends ComponentCOR {
  constructor(container: Container | null, private modalHelpText: string) {
    super(container, modalHelpText);
  }
}

class Dialog extends ComponentCOR {
  constructor(container: Container | null, private wikiPageURL: string) {
    super(container, wikiPageURL);
  }
}

const container = new Container([]);

const panel = new Panel(null, "");
const dialog = new Dialog(panel, "Dialog help");
const button = new Button(dialog, "Button help");

button.showHelp();
