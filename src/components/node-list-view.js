import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import NodeView from './node-view';

const Styles = styled.div`
  margin-top: 4px;

  pre {
    display: inline-block;
    margin-bottom: -4px;
  }

  .selected .node-view {
    border-color: yellow;
  }
`;

class NodeListView extends React.Component {
  render() {
    const { nodes, selectedNode } = this.props;

    return (
      <Styles className="node-list-view">
        {nodes.map((item, index) => (
          <span key={item.key} className={index === selectedNode ? 'selected' : null}>
            <NodeView node={item.node}/>
          </span>
        ))}
      </Styles>
    );
  }
}

NodeListView.propTypes = {
  nodes: PropTypes.array.isRequired,
  selectedNode: PropTypes.number.isRequired
};

export default NodeListView;