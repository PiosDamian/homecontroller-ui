import { isEqual } from 'lodash';

export function removeElementsOfArray<T>(array: T[], elementsToRemove: T[]): T[] {
  return array.filter(e => !elementsToRemove.some(r => isEqual(e, r)));
}
