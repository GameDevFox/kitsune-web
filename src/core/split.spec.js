import { stub } from 'sinon';

import Split from './split';

describe('Split', () => {
  it('should work', () => {
    const split = Split();

    let results = split({ first: 'one' });
    results.should.deep.equal([]);

    //
    const stubA = stub();
    const removeA = split.add(stubA);

    removeA.should.be.a('function');
    removeA.id.should.equal(1);

    //
    stubA.callCount.should.equal(0);

    stubA.onCall(0).returns('stubA-1');
    results = split({ second: 'one' });

    stubA.callCount.should.equal(1);
    stubA.getCall(0).args[0].should.deep.equal({ second: 'one' });
    results.should.deep.equal(['stubA-1']);

    //
    const stubB = stub();
    const removeB = split.add(stubB);

    removeB.should.be.a('function');
    removeB.id.should.equal(2);

    //
    stubB.callCount.should.equal(0);

    stubA.onCall(1).returns('stubB-2');
    stubB.onCall(0).returns('b stub: first');
    results = split({ another: 'time' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(1);
    stubA.getCall(1).args[0].should.deep.equal({ another: 'time' });
    stubB.getCall(0).args[0].should.deep.equal({ another: 'time' });
    results.should.have.members(['stubB-2', 'b stub: first']);

    //
    removeA();
    stubB.onCall(1).returns('b stub: second');
    results = split({ final: 'test' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(2);
    stubB.getCall(1).args[0].should.deep.equal({ final: 'test' });
    results.should.deep.equal(['b stub: second']);

    //
    removeB();
    results = split({ endOfLine: '...' });

    stubA.callCount.should.equal(2);
    stubB.callCount.should.equal(2);
    results.should.deep.equal([]);
  });
});
