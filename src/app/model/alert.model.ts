export interface Alert {
    readonly message: string;
    readonly timeout: number;
    readonly type: AlertType;
    readonly id: string;
}

export enum AlertType {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}
