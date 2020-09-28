import { BaseSensor } from '../base-sensor';

export interface Sensor extends BaseSensor {
  readonly value: string;
}
