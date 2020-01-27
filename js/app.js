// State object
var state = {
    questions: [{
            text: "What year was Minecraft first released??",
            choices: ["2009", "1989", "2001", "2011"],
            correctChoiceIndex: 0
        },
        {
            text: "In Super Mario Bros,What does Mario jump on to complete each level?",
            choices: ["His Glasses", "a Flag Pole", "a Mushroom", "All of the above"],
            correctChoiceIndex: 1
        },
        {
            text: "What is the maximum amount of controllers supported by PS3?",
            choices: ["4", "8", "7", "11"],
            correctChoiceIndex: 2,
        },
        {
            text: "What does NES stand for?",
            choices: ["Ninja extreme service", "now eat snakes", "New entertainment Server", "Nintendo Entertainment Systems"],
            correctChoiceIndex: 3,
        },
        {
            text: "How many Halo titles contain the main storyline?",
            choices: ["5", "7", "9", "10"],
            correctChoiceIndex: 0,
        }
    ],
    praises: [
        "Wow. You got it right. look who's been reading.",
        "Correct. you got the baby question right, good job!",
        "Awesome. I mean really you got it, another one for you I guess",
        "Congrats. right answer, someone must be using Google."
    ],

    admonishments: [
        "LOL, I'm laughing because thats the wrong answer, not because you got it wrong!",
        "Sorry, maybe you should try coloring, its safer.",
        "That's incorrect. If you think your disappointed, imagine being the one grading it."
    ],
    score: 0,
    currentQuestionIndex: 0,
    route: 'start',
    lastAnswerCorrect: false,
    feedbackRandom: 0
};

// State modification functions
function setRoute(state, route) {
    state.route = route;
};

function resetGame(state) {
    state.score = 0;
    state.currentQuestionIndex = 0;
    setRoute(state, 'start');
};

function answerQuestion(state, answer) {
    var currentQuestion = state.questions[state.currentQuestionIndex];
    state.lastAnswerCorrect = currentQuestion.correctChoiceIndex === answer;
    if (state.lastAnswerCorrect) {
        state.score++;
    }
    selectFeedback(state);
    setRoute(state, 'answer-feedback');
};

function selectFeedback(state) {
    state.feedbackRandom = Math.random();
};

function advance(state) {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex === state.questions.length) {
        setRoute(state, 'final-feedback');
    } else {
        setRoute(state, 'question');
    }
};

// Render functions
function renderApp(state, elements) {
    // default to hiding all routes, then show the current route
    Object.keys(elements).forEach(function(route) {
        elements[route].hide();
    });
    elements[state.route].show();

    if (state.route === 'start') {
        renderStartPage(state, elements[state.route]);
    } else if (state.route === 'question') {
        renderQuestionPage(state, elements[state.route]);
    } else if (state.route === 'answer-feedback') {
        renderAnswerFeedbackPage(state, elements[state.route]);
    } else if (state.route === 'final-feedback') {
        renderFinalFeedbackPage(state, elements[state.route]);
    }
};

// at the moment, `renderStartPage` doesn't do anything, because
// the start page is preloaded in our HTML, but we've included
// the function and used above in our routing system so that this
// application view is accounted for in our system
function renderStartPage(state, element) {};

function renderQuestionPage(state, element) {
    renderQuestionCount(state, element.find('.question-count'));
    renderQuestionText(state, element.find('.question-text'));
    renderChoices(state, element.find('.choices'));
};

function renderAnswerFeedbackPage(state, element) {
    renderAnswerFeedbackHeader(state, element.find(".feedback-header"));
    renderAnswerFeedbackText(state, element.find(".feedback-text"));
    renderNextButtonText(state, element.find(".see-next"));
};

function renderFinalFeedbackPage(state, element) {
    renderFinalFeedbackText(state, element.find('.results-text'));
};

function renderQuestionCount(state, element) {
    var text = (state.currentQuestionIndex + 1) + "/" + state.questions.length;
    element.text(text);
};

function renderQuestionText(state, element) {
    var currentQuestion = state.questions[state.currentQuestionIndex];
    element.text(currentQuestion.text);
};

function renderChoices(state, element) {
    var currentQuestion = state.questions[state.currentQuestionIndex];
    var choices = currentQuestion.choices.map(function(choice, index) {
        return (
            '<li>' +
            '<input type="radio" name="user-answer" value="' + index + '" required>' +
            '<label>' + choice + '</label>' +
            '</li>'
        );
    });
    element.html(choices);
};

function renderAnswerFeedbackHeader(state, element) {
    var html = state.lastAnswerCorrect ?
        "<h6 class='user-was-correct'>You Got It!</h6>" :
        "<h1 class='user-was-incorrect'>WRONG, get it together!</>";

    element.html(html);
};

function renderAnswerFeedbackText(state, element) {
    var choices = state.lastAnswerCorrect ? state.praises : state.admonishments;
    var text = choices[Math.floor(state.feedbackRandom * choices.length)];
    element.text(text);
};

function renderNextButtonText(state, element) {
    var text = state.currentQuestionIndex < state.questions.length - 1 ?
        "Continue" : "Results";
    element.text(text);
};

function renderFinalFeedbackText(state, element) {
    var text = "You got " + state.score + " out of " +
        state.questions.length + " questions right.";
    element.text(text);
};

// Event handlers
var PAGE_ELEMENTS = {
    'start': $('.start-page'),
    'question': $('.question-page'),
    'answer-feedback': $('.answer-feedback-page'),
    'final-feedback': $('.final-feedback-page')
};

$("form[name='game-start']").submit(function(event) {
    event.preventDefault();
    setRoute(state, 'question');
    renderApp(state, PAGE_ELEMENTS);
});

$(".restart-game").click(function(event) {
    event.preventDefault();
    resetGame(state);
    renderApp(state, PAGE_ELEMENTS);
});

$("form[name='current-question']").submit(function(event) {
    event.preventDefault();
    var answer = $("input[name='user-answer']:checked").val();
    answer = parseInt(answer, 10);
    answerQuestion(state, answer);
    renderApp(state, PAGE_ELEMENTS);
});

$(".see-next").click(function(event) {
    advance(state);
    renderApp(state, PAGE_ELEMENTS);
});

$(function() { renderApp(state, PAGE_ELEMENTS); });