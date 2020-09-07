import { Switcher } from './response/switcher.model';

export type ManipulateSwitcherData = Partial<Switcher> & PinsInfo;

export interface PinsInfo {
  availablePins?: number[];
  allPins: number[];
}
