import React from 'react';
import Navbar from '../components/nav/Navbar'; // Import your Navbar component
import { Outlet } from 'react-router-dom'; // This will render child routes

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        {/* Render the page content inside this layout */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
