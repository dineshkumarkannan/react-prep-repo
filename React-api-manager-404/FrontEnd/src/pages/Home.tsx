import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/features/Posts/PostsThunk";
import PostsList from "../Components/PostsList";
import PostCreate from "../Components/PostCreate";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch(getPosts());
    }
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-5xl font-bold text-center my-1.5">Posts</h2>
      <PostCreate />
      {posts.length === 0 && (
        <div className="text-gray-500">No post available.</div>
      )}
      {posts.length > 0 && <PostsList posts={posts} />}
    </div>
  );
};

export default Home;
