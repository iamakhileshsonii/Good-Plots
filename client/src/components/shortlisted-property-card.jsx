import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Phone, BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/property.jpg";
import ShortlistProperty from "./shortlist-property";
import { isPropertyShortlisted } from "@/services/propertyApi";
import { useEffect, useState } from "react";

export default function ShortlistedPropertyCard({
  id,
  featuredImage,
  title,
  saleType,
  price,
  propertySubtype,
  description,
}) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  //Check if the property is shortlisted
  const ifPropertyShortlisted = async () => {
    const res = await isPropertyShortlisted(id);
    console.log("PROPERTY SHORTLISTING: ", res);
    if (res === true) {
      setIsShortlisted(true);
    } else {
      setIsShortlisted(false);
    }
  };

  useEffect(() => {
    ifPropertyShortlisted();
  }, []);
  return (
    <Card className="max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/property/${id}`} className="block">
        <div className="relative w-full h-48">
          <img
            src={featuredImage || defaultImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge
            variant={saleType === "rent" ? "secondary" : "destructive"}
            className="absolute top-2 left-2"
          >
            {saleType === "rent" ? "For Rent" : "For Sale"}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{title}</span>
            <span className="text-lg font-bold text-green-600">{price}</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground dark:text-gray-400 text-left">
            {propertySubtype}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-white text-left">
            {description.slice(0, 120)}...
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end">
        <ShortlistProperty
          propertyId={id}
          isShortlisted={isShortlisted}
          setIsShortlisted={setIsShortlisted}
        />
      </CardFooter>
    </Card>
  );
}
