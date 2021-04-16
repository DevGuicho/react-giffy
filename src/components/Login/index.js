import React, { useContext, useEffect } from "react";
import UserContext from "context/user/userContext";
import Spinner from "components/Spinner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginSchema from "utils/schema/LoginSchema";

import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = ({ handleClose }) => {
  const history = useHistory();

  const { isLoading, login, isLogged } = useContext(UserContext);

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isLogged) history.push("/");
  }, [isLogged, history]);

  const handleSubmit = ({ email, password }) => {
    login({ email, password }).then((res) => {
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
      </Form>
    </Formik>
  );
};

export default Login;
