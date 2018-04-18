import React from 'react';

import Icon from '../../components/icon';

import { requests } from '../requests';
import { ignore } from '../view-tree/config';

import command from './commands';

export const commandInput = () => requests.add('command', { header: <Icon type="terminal"/> }).then(cmdStr => {
  command(cmdStr);
}, ignore);
