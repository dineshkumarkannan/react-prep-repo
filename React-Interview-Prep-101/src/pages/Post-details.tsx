import React from "react";
import { useParams } from "react-router";

const PostDetails = () => {
  const params = useParams();
  console.log(params);
  return <div>Post Id : {params.id}</div>;
};

export default PostDetails;
