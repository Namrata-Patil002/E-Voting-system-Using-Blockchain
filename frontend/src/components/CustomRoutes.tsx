import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { AuthContext } from "../contexts/Auth";
import UserPollsPage from "../pages/User/Polls";
import HomePage from "../pages/Admin/Home";
import ProfilePage from "../pages/User/Profile";
import Default from "../layouts/Default";
import AdminUsersPage from "../pages/Admin/Users";
import Spinner from "./Spinner";
import ElectionGuidelines from "../pages/ElectionGuidelines";
import Results from "../pages/Results";
import VerifyOTP from "../pages/VerifyOTP";

export default () => {
  const authContext = useContext(AuthContext);

  const getRoutes = (): JSX.Element => {
    if (authContext.loading)
      return (
        <div className="loading-container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Spinner spinning={true} />
          </div>
        </div>
      );

    if (authContext.authenticated) {
      // if the user is authenticated then

      const adminMenu = [
        { name: "Home", link: "/" },
        { name: "Verify Users", link: "/users" },
        { name: "Profile", link: "/profile" },
      ];

      const userMenu = [
        { name: "Polls", link: "/" },
        { name: "Profile", link: "/profile" },
      ];

      if (authContext.isAdmin) {
        // if the user is admin
        return (
          <Default menu={adminMenu}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Default>
        );
      } else {
        //  if the user in not admin
        return (
          <Default menu={userMenu}>
            <Routes>
              <Route path="/" element={<UserPollsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Default>
        );
      }
    } else {
      // if the user is not authenticated
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<Results />} />
          <Route path="/votingGuidelines" element={<ElectionGuidelines />} />          
          <Route path="/verifyOTP/:email/" element={<VerifyOTP />} />
        </Routes>
      );
    }
  };

  return getRoutes();
};
