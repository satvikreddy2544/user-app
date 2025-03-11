"use client";
import React, { useState } from "react";
import { UserTypes } from "../utils/Types";
import { Card, CardContent } from "@/components/ui/card";
import { deleteUser, updateUser } from "../users";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const UserCard = ({ user }: { user: UserTypes }) => {
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setLastName] = useState(user.lastName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [open, setOpen] = useState(false);
  const handleUpdate = async () => {
    if (
      !newFirstName ||
      newFirstName == "" ||
      !newLastName ||
      newLastName == "" ||
      !newEmail ||
      newEmail == ""
    ) {
      toast("user fields cannot be empty");
      return null;
    }
    const res = await updateUser({
        _id:user._id,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    });

    if (res) {
      setOpen(false);

      toast("user updated succesfully");
    } else {
      toast("Something went wrong ! please try again");
    }
  };

  const handleDelete = async()=>{


    const res = await deleteUser(user._id || "");
    if(res){
        
        toast("user deleted successfully!")
    }else{

        toast("something went wrong while deleting user!")
    }
  }
  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1.5 text-lg font-semibold capitalize">
              {!open ? (
                <div>
                  <h1>{user.firstName + user.lastName}</h1>
                  <h1>{user.email}</h1>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="FirstName">First Name</label>
                    <Input
                      placeholder=""
                      className=""
                      name="firstName"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="LastName">Last Name</label>
                    <Input
                      placeholder="email"
                      name="lastName"
                      value={newLastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="Email">Email</label>
                    <Input
                      placeholder="email"
                      name="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-1">
              {
                !open ? <div className="">
                <button
                  className="border border-black bg-green-400 p-1.5 rounded mr-1"
                  onClick={(e) => setOpen(true)}
                >
                  Update
                </button>
                <button className="border border-black bg-red-400 rounded p-1.5" onClick={handleDelete}>
                  Delete
                </button>
                </div>:
                <div>
                  <button className="border border-black bg-green-500 p-2" onClick={handleUpdate}>Save</button>
                </div>
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCard;
