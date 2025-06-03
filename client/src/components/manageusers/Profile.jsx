import defaultAvatar from "@/assets/property.jpg";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { formatDate } from "date-fns";

function Profile({ id, avatar, fullname, email, phone, role, joinedOn }) {
  const joinedDate = formatDate(joinedOn, "dd-MM-yyyy");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left">
        <i className="fa-solid fa-user"></i> Profile
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-between flex-row items-center">
          <AlertDialogTitle className="font-normal w-[70%]">
            Viewing{" "}
            <span className="font-semibold capitalize underline underline-offset-2 decoration-2 decoration-primary">
              {fullname}'s
            </span>{" "}
            profile
          </AlertDialogTitle>

          <AlertDialogCancel className="shadow-none w-[20%] border-none bg-white">
            <i class="fa-solid fa-xmark text-primary"></i>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <div>
          <div className="flex gap-4  rounded-md">
            <div className="w-[45%]">
              <img src={avatar || defaultAvatar} alt={fullname} className="" />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <h4 className="text-xl text-black font-semibold  text-left">
                {fullname}
              </h4>
              <span className=" text-sm font-regular text-left text-blackrounded-full">
                {role}
              </span>

              <div className="flex gap-4">
                <a
                  href={`tel:${phone}`}
                  className="bg-green-800 text-white rounded-md px-2 py-1"
                >
                  <i class="fa-solid fa-phone"></i> Call
                </a>
                <a
                  href={`mailto:${email}`}
                  className="bg-black text-white rounded-md px-2 py-1"
                >
                  <i class="fa-solid fa-envelope"></i> Mail
                </a>
              </div>

              <div className="">
                <p>
                  Joined On:{" "}
                  <span className="italic font-semibold">{joinedDate} </span>
                </p>
                <p className="">
                  Goodplots UserId:
                  <span className="italic"> {id} </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Profile;
