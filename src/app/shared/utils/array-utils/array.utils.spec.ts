import { removeElementsOfArray } from './array.utils';

describe('arrayUtils', () => {
  it('should remove elements from second array', () => {
    const source = [1, 2, 3, 4, 5, 6, 7];
    const elements = [1, 2, 5];

    expect(removeElementsOfArray(source, elements)).toEqual([3, 4, 6, 7]);
  });
});
