import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

//PAGES
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";

//CONTEXT
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import AddRide from "./pages/AddRide.jsx";
import SearchRide from "./pages/SearchRide.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import BookRide from "./pages/BookRide.jsx";
import Profile from "./pages/Profile.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        {/* Wrap the entire app with AuthProvider to provide global authentication state */}
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* PrivateRoute to protect home page */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/addride"
                element={
                  <PrivateRoute>
                    {" "}
                    <AddRide />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/searchride"
                element={
                  <PrivateRoute>
                    {" "}
                    <SearchRide />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    {" "}
                    <Profile />{" "}
                  </PrivateRoute>
                }
              />
              <Route
              path="/book/:id"
              element={
                <PrivateRoute>
                  {" "}
                  <BookRide />{" "}
                </PrivateRoute>
              }
            />
            </Route>

            

            {/* Redirect all unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
