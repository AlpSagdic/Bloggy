import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function EditPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`)
      .then((response) => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [id]);

  function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }

    axios
      .put(`http://localhost:4000/post`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <form action="" className="create-post-form" onSubmit={updatePost}>
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
      <button style={{ marginTop: "5px" }}>Update Post!</button>
    </form>
  );
}
