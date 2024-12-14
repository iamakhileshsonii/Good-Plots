import React from "react";
import defaultProperty from "../../assets/images/DefaultProperty.jpg";
import { Link } from "react-router-dom";
import Like from "../../pages/dashboard/exploreListing/fields/Like";
import Shortlist from "../../pages/dashboard/exploreListing/fields/Shortlist";
import Message from "../../pages/dashboard/exploreListing/fields/Message";
import ScheduleAppointment from "../../pages/dashboard/exploreListing/fields/ScheduleAppointment";
import Call from "../../pages/dashboard/exploreListing/fields/Call";
import useExcerpt from "../../hooks/useExcerpt";
import useFormatPrice from "../../hooks/useFormatPrice";
import { deleteProperty } from "../../services/propertyApi";

const PropertyCard = ({
  title,
  description,
  saleType,
  propertySubtype,
  totalArea,
  property,
  propertyId,
  expectedPrice,
  featuredImage,
}) => {
  const excerpt = useExcerpt(description);
  const price = useFormatPrice(expectedPrice);

  return (
    <div className="block shadow-lg border border-black-light sm:w-1/4 m-3 p-3 rounded-xl relative">
      {/* Wrap only the clickable content for navigation */}
      <Link to={`/property/${propertyId}`}>
        <div className="grid h-36">
          <img
            src={featuredImage || defaultProperty}
            alt={`${title}-featured-image`}
            className="rounded-md object-cover h-36 w-full"
          />
        </div>

        <div className="grid">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-md py-2 w-2/3">{title}</h4>
            <span className="text-red font-semibold text-sm">₹{price}</span>
          </div>
          <p className="text-sm text-black mb-10">{excerpt}</p>
        </div>
      </Link>

      {/* Keep interactive elements outside of the Link */}
      <div className="flex gap-4 absolute bottom-4 left-2">
        <Like feedId={propertyId} />
        <Shortlist feedId={propertyId} />
        <Call feedId={propertyId} />
        <Message feedId={propertyId} />
        <ScheduleAppointment
          feedId={propertyId}
          feedData={property}
          feed={property}
        />
      </div>
    </div>
  );
};

export default PropertyCard;
