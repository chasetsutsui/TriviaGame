//button click event to remove start button to start the game
$(".btn-outline-success").on("click", function () {
    $(".btn-outline-success").remove();
    //calling the function to load the question
    game.loadQuestion();
    //calling a function when a button is clicked to determine a right or wrong answer
    $(document).on("click", ".answer-button", function (e) {
        game.click(e);
    })
    //calling a function to reset the game
    $(document).on("click", "#start-over", function () {
        game.restart();
    })


})
//array of trivia questions, wrong answers and answer
var trivia = [{
    question: "What famous musican makes an appearance in the show's first episode?",
    answers: ["Ozzy Osbourne", "Kid Rock", "Sting", "Kanye West"],
    correctAnswer: "Kid Rock",
    image: "<img src = assets/images/kidrock.gif>"
}, {
    question: "Which of the shows characters was the original developer for Pied Piper",
    answers: ["Gilfoyle", "Dinesh", "Big Head", "Richard"],
    correctAnswer: "Richard",
    image: "<img src = assets/images/richard.gif>"
}, {
    question: "What is the name of the company that Erlich created and sold for a small fortune?",
    answers: ["Avacodo", "Avaiter", "Aviato", "Nip-Alert"],
    correctAnswer: "Aviato",
    image: "<img src = assets/images/erlich.gif>"
}, {
    question: "What does Jian Yang refer to Erlich as?",
    answers: ["Eric", "Arron", "Jerrick", "Derek"],
    correctAnswer: "Eric",
    image: "<img src = assets/images/jian.gif>"
}, {
    question: "What device did Gilfoyle hack that inadvertenly saved Pied Piper from crashing?",
    answers: ["Smart Phone", "Smart Refrigerator", "Smart TV", "Xbox"],
    correctAnswer: "Smart Refrigerator",
    image: "<img src = assets/images/gilfoyle.gif>"
}, {
    question: "What is Jared's real name?",
    answers: ["Donald", "Robert", "John", "Jerrald"],
    correctAnswer: "Donald",
    image: "<img src = assets/images/jared.gif>"
}, {
    question: "Who is the obnoxious billionair that invests in Pied Piper after Raviga?",
    answers: ["Peter", "Russ", "Gavin", "John"],
    correctAnswer: "Russ",
    image: "<img src = assets/images/russ.gif>"
}, {
    question: "How did Russ Hanneman originally make his fortune?",
    answers: ["Real Estate", "IP Lawsuits", "Radio Internet", "Inheritance"],
    correctAnswer: "Radio Internet",
    image: "<img src = assets/images/russ0.gif>"
}, {



}];
//declaring an object to store the games data
var game = {
    questions: trivia,
    currentQuestion: 0,
    counter: 15,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("Times Up!")
            game.timeUp();
        }
    },
    //function to load questions
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $(".content").html("<h2 id='counter'>15</h2>");
        $(".content").append("<h2>" + trivia[game.currentQuestion].question + "<h2>");

        for (var i = 0; i < trivia[game.currentQuestion].answers.length; i++) {

            $('.content').append('<br> <br> <br> <button class="btn btn-success answer-button" id="button-' + i + '"data-name="' + trivia[game.currentQuestion].answers[i] + '">' + trivia[game.currentQuestion].answers[i] + '</button>');

        }
    },

    //function to determine right/wrong answers
    click: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") === trivia[game.currentQuestion].correctAnswer) {
            game.rightAnswer();
        }
        else {
            game.wrongAnswer();
        }

    },

    //function to progress to a new question
    newQuestion: function () {
        game.counter = 15;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },

    //function to run when user selects a correct answer
    rightAnswer: function () {
        console.log("correct");
        clearInterval(timer);
        game.correct++;
        $(".content").html("<h2>Correct Answer!</h2>");
        $(".content").append(trivia[game.currentQuestion].image);
        if (game.currentQuestion === trivia.length - 2) {
            setTimeout(game.score, 2 * 1000)
        }
        else {
            setTimeout(game.newQuestion, 4 * 1000)
        }

    },

    //function to run when user selects wrong answer
    wrongAnswer: function () {
        console.log("incorrect");
        clearInterval(timer);
        game.incorrect++;
        $(".content").html("<h2>Wrong Answer!</h2>");
        $(".content").append(trivia[game.currentQuestion].image);
        $(".content").append("<h2> The Correct Answer Was: " + trivia[game.currentQuestion].correctAnswer + "<h2>");
        if (game.currentQuestion === trivia.length - 2) {
            setTimeout(game.score, 2 * 1000)
        }
        else {
            setTimeout(game.newQuestion, 4 * 1000)
        }

    },

    //function to run when time runs out for a user guess
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $(".content").html("<h2>Times Up!</h2>");
        $(".content").append("<h2> The Correct Answer Was: " + trivia[game.currentQuestion].correctAnswer + "</h2>");
        $(".content").append(trivia[game.currentQuestion].image);
        if (game.currentQuestion === trivia.length - 2) {
            setTimeout(game.score, 2 * 1000)
        }
        else {
            setTimeout(game.newQuestion, 4 * 1000)
        }

    },

    //function to run to show user results
    score: function () {
        clearInterval(timer);
        $(".content").html("<h2>Trivia Finished!</h2>");
        $(".content").append("<h2> Unanswered: " + game.unanswered + "</h2>");
        $(".content").append("<h2> Correct Answers: " + game.correct + "</h2>");
        $(".content").append("<h2> Wrong Answers: " + game.incorrect + "</h2>");
        $(".content").append("<button class='btn btn-success' id='start-over'>Start Over</button>");

    },

    //function to start the game over
    restart: function () {
        game.counter = 15;
        game.incorrect = 0;
        game.correct = 0;
        game.currentQuestion = 0;
        game.unanswered = 0;
        game.loadQuestion();


    },



}