import { useSelector } from "react-redux";
import css from "./LoadError.module.css";
import { selectError } from "../../redux/selectors";

const LoadError = () => {
  const error = useSelector(selectError);

  return (
    <div className={css.loadError}>
      <h2>Oops...</h2>
      <p>{error}</p>
    </div>
  );
};

export default LoadError;
