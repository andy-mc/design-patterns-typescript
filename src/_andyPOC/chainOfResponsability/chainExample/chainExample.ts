namespace ChainExample {
  interface ComponentWithContextualHelp {
    showHelp(): void;
  }

  abstract class Component implements ComponentWithContextualHelp {
    constructor(
      private toottipText: string,
      public container: Container
    ) {}

    showHelp() {
      if (this.toottipText) {
        console.log(this.toottipText);
      } else {
        this.container.showHelp();
      }
    }
  }

  abstract class Container extends Component {
    constructor(protected children: Component[]) {
      super("", null);
    }

    add(child: Component) {
      this.children.push(child);
      child.container = this;
    }
  }

  class Button extends Component {
    constructor(toottipText: string, container: Container) {
      super(toottipText, container);
    }
  }

  class Panel extends Container {
    private modalHelpText: string;

    constructor(children: Component[], modalHelpText: string) {
      super(children);
      this.modalHelpText = modalHelpText;
    }

    showHelp() {
      if (this.modalHelpText) {
        console.log(this.modalHelpText);
      } else {
        super.showHelp();
      }
    }
  }

  class Dialog extends Container {
    private wikiPageURL: string;

    constructor(children: Component[], wikiPageURL: string) {
      super(children);
      this.wikiPageURL = wikiPageURL;
    }

    showHelp() {
      if (this.wikiPageURL) {
        console.log(this.wikiPageURL);
      } else {
        super.showHelp();
      }
    }
  }

  class Application {
    createUI() {
      // const dialog = new Dialog("Budget Reports")
      // dialog.wikiPageURL = "http://wikiPageURL"
      
      // const panel = new Panel("Panel help")
      // panel.modalHelpText = "This panel does..."
      
      const ok = new Button("OK", [])
      // ok.toottipText = "This is an OK button that..."
      
      panel.add(ok)
      // panel.add(cancel)
      // dialog.add(panel)

      ok.showHelp()
    }
  }

  const app = new Application()
  app.createUI()
}

