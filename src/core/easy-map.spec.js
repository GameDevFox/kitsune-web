import { easyMap } from './index';

const doublePlusOne = x => (x * 2) + 1;

describe('easyMap(input, fn)', () => {
  it('should work with value', () => {
    const result = easyMap(7, doublePlusOne);
    result.should.equal(15);
  });

  it('should work with array', () => {
    const result = easyMap([1, 2, 3, 5, 8], doublePlusOne);
    result.should.deep.equal([3, 5, 7, 11, 17]);
  });

  it('should work with object', () => {
    const result = easyMap({ a: 4, b: 16, c: 64 }, doublePlusOne);
    result.should.deep.equal({ a: 9, b: 33, c: 129 });
  });
});
