import {
  Request,
  Handler,
} from './chainOfResponsability.interfaces';

import { 
  Juan, 
  Pedro, 
  Maria
} from './chainOfResponsability';

describe('ChainOfResponsability', () => {
  let juanMock: Juan;
  let pedroMock: Pedro;
  let mariaMock: Maria;

  beforeEach(() => {
    juanMock = new Juan();
    pedroMock = new Pedro();
    mariaMock = new Maria();
    
    jest.spyOn(console, 'log');
    jest.spyOn(juanMock, 'handle');
    jest.spyOn(juanMock, 'setNext');
    jest.spyOn(pedroMock, 'handle');
    jest.spyOn(pedroMock, 'setNext');
    jest.spyOn(mariaMock, 'handle');
    jest.spyOn(mariaMock, 'setNext');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log all in correct order', () => {
    const request: Request = {userId: 4};
    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle(request);

    expect(console.log).toHaveBeenCalledWith('Hola Soy Juan');
    expect(console.log).toHaveBeenCalledWith('Hola Soy Pedro');
    expect(console.log).toHaveBeenCalledWith('Hola Soy Maria');
  });

  it('juan should call pedro and maria', () => {
    const request: Request = {userId: 4};

    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle(request);

    expect(juanMock.handle).toHaveBeenCalledWith(request);
    expect(pedroMock.handle).toHaveBeenCalledWith(request);
    expect(mariaMock.handle).toHaveBeenCalledWith(request);
  });

  it("if no userId, should not log anything", () => {
    const request: Request = {};

    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle({});

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should stop on juan is user id is 1', () => {
    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle({userId: 1});

    expect(juanMock.handle).toHaveBeenCalledWith({userId: 1});
    expect(pedroMock.handle).not.toHaveBeenCalled();
    expect(mariaMock.handle).not.toHaveBeenCalled();
  });

  it('should stop on pedro is user id is 2', () => {
    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle({userId: 2});

    expect(juanMock.handle).toHaveBeenCalledWith({userId: 2});
    expect(pedroMock.handle).toHaveBeenCalledWith({userId: 2});
    expect(mariaMock.handle).not.toHaveBeenCalled();
  }); 

  it('should stop on maria is user id is 3', () => {
    juanMock.setNext(pedroMock);
    pedroMock.setNext(mariaMock);

    juanMock.handle({userId: 3});

    expect(juanMock.handle).toHaveBeenCalledWith({userId: 3});
    expect(pedroMock.handle).toHaveBeenCalledWith({userId: 3});
    expect(mariaMock.handle).toHaveBeenCalledWith({userId: 3});

    // marian this.next.handle(request); should no be called
    
  });
});
