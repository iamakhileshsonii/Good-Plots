import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/property.jpg";

export default function PropertyCard({
  id,
  imageUrl,
  title,
  price,
  description,
  saleType,
  propertySubtype,
  featuredImage,
}) {
  return (
    <Link to={`/property/${id}`} className="block">
      <Card className="max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
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
          <p className="text-sm text-muted-foreground">{propertySubtype}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {description.slice(0, 100)}...
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              console.log("Like clicked");
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              console.log("Bookmark clicked");
            }}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              console.log("Call clicked");
            }}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
