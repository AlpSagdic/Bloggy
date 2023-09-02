import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`)
      .then((response) => {
        const postInfo = response.data;
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [id]);

  if (!postInfo) return "";

  return (
    <>
      <Header name={postInfo.title} target={"Turn Back"} />
      <div className="post-page container">
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>

        <h1>{postInfo.title}</h1>
        <div>by @{postInfo.author.username}</div>

        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        <div className="edit">
          {userInfo.id === postInfo.author._id && (
            <Link to={`/edit/${postInfo._id}`} className="btn btn-edit">
              Edit this post
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
