import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;

  &.horizontal {
    flex-direction: column;
  }

  width: 100%;
  height: 100%;

  .pane {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    &.active .frame {
      border: 2px solid yellow;
    }

    .header {
      padding: 4px;
    }

    .frame {
      flex-grow: 1;
      padding: 4px;

      border: 2px solid dimgrey;
      border-radius: 8px;
    }
  }

  .pane:nth-child(1) {
    margin-right: 4px;
  }
`;

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

export default class Split extends Component {
  render() {
    const leftIcon = <Fragment><kbd>A</kbd> Left</Fragment>;
    const rightIcon = <Fragment><kbd>S</kbd> Right</Fragment>;

    const { activeView, children: { left, right } } = this.props;

    const direction = this.props.direction === 'vertical' ? 'vertical' : 'horizontal';

    return (
      <Styles className={`split ${direction}`}>
        <Pane active={activeView === 'left'} header={leftIcon}>
          <div>This is in left</div>
          {left}
        </Pane>
        <Pane active={activeView === 'right'} header={rightIcon}>
          <div>This is in right</div>
          {right}
        </Pane>
      </Styles>
    );
  }
}
