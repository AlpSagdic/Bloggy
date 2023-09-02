import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setRedirect(true);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error("Registration delayed!", err);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Header name={"Register"} target={"Turn Back"} />
      <form className="register-form" onSubmit={register}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
      <Footer />
    </>
  );
}
