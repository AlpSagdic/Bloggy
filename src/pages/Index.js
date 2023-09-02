import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import Footer from "../components/Footer";
import axios from "axios";

export default function Index() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/post", { withCredentials: true })
      .then((response) => {
        const posts = response.data;
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, []);
  return (
    <>
      <Header name={"Bloggy"} target={"Start Here!"} />
      <div className="posts container">
        <h2 className="secondary-heading">Daily Blog</h2>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} {...post} />)}
      </div>
      <Footer />
    </>
  );
}
