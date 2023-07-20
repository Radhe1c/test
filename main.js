const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizeSelection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainbtn = document.querySelector('.tryagain-btn')
const goTobtn = document.querySelector('.goto-btn')


startBtn.onclick =()=>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick =()=>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick =()=>{
    quizeSelection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore()
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;


const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick =()=>{
    if(questionCount<questions.length - 1){
    questionCount++;
     showQuestions(questionCount);

     questionNumb++;
     questionCounter(questionNumb); 

     nextBtn.classList.remove('active')
    
    }
    else{
        console.log(' question complete')
        showresultBox();
    }
     
}

// getting question and option from array
const optionList = document.querySelector('.option-list');
function showQuestions(index){
    const questionText = document.querySelector('.question-text ');
    questionText.textContent =`${questions[index].numb}. ${questions[index].question} `;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');

    }

}

function optionSelected(answer) {
    let userAnswer = answer.textContent;   
    let correctAnswer = questions[questionCount].answer;
    let allOption = optionList.children.length

    if(userAnswer == correctAnswer){
        answer.classList.add('correct')
        userScore += 1;
        headerScore()
    }
    else{
        answer.classList.add('incorrect')
        //if answer is incorrected than selected auto correct
        //id selected option,disable all option
    for(let i=0; i<allOption;i++)
    if(optionList.children[i].textContent==correctAnswer){
        optionList.children[i].setAttribute('class','option correct')
    }
    }

    //id selected option,disable all option
   for(let i=0; i<allOption;i++)
    optionList.children[i].classList.add('disable')

    nextBtn.classList.add('active')

}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} questions`;

}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`
}

function showresultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active')

    const ScoreText = document.querySelector('.score-text');
    ScoreText.textContent = `Your Score ${userScore} Out Of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore/questions.length)*100;
    let speed= 20;

    let progress = setInterval(() => {
        progressStartValue++;

        
        progressValue.textContent=`${progressStartValue}%`;

        circularProgress.style.background = `conic-gradient(#78c400 ${progressStartValue * 3.6}deg , rgba(255, 255, 255, 0.1) 0deg)`

        if(progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}

tryAgainbtn.onclick =()=>{
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore()
}

goTobtn.onclick =()=>{
    quizeSelection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore()
}