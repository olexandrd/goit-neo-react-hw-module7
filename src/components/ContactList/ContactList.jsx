import { useDispatch, useSelector } from "react-redux";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import { getError, getIsLoading } from "../../redux/selectors";
import Loader from "../Loader/Loader";
import LoadError from "../LoadError/LoadError";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const searchRequest = useSelector((state) => state.filters.name);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchRequest.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ul className={css.contactList}>
        {filteredContacts.length > 0
          ? filteredContacts.map(({ id, name, number }) => (
              <li key={id}>
                <Contact name={name} number={number} id={id} />
              </li>
            ))
          : !loading && <p>No contacts found</p>}
      </ul>
      {loading && <Loader />}
      {error && <LoadError />}
    </>
  );
};

export default ContactList;
