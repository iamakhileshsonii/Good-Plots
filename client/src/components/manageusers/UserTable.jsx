import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { fetchAllUsers } from "@/services/manageUser";
import defaultAvatar from "@/assets/property.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AssignPincode from "./AssignPincode";
import Profile from "./Profile";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const fetchUsers = async () => {
    const res = await fetchAllUsers();
    if (res) setUsers(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-left">Full Name</TableHead>
            <TableHead className="w-[200px] text-left">Email</TableHead>
            <TableHead className="w-[200px] text-left">Role</TableHead>
            <TableHead className="w-[200px] text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium text-left">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.avatar || defaultAvatar}
                    alt={`${user?.fullname}-Avatar`}
                    className="rounded-full size-8"
                  />
                  <p className="max-w-[150px] truncate">{user?.fullname}</p>
                </div>
              </TableCell>
              <TableCell className="text-left">{user?.email}</TableCell>
              <TableCell className="text-left">{user?.role}</TableCell>
              <TableCell className="relative flex justify-start gap-4">
                <Button
                  className="bg-black"
                  onClick={() => handleEditDropdown(user?._id)}
                >
                  <i className="fa-solid fa-pencil"></i> Edit
                </Button>

                {openDropdownId === user?._id && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-20 top-4 z-50 shadow-lg border-none rounded-md bg-black"
                  >
                    <ul className="text-white p-2 border-none text-left">
                      {user?.role === "Broker" || user?.role === "Lawyer" ? (
                        <li className="p-2 cursor-pointer hover:bg-primary">
                          <AssignPincode
                            userId={user?._id}
                            fullname={user?.fullname}
                            role={user?.role}
                          />
                        </li>
                      ) : (
                        ""
                      )}
                      <li className="p-2 cursor-pointer hover:bg-primary">
                        <Profile
                          id={user?._id}
                          fullname={user?.fullname}
                          email={user?.email}
                          phone={user?.phone}
                          avatar={user?.avatar}
                          role={user?.role}
                          joinedOn={user?.createdAt}
                        />
                      </li>
                    </ul>
                  </div>
                )}

                {/* Delete User */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button>
                      <i className="fa-solid fa-trash"></i> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the user from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex gap-2 py-5 px-2">
        <p>
          Total Users: <span className="font-semibold">{users.length}</span>
        </p>
      </div>
    </div>
  );
}

export default UserTable;
