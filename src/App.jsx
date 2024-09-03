import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import css from "./App.module.css";
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from "./redux/selectors";
import { fetchContacts } from "./redux/contactsOps";
import Loader from "./components/Loader/Loader";
const LoadError = lazy(() => import("./components/LoadError/LoadError"));
const ContactList = lazy(() => import("./components/ContactList/ContactList"));
const AddContactNotice = lazy(() =>
  import("./components/AddContactNotice/AddContactNotice")
);
const NoContactsNotice = lazy(() =>
  import("./components/NoContactsNotice/NoContactsNotice")
);

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);

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
          !(loading || !!error) && !!allContacts.length && <NoContactsNotice />
        )}
        {allContacts.length === 0 && !(loading || !!error) && (
          <AddContactNotice />
        )}
        {error && <LoadError />}
      </Suspense>
      {loading && <Loader />}
    </div>
  );
};

export default App;
