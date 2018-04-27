import _ from 'lodash';
import React from 'react';
import screenfull from 'screenfull';

import Icon from '../../components/icon';
import Split from '../../components/split';

import { commandInput } from '../input/command';
import kitsuneService from '../kitsune-service';
import NodeList from '../node-list';
import { requests } from '../requests';
import { rules } from '../rules';
import { getActiveViewList } from '../store';
import actions from '../store/actions';

const Test = () => <div>This is a test component. And I&apos;m going to put a lot of content in here to see if it scales properly.</div>;
const HelloJapanese = () => <div>こにちは。</div>;
const Default = ({ viewId }) => <div>No view found for node: {viewId}</div>;

const {
  clearNodeList, newNode, removeNode, selectPrevNode,
  selectNextNode, setActiveView, switchDirection, switchFocus,
  writeString
} = actions;

export const ignore = () => {};

export const prevent = e => {
  e.preventDefault();
  return e;
};

const list = () => setActiveView('node-list');

const config = {
  default: {
    view: Default,
    commands: {
      another: () => console.log('Another One'),
      go: (...args) => setActiveView(...args),
      goodbye: () => console.log('Goodbye World'),
      hello: () => console.log('Hello World'),
      list,
      ls: list,
      search: value => kitsuneService.searchStrings(value)
        .then(res => console.log('Search Result:', res)),
      test: () => setActiveView('test')
    },
    keys: [
      [rules('simpleKey !shift !ctrl !alt !meta'), commandInput],

      [rules('s alt'), e => {
        prevent(e);
        requests.add('string', { header: <Icon type="search"/> }).then(string => {
          kitsuneService.searchStrings(string).then(strings => _.map(strings, writeString), ignore);
        });
      }],

      [rules('space !shift !alt'), e => {
        prevent(e);
        requests.add('string', { header: <Icon type="quote-right"/> }).then(string => {
          writeString(string);
        }, ignore);
      }],
      [rules('space shift !alt'), e => {
        prevent(e);
        requests.add('text', { header: <Icon type="file-text-o"/> }).then(string => {
          writeString(string);
        }, ignore);
      }],

      [rules('f shift'), () => screenfull.enabled && screenfull.toggle(document.body)],
      [rules('k shift'), e => { console.log('KEY', e); console.log('LAST'); }]
    ]
  },
  'node-list': {
    view: NodeList,
    commands: {
      clear: clearNodeList,
      delete: removeNode,
      new: newNode,
      rm: removeNode
    },
    keys: [
      [rules('down'), selectPrevNode],
      [rules('up'), selectNextNode],

      [rules('n shift'), newNode]
    ]
  },
  test: {
    view: Test,
    commands: {
      another: () => console.log('Another Test')
    },
    keys: [
      [rules('k shift'), () => console.log('INSIDE')]
    ]
  },
  helloJapanese: {
    view: HelloJapanese,
    commands: {
      goodbye: () => console.log('さようなら')
    }
  },
  split: {
    view: Split,
    commands: {
      hello: () => console.log('Hello Split'),
      another: () => console.log('Another Split'),
      sw: switchFocus,
      switch: switchFocus
    },
    keys: [
      [rules('left'), () => switchFocus('left')],
      [rules('right'), () => switchFocus('right')],

      [rules('a shift'), () => switchFocus('left')],
      [rules('s shift'), () => switchFocus('right')],

      [rules('x shift'), () => switchDirection()]
    ]
  }
};

export const getViewConfig = (view, defaultFallback = false) => {
  let viewConfig = config[view];

  if(viewConfig === undefined && defaultFallback)
    viewConfig = config.default;

  return viewConfig;
};

export const forEachView = fn => {
  const activeViews = [...getActiveViewList(), 'default'];

  for(const viewId of activeViews) {
    const config = getViewConfig(viewId) || {};
    const result = fn(config);
    if(result === false)
      break;
  }
};
