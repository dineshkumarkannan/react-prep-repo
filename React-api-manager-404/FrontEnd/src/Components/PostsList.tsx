import React from "react";
import { NavLink } from "react-router-dom";

const PostsList = ({ posts }) => {
  return (
    <div className="w-[80vw] mx-auto mt-6 p-2 bg-blue-50">
      {posts.length > 0 &&
        posts.map((post) => {
          console.log(post);
          return (
            <NavLink to={"/posts/" + post.id} key={post.id}>
              <div className="m-2 bg-amber-50 px-2 py-4 hover:cursor-pointer hover:bg-amber-100">
                <h5 className="text-2xl font-bold">{post?.title}</h5>
                <p className="text-gray-600">{post?.body}</p>
              </div>
            </NavLink>
          );
        })}
    </div>
  );
};

export default PostsList;
