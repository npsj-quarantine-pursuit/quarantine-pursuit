import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import firebase from './firebase';

function ShowFinalScore(props) {
    const save = function () {
        let quizName = prompt("What would you like to name this quiz?");
        const dbRef = firebase.database().ref();
        dbRef.child(quizName).set(props.quiz);
    }

    return (
        <div className="centered">
            <h2>Your Score is: {props.score}/{props.quiz.length}</h2>
            <Link to="/"><button onClick={props.reset}>Home</button></Link>
            <button onClick={save}>Save Quiz</button>
        </div>
    );
}

export default ShowFinalScore;          