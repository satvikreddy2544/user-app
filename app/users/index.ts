"use server"

import connectToDb from "@/databse";
import { UserTypes } from "../utils/Types";
import User from "../models/user";
import { revalidatePath } from "next/cache";


export default async function fetchUsers(): Promise<UserTypes[] | null>{

        try{

            connectToDb();

            const user = await User.find();
            return user as UserTypes[]
            
        }catch(e){

            console.log("error occured while fetching data....")
            return null;
        }
}

export async function addUser(userData : UserTypes){


    try{

        await connectToDb();
        const res = await User.create({
            firstName: userData.firstName,
            lastName:userData.lastName,
            email:userData.email
        })

       if(res) {
        revalidatePath("/")
        return true;
       }
       return false;

    }catch(e){

        console.log("errorn while adding user....")
        return null;
    
    }

}

export async function updateUser(user:UserTypes){
    console.log("user in update" , user)

    try{

        connectToDb();
        
        const res = await User.findOneAndUpdate(
            {
                _id:user._id || "",
               
            },
            {
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email
            }
        )

        if(res){

            revalidatePath("/")
            return true
        }else{
            return false;
        }
    }catch(e:unknown){
        if(e instanceof Error)
        console.log("error occured while updated user", e.message)
    }

    

}

export async function deleteUser(id:string){

    try{
        connectToDb();

        const res = await User.findByIdAndDelete({
            _id:id
        })
        
        if(res){
            revalidatePath("/")
            return true
        }else return false
    }catch(e){

        console.log("error occured while deleting user")
    }
}