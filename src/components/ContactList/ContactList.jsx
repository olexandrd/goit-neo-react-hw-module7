import { useSelector } from "react-redux";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const searchRequest = useSelector((state) => state.filters.name);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchRequest.toLowerCase())
  );

  return (
    <ul className={css.contactList}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(({ id, name, number }) => (
          <li key={id}>
            <Contact name={name} number={number} id={id} />
          </li>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </ul>
  );
};

export default ContactList;
