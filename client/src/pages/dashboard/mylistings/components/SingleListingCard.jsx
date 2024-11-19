import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useExcerpt from "../../../../hooks/useExcerpt.js";
import useShortTitle from "../../../../hooks/useExcerpt.js";
import defaultPropertyImg from "../../../../assets/images/property.jpg";

const SingleListingCard = ({ listing }) => {
  const [kycStatus, setKycStatus] = useState(null);
  const title = useShortTitle(listing?.title);
  const excerpt = useExcerpt(listing?.description);

  useEffect(() => {
    if (listing?.kyc === "pending") {
      setKycStatus("pending");
    } else if (listing?.kyc === "completed") {
      setKycStatus("completed");
    } else {
      setKycStatus(null);
    }
  }, [listing]);

  const propertyUrl =
    kycStatus === "pending"
      ? `/dashboard/property-kyc/${listing._id}`
      : `/property/${listing._id}`;

  return (
    <Link
      to={propertyUrl}
      className="block shadow-lg border border-black-light sm:w-1/3 w-full md:w-1/3 lg:w-1/4 p-2 rounded-xl"
    >
      <div className="relative">
        <div className="grid">
          <div className="block h-36 justify-center">
            <img
              src={
                listing?.kycData?.[0]?.photos?.siteView || defaultPropertyImg
              }
              alt=""
              className="rounded-md object-cover h-36 w-full"
            />
          </div>
          <h2 className="font-bold text-base pt-2">{title}</h2>
          {/* <p className="text-sm text-black-default">{excerpt}</p> */}
        </div>

        <div className="flex flex-wrap gap-3 my-2">
          <p
            className={`p-1 text-xs rounded-md font-semibold absolute right-0 top-0 ${
              kycStatus === "completed"
                ? "bg-green-500 text-white"
                : "bg-orange text-white"
            }`}
          >
            {listing?.kyc}
          </p>
          <p className="p-1 text-xs rounded-md bg-cardbg">
            {listing?.propertySubtype}
          </p>
          <p className="p-1 text-xs rounded-md bg-cardbg">
            Sq.Ft {listing?.totalArea}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to={propertyUrl}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:outline-none mt-2 ${
              kycStatus === "pending" ? "text-red" : "text-black-dark"
            }`}
          >
            {kycStatus === "pending" ? "Complete KYC" : "View Property"}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default SingleListingCard;
