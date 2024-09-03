import { useDispatch, useSelector } from "react-redux";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/selectors";
import Loader from "../Loader/Loader";
import LoadError from "../LoadError/LoadError";

const ContactList = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);

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
