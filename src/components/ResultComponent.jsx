import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Result.css";
import { Link } from "react-router-dom";

export default function ResultComponent() {
  const compLocation = useLocation();
  return (
    <div className="result">
      <h1>Result</h1>
      <div className="main-score">
        <h3>You need more practice!</h3>
        <h1 className="score">Your score is {compLocation.state.score}</h1>
        <div className="contain">
          <div className="result-info">
            <h5>Total number of questions</h5>
            <h5>Number of attempted questions</h5>
            <h5>Number of correct answers</h5>
            <h5>Number of wrong answers</h5>
          </div>
          <div className="info">
            <h5>{compLocation.state.totalQuestions}</h5>
            <h5>{compLocation.state.answeredQuestions}</h5>
            <h5>{compLocation.state.correctAnswer}</h5>
            <h5>{compLocation.state.wrongAnswer}</h5>
          </div>
        </div>
      </div>

      <div className="buttons">
        <Link to="/quiz">
          <button className="play-again">Play Again</button>
        </Link>
        <Link to="/">
          <button className="home-btn">Back to home</button>
        </Link>
      </div>
    </div>
  );
}