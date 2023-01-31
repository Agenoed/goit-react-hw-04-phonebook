import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }
  addContact = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const dataNormalized = newContact.name.toLowerCase();
    const anyName = contacts.some(
      ({ name }) => dataNormalized === name.toLowerCase()
    );
    const notifyError = () =>
      alert(`${newContact.name} is already in contacts.`);

    if (anyName) {
      notifyError();
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContact = () => {
    const { contacts, filter } = this.state;

    const filterNormalized = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.visibleContact();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        {visibleContacts.length || filter ? (
          visibleContacts.length ? (
            <>
              <Filter data={filter} handleChange={this.changeFilter} />
              <ContactList
                contacts={visibleContacts}
                handleDelete={this.deleteContact}
              />
            </>
          ) : (
            <>
              <Filter data={filter} handleChange={this.changeFilter} />
              <p>Contact with name "{filter}" not found!</p>
            </>
          )
        ) : (
          <p>Contacts is empty!</p>
        )}
      </div>
    );
  }
}
