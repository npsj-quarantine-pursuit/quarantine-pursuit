import React, { Component } from 'react';
import './index.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CreateQuiz from './CreateQuiz.js'
import SelectQuiz from './SelectQuiz.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeQuizPath: ""
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <header>
            <h1>Quarantine Pursuit</h1>
          </header>
          <main>
            <Link className="button" to="/create">Create a Quiz!</Link>
            {/* <Link className="button" to="/select">Select an Existing Quiz!</Link> */}
            <Route path="/create" component={CreateQuiz} />
            {/* <Route path="/select" component={SelectQuiz} /> */}
          </main>
        </div>
      </Router>
    )
  }
}

export default App
