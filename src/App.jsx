import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
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
const LoadError = lazy(() => import("./components/LoadError/LoadError"));
const ContactList = lazy(() => import("./components/ContactList/ContactList"));

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
      <Suspense fallback={<Loader />}>
        {filteredContacts.length > 0 ? (
          <ContactList />
        ) : (
          !(loading || !!error) && <p>No contacts found</p>
        )}
        {error && <LoadError />}
      </Suspense>
      {loading && <Loader />}
    </div>
  );
};

export default App;
