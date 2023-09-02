import React, { useContext } from "react";
import Logo from "../img/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../UserContext";

export default function Navbar(props) {
  const { setUserInfo } = useContext(UserContext);
  useEffect(() => {}, [props.username]);

  function logout() {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.data === "ok") {
          setUserInfo(null);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <nav className="main-nav">
      <Link to="/">
        <img className="logo" alt="website logo" src={Logo} />
      </Link>
      {props.username && (
        <>
          <ul className="main-nav-list">
            <li>
              <Link to="/create" className="main-nav-link-cta">
                Create new post
              </Link>
            </li>
            <li>
              <Link to="/logout" className="main-nav-link" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </>
      )}
      {!props.username && (
        <>
          <ul className="main-nav-list">
            <li>
              <Link to="/login" className="main-nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="main-nav-link-cta">
                Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}
