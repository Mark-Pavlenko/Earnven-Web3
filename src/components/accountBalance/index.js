import { connect } from 'react-redux';
import * as selectors from './selectors';
import AccountBalance from './AccountBalance';

export const mapStateToProps = (state) => {
  console.log('state from mainStateToProps for accountBalance', state);
  return {
    accountBalance: selectors.getAccountBalance(state),
  };
};

export default connect(mapStateToProps)(AccountBalance);
