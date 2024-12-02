import { 
  ButtonsChain, 
  Button, 
  SubPanel, 
  Panel, 
  Ventana 
} from './buttonsChain';
import { Event } from '../chainOfResponsability.interfaces';
describe('ButtonsChain', () => {
  describe('ButtonsChains instantiation', () => {
    it('should be defined', () => {
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

  describe('ButtonsChains execution', () => {
    let buttonMock: Button;
    let subPanelMock: SubPanel;
    let panelMock: Panel;
    let ventanaMock: Ventana;

    beforeEach(() => {
      buttonMock = new Button();
      subPanelMock = new SubPanel();
      panelMock = new Panel();
      ventanaMock = new Ventana();

      buttonMock.setNext(subPanelMock);
      subPanelMock.setNext(panelMock);
      panelMock.setNext(ventanaMock);


      jest.spyOn(buttonMock, 'handle');
      jest.spyOn(subPanelMock, 'handle');
      jest.spyOn(panelMock, 'handle');
      jest.spyOn(ventanaMock, 'handle');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should execute the button handler', () => {
      const event: Event = { handles: "button" };
      
      buttonMock.handle(event);

      expect(buttonMock.handle).toHaveBeenCalledWith(event);
      expect(subPanelMock.handle).not.toHaveBeenCalled();
      expect(panelMock.handle).not.toHaveBeenCalled();
      expect(ventanaMock.handle).not.toHaveBeenCalled();

    });

    it('should execute the subPanel handler', () => {
      const event: Event = { handles: "subPanel" };
      
      buttonMock.handle(event);

      expect(buttonMock.handle).toHaveBeenCalledWith(event);
      expect(subPanelMock.handle).toHaveBeenCalledWith(event);
      expect(panelMock.handle).not.toHaveBeenCalled();
      expect(ventanaMock.handle).not.toHaveBeenCalled();

    });

    it('should execute the panel handler', () => {
      const event: Event = { handles: "panel" };
      
      buttonMock.handle(event);

      expect(buttonMock.handle).toHaveBeenCalledWith(event);
      expect(subPanelMock.handle).toHaveBeenCalledWith(event);
      expect(panelMock.handle).toHaveBeenCalledWith(event);
      expect(ventanaMock.handle).not.toHaveBeenCalled();

    });

    it('should execute the ventana handler', () => {
      const event: Event = { handles: "ventana" };
      
      buttonMock.handle(event);

      expect(buttonMock.handle).toHaveBeenCalledWith(event);
      expect(subPanelMock.handle).toHaveBeenCalledWith(event);
      expect(panelMock.handle).toHaveBeenCalledWith(event);
      expect(ventanaMock.handle).toHaveBeenCalledWith(event); 
    });
  });
});
