export class Sensor {
  public readonly address: string;
  public readonly name: string;
  public readonly value: number;
  public readonly units: string;

  constructor(obj: any) {
    const objCpy = obj || {};
    this.address = objCpy.address || '';
    this.name = objCpy.name || '';
    this.value = objCpy.value;
    this.units = objCpy.units || '';
  }
}
