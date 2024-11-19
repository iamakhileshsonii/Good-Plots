import React, { useEffect } from "react";
import "flowbite";
import logo from "../../../../assets/images/property.jpg";
import Like from "../fields/Like";
import Shortlist from "../fields/Shortlist";
import Call from "../fields/Call";
import Message from "../fields/Message";
import ScheduleAppointment from "../fields/ScheduleAppointment";
import useExcerpt from "../../../../hooks/useExcerpt";
import useShortTitle from "../../../../hooks/useShortTitle";
import { Link } from "react-router-dom";

const GridCard = ({ feed }) => {
  useEffect(() => {
    // Initialize Flowbite carousel
    import("flowbite/dist/flowbite");
  }, []);

  return (
    <div className="block shadow-lg border border-black-light sm:w-3/12 p-3 rounded-xl">
      <Link to={`/property/${feed?._id}`}>
        <div className="grid h-36">
          <img
            src={feed.propertyDetails[0].photos.siteView}
            alt=""
            className="rounded-md object-cover h-36 w-full"
          />
        </div>
      </Link>

      <div className="grid">
        <Link to={`/property/${feed?._id}`}>
          <h2 className="font-bold text-lg py-2">
            {useShortTitle(feed.title)}
          </h2>
        </Link>
        <p className="text-sm text-black-default">
          {useExcerpt(feed.description)}
        </p>
        <div className="flex gap-4 mt-5">
          <Like feedId={feed._id} />
          <Shortlist feedId={feed._id} /> <Call feedId={feed._id} />
          <Message feedId={feed._id} />
          <ScheduleAppointment feedId={feed._id} feedData={feed} feed={feed} />
        </div>
      </div>
    </div>
  );
};

export default GridCard;
