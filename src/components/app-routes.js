import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import HomeContainer from '../containers/home-container';
import BooksContainer from '../containers/books-container';
import { pages } from '../constants/project-constants'

class AppRoutes extends React.Component {
  render() {
    return (
      <div className = {this.props.classes.root}>
        <Switch>
          <Route exact path = {pages.HOME} component = {HomeContainer} />
          <Route exact path = {pages.BOOKS} component = {BooksContainer} />
          <Route exact path = '*' render = {() => <Redirect to = {pages.HOME}/>} />
        </Switch>
      </div>
    )
  }
}


export default withStyles(() => ({
  root: {
    height: '100vh',
    background: '#F8F7FF'
  }
}))(AppRoutes);
