namespace chainExample {
  interface ComponentWithContextualHelp {
    showHelp(): void;
  }
  
  abstract class Component implements ComponentWithContextualHelp {
      protected container: Container | null = null;
      protected tooltipText: string | null = null;

      constructor(tooltipText?: string) {
          this.tooltipText = tooltipText || null;
      }

      showHelp(): void {
          if (this.tooltipText) {
              console.log(`Showing tooltip: ${this.tooltipText}`);
          } else if (this.container) {
              this.container.showHelp();
          }
      }
  }

  // Container class that can hold other components
  abstract class Container extends Component {
      protected children: Component[] = [];

      add(child: Component): void {
          this.children.push(child);
          // @ts-ignore - We know container exists in Component
          child.container = this;
      }
  }

  // Button class (simple component)
  class Button extends Component {
      constructor(private x: number, private y: number, private width: number, 
                  private height: number, private label: string, tooltipText?: string) {
          super(tooltipText);
      }
  }

  // Panel class (complex container)
  class Panel extends Container {
      public modalHelpText: string | null = null;

      constructor(private x: number, private y: number, private width: number, 
                  private height: number, modalHelpText?: string) {
          super();
          this.modalHelpText = modalHelpText || null;
      }

      showHelp(): void {
          if (this.modalHelpText) {
              console.log(`Showing modal help: ${this.modalHelpText}`);
          } else {
              super.showHelp();
          }
      }
  }

  // Dialog class (root container)
  class Dialog extends Container {
      public wikiPageURL: string | null = null;

      constructor(private title: string, wikiPageURL?: string) {
          super();
          this.wikiPageURL = wikiPageURL || null;
      }

      showHelp(): void {
          if (this.wikiPageURL) {
              console.log(`Opening wiki page: ${this.wikiPageURL}`);
          } else {
              super.showHelp();
          }
      }
  }

  // Application class to demonstrate usage
  class Application {
      private dialog?: Dialog;

      createUI(): any {
          // Create dialog
          this.dialog = new Dialog("Budget Reports");
          this.dialog.wikiPageURL = "http://wiki.example.com/budget-reports";

          // Create panel
          const panel = new Panel(0, 0, 400, 800);
          panel.modalHelpText = "This panel shows budget reports...";

          // Create buttons
          const okButton = new Button(250, 760, 50, 20, "OK", 
                                    "This is an OK button that confirms the operation");
          const cancelButton = new Button(320, 760, 50, 20, "Cancel");

          // Assemble the UI hierarchy
          panel.add(okButton);
          panel.add(cancelButton);
          this.dialog.add(panel);

          return {
            dialog: this.dialog,
            panel: panel,
            okButton: okButton,
            cancelButton: cancelButton
          }
      }

      onF1KeyPress(component: Component): void {
          // Simulate getting component at mouse coordinates
          component.showHelp();
      }
  }

  // Usage example
  const app = new Application();
  const {okButton, cancelButton, panel, dialog} = app.createUI();
  // app.onF1KeyPress(okButton);
  // app.onF1KeyPress(cancelButton);
  app.onF1KeyPress(panel);
  app.onF1KeyPress(dialog);
}
