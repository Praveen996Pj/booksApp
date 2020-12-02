import {connect} from 'react-redux';
import {onGenreClick} from '../actions'
import HomeComponent from '../components/home-component';

function mapDispatchToProps(dispatch) {
  return {
    onGenreClick: (genre) => dispatch(onGenreClick(genre))
  }
}

export default connect(() => ({}), mapDispatchToProps)(HomeComponent);
