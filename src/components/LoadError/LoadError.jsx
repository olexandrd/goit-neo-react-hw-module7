import css from "./LoadError.module.css";

const LoadError = () => {
  return (
    <div className={css.loadError}>
      <h2>Something went wrong</h2>
      <p>There was an error loading the data. Please try again</p>
    </div>
  );
};

export default LoadError;
