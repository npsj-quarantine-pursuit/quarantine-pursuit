import React, { Component } from 'react';
import firebase from './firebase';

class SelectQuiz extends Component {
    constructor() {
        super();
        this.state = {
            quizList: [],
            quizInfo: {}
        }
    }

    // Fetching data from Firebase and displaying to user
    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.once('value', (response) => {
            const data = response.val();
            const quizList = Object.keys(data);
            this.setState({
                quizList,
                quizInfo: data,
            })
        })
    }

    handleClick = (e) => {
        this.props.selectQuiz(e.currentTarget.name);
    }

    render() {
        return (
            <div>
                {this.state.quizList.map((quiz) => {
                    return (
                        <div className="centered selectQuiz" key={quiz}>
                            <button name={quiz} onClick={this.handleClick}>
                                <h3>{quiz}</h3>
                                <p>Category: {decodeURIComponent(this.state.quizInfo[quiz][0].category)}</p>
                                <p>{this.state.quizInfo[quiz].length} Questions</p>
                                <p>Difficulty: {decodeURIComponent(this.state.quizInfo[quiz][0].difficulty)}</p>
                            </button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default SelectQuiz;