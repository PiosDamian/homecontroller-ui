export interface Alert {
  readonly message: string;
  readonly timeout: number;
  readonly type: AlertType;
}

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
