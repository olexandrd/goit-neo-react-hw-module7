import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

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
    .matches(
      phoneRegExp,
      "Invalid phone number, please use 000-000-0000 format"
    )
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (e, { resetForm }) => {
    const contact = { name: e.name, number: e.number };
    dispatch(addContact(contact));
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
          <Field type="text" name="number" placeholder="000-000-0000" />
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
