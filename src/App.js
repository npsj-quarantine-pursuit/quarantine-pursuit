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
      quiz: [{
        question: '',
        correctAnswer: '',
        incorrect_answers: [],
      }],
      dataReady: false,
      isLoading: false,
    }
  }

  // Get quiz data from CreateQuiz component then once dataReady is true redirects to PlayQuiz component
  callQuiz = (quiz) => {
    this.setState({
      quiz,
      dataReady: true,
      isLoading: false,
    })
  }

  // Get quiz data from SelectQuiz component then once dataReady is true redirects to PlayQuiz component
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

  // Reset is called after users finish a quiz
  reset = () => {
    this.setState({
      quiz: [{
        question: '',
        correctAnswer: '',
        incorrect_answers: [],
      }],
      dataReady: false,
    })
  }

  // renders loading logo 
  loadingHandler = () => {
    this.setState({
      isLoading: true,
    })
  }
  // removes loading logo
  loadingFalse = () => {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <header>
          <h1 className="sr-only">Qurantine Pursuit</h1>
          <img src={logo} alt="Logo for Qurantine Pursuit" />
        </header>
        <main>

          <Route exact path="/">
            <button><Link to="/create">Create a Quiz!</Link></button>
            <button><Link to="/select">Select an Existing Quiz!</Link></button>
          </Route>

          <Route path="/create">
            <div className="loadingHelper">
              {this.state.isLoading ? <LoadingAnimation /> : null}
              <CreateQuiz callQuiz={this.callQuiz} loadingHandler={this.loadingHandler} loadingFalse={this.loadingFalse} />
            </div>
          </Route>

          <Route path="/select">
            <SelectQuiz selectQuiz={this.selectQuiz} />
          </Route>

          {/* If quiz has been loaded redirect user to play, otherwise redirect to home (in case they refresh on child component) */}
          {this.state.dataReady ? <Redirect to="/play" /> : <Redirect to="/" />}

          <Route path="/play">
            <PlayQuiz quiz={this.state.quiz} reset={this.reset} />
          </Route>
        </main>
      </Router>
    )
  }
}

export default App;