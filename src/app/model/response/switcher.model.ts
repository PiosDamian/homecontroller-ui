import { SwitcherState } from './switcher-state.enum';

export class Switcher {
  public readonly address: number;
  public readonly name: string;
  public state: SwitcherState;

  constructor(obj?: any) {
    if (!obj.address) {
      throw new Error('Switcher have to have address');
    }
    this.address = obj.address;
    this.name = obj.name || '';
    this.state = obj.state || SwitcherState.UNKNOWN;
  }
}
