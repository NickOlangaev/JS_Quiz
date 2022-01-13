class Quiz {
    constructor(questions) {
        this._questions = questions;
        this._counter = 0;
        this._quizLength = questions.length;
        this._score = 0;
    }

    getQuizLength() {
        return this._quizLength;
    }

    getQuestionNumber() {
        return this._counter + 1;
    }

    getQuestionText() {
        return this._questions[this._counter].text;
    }

    getAnswers() {
        return this._questions[this._counter].answers;
    }

    getCorrectAnswerIndex() {
        return this._questions[this._counter].correctAnswerIndex;
    }

    getScore() {
        return this._score;
    }


    next() {
        this._counter++
    }

    answerPick(index) {
        let answerValue = this._questions[this._counter].getValue(index);
        this._score += answerValue;
        this.next();
    }

    get quizIsOver() {
        return (this.getQuestionNumber() <= this.getQuizLength()) ? false : true;
    }
};

class Question {
    constructor(text, answers) {
        this._text = text;
        this._answers = answers;
    }

    get text() {
        return this._text;
    }

    get correctAnswerIndex() {
        let correctAnswer = this._answers.find(answer => answer.value === 1);
        let correctIndex = this._answers.indexOf(correctAnswer);
        return correctIndex;
    }

    get answers() {
        return this._answers;
    }

    getValue(index) {
        return this._answers[index].value;
    }
};

class Answer {
    constructor(text, value) {
        this._text = text;
        this._value = value;
    }
    get text() {
        return this._text;
    }

    get value() {
        return this._value;
    }

};

const testPartQuestions = [
    new Question("It's ______ dog.", [
        new Answer('a', 1),
        new Answer('an', 0),
        new Answer('the', 0),
        new Answer('-', 0)
    ]),
    new Question("I ______ in Paris.", [
        new Answer('am', 1),
        new Answer('is', 0),
        new Answer('are', 0),
        new Answer('was', 0)
    ]),
    new Question("I see two _____.", [
        new Answer('mouse', 0),
        new Answer('mouses', 0),
        new Answer('mice', 1),
        new Answer('mices', 0)
    ]),
    new Question("What ____ she doing now?", [
        new Answer('are', 0),
        new Answer('is', 1),
        new Answer('am', 0),
        new Answer('-', 0)
    ]),
    new Question("My birthday is _______.", [
        new Answer('on 4th May', 0),
        new Answer('in May 4th', 0),
        new Answer('on May 4th', 1),
        new Answer('In 4th May', 0)
    ]),
    new Question("This is ______ house.", [
        new Answer('my', 1),
        new Answer('mine', 0),
        new Answer('me', 0),
        new Answer('mi', 0)
    ]),
    new Question("She _______ cats", [
        new Answer('like', 0),
        new Answer('to like', 0),
        new Answer('liking', 0),
        new Answer('likes', 1)
    ]),
    new Question("I am interested ___ sports.", [
        new Answer('in', 1),
        new Answer('at', 0),
        new Answer('on', 0),
        new Answer('of', 0)
    ]),
    new Question("When _______home?", [
        new Answer('you are coming to', 0),
        new Answer('are you come to', 0),
        new Answer('are you coming', 1),
        new Answer('is you coming', 0)
    ]),
    new Question("She _________ a sister.", [
        new Answer("hasn't", 0),
        new Answer("doesn't have", 1),
        new Answer("doesn't has", 0),
        new Answer('does have', 0)
    ]),
    new Question("Where ________ yesterday?", [
        new Answer('were you', 1),
        new Answer('did you were', 0),
        new Answer('did you be', 0),
        new Answer('was you', 0)
    ]),
    new Question("It's ___ car. ___ car is new.", [
        new Answer('the/a', 0),
        new Answer('a/the', 1),
        new Answer('a/a', 0),
        new Answer('the/the', 0)
    ]),
    new Question("I went to my relatives ___ Sunday.", [
        new Answer('in', 0),
        new Answer('at', 0),
        new Answer('–', 0),
        new Answer('on', 1)
    ]),
    new Question("She says  she ______.", [
        new Answer('can dance', 1),
        new Answer('can to dance', 0),
        new Answer('can dancing', 0),
        new Answer('can not dancing', 0)
    ]),
    new Question("_____ you walk your dog the day before yesterday?", [
        new Answer('were', 0),
        new Answer('was', 0),
        new Answer('are', 0),
        new Answer('did', 1)
    ]),
    new Question("We _________ you now.", [
        new Answer('hear', 0),
        new Answer('are hearing', 0),
        new Answer('are listen to', 0),
        new Answer('are listening to', 1)
    ]),
    new Question("She wanted ________ last winter", [
        new Answer('go skiing', 0),
        new Answer('to go skiing', 1),
        new Answer('to go ski', 0),
        new Answer('went ski', 0)
    ]),
    new Question("I think you ______ the exam.", [
        new Answer('are going to pass', 0),
        new Answer('will passing', 0),
        new Answer('will pass', 1),
        new Answer('are passing', 0)
    ]),
    new Question("This camera is _______ than that camera.", [
        new Answer('cheap', 0),
        new Answer('cheaper', 1),
        new Answer('more cheap', 0),
        new Answer('more cheaper', 0)
    ]),
    new Question("I ______ as a child.", [
        new Answer('can ride a bicycle ', 0),
        new Answer('could ride a bicycle', 1),
        new Answer('could rode a bicycle', 0),
        new Answer("can't ride a bicycle", 0)
    ])
];

function createAnswers(answersArray, answersWrapper) {
    let answersButtonsArray = [];
    for (let i = 0; i < answersArray.length; i++) {

        let answer = document.createElement('button');
        answer.className = 'answer-item';

        answersWrapper.appendChild(answer);

        answer.innerHTML = answersArray[i].text;
        answersButtonsArray.push(answer);
    }
    return answersButtonsArray;
};

function showQuizResult(score) {
    let resultField = document.querySelector('.quiz-body');
    resultField.classList.add('result-field')
    resultField.innerHTML = `Ваш счет - ${score}`;
};

function initQuestion(quiz) {
    if (!quiz.quizIsOver) {
        let questionTextBody = document.querySelector('.question');
        questionTextBody.innerHTML = quiz.getQuestionText();

        let answersWrapper = document.querySelector('.answers-wrapper');
        answersWrapper.innerHTML = '';

        let answersButtons = createAnswers(quiz.getAnswers(), answersWrapper);

        let quizCounter = document.querySelector('.quiz-footer');
        quizCounter.innerHTML = (`${quiz.getQuestionNumber()} / ${quiz.getQuizLength()}`);



        for (let i = 0; i < answersButtons.length; i++) {
            answersButtons[i].onclick = () => {

                let correctAnswerIndex = quiz.getCorrectAnswerIndex();

                if (i !== correctAnswerIndex) {
                    answersButtons[i].classList.add('wrong');
                }
                answersButtons[correctAnswerIndex].classList.add('correct');

                answersButtons.forEach(item => item.disabled = true);

                quiz.answerPick(i);

                setTimeout(() => initQuestion(quiz), 1000);
            }
        }
    }
    else {
        showQuizResult(quiz.getScore());

    }
};


initQuestion(new Quiz(testPartQuestions));