import 'should';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const context = require.context('./app', true, /\.js$/);
context.keys().forEach(context);
