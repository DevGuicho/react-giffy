import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserContext from "context/user/userContext";
import { useLocation } from "wouter";

const validateFields = (values) => {
  const errors = {};
  if (!values.email) errors.email = "Required username";
  if (!values.password) errors.password = "Required password";
  if (!values.name) errors.name = "Required name";
  return errors;
};

const Register = () => {
  const { signup, error } = useContext(UserContext);
  const [, navigate] = useLocation();

  const handleSubmit = (values) => {
    const { email, password, name } = values;
    return signup({ email, password, name }).then((res) => {
      return navigate("/login");
    });
  };

  return (
    <>
      <h2>Formulario de Registro</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
        }}
        validate={validateFields}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <button
              className="register-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Registrarse
            </button>
            <ErrorMessage name="error" component="div" />
            {error && <p>Ha habido un error</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
