import _ from 'lodash';

export const asdf9Labels = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

export const LabelGenerator = labels => {
  const labelSize = labels.length;
  const reverseLabels = _.clone(labels).reverse();

  const getLevels = count => {
    let x = count;

    let levels = 1;
    while(x > labelSize) {
      x /= labelSize;
      levels++;
    }

    return levels;
  };

  const getLetters = (count, levels) => {
    if(count === 1)
      return [''];

    const result = [];
    let remain = count;

    const maxPerBucket = labelSize ** (levels - 1);

    let labelIndex = 0;
    while(remain > 0) {
      const part = Math.min(remain, maxPerBucket);
      remain -= part;

      const letter = reverseLabels[labelIndex];
      const subLetters = getLetters(part, levels - 1);
      subLetters.forEach(subLetter => result.push(letter + subLetter));

      labelIndex++;
    }

    return result;
  };

  const result = count => {
    let result = labels.slice(0, count);

    const levels = getLevels(count);
    if(levels > 1) {
      const maxPerBucket = labelSize ** (levels - 1);
      let remaining = count - labelSize;

      const distrib = _.fill(Array(labelSize), 1);
      let distribIndex = 0;
      while(remaining > 0) {
        const part = Math.min(remaining, maxPerBucket - 1);

        remaining -= part;
        distrib[distribIndex] += part;

        distribIndex++;
      }
      distrib.reverse();

      const otherResult = [];
      for(let i = 0; i < distrib.length; i++) {
        const distCount = distrib[i];
        const letter = result[i];

        const subLetters = getLetters(distCount, levels - 1).reverse();
        const combinations = subLetters.map(subLetter => letter + subLetter);

        otherResult.push(...combinations);
      }
      result = otherResult;
    }

    return result;
  };

  result.getLevels = getLevels;

  return result;
};
