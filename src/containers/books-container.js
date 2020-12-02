import { connect } from 'react-redux';
import Books from '../components/books';
import { goToHome } from '../actions'

function mapStateToProps(state) {
  return {
    genre: state.mainReducer.bookGenre
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToHome: () => dispatch(goToHome())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);
