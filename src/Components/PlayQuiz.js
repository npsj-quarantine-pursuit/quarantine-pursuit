import React, { Component } from 'react';

class PlayQuiz extends Component {
  constructor() {
    super()
    this.state = {
      currentQuestion: {
        question: ' ',
      },
      questionNumber: 0,
      correctPosition: 1,
    }
  }

  componentDidMount() {
    let firstQuestion = this.props.quiz[0];
    this.setState({
      currentQuestion: firstQuestion,
    })
    console.log(this.props.quiz[0])
  }

  setCorrectPosition = () => {
    let correctPosition = Math.floor((Math.random() * 4) + 1);
    this.setState({ correctPosition })
  }

  render() {

    return (
      <div>
        <h2>{this.state.currentQuestion.question}</h2>
        <p>{this.state.currentQuestion.incorrect_answers[0]}</p>
        <p>{this.state.currentQuestion.incorrect_answers[1]}</p>
        <p>{this.state.currentQuestion.incorrect_answers[2]}</p>

      </div>
    )
  }
}

export default PlayQuiz
