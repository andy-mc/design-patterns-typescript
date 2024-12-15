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

    setContainer(container: Container): void {
      this.container = container;
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

  const dialog = new Dialog();
  const panel = new Panel();
  const button = new Button();

  panel.add(button);
  dialog.add(panel);

  const help = button.showHelp();
  console.log("\n")
  console.log("help: ", help);
  console.log("\n")
}

