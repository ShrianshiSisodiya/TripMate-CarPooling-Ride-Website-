import React, { useEffect, useState } from 'react'


function ProfileMain({ activeSection, setActiveSection }) {

    

  const renderSection = () => {
    switch(activeSection){
        case "userdetails":
            return <UserDetails/>;

        case "hostedrides":
            return <HostedRides/>;

        case "currentrides":
            return <CurrentRides/>;

        case "ridehistory":
            return <RideHistory/>;

        case "paymentinfo":
            return <PaymentInfor/>;

    }
  }

  useEffect(()=>{
    renderSection()
    console.log(activeSection)
  }, [activeSection])

}

export default ProfileMain