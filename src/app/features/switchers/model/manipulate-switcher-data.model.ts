import { Switcher } from './response/switcher.model';

export type SwitcherData = Partial<Switcher> & PinsInfo;

export interface ManipulateSwitcherData {
  pin: SwitcherData;
  title: string;
}

export interface PinsInfo {
  availablePins?: number[];
  allPins: number[];
}
