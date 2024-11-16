import ProfileSidebar from "@/components/profile/ProfileSidebar";
import React, {useState} from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserDetails from "@/components/profile/UserDetails";
import HostedRides from "@/components/profile/HostedRides";
import CurrentRides from "@/components/profile/CurrentRides";
import RideHistory from "@/components/profile/RideHistory";
import PaymentInfor from "@/components/profile/PaymentInfor";

function Profile() {

    const[activeSection, setActiveSection] = useState("userdetails")

    const handleSectionChange = (section) => setActiveSection(section);

  return (
    
      <div className="min-h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue flex">
        <ProfileSidebar activeSection={activeSection} setActiveSection={handleSectionChange}/>
        <div className="flex-1 min-h-screen ml-72 mt-16">
          {activeSection == "userdetails" && <UserDetails/>}
          {activeSection == "hostedrides" && <HostedRides/>}
          {activeSection == "currentrides" && <CurrentRides/>}
          {activeSection == "ridehistory" && <RideHistory/>}
          {activeSection == "paymentinfo" && <PaymentInfor/>}
        </div>
      </div>
   
  );
}

export default Profile;
