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
      console.log('ding');
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
  }

  loadingHandler = () => {
    this.setState({
      isLoading: true,
    })
  }

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
            <CreateQuiz callQuiz={this.callQuiz} loadingHandler={this.loadingHandler} loadingFalse={this.loadingFalse}/>
            </div>
          </Route>

          <Route path="/select">
            <SelectQuiz selectQuiz={this.selectQuiz} loadingHandler={this.loadingHandler} loadingFalse={this.loadingFalse}/>
          </Route>

          {/* If quiz has been loaded redirect user to play, otherwise redirect to home (in case they refresh on child component) */}
          {this.state.dataReady ? <Redirect to="/play" /> : <Redirect to="/"/>}

          <Route path="/play">
            <PlayQuiz quiz={this.state.quiz} reset={this.reset} />
          </Route>
        </main>
      </Router>
    )
  }
}

export default App