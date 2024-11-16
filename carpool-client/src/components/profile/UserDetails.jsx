import React, {useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";


function UserDetails() {
  const { user } = useContext(AuthContext);

  return (
    <div className='w-[100%] pt-10 min-h-screen bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender'>

      <div className='ml-20 h-[60vh] flex flex-col justify-around'>
        <div className='border  w-96 p-2 rounded bg-white/60 text-secondary-purpleDark font-bold text-lg'>
          <h1>Username: {user.name}</h1>
        </div>

        <div className='border  w-96 p-2 rounded bg-white/60 text-secondary-purpleDark font-bold text-lg'>
          <h1>Email: {user.email}</h1>
        </div>

        <div className='border  w-96 p-2 rounded bg-white/60 text-secondary-purpleDark font-bold text-lg'>
          <h1>Mobile: {user.mobile}</h1>
        </div>

        <div className='border  w-96 p-2 rounded bg-white/60 text-secondary-purpleDark font-bold text-lg'>
          <h1>Account No.: {user?.bankDetails?.accountNumber}</h1>
        </div>

        <div className='border  w-96 p-2 rounded bg-white/60 text-secondary-purpleDark font-bold text-lg'>
          <h1>IFSC: {user?.bankDetails?.ifsc}</h1>
        </div>
        
      </div>

    </div>
  )
}

export default UserDetails