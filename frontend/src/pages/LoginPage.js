import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { UserContext } from "../UserContext";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        { username: username, password: password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userInfo = response.data;
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error("Login delayed!", err);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Header name={"Login"} target={"Turn Back"} />
      <form className="login-form" onSubmit={login}>
        <h2>Login</h2>
        <hr />
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
        <button>Login</button>
      </form>
      <Footer />
    </>
  );
}
