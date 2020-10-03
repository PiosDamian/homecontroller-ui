interface Configuration {
  url: string;
  refreshDelay: number;
}

export type SensorUpdateWorkerConfiguration = Partial<Configuration>;
