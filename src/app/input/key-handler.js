import { bind } from '../../core/rules';

import { rules, appRules } from '../rules';
import { forEachView, prevent } from '../view-tree/config';

import { commandInput } from './command';
import { filterMap } from '../../core';

const rootRules = filterMap([
  [rules('space alt'), () => document.activeElement.blur()],
  [rules('backtick !shift !ctrl !alt !meta'), e => { prevent(e); commandInput(e); }],
]);

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

const keyHandler = e => {
  const actions = rootRules(e);

  if(actions.length > 0) {
    actions.forEach(action => action(e));
    return;
  }

  treeViewKeyHandler(e);
};
export default keyHandler;
