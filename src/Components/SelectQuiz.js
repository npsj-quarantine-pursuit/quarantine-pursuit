import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from './firebase';



class SelectQuiz extends Component {
    constructor() {
        super();
        this.state = {
            quizList: [],
        }
       
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        
        dbRef.once('value', (response) => {
            
            const data = response.val();
            const quizList = Object.keys(data);
            this.setState({
                quizList,
            })

            console.log(this.state.quizList);
            })
    }

    handleClick = (quiz) => {
        this.props.selectQuiz(quiz);
    }

    render() {
    return (
        <div>
            {this.state.quizList.map((quiz) => {
                return (
                    <div key={quiz}>
                    <Link to="/play"><button onClick={this.handleClick}>{quiz}</button></Link>
                    </div>
                )
            })}
        </div>
    );
    }
}

export default SelectQuiz