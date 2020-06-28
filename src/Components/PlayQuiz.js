import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";

class PlayQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: {
        question: ' ',
        incorrect_answers: ' ',
      },
      questionNumber: 0,
      position: 1,
      score: 0,
      showFinalScore: false,

    }
  }

  componentDidMount() {
    console.log('mounted')
    let firstQuestion = this.props.quiz[0];
    this.setState({
      currentQuestion: firstQuestion,
    })
    this.setCorrectPosition();
  }

  com

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

  correct = () => {
    let newScore = this.state.score
    newScore++
    this.setState({
      score: newScore
    })
    this.handleClick()
  }


  setCorrectPosition = () => {
    let correctPosition = Math.floor((Math.random() * 4) + 1);
    this.setState({ 
      position: correctPosition
    })
  }

  render() {

    return (

      <div>
        { this.state.showFinalScore ? <ShowFinalScore quiz={this.props.quiz} score={this.state.score}/> : null }
        <h2>{this.state.currentQuestion.question}</h2>

        {this.state.position == 1 ? <button onClick={this.correct}>{this.state.currentQuestion.correct_answer}</button> : null}
        <button onClick={this.handleClick}>{this.state.currentQuestion.incorrect_answers[0]}</button>

        {this.state.position == 2 ? <button onClick={this.correct}>{this.state.currentQuestion.correct_answer}</button> : null}
        <button onClick={this.handleClick}>{this.state.currentQuestion.incorrect_answers[1]}</button>

        {this.state.position == 3 ? <button onClick={this.correct}>{this.state.currentQuestion.correct_answer}</button> : null}
        <button onClick={this.handleClick}>{this.state.currentQuestion.incorrect_answers[2]}</button>

        {this.state.position == 4 ? <button onClick={this.correct}>{this.state.currentQuestion.correct_answer}</button> : null}
      </div>
    )
  }
}

export default PlayQuiz
