import { filterMap } from './index';

describe('filterMap(mappings)', () => {
  it('should work', () => {
    const map = filterMap([
      [x => x % 2 === 0, 'a'],
      [x => x % 3 === 0, 'b'],
      [x => x % 4 === 0, 'c'],
      [x => x % 5 === 0, 'd']
    ]);

    map(1).should.deep.equal([]);
    map(2).should.deep.equal(['a']);
    map(3).should.deep.equal(['b']);
    map(4).should.deep.equal(['a', 'c']);
    map(5).should.deep.equal(['d']);
    map(6).should.deep.equal(['a', 'b']);
    map(7).should.deep.equal([]);
  });
});
