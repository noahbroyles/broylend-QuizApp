/*
 * Name: Noah Broyles
 * Email: broylend@mail.uc.edu
 * Assignment: Quiz App
 * Due: 11/01/2020
 * Description: Javascript Quiz App
 * 
*/

'use strict';


class Quiz {

    // delcare all the class properties
    questions;
    currentQuestionIndex;
    totalQuestions;
    correctAnswers;

    constructor(questions) {
        this.questions = questions; 
        this.currentQuestionIndex = 0;
        this.totalQuestions = Object.keys(questions).length;
        this.correctAnswers = 0;
    }

    take() {
        // clear the answer section
        document.getElementById("answer-section").innerHTML = "";

        let currentQuestion = Object.keys(this.questions)[this.currentQuestionIndex];
        document.getElementById('current-question').innerHTML = currentQuestion;
        // populate the answer section with the options for this question
        for (let answer in this.questions[currentQuestion]) {
            document.getElementById('answer-section').innerHTML += `<label for="${this.questions[currentQuestion][answer]}">${this.questions[currentQuestion][answer]}</label><input name="answer" type="radio" value="${this.questions[currentQuestion][answer]}"><br>`;
        }
    }

    // display the next question
    nextQuestion() {
        this.currentQuestionIndex += 1; // we are moving along through the questions
        if (this.currentQuestionIndex === this.totalQuestions) {
            // the quiz is over.
            document.getElementById('quiz-form').innerHTML= `<h2>Yay! The quiz is over!</h2><p>Your score is ${(this.correctAnswers/this.totalQuestions) * 100}%.</p>`;
            return; // don't call take() again!
        }
        this.take();
    }

    // checks if an answers matches the question
    checkAnswer(question, answer) {
        if (this.questions[question]["correct"] == answer) {
            return true;
        }
        return false;
    }

}

let q;

function submitQuestion () {
    try {
        // get the question and answer
        let answer = document.querySelector('input[name="answer"]:checked').value;
        let question = document.getElementById('current-question').innerHTML;

        if (q.checkAnswer(question, answer)) {
            q.correctAnswers += 1;
        }
        q.nextQuestion();
        return false;
        
    } catch { // they didn't fill in the answer
        alert("Please select an answer.");
    }
}

window.onload = function() {
    document.getElementById('submit-button').onclick = submitQuestion;
    let questions = {
        "What percent of 40 is 8?": {0:"33.3%", "correct":"20%", 1:"18%", 2:"25%"},
        "What is 7 * 6?": {0:"46", 1:"67", "correct":"42", 2:"76"},
        "How many times does 1 go into 8?": {0:"81", 1:"18", 2:"6", "correct":"8"},
        "Is the square root of 42 a whole number?": {0:"yes", "correct":"no", 1:"Maybe So"},
        "Why is 1764 special?": {"correct":"Because it's the square of 42", 0:"Because it's prime", 1:"Because it's over 1000"}
    }
    q = new Quiz(questions);
    q.take(); // start the quiz
}



