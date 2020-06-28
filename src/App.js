import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './index.scss';
import firebase from './Components/firebase.js';

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
        incorrect_answers: [],
      }],
      dataReady: false,
    }
  }

  callQuiz = (quiz) => {
    this.setState({
      quiz,
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
      console.log('ding')
      this.setState({
        dataReady: true,
      })
    })

  }

  render() {
    return (
      <Router>
        <div className="app">
          <header>
            <h1>Quarantine Pursuit</h1>
          </header>
          <main>
            <Route exact path="/">
              <Link className="button" to="/create">Create a Quiz!</Link>
              <Link className="button" to="/select">Select an Existing Quiz!</Link>
            </Route>
            <Route path="/create">
              <CreateQuiz callQuiz={this.callQuiz} />
            </Route>
            <Route path="/select">
              <SelectQuiz selectQuiz={this.selectQuiz}/>
            </Route>

            { this.state.dataReady ? <Redirect to="/play"/> : null }

            <Route path="/play">
              <PlayQuiz quiz={this.state.quiz} />
            </Route>
          </main>
        </div>
      </Router>
    )
  }
}

export default App
