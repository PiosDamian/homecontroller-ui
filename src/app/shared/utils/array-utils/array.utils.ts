import { remove } from 'lodash';

export function removeElementsOfArray<T>(array: T[], elementsToRemove: T[]): T[] {
  elementsToRemove.forEach(element => remove(array, e => e === element));
  return array;
}
