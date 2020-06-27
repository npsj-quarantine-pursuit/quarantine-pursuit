import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.scss';

// Components
import CreateQuiz from './Components/CreateQuiz';
import SelectQuiz from './Components/SelectQuiz';
import PlayQuiz from './Components/PlayQuiz';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeQuizPath: "",
      quiz: [{}]
    }
  }

  callQuiz = (quiz) => {
    this.setState({
      quiz,
    })
    console.log(this.state.quiz);
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
            <Route path="/create">
              <CreateQuiz callQuiz={this.callQuiz} />
            </Route>
            {/* <Route path="/select" component={SelectQuiz} /> */}
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
