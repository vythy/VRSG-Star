import React, { useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./MainMenuPage.css";

import useLoginStore from "../../shared/loginStore";

import NavButton from "../ui/NavButton";
import jwt_decode from "jwt-decode";
import { get, post } from "../../utilities";

import MainMenuScene from "../scenes/MainMenuScene";

const MainMenuPage = () => {
  const userId = useLoginStore((state) => state.userId);
  const setUserId = useLoginStore((state) => state.setUserId);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <MainMenuScene/>
      <div className="wrapper">
        <h1 style={{color: "blue"}}>VSRG Star</h1>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        <NavButton destination="/song-select" prompt="Start"/>
        <NavButton destination="/tutorial" prompt="Tutorial"/>
      </div>
    </>
  );
};

export default MainMenuPage;
