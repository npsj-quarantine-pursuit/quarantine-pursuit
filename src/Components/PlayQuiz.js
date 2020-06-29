import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";

class PlayQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: {
        question: ' ',
        incorrect_answers: [],
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
    let correctPosition = Math.floor(Math.random() * 4);
    this.setState({ 
      position: correctPosition
    })
  }

  render() {
    let incorrectAnswers = this.state.currentQuestion.incorrect_answers;
    // Because array is only 3 objects long, the || statement prints it if the correct answer is in 4th position
    let listIncorrectAnswers = incorrectAnswers.map((answer, i) => {
      if (this.state.position === i || (i === 2 && this.state.position == 4)) {
        return (
          <div>
            <p>{this.state.currentQuestion.correct_answer}</p>  
            <button onClick={this.handleClick}>{answer}</button>
          </div>
        );
      } else { 
      return <button onClick={this.handleClick}>{answer}</button>
      }
    });
     

    return (
      <div>
        { this.state.showFinalScore ? <ShowFinalScore quiz={this.props.quiz} score={this.state.score}/> : null }
        <h2>{this.state.currentQuestion.question}</h2>
        {listIncorrectAnswers}
      </div>
    )
  }
}

export default PlayQuiz
