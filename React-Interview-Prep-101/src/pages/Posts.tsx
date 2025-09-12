import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Posts = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return (
    <div>
      {loaderData.length > 0 &&
        loaderData.map((post) => {
          return (
            <div className="post" key={post.id}>
              <Link to={`${post.id}`}>
                <h5>{post.title}</h5>
              </Link>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
