import { Audio } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <Audio color="#B9B7BD" height={80} width={80} wrapperClass={css.loader} />
  );
};

export default Loader;
