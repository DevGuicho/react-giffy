import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import UserContext from "context/user/userContext";
import Spinner from "components/Spinner";
import "./styles.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [, navigate] = useLocation();

  const { login, isLogged, loading } = useContext(UserContext);

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: form.email, password: form.password });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleChange}
      />
      {loading ? <Spinner /> : <button type="submit">Login</button>}
    </form>
  );
};

export default Login;
