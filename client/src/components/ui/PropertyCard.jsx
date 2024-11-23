import React from "react";
import defaultProperty from "../../assets/images/DefaultProperty.jpg";
import { Link } from "react-router-dom";
import Like from "../../pages/dashboard/exploreListing/fields/Like";
import Shortlist from "../../pages/dashboard/exploreListing/fields/Shortlist";
import Message from "../../pages/dashboard/exploreListing/fields/Message";
import ScheduleAppointment from "../../pages/dashboard/exploreListing/fields/ScheduleAppointment";
import Call from "../../pages/dashboard/exploreListing/fields/Call";

const PropertyCard = ({
  title,
  description,
  saleType,
  propertySubtype,
  totalArea,
  property,
  propertyId,
  expectedPrice,
}) => {
  return (
    <div className="block shadow-lg border border-black-light sm:w-1/5 m-3 p-3 rounded-xl">
      <Link to={`/property/${propertyId}`}>
        <div className="grid h-36">
          <img
            src={defaultProperty}
            alt=""
            className="rounded-md object-cover h-36 w-full"
          />
        </div>

        <div className="grid">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg py-2">{title}</h2>
            <span className="text-red font-semibold">₹{expectedPrice}</span>
          </div>
          <p className="text-sm text-black-default">{description}</p>
          <div className="flex gap-4 mt-5">
            <Like feedId={propertyId} />
            <Shortlist feedId={propertyId} /> <Call feedId={propertyId} />
            <Message feedId={propertyId} />
            <ScheduleAppointment
              feedId={propertyId}
              feedData={property}
              feed={property}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
