import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import NodeId from './node-id';

const Styles = styled.div`
  border: 2px solid dimgrey;
  border-radius: 8px;
  margin-bottom: 5px;
  padding: 4px;
`;

const NodeView = props => {
  const { node } = props;
  return (
    <Styles className="node-view">
      <NodeId id={node.id}/>
      {node.string && <Fragment><br/><pre>{node.string}</pre></Fragment>}
    </Styles>
  );
};

NodeView.propTypes = {
  node: PropTypes.object.isRequired
};

export default NodeView;
