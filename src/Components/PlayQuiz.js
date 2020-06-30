import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";

class PlayQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: this.props.quiz[0],
      questionNumber: 0,
      position: 1,
      score: 0,
      showFinalScore: false,
      question_list: [],
    }
  }

  componentDidMount() {    
    this.combineAndShuffle();
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
    this.combineAndShuffle();
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

  reset = () => {
    this.setState({
      currentQuestion: {
        correctAnswer: '',
        question: '',
        incorrect_answers: [],
      },
      questionNumber: 0,
      position: 1,
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
     
    let questions = this.state.question_list;

    let listQuestions = questions.map((answer, i) =>{
      return <button className="answerButtons" key={i} onClick={this.handleClick}>{atob(answer)}</button>
    })

    return (
      <div>
        {this.state.showFinalScore ? <ShowFinalScore quiz={this.props.quiz} score={this.state.score} reset={this.reset} /> : ( 
          <div>
            <h2>{atob(this.state.currentQuestion.question)}</h2>
          </div>
         )}
        {listQuestions}
      </div>
    )
  }
}

export default PlayQuiz