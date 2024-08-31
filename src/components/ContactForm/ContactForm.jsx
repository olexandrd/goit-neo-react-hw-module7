import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import css from "./ContactForm.module.css";

const phoneRegExp = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .matches(phoneRegExp, "Invalid phone number, please use 000-00-00 format")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (e, { resetForm }) => {
    dispatch(addContact(e.name, e.number));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      <Form className={css.formContainer}>
        <label className={css.label}>
          Name <br />
          <Field type="text" name="name" placeholder="Contact name" />
        </label>
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.label}>
          Number <br />
          <Field type="text" name="number" placeholder="000-00-00" />
        </label>
        <ErrorMessage className={css.error} name="number" component="span" />

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
