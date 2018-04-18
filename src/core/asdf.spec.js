import { asdf9Labels, LabelGenerator } from './asdf';

describe('LabelGenerator', () => {
  describe('asd', function() {
    before(() => {
      this.getLabels = LabelGenerator(['a', 's', 'd']);
    });

    it('getLevels should work', () => {
      const getLevels = this.getLabels.getLevels;

      getLevels(0).should.equal(1);
      getLevels(3).should.equal(1);
      getLevels(4).should.equal(2);
      getLevels(9).should.equal(2);
      getLevels(10).should.equal(3);
      getLevels(27).should.equal(3);
      getLevels(28).should.equal(4);
    });

    it('should work', () => {
      const { getLabels } = this;

      getLabels(0).join(' ').should.deep.equal('');
      getLabels(1).join(' ').should.deep.equal('a');
      getLabels(2).join(' ').should.deep.equal('a s');
      getLabels(3).join(' ').should.deep.equal('a s d');

      getLabels(4).join(' ').should.deep.equal('a s ds dd');
      getLabels(5).join(' ').should.deep.equal('a s da ds dd');
      getLabels(6).join(' ').should.deep.equal('a ss sd da ds dd');
      getLabels(7).join(' ').should.deep.equal('a sa ss sd da ds dd');
      getLabels(8).join(' ').should.deep.equal('as ad sa ss sd da ds dd');
      getLabels(9).join(' ').should.deep.equal('aa as ad sa ss sd da ds dd');

      getLabels(10).join(' ').should.deep.equal('a s das dad dsa dss dsd dda dds ddd');
      getLabels(27).join(' ').should.deep.equal(
        'aaa aas aad asa ass asd ada ads add ' +
        'saa sas sad ssa sss ssd sda sds sdd ' +
        'daa das dad dsa dss dsd dda dds ddd'
      );
      getLabels(28).join(' ').should.deep.equal(
        'a s ' +
        'daas daad dasa dass dasd dada dads dadd ' +
        'dsaa dsas dsad dssa dsss dssd dsda dsds dsdd ' +
        'ddaa ddas ddad ddsa ddss ddsd ddda ddds dddd'
      );
    });
  });

  describe('asdfghjkl', function() {
    before(() => {
      this.getLabels = LabelGenerator(asdf9Labels);
    });

    it('getLevels should work', () => {
      const getLevels = this.getLabels.getLevels;

      getLevels(0).should.equal(1);
      getLevels(9).should.equal(1);
      getLevels(10).should.equal(2);
      getLevels(81).should.equal(2);
      getLevels(82).should.equal(3);
      getLevels(729).should.equal(3);
      getLevels(730).should.equal(4);
    });

    it('should work', () => {
      const { getLabels } = this;

      getLabels(0).join(' ').should.deep.equal('');
      getLabels(1).join(' ').should.deep.equal('a');
      getLabels(4).join(' ').should.deep.equal('a s d f');
      getLabels(9).join(' ').should.deep.equal('a s d f g h j k l');

      getLabels(10).join(' ').should.deep.equal('a s d f g h j k lk ll');
      getLabels(17).join(' ').should.deep.equal('a s d f g h j k la ls ld lf lg lh lj lk ll');
      getLabels(18).join(' ').should.deep.equal('a s d f g h j kk kl la ls ld lf lg lh lj lk ll');
    });
  });
});
