import React from "react";
import logo from "../../../../assets/images/property.jpg";
import Like from "../fields/Like";
import Shortlist from "../fields/Shortlist";
import Message from "../fields/Message";
import ScheduleAppointment from "../fields/ScheduleAppointment";
import useShortTitle from "../../../../hooks/useShortTitle";
import useExcerpt from "../../../../hooks/useExcerpt";
import Call from "../fields/Call";
import { Link } from "react-router-dom";

const ListCard = ({ feed }) => {
  return (
    <div className="block w-full">
      <div className="flex gap-3 w-full shadow-lg border border-black-light  p-3 rounded-xl">
        <Link to={`/property/${feed?._id}`}>
          <div className="block h-36 max-w-60">
            <img
              src={feed?.propertyDetails[0]?.photos.siteView}
              alt=""
              className="rounded-md object-cover h-36 w-full"
            />
          </div>
        </Link>

        <div className="block">
          <Link to={`/property/${feed?._id}`}>
            <h2 className="font-bold text-lg py-2">
              {useShortTitle(feed?.title)}
            </h2>
          </Link>
          <p className="text-sm text-black-default">
            {useExcerpt(feed?.description)}
          </p>
          <div className="flex gap-4 mt-5">
            <Like feedId={feed._id} />
            <Shortlist feedId={feed._id} /> <Call feedId={feed._id} />
            <Message feedId={feed._id} feed={feed} />{" "}
            <ScheduleAppointment
              feedId={feed._id}
              feedData={feed}
              feed={feed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
