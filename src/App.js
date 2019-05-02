import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    perPage: 8,
    page: 1,
    totalPages: null,
    scrolling: false,
  }

  componentDidMount() {
    this.loadContacts();
    this.scrollListener = window.addEventListener('scroll', (event) => {
      this.handleScroll(event);
    });
  }

  handleScroll = (event) => {
    const { scrolling, totalPages, page } = this.state;
  }


  loadContacts = () => {
    const { perPage, page, contacts } = this.state;
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${perPage}&page=${page}`
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        this.setState({contacts: [...contacts, ...res.data.contacts]});
      });
  }

  loadMore = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.loadContacts);
  }

  render(){
    return (
      <div className="App">
        <h1>Contatos com Infinite Scrolling</h1>
        <ul className="contacts">
          {this.state.contacts.map((contact, index) => (
            <ContactList
              key={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
              address={contact.address}
              suite={contact.suite}
              city={contact.city}
              state={contact.state}
              zip={contact.zip}
            />
          ))}
        </ul>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    );
  }
  }

export default App;
