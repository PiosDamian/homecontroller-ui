export class Sensor {
  readonly address: string;
  readonly name: string;
  readonly value: number;
  readonly units: string;

  constructor(obj?: any) {
    const objCpy = obj || {};
    this.address = objCpy.address || '';
    this.name = objCpy.name || '';
    this.value = objCpy.value;
    this.units = objCpy.units || '';
  }
}
