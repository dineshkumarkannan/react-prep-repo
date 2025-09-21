import React, { useEffect, useState, useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import axios from "axios";

const PostAndComments = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const rowHeights = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    axios.get("https://dummyjson.com/posts").then((res) => {
      setPosts(res.data.posts || []);
    });
  }, []);

  // Callback to set the height of each row after rendering
  const setRowHeight = (index: number, size: number) => {
    if (rowHeights.current[index] !== size) {
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }
  };

  // Row renderer
  const Row = ({ index, style }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        setRowHeight(index, ref.current.getBoundingClientRect().height);
      }
    }, [index, posts[index]]);

    const post = posts[index];
    return (
      <div
        ref={ref}
        style={{
          ...style, // <-- This is required for react-window to work!
          // Add any additional inline styles if needed
        }}
        className="single-post"
      >
        <h5 className="heading">{post?.title}</h5>
        <p className="body">{post?.body}</p>
      </div>
    );
  };

  // Function to get the height for each row
  const getItemSize = (index: number) => rowHeights.current[index] || 120;

  if (posts.length === 0) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <List
      className="posts-container"
      height={window.innerHeight}
      itemCount={posts.length}
      itemSize={getItemSize}
      width={window.innerWidth}
    >
      {Row}
    </List>
  );
};

export default PostAndComments;
