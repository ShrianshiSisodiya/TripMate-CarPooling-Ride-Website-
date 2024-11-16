import React from 'react';
import { Outlet } from 'react-router-dom'; // This will render child routes
import AuthNavbar from '../components/nav/AuthNavbar';

const AuthLayout = () => {
  return (
    <main className="container">
      {/* Render the page content (Login/SignUp) inside this layout */}
      <AuthNavbar/>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
