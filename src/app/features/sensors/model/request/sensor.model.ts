import { BaseSensor } from '../base-sensor';

export interface SensorRequest extends BaseSensor {
  /**
   * reading value factor
   */
  factor: number;
}
