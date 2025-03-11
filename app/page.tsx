import Image from "next/image";
import fetchUsers from "./users";
import { UserTypes } from "./utils/Types";
import UserCard from "./components/UserCard";

export default async function  Home() {

  const users : UserTypes[] | null = await fetchUsers();
  console.log("users inn page", users)

  return (
    <div className="m-2 flex flex-col gap-2">
      {
        users && users.length>0 ? <div className="flex flex-col gap-2">
            {
              users.map((user)=><UserCard key={user._id}  user={{
                _id:user._id?.toString(),
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email
              }}/>)
            }
        </div> : <h1>No users to display</h1>
      }
    </div>  
  );
}
