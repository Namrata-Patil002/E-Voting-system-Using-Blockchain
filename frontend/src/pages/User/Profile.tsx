import React, { useContext } from "react";
import { RouteProps } from "react-router";
import { AuthContext } from "../../contexts/Auth";

const Profile = (props: RouteProps) => {
  const { logout, citizenshipNumber, email, name } = useContext(AuthContext);

  return (
    <div className="profile-wrapper">
      <div className="left-panel">
        <div className="person-icon">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="text-normal username">{name}</div>
        <button onClick={logout} className="button-primary">
          Logout
        </button>
      </div>

      <div className="right-panel">
        <span className="title-small">Profile</span>
        <div className="text-normal user-details">
          <div className="user-details-item">
            <span className="user-details-property"> Email: </span>
            {email}
          </div>
          <div className="user-details-item">
            <span className="user-details-property"> Citizenship number:</span>{" "}
            {citizenshipNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
