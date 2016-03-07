import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssignedBooks } from '../actions/crudActions';

const mapStateToProps = (state) => {
  return {
    books: state.bookReducers.assignedBooks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAssignedBooks: () => {
      dispatch(fetchAssignedBooks());
    }
  };
};

class BookComponent extends Component {
    render() {
      return (
          <div>
            <span>Your books</span>
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Author</td>
                  <td>Pages Read</td>
                  <td>Progress</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.props.books.map((item) => {
                  let { id, title, author, pagesProgression, percentProgression }
                    = this.getProperties(item);
                  return (
                    <tr key={id}>
                      <td>{title}</td>
                      <td>{author}</td>
                      <td>{pagesProgression}</td>
                      <td>{percentProgression}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
      );
    }

    getProperties(item) {
      let res = {};
      res.id = item.id;
      res.title = item.book.title;
      res.author = item.book.author;

      let pagesProgression = `0/${item.book.num_pages}`;
      let percentProgression = '0%';

      if (item.progress != null) {
        pagesProgression = `${item.progress.num_pages_read}/${item.book.num_pages}`;
        percentProgression = `${Math.round(
          +item.progress.num_pages_read / item.book.num_pages * 100)}%`;
      }

      res.pagesProgression = pagesProgression;
      res.percentProgression = percentProgression;

      return res;
    }

    componentDidMount() {
      this.props.onFetchAssignedBooks();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
