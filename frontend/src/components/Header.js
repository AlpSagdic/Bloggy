import React, { useContext } from "react";
import Video from "../img/background.mp4";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Header(props) {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(userInfo);
        } else {
          console.log("Sunucudan veri alınamadı.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUserInfo, userInfo]);

  const username = userInfo?.username;
  return (
    <header className="hero">
      <video
        src={Video}
        className="background-video"
        autoPlay
        loop
        muted
      ></video>
      <Navbar username={username} />
      <div className="content">
        <h1>{props.name}</h1>
        <Link
          to="/"
          className="main-nav-link-cta"
          style={{ marginLeft: "20px" }}
        >
          {props.target}
        </Link>
      </div>
    </header>
  );
}
