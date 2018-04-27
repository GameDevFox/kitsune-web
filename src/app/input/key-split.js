import { bind } from '../../core/rules';
import Split from '../../core/split';

import { rules, appRules } from '../rules';
import { forEachView, prevent } from '../view-tree/config';

import { commandInput } from './command';
import { filterMap } from '../../core';

// TODO: These key rules should take priority over view key rules
const keySplit = Split();
keySplit.add(rules('space alt', () => document.activeElement.blur()));
keySplit.add(rules('backtick !shift !ctrl !alt !meta', prevent, commandInput));

// Process ViewTree keys
const treeViewKeyHandler = bind(appRules.bodyFocus, e => {
  forEachView(viewConfig => {
    const { keys = [] } = viewConfig;

    const actions = filterMap(keys)(e);
    if(actions.length > 0) {
      actions.forEach(action => action(e));
      return false;
    }
  });
});
keySplit.add(treeViewKeyHandler);

export default keySplit;
