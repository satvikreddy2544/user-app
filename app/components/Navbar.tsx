
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='p-2 bg-gray-200 rounded cursor-pointer'>
      <div className='flex justify-between'>
        <Link href={"/"}><h1 className='font-bold text-xl'>Users</h1></Link>
       <Link href={"/add-user"}> <button className='border border-black rounded bg-green-300 p-1 font-semibold'>Add users+</button> </Link>
      </div>
    </div>
  )
}

export default Navbar
