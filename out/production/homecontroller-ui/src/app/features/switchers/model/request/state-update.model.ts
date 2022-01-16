import { SwitcherState } from '../response/switcher-state.enum';

export interface StateUpdate {
  address: number;
  state: SwitcherState;
}
