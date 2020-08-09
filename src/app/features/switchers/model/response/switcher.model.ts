import { BaseSwitcher } from '../base-switcher';
import { SwitcherState } from './switcher-state.enum';

export class Switcher implements BaseSwitcher {
  public readonly address: string;
  public readonly name: string;
  public readonly listenerAddress: string;
  public state: SwitcherState;

  constructor(obj?: any) {
    if (!obj.address) {
      throw new Error('Switcher have to have address');
    }
    this.address = obj.address;
    this.name = obj.name || '';
    this.state = obj.state || SwitcherState.UNKNOWN;
    this.listenerAddress = obj.listenerAddress;
  }
}
