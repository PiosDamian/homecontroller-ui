import { environment } from 'src/environments/environment';

const base = environment.server;

export const endpoints = {
  sensors: `${base}/sensors`,
  updateSensor: `${base}/sensor/{address}`,
  switchers: `${base}/switchers`,
  switch: `${base}/switch/{address}`,
  switcher: `${base}/switcher/{address}`,
  registerListener: `${base}/listener/register`,
  unregisterListener: `${base}/listener/unregister`
};
