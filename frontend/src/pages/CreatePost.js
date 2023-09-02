import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "../components/Footer";

const modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/post", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRedirect(true);
        return;
      }
    } catch (err) {
      console.error("Try again!", err);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form action="" className="create-post-form" onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <ReactQuill
          value={content}
          modules={modules}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Create it!</button>
      </form>
      <Footer />
    </>
  );
}
