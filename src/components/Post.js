import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post container">
      <Link to={`/post/${_id}`}>
        <img src={"http://localhost:4000/" + cover} alt="" />
      </Link>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          {author.username} <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary.slice(0, 30)}</p>
      </div>
    </div>
  );
}
