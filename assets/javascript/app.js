$(document).ready(function () {
    // set variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    var qIndex = 0;
    var correctAnswer = "";
    var note = "";
    var userAnswer;
    var didUserPlay;
    var answerTransitionTimer;

    // var object array for questions
    var questions = [
        {
            q: "Which house is Harry Potter in?",
            choices: ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
            answer: 2,
            note: "Harry Potter did indeed choose to be in Gryffindor, and as much as he influenced the Sorting Hat’s decision, it should be noted that Harry would never have been placed in a House where he did not fit in or did not display the main character traits needed to be in that House."
        },
        {
            q: "What position did Harry Potter play on the Gryffindor Quidditch team?",
            choices: ["Keeper", "Chaser", "Beater", "Seeker"],
            answer: 3,
            note: "McGonagall  witnessed Harry’s impressive dive and catch when Malfoy throws Nevilles Rememberall into the air. Recognising a natural Seeker’s talent in Harry, McGonagall to the captain of the Gryffindor Quidditch team, as a new potential seeker."
        },
        {
            q: "What was Harry Potter’s owl called?",
            choices: ["Errol", "Hermes", "Hedwig", "Pidwidgeon"],
            answer: 2,
            note: "Hagrid bought Hedwig in Diagon Alley as Harry’s eleventh birthday present. Hedwig had a feisty spirit and was Harry's protector as well as messenger."
            // },
        }
        // {
        // q: "What is a muggle?",
        // choices: ["Hagrid's pet that everyone is afraid of", "Hogwart's pet cat", "Person who has no magical ability", "Person who has magical ability"],
        // answer: 2,
        // note: "Person who lacks any sort of magical ability and was not born in a magical family."
        // },
        // {
        // q: "What was Voldemort’s pet snake called?",
        // choices: ["Basilisk", "Nagini", "Nora", "Scabbers"],
        // answer: 1,
        // note: "Nagini is Voldemort's pet snake whom he also used as one of his horcruxes."
        // },
        // {
        // q: "Who was Harry Potter’s godfather?",
        // choices: ["Sirius Black", "Ron Weasley", "Albus Dumbledore", "Severus Snape"],
        // answer: 0,
        // note: "Harry's father, James Potter, was best friends with Sirius Black. They were close throughout their time at Hogwarts, closer even to each other than they were to their other two close friends Remus Lupin and Peter Pettigrew. ... Thus, James and Lily named Sirius as Harry's godfather."
        // },
        // {
        // q: "What creature is depicted in the emblem for Gryffindor house?",
        // choices: ["Snake", "Badger", "Lion", "Eagle"],
        // answer: 2,
        // note: "Daring, nerve, and chivalry, Gryffindor is also known for bravery. Their animal is a lion."
        // },
        // {
        // q: "What form does Harry Potter’s Patronus take?",
        // choices: ["Otter", "Horse", "Phoenix", "Stag"],
        // answer: 3,
        // note: "James Potter, Harry's fater, was also an Animagus who could take the form of a large stag. "
        // },
        // {
        // q: "Who did Harry Potter marry at the end of the last book?",
        // choices: ["Ginny Weasley", "Luna Lovegood", "Cho Chang", "Hermione Granger"],
        // answer: 0,
        // note: "Harry Potter married Ginny Weasley his best friend, Ron Weasley's sister."
        // },
        // {
        // q: "How many horcruxes did Voldemort have?",
        // choices: ["Seven", "Five", "Eleven", "Three"],
        // answer: 0,
        // note: "Horcruxes are objects used by Voldemort to conceal parts of his soul and tether him to life. They can only be created after committing murder."
        // },
    ];
    // start button visible when page loads
    // once clicked it hides
    $(".start").on("click", function () {
        $("#button").hide();
        startCount();
        displayQandA();
    });
    // displayQandA();
    function displayQandA() {
        $(".questions").text(questions[qIndex].q);
        $("#0").text(questions[qIndex].choices[0]);
        $("#1").text(questions[qIndex].choices[1]);
        $("#2").text(questions[qIndex].choices[2]);
        $("#3").text(questions[qIndex].choices[3]);
    };


    // // did user select correct answer
    $(".choicesA").on("click", function () {
        debugger;
        didUserPlay = true;
        correctAnswer = questions[qIndex].answer;
        userAnswer = $(this).attr("id");
        if (userAnswer == correctAnswer) {
            correct++;
            stopCount();
            clearQ();
            $(".results-correct").text("Correct!");
            $(".results-incorrect").text("");
            $(".results-missed").text("");
            $(".note").text(questions[qIndex].note);
        }
        else {
            incorrect++;
            stopCount();
            clearQ();
            $(".results-correct").text("");
            $(".results-incorrect").text("INcorrect!");
            $(".results-missed").text("");
            $(".note").text(questions[qIndex].note);
        }
        didUserPlay = false;
        answerTransitionTimer = setTimeout(nextQ, 3000);
    });


    var seconds = 10;
    var t;
    var timer_is_on = 0;
    function timedCount() {
        $(".timer").text("Time Remaining: " + seconds);
        if (seconds === 0 && didUserPlay === false) {
            missed++;
            nextQ();
        }
        else {
            seconds--;
            t = setTimeout(timedCount, 1000);
        }
    };

    function startCount() {
        if (!timer_is_on) {
            timer_is_on = 1;
            seconds = 10;
            timedCount();
        }
    };
    function stopCount() {
        clearTimeout(t);
        timer_is_on = 0;
    };

    function nextQ() {
        debugger;
        qIndex++;
        clearQ();
        answerTransitionTimer = 0;
        // if end of array end the game
        if (qIndex >= questions.length) {
            // display gameboard AND start over button
            $(".results-correct").text("Number of Correct answers: " + correct);
            $(".results-incorrect").text("Number of Incorrect answers: " + incorrect);
            $(".results-missed").text("Number of Missed answers: " + missed);
            // create play again button
            var a = $("<button>");
            // Adding a class
            a.addClass("btn btn-dark");
            // Adding a data-attribute with a value of the movie at index i
            // a.attr("data-name", "play-again");
            // Providing the button's text with a value of the movie at index i
            // a.text("play again?");
            // // Adding the button to the HTML
            // $("#results-missed").append(a);


            // $("#play-again").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
        }
        else {
            // if array is still in play continue game 
            clearResults();
            displayQandA();
            seconds = 10;
            timedCount();
        }
    };

    // clear results
    function clearResults() {
        $(".results-correct").text("");
        $(".results-incorrect").text("");
        $(".results-missed").text("");
    };

    // // endGame do you want to start over?
    function endGame() {
        clearQ();
        correct = 0;
        incorrect = 0;
        missed = 0;
        qIndex = 0;
        clearResults();
    };

    // // Clears all variables etc.
    function clearQ() {
        $(".questions").text("");
        $("#0").text("");
        $("#1").text("");
        $("#2").text("");
        $("#3").text("");
        $(".timer").text("");
        $(".note").text("");
        
    };

    // **********************************
    // end of doc.ready


});
