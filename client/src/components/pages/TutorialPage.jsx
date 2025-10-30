import React, { useEffect } from "react"
import NavButton from "../ui/NavButton";


const TutorialPage = () => {
  return (
      <div style={{position: "absolute", top: 0, left: 0}}>
        <h1>Tutorial</h1>
        <p style={{color: "blue"}}>Use the (d, f, j, k) keys to activate the lanes from left to right. 
          Once a note reaches the yellow timing bar, activate the corresponding lane.
          If a note flashes purple then it was succesfully hit and you get 300 points added to your total score. If it flashes red, your timing was off
          and you get no points. If you leave a map in the middle you will not gain any points.
        </p>
        <NavButton destination="/" prompt="back"/>
      </div>
    );
}

export default TutorialPage;