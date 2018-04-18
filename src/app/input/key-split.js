import _ from 'lodash';

import { bind } from '../../core/rules';
import Split from '../../core/split';

import { rules, appRules } from '../rules';
import { forEachView, prevent } from '../view-tree/config';

import { commandInput } from './command';

// TODO: These key rules should take priority over view key rules
const keySplit = Split();
keySplit.add(rules('space alt', () => document.activeElement.blur()));
keySplit.add(rules('backtick !shift !ctrl !alt !meta', prevent, commandInput));

// Process ViewTree keys
keySplit.add(bind(appRules.bodyFocus, e => {
  forEachView(viewConfig => {
    const { keys = [] } = viewConfig;
    let actions = keys
      .filter(([keyFn]) => keyFn(e))
      .map(([, ...actions]) => actions);

    actions = _.flatten(actions);

    if(actions.length > 0) {
      actions.forEach(action => action(e));
      return false;
    }
  });
}));

export default keySplit;
