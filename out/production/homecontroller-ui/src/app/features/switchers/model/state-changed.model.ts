import { Switcher } from './response/switcher.model';

export interface StateChange {
  switcher: Switcher;
  isNew: boolean;
}
