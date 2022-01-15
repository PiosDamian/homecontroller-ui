import { Type } from './type';
import { ControlType } from './control-type';

export interface Task {
  name: string;
  expression: string;
  controlType: ControlType;
  actionType: Type;
  data: Map<string, string>;
}
