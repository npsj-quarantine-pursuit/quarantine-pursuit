import React, { Component } from 'react';

class PlayQuiz extends Component {
  constructor() {
    super() 
    this.state = {
      currentQuestion: {
        question: '',
      },
      questionNumber: 0,
    }
  }

  componentDidMount() {
    this.setState({
      currentQuestion: this.props.quiz[0],
    })
  }

  render() {

    return (
      <div>
        <h2>{this.state.currentQuestion.question}</h2>
      </div>
    )
  }
}

export default PlayQuiz
