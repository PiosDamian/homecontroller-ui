import { SwitcherState } from '../response/switcher-state.enum';

export interface StateUpdate {
  address: string;
  state: SwitcherState;
}
