import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const baseContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const initialContacts = () => {
  const saveContacts = JSON.parse(localStorage.getItem('contacts'));
  if (saveContacts) {
    return saveContacts;
  }
  return baseContacts;
};

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts([
      ...contacts,
      { id: nanoid(), name: data.name, number: data.number },
    ]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
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
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {visibleContacts.length || filter ? (
        visibleContacts.length ? (
          <>
            <Filter data={filter} handleChange={changeFilter} />
            <ContactList
              contacts={visibleContacts}
              handleDelete={deleteContact}
            />
          </>
        ) : (
          <>
            <Filter data={filter} handleChange={changeFilter} />
            <p>Contact with name "{filter}" not found!</p>
          </>
        )
      ) : (
        <p>Contacts is empty!</p>
      )}
    </div>
  );
}
