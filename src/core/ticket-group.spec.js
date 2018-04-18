import TicketGroup from './ticket-group';

describe('TicketGroup', () => {
  it('should work', () => {
    const group = TicketGroup();

    let results = group();
    results.should.deep.equal([]);

    //
    const removeA = group.add('abc');

    removeA.should.be.a('function');
    removeA.id.should.equal(1);

    results = group();
    results.should.deep.equal(['abc']);

    //
    const removeB = group.add(123);

    removeB.should.be.a('function');
    removeB.id.should.equal(2);

    results = group();
    results.should.deep.equal(['abc', 123]);

    //
    removeA();

    results = group();
    results.should.deep.equal([123]);

    //
    removeB();

    results = group();
    results.should.deep.equal([]);
  });
});
