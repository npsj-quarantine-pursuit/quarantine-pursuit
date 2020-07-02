import React, { Component } from 'react';
import axios from 'axios';

class CreateQuiz extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            isLoading: true,
            selectedCategory: 0,
            amount: 1,
            difficulty: "easy",
            token: "",
        }
    }

    componentDidMount() {

        axios({
            url: 'https://opentdb.com/api_category.php',
            method: 'GET',
            responseType: 'JSON',
        }).then((response) => {
            let categories = response.data.trivia_categories
            this.setState({
                categories,
                isLoading: false,
            })
        }).catch(() => {
            alert("I can't seem to connect to my database :'(, please come back later... I'll do better I swear")
        })

        axios({
            url: 'https://opentdb.com/api_token.php?command=request',
            method: 'GET',
            responseType: 'JSON',
        }).then((response) => {
            let token = response.data.token;

            this.setState({
                token,
            })
            console.log(this.state.token);
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.loadingHandler();
        let quiz = {};
        axios({
            url: 'https://opentdb.com/api.php',
            method: 'GET',
            responseType: 'JSON',
            params: {
                amount: this.state.amount,
                category: this.state.selectedCategory,
                difficulty: this.state.difficulty,
                token: this.state.token,
                type: "multiple",
                encode: 'base64'
            }
        }).then((response) => {
            console.log(response)
            if (response.data.response_code > 0){
                alert("I'm sorry, there aren't enough questions available in that category. Try again with a lower number of questions or change categories. ")
                this.props.loadingFalse();
            }else {
                quiz = response.data.results;
                this.props.callQuiz(quiz);
            }
        })
    }


    render() {

        return (
            <form className="centered">
                <div className="inputPair">
                    <label htmlFor="selectedCategory" >Choose a Category:</label>
                    <select name="selectedCategory" id="categories" onChange={this.handleChange}>
                        {this.state.categories.map((obj, id) => {
                            return (<option key={id} value={obj.id}>{obj.name}</option>)
                        })}
                    </select>
                </div>
                <div className="inputPair">
                    <label htmlFor="amount">Number of Questions:</label>
                    <p>{this.state.amount}</p>
                    <input type="range" name="amount" min="2" max="20" value={this.state.amount} onChange={this.handleChange}></input>
                </div>
                <div className="inputPair">
                    <label htmlFor="difficulty" >Choose a Difficulty:</label>
                    <select name="difficulty" id="difficulty" onChange={this.handleChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button onClick={this.handleClick}>Generate Quiz</button>
            </form>
        );
    };
}

export default CreateQuiz;
