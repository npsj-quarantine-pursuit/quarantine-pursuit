import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";
import { BrowserRouter as Redirect } from 'react-router-dom';

class PlayQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: this.props.quiz[0],
      questionNumber: 0,
      score: 0,
      showFinalScore: false,
      question_list: [],
      shuffled: false,
      answerFeedback: ""
    }
  }

  componentDidMount() {    
    this.combineAndShuffle();
  }

  componentDidUpdate() {
    if (this.state.shuffled === false){
      this.combineAndShuffle()
      this.setState({
        shuffled: true
      })
    }
  }

  handleClick = (e) => {
    let questionNumber = this.state.questionNumber
    questionNumber++;
    //Sets the currentquestion state to next question in array
    if (questionNumber < this.props.quiz.length ) {
      console.log(this.state.currentQuestion);
      this.setState({
        questionNumber,
        currentQuestion: this.props.quiz[questionNumber],
        shuffled: false,
        answerFeedback: `The Correct Answer Was: ${atob(this.state.currentQuestion.correct_answer)}`
      })
      //Shows final score screen if we answered last question in arra
    } else {
      this.setState({
        showFinalScore: true
      })
    }


    if (this.state.currentQuestion.correct_answer === e.target.name){
      this.correct();
      console.log('ding')
    }
  }

  correct = () => {
    let newScore = this.state.score
    newScore++
    this.setState({
      score: newScore,
      answerFeedback: "Correct!"
    })
  }

  reset = () => {
    this.setState({
      // currentQuestion: {
      //   correctAnswer: '',
      //   question: '',
      //   incorrect_answers: [],
      // },
      questionNumber: 0,
      score: 0,
      showFinalScore: false,
    })
    this.props.reset();
  }

  combineAndShuffle = () => {
    let array = [...this.state.currentQuestion.incorrect_answers, this.state.currentQuestion.correct_answer];

      const shuffle = (array) => {
        let i = array.length - 1
        for ( i; i > 0; i-- ) {
          const j = Math.floor(Math.random() * i)
          const temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
        this.setState({
          question_list: array,
        })
      
      }

    shuffle(array);
  }

  render() {
    
    let listQuestions = this.state.question_list.map((answer, i) =>{
      return <button className="answerButtons" name={answer} key={i} onClick={this.handleClick}>{atob(answer)}</button>
    })

    return (
      <div>
        {this.state.showFinalScore ? <ShowFinalScore quiz={this.props.quiz} score={this.state.score} reset={this.reset} /> : ( 
          <div className="centered">
            {/* CONTROLS CLASSNAME TO ALLOW STYLING DIFFERENCED BETWEEN CORRECT AND INCORRECT */}
            {this.state.answerFeedback == "Correct!" ? <h2 className="correct">{this.state.answerFeedback}</h2>: <h2 className="incorrect">{this.state.answerFeedback}</h2>}
            <h2>{atob(this.state.currentQuestion.question)}</h2>
            {listQuestions}
          </div>
        )}
        
      </div>
    )
  }
}

export default PlayQuiz