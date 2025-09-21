import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/features/Posts/PostsThunk";

const PostCreate = () => {
  const [post, setPost] = useState({ title: "", body: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");

    dispatch(createPost({ title, body }));
  };
  return (
    <div className="w-[80vw] bg-gray-200 mx-auto p-[2rem] rounded-xl">
      <h3 className="text-center text-3xl underline mb-[1.2rem]">
        Create Post
      </h3>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title here ..."
          className="border-2 border-gray-400 p-2"
          required
        />
        <textarea
          name="body"
          id="body"
          placeholder="Enter body content here ..."
          className="border-2  border-gray-400 p-2"
          required
        />
        <button className="border-2 rounded-m w-[fit-content] px-[1rem] py-[0.5rem] mx-auto hover:bg-gray-300 hover:cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
