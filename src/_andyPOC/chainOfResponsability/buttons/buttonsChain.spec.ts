import { ButtonsChain } from './buttonsChain';

describe('ButtonsChain', () => {
  it('should be defined', () => {
    expect(ButtonsChain.prototype.handle).toBeDefined();
    expect(ButtonsChain.prototype.setNext).toBeDefined();
  });
});
