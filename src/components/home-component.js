import React from 'react';
import {bookGenre} from '../constants/project-constants';
import {withStyles} from '@material-ui/core/styles';
import Fiction from '../assets/Fiction.svg';
import Philosophy from '../assets/Philosophy.svg';
import Drama from '../assets/Drama.svg';
import History from '../assets/History.svg';
import Humour from '../assets/Humour.svg';
import Adventure from '../assets/Adventure.svg';
import Politics from '../assets/Politics.svg';
import Next from '../assets/Next.svg';
import Pattern from '../assets/Pattern.svg';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: '#F8F7FF'
  },
  header: {
    padding: '80px 120px',
    background: `url(${Pattern})`
  },
  appTitle: {
    fontFamily: 'Montserrat',
    fontSize: '48px',
    color: '#5E56E7'
  },
  appDescription: {
    fontSize: '16px',
    fontWeight: '600'
  },
  genreContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 120px'
  },
  genreCard: {
    cursor: 'pointer',
    borderRadius : '4px',
    padding: '0px 10px',
    height : '50px',
    boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '300px',
    minWidth: '300px',
    width: '300px',
    margin: '10px 100px 10px 0px'
  },
  genreCardIcon: {
    width: '30px',
    height: '30px'
  },
  genreCardTitle: {
    flexGrow: 1,
    fontSize: '20x',
    padding: '0px 10px'
  },
  nextIcon: {
    width: '25px',
    height: '25px'
  }
});

export class HomeComponent extends React.Component {
  render() {
    const {onGenreClick, classes} = this.props
    const genreItems = [
      {icon: Fiction, title: bookGenre.FICTION},
      {icon: Philosophy, title: bookGenre.PHILOSOPHY},
      {icon: Drama, title: bookGenre.DRAMA},
      {icon: History, title: bookGenre.HISTORY},
      {icon: Humour, title: bookGenre.HUMOUR},
      {icon: Adventure, title: bookGenre.ADVENTURE},
      {icon: Politics, title: bookGenre.POLITICS},
    ];
    return (
      <div className = {classes.root}>
        <div className = {classes.header}>
          <div className = {classes.appTitle}>
            Gutenberg Project
          </div>
          <div className = {classes.appDescription}>
            A social cataloging website that allows you to freely search its database of books, annotations,
            and reviews.
          </div>
        </div>
        <div className = {classes.genreContainer}>
          {
            genreItems.map((item, index) => {
              const {icon, title} = item;
              return (
                <div
                  className = {classes.genreCard}
                  key = {title}
                  onClick = {() => onGenreClick(title)}
                >
                  <img className = {classes.genreCardIcon} src = {icon}/>
                  <div className = {classes.genreCardTitle}> {title}</div>
                  <img className = {classes.nextIcon} src = {Next}/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomeComponent);
