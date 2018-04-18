import './vertical-split.scss';

import React, { Component, Fragment } from 'react';

const Pane = props => {
  let className = 'pane';
  if(props.active)
    className += ' active';

  return (
    <div className={className}>
      <div className="header">{props.header}</div>
      <div className="frame">
        {props.children}
      </div>
    </div>
  );
};

export default class VerticalSplit extends Component {
  render() {
    const leftIcon = <Fragment><kbd>A</kbd> Left</Fragment>;
    const rightIcon = <Fragment><kbd>S</kbd> Right</Fragment>;

    const { activeView, children: { left, right } } = this.props;

    const direction = this.props.direction === 'vertical' ? 'vertical' : 'horizontal';

    return (
      <div className={`vertical-split ${direction}`}>
        <Pane active={activeView === 'left'} header={leftIcon}>
          <div>This is in left</div>
          {left}
        </Pane>
        <Pane active={activeView === 'right'} header={rightIcon}>
          <div>This is in right</div>
          {right}
        </Pane>
      </div>
    );
  }
}
