import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";

class PlayQuiz extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: {
        question: ' ',
        incorrect_answers: ' ',
      },
      questionNumber: 0,
      correctPosition: 1,
      score: 7,
      showFinalScore: false,
    }
  }

  componentDidMount() {
    let firstQuestion = this.props.quiz[0];
    this.setState({
      currentQuestion: firstQuestion,
    })
    this.setCorrectPosition();
    console.log(this.state.currentQuestion);
  }

  handleClick = () => {
    let questionNumber = this.state.questionNumber
    questionNumber++;
    
    if (questionNumber < this.props.quiz.length ) {
      this.setCorrectPosition();
      console.log(this.state.currentQuestion);
      this.setState({
        questionNumber,
        currentQuestion: this.props.quiz[questionNumber]
      })
    } else {
      console.log("end");
      
      this.setState({
        showFinalScore: true
      })
      
      
    }
  }

  setCorrectPosition = () => {
    let correctPosition = Math.floor((Math.random() * 4) + 1);
    this.setState({ correctPosition })
  }

  render() {

    let positionOne;
    let positionTwo;
    let positionThree;
    let positionFour;
    if (this.state.correctPosition === 1) {
      positionOne = <p>{this.state.currentQuestion.correct_answer}</p>
    } else if (this.state.correctPosition === 2) {
      positionTwo = <p>{this.state.currentQuestion.correct_answer}</p>
    } else if (this.state.correctPosition === 3) {
      positionThree = <p>{this.state.currentQuestion.correct_answer}</p>
    } else if (this.state.correctPosition === 4) {
      positionFour = <p>{this.state.currentQuestion.correct_answer}</p>
    }
    return (

      <div>
        { this.state.showFinalScore ? <ShowFinalScore quiz={this.props.quiz} score={this.state.score}/> : null }
        <h2>{this.state.currentQuestion.question}</h2>
        {positionOne}
        <button onClick={this.handleClick}>{this.state.currentQuestion.incorrect_answers[0]}</button>
        {positionTwo}
        <button>{this.state.currentQuestion.incorrect_answers[1]}</button>
        {positionThree}
        <button onClick={this.handleClick}>{this.state.currentQuestion.incorrect_answers[2]}</button>
        {positionFour}
      </div>
    )
  }
}

export default PlayQuiz
