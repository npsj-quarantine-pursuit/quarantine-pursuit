import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const ShowFinalScore = (props) => {
    console.log("show final score");
    return (
      <div>
        <h2>Your Score is: {this.props.score}</h2>
        
        <Link to="/"><button>Home</button></Link>
        <button>Save Quiz</button>
      </div>
    );
  
}

export default ShowFinalScore;