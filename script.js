//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "What is the full form of html?",
        options: ["Hyper Text Markup Language", "Hybrid text markup Language", "Hypothesis Text Markup Language", "Hyper test Markup language"],
        correct: "Hyper Text Markup Language",
    },
    {
        id: "1",
        question: "Why we use br tag and button tag in html?",
        options: ["Defines a multiline break,Defines a clickable button", "Defines a single line break , Defines a clickable button", "Defines a single line break, Defines a unclickable button", "none of the above"],
        correct: "Defines a single line break , Defines a clickable button",
    },
    {
        id: "2",
        question: "Who is the inventor of html(first version)",
        options: ["Tim Berners-Lee in 1993", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Tim Berners-Lee in 1993",
    },
    {
        id: "3",
        question: "How you will represent the progress of a task?",
        options: ["by using q tag", "by using s tag", "by using sub tag", "by using progress tag"],
        correct: "by using progress tag",
    },
    {
        id: "4",
        question: "which tag is used to add javascript to the html?",
        options: ["script", "Script", "style", "Style"],
        correct: "script",
    },
    {
        id: "5",
        question: "which tag is used to draw graphics,on the fly,via scripting (usually javascript)?",
        options: ["Canvas", "col", "cite", "canvas"],
        correct: "canvas",
    }, {
        id: "6",
        question: "In which tag we will place the area tag to work?",
        options: ["maps", " map", "Map", "map"],
        correct: "map",
    },
    {
        id: "7",
        question: "what is the extension for the html file:",
        options: [".html", ".jshtml", ".csshtml", ".htmls"],
        correct: ".html",
    },
    {
        id: "8",
        question: "Pick out the odd one:",
        options: ["a tag", "abbr tag", "br tag", "bolt tag"],
        correct: "bolt tag",
    },
    {
        id: "9",
        question: "define legend tag?",
        options: ["balayya", "thokki padestha", "Defines a caption for the field set element", "navvindhi chalu ans pettu"],
        correct: "Defines a caption for the field set element",
    },
];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;

        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
            if(questionCount==1){
                alert(questionCount+1);
                displayContainer.style.background='blue';
            }
            else if(questionCount>2){
                displayContainer.style.background='pink';
            }
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};