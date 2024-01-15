import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Quiz.css";
import questions from "../resources/questions.json";

export default class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currQuestion: {},
      nextQuestion: {},
      prevQuestion: {},
      currQuestionIndex: 0,

      score: 0,
      correctAns: 0,
      wrongAns: 0,
      answeredQues: 0,
      answer: "",
    };
  }

  componentDidMount() {
    this.showQuestion(
      this.state.questions,
      this.state.currQuestion,
      this.state.nextQuestion,
      this.state.prevQuestion
    );
  }

  showQuestion = (
    questions = this.state.questions,
    currQuestion,
    nextQuestion,
    prevQuestion
  ) => {
    let { currQuestionIndex } = this.state;
    if (this.state.questions.length !== 0) {
      questions = this.state.questions;
      currQuestion = questions[currQuestionIndex];
      nextQuestion = questions[currQuestionIndex + 1];
      prevQuestion = questions[currQuestionIndex - 1];

      const answer = currQuestion.answer;

      this.setState({
        currQuestion,
        nextQuestion,
        prevQuestion,
        answer,
      });
    }
  };

  handleNextBtn = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currQuestionIndex: prevState.currQuestionIndex + 1,
        }),
        () => {
          this.showQuestion(
            this.state.state,
            this.state.currQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    }
  };

  handlePrevBtn = () => {
    if (this.state.prevQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currQuestionIndex: prevState.currQuestionIndex - 1,
        }),
        () => {
          this.showQuestion(
            this.state.state,
            this.state.currQuestion,
            this.state.nextQuestion,
            this.state.prevQuestion
          );
        }
      );
    }
  };

  handleQuitBtn = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.reload(false);
    }
  };

  correctAnswer = () => {
    this.setState(
      (prevstate) => ({
        score: prevstate.score + 1,
        correctAns: prevstate.correctAns + 1,
        currQuestionIndex: prevstate.currQuestionIndex + 1,
        answeredQues: prevstate.answeredQues + 1,
      }),
      () => {
        this.showQuestion(
          this.state.questions,
          this.state.currQuestion,
          this.state.nextQuestion,
          this.state.prevQuestion
        );
      }
    );

    alert("Correct Answer!");
  };

  wrongAnswer = () => {
    this.setState(
      (prevstate) => ({
        wrongAns: prevstate.wrongAns + 1,
        currQuestionIndex: prevstate.currQuestionIndex + 1,
        answeredQues: prevstate.answeredQues + 1,
      }),
      () => {
        this.showQuestion(
          this.state.questions,
          this.state.currQuestion,
          this.state.nextQuestion,
          this.state.prevQuestion
        );
      }
    );

    alert("Wrong Answer :(");
  };

  handleOptions = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  render() {
    console.log(this.state.correctAns);
    const { currQuestion } = this.state;
    return (
      <div className="main">
        <h2>Questions</h2>

        <div>
          <span>
            {this.state.currQuestionIndex + 1} of {this.state.questions.length}
          </span>
          <h4>{currQuestion.question}</h4>
        </div>

        <div className="options">
          <p onClick={this.handleOptions} className="option">
            {currQuestion.optionB}
          </p>
          <p onClick={this.handleOptions} className="option">
            {currQuestion.optionA}
          </p>
        </div>

        <div className="options">
          <p onClick={this.handleOptions} className="option">
            {currQuestion.optionC}
          </p>
          <p onClick={this.handleOptions} className="option">
            {currQuestion.optionD}
          </p>
        </div>

        <div className="btns">
          <button className="button prev" onClick={this.handlePrevBtn}>
            Previous
          </button>
          <button className="button next" onClick={this.handleNextBtn}>
            Next
          </button>
          <button className="button quit" onClick={this.handleQuitBtn}>
            Quit
          </button>
          <Link
            to="/result"
            state={{
              answeredQuestions: this.state.answeredQues,
              score: this.state.score,
              correctAnswer: this.state.correctAns,
              totalQuestions: this.state.questions.length,
              wrongAnswer: this.state.wrongAns,
            }}
          >
            <button>Finish</button>
          </Link>
        </div>
      </div>
    );
  }
}
