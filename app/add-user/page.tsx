"use client"
import { useState } from "react";
import fetchUsers, { addUser } from "../users"
import { UserTypes } from "../utils/Types"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

 export default  function User(){

      const [firstName , setFirstName] = useState("");
      const [lastName,setLastName] = useState("");
      const [email,setEmail] =  useState("");

    const handleOnsubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      
     

      if(!firstName || firstName == "" || !lastName || lastName=="" || !email || email == ""){
         
         toast("Please check user details and try again!...")
         return null;
      }
      const userData = {
         firstName,
         lastName,
         email
      }
      const res = await addUser(userData);
      
      if(res){
         setFirstName("")
         setLastName("")
         setEmail("")
         toast("user added succesfully!")
      }else{
         toast("Something went wrong while adding user ! please try again")
      }
    }

    return <div className="m-2">

      <Card className="">
      <CardTitle className="flex justify-center text-xl font-semibold">
         Add user
      </CardTitle>
      <CardContent>
            <form onSubmit={handleOnsubmit} className="flex flex-col gap-2 ">
               
              <div className="flex flex-col">
                  <label htmlFor="FirstName">First Name</label>
                  <Input placeholder="" className="" name="firstName" 
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}/>
              </div>
              <div>
               <label htmlFor="LastName">Last Name</label>
               <Input placeholder="email" name="lastName"
               value={lastName}
               onChange={(e)=>setLastName(e.target.value)}/>
              </div>
              <div>
               <label htmlFor="Email">Email</label>
               <Input placeholder="email" name="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <button type="submit" className="border border-black p-2  w-[20%] rounded ">Submit</button>

            </form>
      </CardContent>
      <CardFooter className="flex justify-center">
      </CardFooter>
      </Card>

    </div>
 }