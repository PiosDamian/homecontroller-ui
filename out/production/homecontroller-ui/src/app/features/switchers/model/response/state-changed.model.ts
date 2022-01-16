import { SwitcherState } from './switcher-state.enum';

export class StateChanged {
  constructor(
    public readonly address: number,
    public readonly state: SwitcherState
  ) {}
}
