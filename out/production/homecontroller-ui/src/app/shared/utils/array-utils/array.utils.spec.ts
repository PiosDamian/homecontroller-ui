import { removeElementsOfArray } from './array.utils';

describe('arrayUtils', () => {
  it('should remove elements from second array - simple types', () => {
    const source = [1, 2, 3, 4, 5, 6, 7];
    const elements = [1, 2, 5];

    expect(removeElementsOfArray(source, elements)).toEqual([3, 4, 6, 7]);
  });

  it('should remove elements from second array - object types', () => {
    const source = [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: 4 }, { foo: 5 }, { foo: 6 }, { foo: 7 }];
    const elements = [{ foo: 1 }, { foo: 2 }, { foo: 5 }];

    const sourceCopy = [...source];
    expect(removeElementsOfArray(sourceCopy, elements)).toEqual([{ foo: 3 }, { foo: 4 }, { foo: 6 }, { foo: 7 }]);
    expect(sourceCopy).toEqual(source);
  });
});
