import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { CiUser } from "react-icons/ci";

function ProfileSidebar({ activeSection, setActiveSection }) {
  return (
    <>
      <div className="min-h-screen w-72 fixed top-16 left-0 p-10 bg-gradient-to-b border-r border-secondary-purpleDark from-neutral-softPink to-neutral-lightLavender caret-transparent">

        <div className={`flex items-center mb-2 justify-start cursor-pointer rounded-lg p-2 hover:bg-secondary-purpleDark hover:text-white ${activeSection == "userdetails"? 'bg-secondary-purpleDark text-white' : ''}`} onClick={() => setActiveSection("userdetails")}>
          <p className="text-lg font-semibold mx-auto">User Details</p>
        </div>

<hr className="border-bottom-2 border-secondary-purpleDark my-5"/>
       

        <div className={`flex items-center mb-2 justify-start cursor-pointer rounded-lg p-2 hover:bg-secondary-purpleDark hover:text-white ${activeSection == "hostedrides"? 'bg-secondary-purpleDark text-white' : ''}`}  onClick={() => setActiveSection("hostedrides")}>
          <p className="text-lg font-semibold mx-auto">Hosted Rides</p>
        </div>

        <hr className="border-bottom-2 border-secondary-purpleDark my-5"/>      

        <div className={`flex items-center mb-2 justify-start cursor-pointer rounded-lg p-2 hover:bg-secondary-purpleDark hover:text-white ${activeSection == "currentrides"? 'bg-secondary-purpleDark text-white' : ''}`}  onClick={() => setActiveSection("currentrides")}>
          <p className="text-lg font-semibold mx-auto">Current Rides</p>
        </div>

        <hr className="border-bottom-2 border-secondary-purpleDark my-5"/>


        <div className={`flex items-center mb-2 justify-start cursor-pointer rounded-lg p-2 hover:bg-secondary-purpleDark hover:text-white ${activeSection == "ridehistory"? 'bg-secondary-purpleDark text-white' : ''}`}  onClick={() => setActiveSection("ridehistory")}>
          <p className="text-lg font-semibold mx-auto">Ride History</p>
        </div>

        <hr className="border-bottom-2 border-secondary-purpleDark my-5"/>


        <div className={`flex items-center mb-2 justify-start cursor-pointer rounded-lg p-2 hover:bg-secondary-purpleDark hover:text-white ${activeSection == "paymentinfo"? 'bg-secondary-purpleDark text-white' : ''}`}  onClick={() => setActiveSection("paymentinfo")}>
          <p className="text-lg font-semibold mx-auto">Payment Info</p>
        </div>


        <hr className="border-bottom-2 border-secondary-purpleDark my-5"/>

      </div>
    </>
  );
}

export default ProfileSidebar;

<Sidebar className=" mt-[68px] border-l border-secondary-purpleDark">
  <SidebarContent
    className="text-white/80 p-5 bg-gradient-to-b text-contrast-darkBlue from-neutral-softPink to-neutral-lightLavender
"
  >
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="text-center ml-5 mb-5 cursor-pointer"
          asChild
        >
          <div className="flex items-center justify-start pl-5 -translate-x-5">
            {/* <span className="mr-2"><CiUser/></span> */}
            <p className="text-lg font-semibold ">User Details</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          className="text-center  ml-5 mb-5 cursor-pointer"
          asChild
        >
          <div className="flex items-center justify-start pl-5 -translate-x-5">
            {/* <span className="mr-2">X</span> */}
            <p className="text-lg font-semibold ">Hosted Rides</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          className="text-center ml-5 mb-5 cursor-pointer"
          asChild
        >
          <div className="flex items-center justify-start pl-5 -translate-x-5">
            {/* <span className="mr-2">X</span> */}
            <p className="text-lg font-semibold ">Current Rides</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          className="text-center  ml-5 mb-5 cursor-pointer"
          asChild
        >
          <div className="flex items-center justify-start pl-5 -translate-x-5">
            {/* <span className="mr-2">X</span> */}
            <p className="text-lg font-semibold ">Ride History</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          className="text-center  ml-5 mb-5 cursor-pointer"
          asChild
        >
          <div className="flex items-center justify-start pl-5 -translate-x-5">
            {/* <span className="mr-2">X</span> */}
            <p className="text-lg font-semibold ">Payment Info</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarContent>
</Sidebar>;
