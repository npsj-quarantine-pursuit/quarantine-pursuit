import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
            quiz = response.data.results;
            this.props.callQuiz(quiz);
        })
    }


    render() {

        return (
            <form>
                <div>
                    <label for="selectedCategory">Choose a Category:</label>
                    <select name="selectedCategory" id="categories" onChange={this.handleChange}>
                        {this.state.categories.map((obj, id) => {
                            return (<option key={id} value={obj.id}>{obj.name}</option>)
                        })}
                    </select>
                </div>
                <div>
                    <label for="amount">Number of Questions:</label>
                    <input type="number" name="amount" min="0" max="20" value={this.state.amount} onChange={this.handleChange}></input>
                    <button onClick={this.handleClick}>Generate Quiz</button>
                </div>

            </form>
        );
    };
}

export default CreateQuiz;
