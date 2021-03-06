import './node-list-view.scss';

import React from 'react';
import PropTypes from 'prop-types';

import NodeView from '../node-view/index';

class NodeListView extends React.Component {
  render() {
    const { nodes, selectedNode } = this.props;

    return (
      <div className="node-list-view">
        {nodes.map((item, index) => (
          <span key={item.key} className={index === selectedNode ? 'selected' : null}>
            <NodeView node={item.node}/>
          </span>
        ))}
      </div>
    );
  }
}

NodeListView.propTypes = {
  nodes: PropTypes.array.isRequired,
  selectedNode: PropTypes.number.isRequired
};

export default NodeListView;
