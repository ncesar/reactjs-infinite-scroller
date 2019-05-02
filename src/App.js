import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [], //array de contatos, que pega as infos da api
    perPage: 8, //results per page
    page: 1,
    totalPages: null,
    scrolling: false,
  }

  componentDidMount() {
    this.loadContacts(); //carrega os contatos iniciais
    this.scrollListener = window.addEventListener('scroll', (event) => {//escuta o scroll
      this.handleScroll(event);
    });
  }

  handleScroll = () => {
    const { scrolling, totalPages, page } = this.state; //pega os 3 pra fora do state
    if(scrolling) return; //se ja está scrollando, retorna true
    if(totalPages <= page) return; //se o total de páginas é menor ou igual a page
    const lastLi = document.querySelector('ul.contacts > li:last-child');//pegando o último li
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffSet = 20;
    if(pageOffset > lastLiOffset - bottomOffSet) this.loadMore();
  }


  loadContacts = () => {
    const { perPage, page, contacts } = this.state;
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${perPage}&page=${page}`
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        this.setState({
          contacts: [...contacts, ...res.data.contacts],
          scrolling: false,
          totalPages: res.data.total_pages
        });
      });
  }

  loadMore = () => {
    // event.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true,
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
        {/* <button onClick={this.loadMore}>Load More</button> */}
      </div>
    );
  }
  }

export default App;
