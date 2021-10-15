import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Books from './Books.js';
import CreateBook from './CreateBook';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      books: null,
      email: '',
    }
  }

  componentDidMount() {
    this.fetchBooks('', '');
  }

  async fetchBooks(title, email) {
    let API = process.env.REACT_APP_SERVER;
    try {
      const bookResponse = await axios.get(API, {params: {title: title, email: email}});
      this.setState({
        books: bookResponse.data
      });
    } catch (error){
      console.log(error, '<---- FETCH BOOKS ERROR ---<<<');
    }
  }

  handleTitleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.searchQuery;
    const email = this.state.email;
    this.fetchBooks(title, email);
  }

  changeHandler = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  emailHandler = (event) => {
    this.setState({email: event.target.value})
  }

  handleCreate = async (bookInfo) => {
    await axios.post(process.env.REACT_APP_SERVER, bookInfo);
    this.fetchBooks('', '');
  };

  handleUpdate = async (updatedInfo) => {
    console.log(updatedInfo, '<--- UPDATE LOG')
    await axios.put(process.env.REACT_APP_SERVER + '/' + updatedInfo.id, updatedInfo);
    this.fetchBooks('', '');
  };

  handleBurn = async (book) => {
    await axios.delete(process.env.REACT_APP_SERVER + '/' + book.id);
    this.fetchBooks('', '');
  };

  render() {
    return (
      <>
        <input onChange={this.changeHandler} placeholder="search books by title" rounded="true" fluid="true" ></input>
        <input onChange={this.emailHandler} placeholder="search books by email" rounded="true" fluid="true" ></input>
        <h6>leave <em>both</em> fields blank to see all books!</h6>
        <Button onClick={this.handleTitleSubmit} variant="warning">Fetch Book!</Button>

        <CreateBook onCreate={this.handleCreate}/>

        {this.state.books &&
          <Books bookArray={this.state.books} handleUpdate={this.handleUpdate} handleBurn={this.handleBurn} />
        }
      {this.state.error && <h3>This Book Collection is Empty</h3>}
      </>
    )
  }
}

export default BestBooks;