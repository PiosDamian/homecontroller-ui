import { ToFixedPipe } from './to-fixed.pipe';

describe('ToFixedPipe', () => {
  let pipe: ToFixedPipe;

  beforeAll(() => {
    pipe = new ToFixedPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return string', () => {
    expect(pipe.transform('foo')).toBe('foo');
  });

  it('should return number', () => {
    expect(pipe.transform(15.11223, 3)).toBe(15.112 + '');
  });
});
