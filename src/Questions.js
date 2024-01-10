import React from "react";
import './App.css';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            question: [],
            correct_answer: [],
            incorrect_answers: [[]],
            score: 0,
        };
        this.generateQuestions = this.generateQuestions.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this)
        this.incorrectAnswer = this.incorrectAnswer.bind(this)
    }
    componentDidMount = () =>{
        this.generateQuestions()
        
    }
    correctAnswer = () => {
        this.setState({
            score: this.state.score + 1
        })
        this.nextQuestion()
    }
    incorrectAnswer = () => {
        this.nextQuestion()
    }
    nextQuestion = () => {
        console.log(this.state.question.length)
        if(this.state.counter === this.state.question.length -1){
            alert("Game over! Your score is: "+this.state.score+" out of "+this.state.question.length+" questions!")
            this.generateQuestions()
            this.setState({
                counter: 0,
                score: 0
            })
        }else{
            this.setState({
                counter: this.state.counter +1 
            })
        }
    }
    generateQuestions = () => {
        fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                var joined_question = []
                var joined_correct = []
                var joined_incorrect = []
                for (let i = 0; i < json.results.length; i++) {
                    joined_question.push(json.results[i].question)
                    joined_incorrect.push(json.results[i].incorrect_answers)
                    joined_correct.push(json.results[i].correct_answer)
                }
                this.setState({
                    question: joined_question,
                    correct_answer: joined_correct,
                    incorrect_answers: joined_incorrect
                })
            })
    };
    render() {
        return (
            <div className="background">
                <div className="question">
                    <h1>{this.state.question[this.state.counter]}</h1>
                </div>
                <div id="grid-2x2">
                    <div class="cell" onClick={this.incorrectAnswer}>
                        <h1>{this.state.incorrect_answers[this.state.counter][0]}</h1>
                    </div>
                    <div class="cell" onClick={this.incorrectAnswer}>
                        <h1>{this.state.incorrect_answers[this.state.counter][1]}</h1>
                    </div>
                    <div class="cell" onClick={this.incorrectAnswer}>
                        <h1>{this.state.incorrect_answers[this.state.counter][2]}</h1>
                    </div>
                    <div class="cell" onClick={this.correctAnswer}>
                        <h1>{this.state.correct_answer[this.state.counter]}</h1>
                    </div>
                </div>
                <div className="cell"> 
                    Your Score : {this.state.score}
                </div>
            </div>
        )
    }
}

export default Questions; 