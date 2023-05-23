const questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        answer: [
            {text: "HyperText Markup Language", correct: true},
            {text: "High Text Markup Language", correct: false},
            {text: "High Text Markdown Language", correct: false},
            {text: "None of the above", correct: false},

        ]
    },
    {
        question: "Which of the following is correct about HTML?",
        answer: [
            {text: "HTML can only use the tags defined within the language.", correct: true},
            {text: "HTML uses USer Defined Tags", correct: false},
            {text: "Both A and B", correct: false},
            {text:  "None of the above", correct: false},
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answer: [
            {text: "h3", correct: false},
            {text: "h5", correct: false},
            {text: "h6", correct: true},
            {text: "h1", correct: false},
        ]
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        answer: [
            {text: "5", correct: false},
            {text: "1", correct: false},
            {text: "3", correct: false},
            {text: "6", correct: true},
        ]
    }
];

// add another variables in this html file i have added this is (question, answer-button, next-btn)so willl add the variable for all these three element.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//now whenever we start the quix and give ans. this ques. number and their score will be changing, so will create variables to store the question index and score :

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answer.forEach(answer => {
       const button = document.createElement("button"); 
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
     const selectBtn = e.target;
     const isCorrect = selectBtn.dataset.correct === "true";
     if(isCorrect){
        selectBtn.classList.add("correct");
        score++;   //it will increse the score by 1 
     }else{
        selectBtn.classList.add("incorrect");
     }
     Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     })
     nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

// we need the question number also so if the index is zero question numbwe will be 1 if the index is 1, ques.no. will be two , so here i have added (currentQuestionIndex + 1)
