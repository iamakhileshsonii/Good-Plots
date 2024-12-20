import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Phone, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/property.jpg";
import { deleteProperty } from "@/services/propertyApi";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function KycPropertyCard({
  id,
  title,
  price,
  description,
  saleType,
  propertySubtype,
  onDeleteSuccess, // Callback to notify parent
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Handle Property Delete
  const handleDeleteProperty = async (e) => {
    e.preventDefault();

    const res = await deleteProperty(id); // API call to delete the property
    if (res) {
      toast({
        title: `${title} property deleted successfully`,
      });
      setOpen(false); // Close the dialog
      if (onDeleteSuccess) onDeleteSuccess(id); // Notify parent to remove the property
    } else {
      toast({
        title: `Unable to delete ${title} property`,
        variant: "destructive",
      });
      console.error("Error deleting the property");
    }
  };

  return (
    <div className="block m-2 sm:m-4">
      <Card className="max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
        {/* Card Image */}
        <div className="relative w-full h-48">
          <img
            src={defaultImage}
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

        {/* Card Content */}
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
          <AlertDialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4 text-red-600" />
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  🏠 Confirm Property Deletion
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected property.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProperty}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Link to={`/account/property-kyc/${id}`}>
            <Button>Comeplete KYC</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
