import React from "react";
import "../css/Home.css"
import { Link } from "react-router-dom";

export default function HomeComponent(){

  return(
    <div className="home">
      <h2 className="title">Quiz App</h2>
      <Link to="/quiz" className="play-btn">
        <button className="play-btn">Play</button>
      </Link>
    </div>
  )
}