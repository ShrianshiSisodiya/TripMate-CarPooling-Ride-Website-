import React, {useEffect, useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Logout() {

    const { setUser } = useContext(AuthContext);

    const logoutUser = async() => {
        try {

            const response = await axios.get("http://localhost:8000/api/v1/users/logoutuser", {
                withCredentials: true, // Important to include credentials
              });

              if(response.data.success){
                setUser("")
                console.log("Log Out success");
                
              }
            
        } catch (error) {
            
        }
    }


  return (
    <button onClick={logoutUser} className="mr-4  text-secondary-purpleDark/90 text-lg font-semibold">Logout</button>
  )
}

export default Logout