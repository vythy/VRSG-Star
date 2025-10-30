import React, { useEffect, useState } from "react";

import "../utilities.css";

import useLoginStore from "../shared/loginStore";
import { get } from "../utilities";

import MainMenuPage from "./pages/MainMenuPage";
import NotFound from "./pages/NotFound";
import SongSelectPage from "./pages/SongSelectPage";
import TutorialPage from "./pages/TutorialPage"
import GamePage from "./pages/GamePage";

import { Route, Switch } from "wouter"
import { GoogleOAuthProvider } from '@react-oauth/google';

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "163288036889-p2rlmd0mhikpsimr05lmb6jv77glr1sk.apps.googleusercontent.com";

const CanvasStyles = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100vh',
  background: "white"
};

/**
 * Define the "App" component
 */
const App = () => {
  const setUserId = useLoginStore((state) => state.setUserId);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Switch>
        <Route path="/" component={MainMenuPage}/>
        <Route path="/song-select" component={SongSelectPage}/>
        <Route path="/tutorial" component={TutorialPage}/>
        <Route path="/game" component={GamePage}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </GoogleOAuthProvider>
  );
};

export default App;