import React from "react";
import GridCard from "../components/GridCard";

const GridView = ({ feedList }) => {
  if (!Array.isArray(feedList)) {
    return <div>No feeds available</div>;
  }
  return (
    <div className="flex flex-wrap justify-start gap-5">
      {feedList.length === 0 ? (
        <p>No feeds</p>
      ) : (
        feedList.map((feed) => (
          <GridCard key={feed._id} feed={feed} id={feed._id} />
        ))
      )}
    </div>
  );
};

export default GridView;
