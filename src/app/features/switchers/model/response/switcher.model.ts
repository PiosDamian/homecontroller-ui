import { BaseSwitcher } from '../base-switcher';
import { SwitcherState } from './switcher-state.enum';

export class Switcher implements BaseSwitcher {
  public readonly address: number;
  public readonly name: string;
  public readonly listenerAddress: number;
  public state: SwitcherState;

  constructor(obj?: any) {
    if (obj.address == null) {
      throw new Error('Switcher have to have address');
    }
    this.address = obj.address;
    this.name = obj.name || '';
    this.state = obj.state || SwitcherState.UNKNOWN;
    this.listenerAddress = obj.listenerAddress;
  }
}
