// Construction wich contains the Question, Choices and answer.
function Question(text, choices, answer) {
	this.text = text; // string
	this.choices = choices; // array
	this.answer = answer; // string
}

// If the answer is correct from the choices, it returns TRUE to answer.
Question.prototype.isCorrect = function(choice) {
	return this.answer === choice; 
}

// Call the questions, confirm its the first question in the array and start score
// with 0.
function Quiz(questions) {
	this.questions = questions;
	this.currentQuestionIndex = 0;
	this.score = 0;
}

// Returns next question in the array order.
Quiz.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
}

// Check if the answear is correct.
Quiz.prototype.checkAnswer = function(answer) {
	if(this.getCurrentQuestion().isCorrect(answer)) {
		this.score++; // Add one point to the score if it's the right answer.
	}
	this.currentQuestionIndex++; // Ask for next question with ++.
}

// Check if quiz end is reached
Quiz.prototype.hasEnded = function() {
	// Is the questions length smaller or equal to currentQuestionIndex - You've 
	// finished!
	return this.currentQuestionIndex >= this.questions.length;
}



// A constructor who gets all the functions of the quiz.
// The full user interface of the Quiz - Start by checking if the quiz is running.
// If the quiz is new it calls question, choices, progress and score.
const QuizUI = {
	showNext: function() {
		if(quiz.hasEnded()) {
			this.showResults();
		} else {
			this.showProgress();
			this.showQuestion();
			this.showChoices();
			this.showScore();
		}
	},
	
	// Put the current question (text) from the string in the HTML with "populateIdWithHTML".
	showQuestion: function() {
		this.writeHTML('question', quiz.getCurrentQuestion().text);
	},

	// Call the answers from the choices index.
	showChoices: function() {
		let choices = quiz.getCurrentQuestion().choices;
		// Loop through each choice and display on page
		for(let i = 0; i < choices.length; i++) {
			// Loop trough the html id called choice and controll the amount of the array with 
			// choice + 0, 1, 2, 3 until there is no more choices and adding the text.
			let choiceId = 'choice' + i;
			let choiceText = choices[i];
			this.writeHTML(choiceId, choiceText);
			this.controllAnswer(choiceId, choiceText);
		}
	},
	
	// This function controlls the answer in the question array.
	controllAnswer: function(id, guess) {
		let button = document.getElementById(id);
		// When the button element is clicked on, the answer is committed and you get the next 
		// question and answers.
		button.onclick = function() {
			quiz.checkAnswer(guess);
			QuizUI.showNext();
		}
	},
	// Shows the text "score" and the actual points.
		showScore: function() {
		let scoreText = 'Score: ' + quiz.score;
		this.writeHTML('score', scoreText);
	},

	// Shows the progression of the quiz. 
	showProgress: function() {
		let questionNumber = quiz.currentQuestionIndex + 1; // +1 becouse not to show 0 (array)
		let totalQuestions = quiz.questions.length;
		let progressText = 'Question ' + questionNumber + ' of ' + totalQuestions;
		this.writeHTML('progress', progressText);
	},

	// Write the result of the quiz.
	// Makes a calculation depending on the score number and tha amount of questions.
	showResults: function() {
		let grade = quiz.score/quiz.questions.length;
		let results = '';
		if(grade >= 0.8) {
			results += '<h2>INSANE!</h2>';
			results += '<h3>'+ quiz.score + ' Points! You know EVERYTHING!</h3>';
		} else if(grade < 0.8 && grade > 0.6) {
			results += '<h2>Impressive!</h2>';
			results += '</h2><h3>With your ' + quiz.score + ' points, you know what you talking about.</h3>';
		} else if(grade < 0.6 && grade > 0.4) {
			results += '<h2>Wow. Thats... average!</h2>';
			results += '</h2><h3>Your score of ' + quiz.score + ' points doesnt impress anyone.</h3>';
		} else {
			results += '<h2>Terrible!';
			results += '</h2><h3>You got ' + quiz.score + ' points. Are you even awake?</h3>';
		}
		results += '<button id="reset">Hit me baby, one more time!</button>';
		// Call the HTML and present the results / resetbtn
		this.writeHTML('quiz', results);
		this.resetQuizHandler();
	},

	// Identify the HTML id reset to fullfil the function.
	resetQuizHandler: function() {
		const resetBtn = document.getElementById('reset');
		// When clicking at the reload button the document will reload and start the quiz over agian.
		// Works like a boolean.
		resetBtn.onclick = function() {
			window.location.reload(false);
		}
	},

	writeHTML: function(id, content) {
		const element = document.getElementById(id);
		element.innerHTML = content;
	}
};




// List of the questions
// 'Question' - [Answers] - 'Corect answer'
 let questions = [
  	new Question('Why do you study Frontend Develop?', ['Seems funny!', 'Wanna make big cash', 'Start a new career', 'Front-what?'], 'Seems funny!' && 'Wanna make big cash' && 'Start a new career'),
    new Question('When was Javascript developed?', ['1988', '1872', '1995', '1992'], '1995'),
    new Question('Who developed JS?', ['George Washington', 'Brendan Eich', 'Mirwais Shahryar', 'John Backus'], 'Brendan Eich'),
    new Question('Earth is: ___?', ['Tasting good', 'Third planet from the sun', 'Flat', 'Home of Luke Skywalker'], 'Third planet from the sun')
];


// The constructor to draw the quiz (questions and answers)
let quiz = new Quiz(questions);
QuizUI.showNext();