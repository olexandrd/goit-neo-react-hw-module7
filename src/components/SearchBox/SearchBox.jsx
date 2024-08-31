import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchRequest = useSelector((state) => state.filters.name);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.contactFind}>
      <label>
        Find contacts by name <br />
        <input
          type="text"
          name="filter"
          className={css.input}
          value={searchRequest}
          onChange={handleChange}
          placeholder="Search ..."
        />
      </label>
    </div>
  );
};

export default SearchBox;
