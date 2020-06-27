import React, { Component } from 'react';

class PlayQuiz extends Component {
  constructor() {
    super() 
    this.state = {
      currentQuestion: {},
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
        
      </div>
    )
  }
}

export default PlayQuiz
