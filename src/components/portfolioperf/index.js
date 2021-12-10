import { connect } from 'react-redux';
import { usersFetchRequest } from './actions';
import PortfolioPerf from './portfolioperf';

export const mapStateToProps = (state) => ({
  users: selectors.getUsers(state),
});

export const mapDispatchToProps = (dispatch) => ({
  setEvent: (payload) => dispatch(actions.setEvent(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)();
