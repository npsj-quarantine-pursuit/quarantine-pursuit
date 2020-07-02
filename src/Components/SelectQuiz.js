import React, { Component } from 'react';
import firebase from './firebase';

class SelectQuiz extends Component {
    constructor() {
        super();
        this.state = {
            quizList: [],
            quizInfo: {

            }
        }
    }
    

    componentDidMount() {
        this.props.loadingHandler()
        const dbRef = firebase.database().ref();
        
        dbRef.once('value', (response) => {
            
            const data = response.val();
            console.log(data)
            const quizList = Object.keys(data);

            this.setState({
                quizList,
                quizInfo: data,
            })
        }).then(()=> {
            this.props.loadingFalse();
        })
    }

    handleClick = (quiz) => {
        this.props.selectQuiz(quiz);
        console.log(quiz);
    }

    render() {
        
    return (
        <div>
            {
            this.state.quizList.map((quiz) => {
                return (
                    <div className="centered selectQuiz" key={quiz}>
                        <button name={quiz} onClick={this.handleClick(quiz)}>

                            <h3>{quiz}</h3>

                            <p>Category: {atob(this.state.quizInfo[quiz][0].category)}</p>
                            <p>{this.state.quizInfo[quiz].length} Questions</p>
                            <p>Difficulty: {atob(this.state.quizInfo[quiz][0].difficulty)}</p>

                        </button>
                    </div>
                    )
                })
            }
        </div>
    );
    }
}

export default SelectQuiz