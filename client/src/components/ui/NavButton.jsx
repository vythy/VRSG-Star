import React from "react";

import "../../utilities.css";

import { Link } from "wouter";

const NavButton = ({ destination, prompt, callback=()=>{}}) => {
  return (
    <Link to={destination}>
      <button onClick={callback}>{prompt}</button>
    </Link>
  )
} 

export default NavButton