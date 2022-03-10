import { Type } from './type';
import { ScheduleType } from './schedule-type';

export const units: { [key: string]: number } = {
  milliseconds: 1,
  seconds: 1000
};

units.minutes = units.seconds * 60;
units.hours = units.minutes * 60;
units.days = units.hours * 24;

Object.seal(units);

export interface Task {
  name: string;
  expression: string;
  scheduleType: ScheduleType;
  actionType: Type;
  data: Map<string, string>;
}

export const getExpressionValue = (task: Task): string => {
  if (task.scheduleType === ScheduleType.CRON) {
    return task.expression;
  } else {
    return calculatePeriod(Number.parseInt(task.expression, 10)).toString();
  }
};

export const calculatePeriod = (time: number): Period => {
  if (time % units.days === 0) {
    return new Period(time / units.days, 'days');
  } else if (time % units.hours === 0) {
    return new Period(time / units.hours, 'hours');
  } else if (time % units.minutes === 0) {
    return new Period(time / units.minutes, 'minutes');
  } else if (time % units.seconds === 0) {
    return new Period(time / units.seconds, 'seconds');
  } else {
    return new Period(time / units.milliseconds, 'milliseconds');
  }
};

export class Period {
  constructor(
    readonly amount: number,
    readonly unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
  ) {}

  toString() {
    return `amount: ${this.amount}, units: ${this.unit}`;
  }
}
