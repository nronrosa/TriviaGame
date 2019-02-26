$(document).ready(function () {
    // set variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    var qIndex = 0;
    var correctAnswer = "";
    var tip = "";
    var seconds = 6;
    var intervalId;
    var userAnswer;
    var didUserPlay;

    // var object array for questions
    // nested answer array?
    var questions = [
        {
            q: "Which house is Harry Potter in?",
            choices: ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
            answer: 2,
            tip: ""
        },
        {
            q: "What position did Harry Potter play on the Gryffindor Quidditch team?",
            choices: ["Keeper", "Chaser", "Beater", "Seeker"],
            answer: 3,
            tip: ""
        },
        {
            q: "What was Harry Potter’s owl called?",
            choices: ["Errol", "Hermes", "Hedwig", "Pidwidgeon"],
            answer: 2,
            tip: ""
            // },
        }
        // {
        // q: "Which house is Draco Malfoy in?",
        // choices: ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"],
        // answer: 3,
        // tip: ""
        // },
        // {
        // q: "What was Voldemort’s pet snake called?",
        // choices: ["Basilisk", "Nagini", "Nora", "Scabbers"],
        // answer: 1,
        // tip: ""
        // },
        // {
        // q: "Who was Harry Potter’s godfather?",
        // choices: ["Sirius Black", "Ron Weasley", "Albus Dumbledore", "Severus Snape"],
        // answer: 0,
        // tip: ""
        // },
        // {
        // q: "What creature is depicted in the emblem for Gryffindor house?",
        // choices: ["Snake", "Badger", "Lion", "Eagle"],
        // answer: 2,
        // tip: ""
        // },
        // {
        // q: "What form does Harry Potter’s Patronus take?",
        // choices: ["Otter", "Horse", "Phoenix", "Stag"],
        // answer: 3,
        // tip: ""
        // },
        // {
        // q: "Who did Harry Potter marry at the end of the last book?",
        // choices: ["Ginny Weasley", "Luna Lovegood", "Cho Chang", "Hermione Granger"],
        // answer: 0,
        // tip: ""
        // },
        // {
        // q: "How many horcruxes did Voldemort have?",
        // choices: ["Seven", "Five", "Eleven", "Three"],
        // answer: 0,
        // tip: ""
        // },
    ]

    // start button visible when page loads
    // once clicked it hides
    $(".start").on("click", function () {
        $("#button").hide();
        // game();
        startCount();
        displayQandA();
    });

    // displayQandA();
    function displayQandA() {
        // console.log("q1 " + questions[qIndex].q);
        // console.log("a1 " + questions[qIndex].choices[0]);
        $(".questions").text(questions[qIndex].q);
        $("#0").text(questions[qIndex].choices[0]);
        $("#1").text(questions[qIndex].choices[1]);
        $("#2").text(questions[qIndex].choices[2]);
        $("#3").text(questions[qIndex].choices[3]);
    }



    // // did user select correct answer
    $(".choicesA").on("click", function () {
        debugger;

        didUserPlay = true;
        console.log("ChoicesA onclick timerIsOn: " + timer_is_on);
        correctAnswer = questions[qIndex].answer;
        // console.log("rightanswer " + questions[qIndex].answer);
        userAnswer = $(this).attr("id");
        console.log("what did user click " + userAnswer + " the right answer is " + correctAnswer);
        if (userAnswer == correctAnswer) {
            correct++;
            stopCount();
            clearQ();
            answerCount();

            $(".results-correct").text("Correct!");
            $(".results-incorrect").text("");
            $(".results-missed").text("");
            console.log("correct" + correct);
            console.log("right answer / count it as right / reset timer / move to next question");

        }
        else {
            incorrect++;
            stopCount();
            clearQ();
            answerCount();
            $(".results-correct").text("");
            $(".results-incorrect").text("INcorrect!");
            $(".results-missed").text("");
            console.log("wrong answer/ count as wrong/reset timer / move to next question");

        }

    });



    var c = 15;
    var t;
    var timer_is_on = 0;
    function timedCount() {
        $(".timer").text("Time Remaining: " + c);
        if (c === 0) {
            nextQ();
        }
        else {
            c--;
            t = setTimeout(timedCount, 1000);
        }
    }
    function answerCount() {
        if (!timer_is_on) {
            timer_is_on = 1;
            c = 3;
            timedCount();
        }
    }
    function startCount() {
        if (!timer_is_on) {
            timer_is_on = 1;
            c = 10;
            timedCount();
        }
    }
    function stopCount() {
        clearTimeout(t);
        timer_is_on = 0;
    }


    function nextQ() {
        debugger;
        qIndex++;
        if (c === 0 && didUserPlay === false) {
            missed++;
            stopCount();

            $(".results-correct").text("");
            $(".results-incorrect").text("");
            $(".results-missed").text("You missed.");
            // ...initiate the stop function.
            // $(".results-correct").append(questions[qIndex].choices[userAnswer]);
            clearQ();

            // debugger;

        }
        // if end of array end the game
        else if (qIndex >= questions.length && didUserPlay) {

            // display gameboard AND start over button
            $(".results-correct").text("Number of Correct answers: " + correct);
            $(".results-incorrect").text("Number of Incorrect answers: " + incorrect);
            $(".results-missed").text("Number of Missed answers: " + missed);
            clearQ();
            // stopCount();
        }
        else {

            // if array is still in play continue game 
            console.log("time up for this question / move on to next")
            // timedCount ();
            displayQandA();
            c = 10;
            timedCount();
        
        }


    }










    // // endGame do you want to start over?
    function endGame() {
        clearQ();
        correct = 0;
        incorrect = 0;
        missed = 0;
        qIndex = 0;
        $(".results").text("");

    }
    // // Clears all variables etc.
    function clearQ() {
        $(".questions").text("");
        $("#0").text("");
        $("#1").text("");
        $("#2").text("");
        $("#3").text("");
        $(".timer").text("");
    }


    // // did user select correct answer
    // $(".choicesA").on("click", function () {
    //     debugger;
    //     correctAnswer = questions[qIndex].answer;
    //     // console.log("rightanswer " + questions[qIndex].answer);
    //     var userAnswer = $(this).attr("id");
    //     console.log("what did user click " + userAnswer + " the right answer is " + correctAnswer);
    //     if (userAnswer == correctAnswer) {
    //         correct++;
    //         $(".results").text("Correct!");
    //         console.log("correct" + correct);
    //         // timerRun();

    //         // seconds = 0;
    //         // game();
    //         console.log("right answer / count it as right / reset timer / move to next question");
    //     }
    //     else {
    //         incorrect++;

    //         // clearTimeout(timerRun);
    //         // timerRun();
    //         // seconds = 0;
    //         console.log("wrong answer/ count as wrong/reset timer / move to next question");
    //     }
    //     game();

    // });




    // // starts the timer
    // function timerRun() {
    //     clearInterval(intervalId);
    //     intervalId = setInterval(timer, 1000);
    // }


    // function stop() {
    //     // Clears our intervalId // We just pass the name of the interval // to the clearInterval function.
    //     clearInterval(intervalId);
    //     seconds = 0;
    // }



    // // timer countdown
    // function timer() {
    //     // Decrease by one.
    //     seconds--;
    //     // display the seconds
    //     $(".timer").text("Time Remaining: " + seconds);
    //     // Once number hits zero...
    //     if (seconds === 0) {
    //         missed++;
    //         // ...initiate the stop function.
    //         stop();
    //         // debugger;
    //         qIndex++;
    //         // if end of array end the game
    //         if (qIndex >= questions.length) {
    //             // display gameboard AND start over button
    //             $(".results-correct").text("Number of Correct answers: " + correct);
    //             $(".results-incorrect").text("Number of Incorrect answers: " + incorrect);
    //             $(".results-missed").text("Number of Missed answers: " + missed);
    //             clearQ();

    //         }
    //         else {
    //             // if array is still in play continue game 
    //             game();
    //             console.log("time up for this question / move on to next")
    //         }

    //     }
    // }




    // function game() {
    //         // debugger;
    //     displayQandA(); 
    //     timerRun();
    //     seconds = 6;

    // }

    // // endGame do you want to start over?
    // function endGame() {
    //     clearQ();
    //     correct = 0;
    //     incorrect = 0;
    //     missed = 0;
    //     qIndex = 0;
    //     $(".results").text("");

    // }
    // // Clears all variables etc.
    // function clearQ() {
    //     $(".questions").text("");
    //     $("#0").text("");
    //     $("#1").text("");
    //     $("#2").text("");
    //     $("#3").text("");
    //     $(".timer").text("");
    // }




    // **********************************
    // end of doc.ready



});
