const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Hypertext Markup Language",
        choiceB : "Hyper Tech Machine Learning",
        choiceC : "Hey, That's My Lunch",
        correct : "A"
    },{
        question : "How many days in a week?",
        choiceA : "5",
        choiceB : "7",
        choiceC : "All of them",
        correct : "B"
    },{
        question : "Whats 5 *5 ?",
        choiceA : "10",
        choiceB : "50",
        choiceC : "25",
        correct : "C"
    },{
        question : "What does JS stand for?",
        choiceA : "JasonStatham",
        choiceB : "JavaScript",
        choiceC : "JambaScript",
        correct : "B"
    },{
        question : "What's the answer?",
        choiceA : "This   ",
        choiceB : "No, This",
        choiceC : "Not this",
        correct : "C"
    },{
        question : "How many seasons in a year?",
        choiceA : "4          ",
        choiceB : "12         ",
        choiceC : "6 seasons and a movie",
        correct : "A"
    },{
        question : "Who wrote and recorded'Fade To Black'?",
        choiceA : "ACDC",
        choiceB : "The Temptations",
        choiceC : "Metallica",
        correct : "C"
    },{
        question : "What color is grass?",
        choiceA : "Green",
        choiceB : "White",
        choiceC : "Blue",
        correct : "A"
    },{
        question : "What does the T in T-rex stand for?",
        choiceA : "Titanic",
        choiceB : "Tyrannosaurus",
        choiceC : "Triceratops",
        correct : "B"
    },{
        question : "What question is this?",
        choiceA : "9",
        choiceB : "12",
        choiceC : "10",
        correct : "C"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;

        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{

            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}