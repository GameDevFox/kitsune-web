import './console.scss';

import React from 'react';

import RequestList from '../requests';
import ViewTree from '../view-tree';

const Console = () => (
  <div className="console">
    <h1 className="title">Kitsune</h1>
    <ViewTree/>
    <RequestList/>
  </div>
);

export default Console;
