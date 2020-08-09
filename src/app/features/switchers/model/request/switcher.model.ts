import { BaseSwitcher } from '../base-switcher';

export interface SwitcherRequest extends BaseSwitcher {
  /**
   * physical address of pin to which listener device is connected
   */
  listenerAddress?: string;
  force?: boolean;
}
