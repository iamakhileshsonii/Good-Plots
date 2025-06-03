import UserTable from "@/components/manageusers/UserTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageUsers = () => {
  return (
    <div className="flex flex-col p-6 justify-evenly gap-10">
      <div className="flex flex-col">
        <h1 className="text-xl text-left font-semibold">User Management</h1>
        <p className="text-left text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
          eveniet.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="buyerseller">Buyer/Seller</SelectItem>
                <SelectItem value="userclient">User/Client</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default ManageUsers;
