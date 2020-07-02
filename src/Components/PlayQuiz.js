import React, { Component } from 'react';
import ShowFinalScore from "./ShowFinalScore";

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
      answerFeedback: "",
      timer: 30
    }
  }

  componentDidMount() {
    this.combineAndShuffle();
    setInterval(this.countdown, 1000)

  }

  componentDidUpdate() {
    if (this.state.shuffled === false) {
      this.combineAndShuffle();
      this.setState({
        shuffled: true
      })
    }

    if (this.state.timer === 0) {
      this.nextQuestion();
      // Prevents infinite loop on last page 
      this.setState({
        timer: 30,
      })
    }
  }

  nextQuestion = () => {
    let questionNumber = this.state.questionNumber
    questionNumber++;
    //Sets the currentQuestion state to next question in array
    if (questionNumber < this.props.quiz.length) {
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
    console.log(this.state.answerFeedback);
  }

  handleClick = (e) => {
    this.nextQuestion();
    if (this.state.currentQuestion.correct_answer === e.target.name) {
      this.correct();
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
      questionNumber: 0,
      score: 0,
      showFinalScore: false,
    })
    this.props.reset();
  }

  countdown = () => {
    let newTimer = this.state.timer - 1;
    this.setState({
      timer: newTimer
    })
  }

  combineAndShuffle = () => {

    let array = [...this.state.currentQuestion.incorrect_answers, this.state.currentQuestion.correct_answer];

    const shuffle = (array) => {
      let i = array.length - 1
      for (i; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      this.setState({
        question_list: array,
        timer: 30
      })

    }

    shuffle(array);
  }

  render() {

    let listQuestions = this.state.question_list.map((answer, i) => {
      return <button className="answerButtons" name={answer} key={i} onClick={this.handleClick}>{atob(answer)}</button>
    })

    let timer = () => {
      if (this.state.timer >= 20) {
        return <p className="timerGreen">{this.state.timer}</p>
      } else if (this.state.timer <= 20 && this.state.timer >= 10) {
        return <p className="timerYellow">{this.state.timer}</p>
      } else {
        return <p className="timerRed">{this.state.timer}</p>
      }
    }


    return (
      <div>
        {this.state.showFinalScore ? (
          <div>
            {this.state.answerFeedback === "Correct!" ? <h2 className="correct">{this.state.answerFeedback}</h2> : <h2 className="incorrect">{this.state.answerFeedback}</h2>}
            <ShowFinalScore quiz={this.props.quiz} score={this.state.score} reset={this.reset} />
            {console.log(this.state.answerFeedback)}
          </div>
        )
          : (
            <div className="centered">
              {/* CONTROLS CLASSNAME TO ALLOW STYLING DIFFERENCED BETWEEN CORRECT AND INCORRECT */}
              {this.state.answerFeedback === "Correct!" ? <h2 className="correct">{this.state.answerFeedback}</h2> : <h2 className="incorrect">{this.state.answerFeedback}</h2>}
              {timer()}
              <h2 className="question">{atob(this.state.currentQuestion.question)}</h2>
              {listQuestions}
            </div>
          )}

      </div>
    )
  }
}

export default PlayQuiz