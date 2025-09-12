import React from "react";
import { Outlet } from "react-router-dom";

const PostsLayout = () => {
  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <Outlet />
    </div>
  );
};

export default PostsLayout;
