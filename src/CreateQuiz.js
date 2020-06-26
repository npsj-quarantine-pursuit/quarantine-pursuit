import React, { Component } from 'react';
import axios from 'axios';

class CreateQuiz extends Component{
    constructor() {
        super();
        this.state = {
            isLoading: true,
            categories: [],
            selectedCategory: 0,
            amount: 1,
            difficulty: "easy",
            token: ""
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
    }
    
    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleClick() {
        //Axios for API CAL:
    }


    render (){
        return (
            <form>
                <select name="selectedCategory" id="categories" onChange={this.handleChange}>
                    {this.state.categories.map((obj, id) =>{
                        return (<option key={id} value={obj.id}>{obj.name}</option>)
                    })}
                </select>
                <input type="number" name="amount" min="0" max="20" value={this.state.amount} onChange={this.handleChange}></input>
            </form>
        );
    };
}

export default CreateQuiz;