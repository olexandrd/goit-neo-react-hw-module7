import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import css from "./App.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from "./redux/selectors";
import { fetchContacts } from "./redux/contactsOps";
import Loader from "./components/Loader/Loader";
import LoadError from "./components/LoadError/LoadError";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.app}>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {filteredContacts.length > 0 ? (
        <ContactList />
      ) : (
        !(loading || !!error) && <p>No contacts found</p>
      )}
      {loading && <Loader />}
      {error && <LoadError />}
    </div>
  );
};

export default App;
