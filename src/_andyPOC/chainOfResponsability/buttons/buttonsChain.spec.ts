import { 
  ButtonsChain, 
  Button, 
  SubPanel, 
  Panel, 
  Ventana 
} from './buttonsChain';

describe('ButtonsChain', () => {
  it('should be defined', () => {
    expect(ButtonsChain.prototype.handle).toBeDefined();
    expect(ButtonsChain.prototype.setNext).toBeDefined();
  });

  it("should define a button handler", () => {
    const button = new Button();
    expect(button.handle).toBeDefined();
    expect(button.setNext).toBeDefined();
  });

  it("should define a SubPanel handler", () => {
    const subPanel = new SubPanel();
    expect(subPanel.handle).toBeDefined();
    expect(subPanel.setNext).toBeDefined();
  });

  it("should define a Panel handler", () => {
    const panel = new Panel();
    expect(panel.handle).toBeDefined();
    expect(panel.setNext).toBeDefined();
  });

  it("should define a Ventana handler", () => {
    const ventana = new Ventana();
    expect(ventana.handle).toBeDefined();
    expect(ventana.setNext).toBeDefined();
  });
});
