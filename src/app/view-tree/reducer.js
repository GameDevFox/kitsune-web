import _ from 'lodash';
import { Reducer } from '../store/redux-utils';

const reducer = Reducer({
  SET_ACTIVE_VIEW: (state, action) => {
    const { activeView } = action;
    return { ...state, activeView };
  },
  SWITCH_FOCUS: (state, action) => {
    let activeView = 'left';

    if(action.subView)
      activeView = action.subView;
    else
      activeView = state.children.split.activeView === 'left' ? 'right' : 'left';

    return _.merge({}, state, { children: { split: { activeView } } });
  },
  SWITCH_DIRECTION: state => {
    let { direction } = state.children.split.props;
    direction = direction === 'vertical' ? 'horizontal' : 'vertical';
    return _.merge({}, state, { children: { split: { props: { direction } } } });
  }
}, {
  activeView: null,
  children: {
    split: {
      activeView: 'left',
      children: { left: 'node-list', right: 'test' },
      props: {
        direction: 'vertical'
      }
    }
  }
});
export default reducer;
