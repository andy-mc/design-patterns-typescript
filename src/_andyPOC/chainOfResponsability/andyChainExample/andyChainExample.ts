namespace andyChainExample {
  interface ComponentWithContextualHelp {
    showHelp(): string;
  }

  abstract class Component implements ComponentWithContextualHelp {
    private container?: Container
    public tooltipText?: string

    constructor(tooltipText?: string) {
      this.tooltipText = tooltipText;
    }

    setContainer(container: Container): Component {
      this.container = container;
      return this;
    }

    showHelp(): string {
      if (this.tooltipText) {
        return this.tooltipText;
      } 

      return this.container ? this.container.showHelp() : " - ";
    }
  }

  class Container extends Component {
    private children: Component[] = []

    add(child: Component): void {
      child.setContainer(this);
    }
  }

  class Button extends Component {  
  }

  class Panel extends Container {
    constructor(private modalHelpText?: string) {
      super();
    }

    showHelp(): string {
      if (this.modalHelpText) {
        return this.modalHelpText
      } 

      return super.showHelp();
    }
  }

  class Dialog extends Container {
    constructor(private wikiPageURL?: string) {
      super();
    }

    showHelp(): string {
      if (this.wikiPageURL) {
        return this.wikiPageURL
      }

      return super.showHelp();
    }
  }

  const container = new Container();

  const dialog = new Dialog("Dialog Help");
  const panel = new Panel();
  const ok = new Button("Ok help");
  const cancel = new Button();

  panel.add(ok);
  panel.add(cancel);
  dialog.add(panel);

  console.log("\n")
  console.log("ok help: ", ok.showHelp());
  console.log("\n")
  console.log("cancel help: ", cancel.showHelp());
}
