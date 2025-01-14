import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SinglePropertyQuickInfo = ({ property }) => {
  const { propertySubtype, saleType, price, propertyFacing, amenities } =
    property || {};
  return (
    <div className="mt-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-left text-xl font-semibold">
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm text-black dark:text-white">
            {/* Subtype */}
            <li className="text-left">
              <strong>Subtype:</strong> {propertySubtype || "N/A"}
            </li>

            {/* Sale Type */}
            <li className="text-left">
              <strong>Sale Type:</strong> {saleType || "N/A"}
            </li>

            {/* Price */}
            <li className="text-left">
              <strong>Price:</strong>{" "}
              {price ? `$${price}` : "Contact for price"}
            </li>

            {/* Property Facing */}
            <li className="text-left">
              <strong>Facing:</strong> {propertyFacing || "N/A"}
            </li>

            {/* Amenities */}
            <li className="text-left">
              <strong>Amenities:</strong>{" "}
              {amenities?.length > 0 ? amenities.join(", ") : "Not Available"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SinglePropertyQuickInfo;
