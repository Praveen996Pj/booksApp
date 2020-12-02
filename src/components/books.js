import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Back from '../assets/Back.svg';
import Search from '../assets/Search.svg';
import Cancel from '../assets/Cancel.svg';

const server = 'http://gutendex.com/books/';
const styles = () => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '80px 120px 20px 120px',
    display: 'flex',
    flexDirection: 'column',
    background: 'white'
  },
  genre: {
    display: 'flex'
  },
  backIcon: {},
  genreTitle: {
    marginLeft: '10px',
    fontSize: '30px',
    color: '#5E56E7',
    flexGrow: 1
  },
  searchContainer: {
    display: 'flex',
    background: '#F0F0F6',
    borderRadius: '4px',
    border: '1px solid #F0F0F6',
    alignItems: 'center'
  },
  onSearchFocus: {
    border: '1px solid #5E56E7'
  },
  searchIcon: {
    margin: '0px 10px'
  },
  cancelIcon: {
    margin: '0px 10px'
  },
  searchInput: {
    flexGrow: 1,
    borderRadius: '4px',
    padding: '0px 10px',
    height : '40px',
    background: 'none',
    outline: 0,
    border: 0,
    color: '#A0A0A0'
  },
  searchInputOnFocus: {
    color: '#333333'
  },
  InfiniteScroll: {
    flexGrow: 1
  },
  bookContainer: {
    padding: '20px',
    cursor: 'pointer'
  },
  book: {
    maxWidth: '114px'
  },
  bookImage: {
    width: '114px',
    height: '162px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)'
  }
});

export class Books extends React.Component {
  constructor(props) {
    super(props);
    this.fetchNext  = this.fetchNext.bind(this);
    this.state = {
      books: [],
      next: null,
      previous: null,
      search: '',
      isFoucs: false
    }
    this.onChange = this.onChange.bind(this);
    this.fetchHandler = this.fetchHandler.bind(this);
    this.defaultQueryString = `topic=${props.genre}&mime_type=image/`;
  }
  fetchHandler(url, responseHandler) {
    fetch(url).then(response => response.json())
      .then(responseHandler);
  }
  onChange({target: {value}}) {
    if(typeof this.timeout !== 'undefined') {
      clearTimeout(this.timeout);
    }
    this.setState({search: value});
    this.timeout = setTimeout(() => {
      this.fetchHandler(`${server}?${this.defaultQueryString}&search=${value}`,
        (response) => {
          const {next, previous, results} = response;
          this.setState({next, previous, books: results});
      });
    }, 500);
  }
  fetchNext() {
    const {next} = this.state;
    const requestUrl = next? next: `${server}?${this.defaultQueryString}`;
    this.fetchHandler(requestUrl,
      (response) => {
        const {next, previous, results} = response;
        this.setState({next, previous, books: this.state.books.concat(results)});
    });
  }
  componentDidMount() {
    this.fetchNext();
  }
  render() {
    const { classes, genre, goToHome } = this.props;
    const {next, books, search, isFoucs} = this.state;
    const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1).toLocaleLowerCase();
    return (
      <div className = {classes.root}>
        <div className = {classes.header}>
          <div className = {classes.genre}>
            <img
              className = {classes.backIcon}
              src = {Back}
              onClick = {goToHome}
            />
            <div className = {classes.genreTitle}>{genreTitle}</div>
          </div>
          <div className = {`${classes.searchContainer} ${isFoucs? classes.onSearchFocus: ''}`}>
            <img src = {Search} className = {classes.searchIcon} />
            <input
              className = {`${classes.searchInput} ${search.length > 0 ? classes.searchInputOnFocus: ''}`}
              type = 'text'
              onChange = {this.onChange}
              value = {search}
              placeholder = {isFoucs? '': 'Search'}
              onFocus = {() => this.setState({isFoucs: true})}
              onBlur = {() => this.setState({isFoucs: false})}
            />
            {
              search.length > 0 ?
              <img
                className = {classes.cancelIcon}
                src = {Cancel}
                onClick = {() => this.onChange({target: {value: ''}})}
              /> : null
            }
          </div>
        </div>
        <div className = {classes.InfiniteScroll}>
          <InfiniteScroll
            dataLength={Object.keys(books).length}
            next={this.fetchNext}
            hasMore={next}
            style = {{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '10px 100px'}}
          >
            {
              books.map(item => {
                const {authors, title, formats, id} = item;
                const authorName = authors.length> 0 ? authors[0].name: '';
                const image = formats['image/jpeg'];
                return (
                  <div
                    key = {`${title}_${id}`}
                    className = {classes.bookContainer}
                    onClick = { () => {
                      const html = formats['text/html'] ||
                        formats['text/html; charset=utf-8'] ||
                        formats['text/html; charset=us-ascii'];
                      const pdf = formats['application/pdf'];
                      const text = formats['text/plain'] ||
                        formats['text/plain; charset=utf-8'] ||
                        formats['text/plain; charset=us-ascii'] ||
                        formats['text/plain; charset=iso-8859-1'];
                      if(html || pdf || text) {
                        window.open(
                          html ? html : (pdf ? pdf : text),
                          '_blank'
                        );
                      } else {
                        alert('No viewable version available');
                      }
                    }}
                  >
                    <div className = {classes.book}>
                      <img
                        className = {classes.bookImage}
                        src = {image}
                      />
                      <Typography noWrap = {true}>{title}</Typography>
                      <Typography noWrap = {true}>{authorName}</Typography>
                    </div>
                  </div>
                );
              })
            }
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(Books);
