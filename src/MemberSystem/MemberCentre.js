import React from "react";
import LogoutBar from "./LogoutBar";
import ChangeAvatar from "./MemberCentre/ChangeAvatar";
import EditProfile from "./MemberCentre/EditProfile";
import ChangePassword from "./MemberCentre/ChangePassword";
import "./MemberCentre/MemberCentre.css";

function MemberCentre() {
  return (
    <div style={{ backgroundColor: "#fffeef" }}>
      <LogoutBar></LogoutBar>

      <div className="user-profile">
        <ChangeAvatar />
        <br></br>
        <hr></hr>
        <EditProfile />
        <br></br>
        <hr></hr>
        <ChangePassword />
      </div>
    </div>
  );
}

export default MemberCentre;
