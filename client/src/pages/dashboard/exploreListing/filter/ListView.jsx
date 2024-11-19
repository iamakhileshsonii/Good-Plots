import React, { useEffect } from "react";
import ListCard from "../components/ListCard";

const ListView = ({ feedList }) => {
  if (!Array.isArray(feedList)) {
    return <div>No feeds available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 px-28">
      {feedList.length === 0 ? (
        <p>No feeds</p>
      ) : (
        feedList.map((feed) => (
          <ListCard key={feed._id} feed={feed} id={feed._id} />
        ))
      )}
    </div>
  );
};

export default ListView;
