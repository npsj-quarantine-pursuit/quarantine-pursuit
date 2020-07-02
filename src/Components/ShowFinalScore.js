import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import firebase from './firebase';

class ShowFinalScore extends Component {
    constructor(props){
        super(props);
        this.state = {
            quizName: "",
        }
    }

    save = () => {
        let quizName = prompt("What would you like to name this quiz");

        this.setState({
            quizName,
        })

        const dbRef = firebase.database().ref();
        dbRef.child(quizName).set(this.props.quiz);
    }

   
    render() {
        return (
        <div className="centered">
            <h2>Your Score is: {this.props.score}/{this.props.quiz.length}</h2>
            
            <Link to="/"><button onClick={this.props.reset}>Home</button></Link>
            <button onClick={this.save}>Save Quiz</button>
        </div>
    );
}
    
}

export default ShowFinalScore;          