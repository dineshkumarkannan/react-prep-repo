import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../store/features/Posts/PostsThunk";

const PostDetails = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [post, setPost] = useState({ title: "", body: "" });
  const { posts } = useSelector((state) => state.posts);
  const { id } = useParams();
  const postRef = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = posts.filter((post: any) => post.id == id);
    setPost(getPost[0]);
    postRef.current = {
      post: getPost[0],
    };
  }, [id, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");
    const upateData = { id, title, body };
    try {
      await dispatch(updatePost(upateData)).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post.");
    }
  };

  function handleCancel() {
    setEdit((prev) => !prev);
    setPost((prev: any) => ({ ...postRef.current.post }));
  }

  return (
    <>
      {!edit ? (
        <div className="w-[60vw] mx-auto mt-[5%] bg-amber-50 p-8">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
          <button
            onClick={() => setEdit(true)}
            className="border-2 px-3 py-2 my-2 bg-gray-300 font-bold"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="w-[80vw] bg-gray-200 mx-auto p-[2rem] rounded-xl">
          <h3 className="text-center text-3xl underline mb-[1.2rem]">
            Edit Post
          </h3>
          <form
            className="flex flex-col gap-[1rem]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              name="title"
              id="title"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter title here ..."
              className="border-2 border-gray-400 p-2"
              required
            />
            <textarea
              name="body"
              id="body"
              value={post.body}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Enter body content here ..."
              className="border-2  border-gray-400 p-2"
              required
            />
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleCancel()}
                className="border-2 rounded-m w-[fit-content] px-[1rem] py-[0.5rem] hover:bg-gray-300 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="border-2 rounded-m w-[fit-content] px-[1rem] py-[0.5rem] hover:bg-gray-300 hover:cursor-pointer">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostDetails;
