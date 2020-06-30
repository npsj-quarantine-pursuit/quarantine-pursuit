import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './index.scss';
import firebase from './Components/firebase.js';
import LoadingAnimation from './Components/LoadingAnimation.js';
import logo from './images/logo.png';

// Components
import CreateQuiz from './Components/CreateQuiz';
import SelectQuiz from './Components/SelectQuiz';
import PlayQuiz from './Components/PlayQuiz';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeQuizPath: "",
      quiz: [{
        question: '',
        correctAnswer: '',
        incorrect_answers: [],
      }],
      dataReady: false,
      isLoading: false,
    }
  }

  callQuiz = (quiz) => {
    this.setState({
      quiz,
      dataReady: true,
      isLoading: false,
    })
    console.log(this.state.quiz);
  }

  selectQuiz = (quiz) => {
    const dbRef = firebase.database().ref(quiz);
    dbRef.once("value", (response) => {
      const quiz = response.val();
      this.setState({
        quiz,
      })
    }).then(() => {
      this.setState({
        dataReady: true,
        isLoading: false,
      })
    })

  }

  reset = () => {
    this.setState({
      activeQuizPath: "",
      quiz: [{
        question: '',
        correctAnswer: '',
        incorrect_answers: [],
      }],
      dataReady: false,
    })
    console.log('reset');
  }

  loadingHandler = () => {
    this.setState({
      isLoading: true,
    })
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="app">
          <header>
            <h1 className="sr-only">Qurantine Pursuit</h1>
            <img src={logo} alt="Logo for Qurantine Pursuit" />
          </header>
          <main>
            {this.state.isLoading ? <LoadingAnimation /> : null}
            <Route exact path="/">
              <button><Link to="/create">Create a Quiz!</Link></button>
              <button><Link to="/select">Select an Existing Quiz!</Link></button>
            </Route>
            <Route path="/create">
              <CreateQuiz callQuiz={this.callQuiz} loadingHandler={this.loadingHandler} />
            </Route>
            <Route path="/select">
              <SelectQuiz selectQuiz={this.selectQuiz} />
            </Route>

            {this.state.dataReady ? <Redirect to="/play" /> : null}

            <Route path="/play">
              <PlayQuiz quiz={this.state.quiz} reset={this.reset} />
            </Route>
          </main>
        </div>
      </Router >
    )
  }
}

export default App