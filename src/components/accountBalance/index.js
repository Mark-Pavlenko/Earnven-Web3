import { connect } from 'react-redux';
import * as selectors from './selectors';
import AccountBalance from './AccountBalance';

export const mapStateToProps = (state) => {
  // console.log('state from mainStateToProps for accountBalance', state);
  return {
    tokens: selectors.getTokens(state),
  };
};

export default connect(mapStateToProps)(AccountBalance);
