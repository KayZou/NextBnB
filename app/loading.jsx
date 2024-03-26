import React from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loading = ({loading}) => {
  return (
    <ClipLoader
      color="#36d7b7"
      loading = {loading}
      size={150}
      aria-label="Loading Spinner"
      cssOverride={override}
    />
  );
};

export default Loading;
