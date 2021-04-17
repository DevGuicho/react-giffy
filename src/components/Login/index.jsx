import React, { useEffect } from "react";
import Spinner from "components/Spinner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginSchema from "utils/schema/LoginSchema";

import "./Login.css";
import { useHistory } from "react-router-dom";
import useUser from "Hooks/useUser";

const Login = ({ handleClose }) => {
  const history = useHistory();

  const { logIn, isLogged, isLoading, error } = useUser();

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isLogged && !handleClose) history.push("/");
  }, [isLogged, history, handleClose]);

  const handleSubmit = ({ email, password }) => {
    logIn({ email, password }).then(() => {
      if (handleClose) handleClose();
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={LoginSchema}
    >
      <Form className="form">
        <h2>Login to Giffy</h2>
        <div className="input-control">
          <label htmlFor="email">Username</label>
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

export default Login;
