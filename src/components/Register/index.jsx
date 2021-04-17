import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import RegisterSchema from "utils/schema/RegisterSchema";
import Spinner from "components/Spinner";
import "components/Login/Login.css";
import useUser from "Hooks/useUser";
const Register = () => {
  const history = useHistory();

  const { isLoading, logUp, isLogged, error } = useUser();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isLogged) history.push("/");
  }, [isLogged, history]);

  const handleSubmit = ({ email, password, name }) => {
    logUp({ email, password, name });
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={RegisterSchema}
    >
      <Form className="form">
        <h2>Sign Up to Giffy</h2>
        <div className="input-control">
          <label htmlFor="name">Name</label>
          <div className="input">
            <Field type="name" name="name" id="name" placeholder="Name" />
            <i className="fas fa-user"></i>
          </div>
          <ErrorMessage className="form__error" name="name" component="span" />
        </div>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <div className="input">
            <Field type="email" name="email" id="email" placeholder="Email" />
            <i className="fas fa-user"></i>
          </div>
          <ErrorMessage className="form__error" name="email" component="span" />
        </div>
        <div className="input-control">
          <label htmlFor="password">Passowrd</label>
          <div className="input">
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <i className="fas fa-lock"></i>
          </div>
          <ErrorMessage
            className="form__error"
            component="span"
            name="password"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <button className="btn pushUpBtn" type="submit">
            Login
          </button>
        )}
        {error && <p>{error}</p>}
      </Form>
    </Formik>
  );
};

export default Register;
