import chai from 'chai';
import chaiSubset from 'chai-subset';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

chai.use(chaiSubset);
chai.should();

Enzyme.configure({ adapter: new Adapter() });

const context = require.context('./', true, /\.spec\.js$/);
context.keys().forEach(context);
