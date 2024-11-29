let url;
let catExp;
let diffExp;
let typeExp;
let questionArray;
let count = -1;
let gameStart = false;
let ansOptInArr = [];
let randomNumArr = [];
let questionLocalArray = [];
let liOne, liTwo, liThree, liFour;
let optOne, optTwo, optThree, optFour;
let tFOne, tFTwo;
let userAnswer;
let userSelectedAnsLi;
let timerInterval;
let myTimerCountDown;
let scoreCount = 0;
let gameOverText;
let restartBtn;
let modifiedQuestion;
let newVal;
let quesStr;

let category = document.querySelector("#category");
let difficulty = document.querySelector("#difficulty");
let type = document.querySelector("#type");
let startBtn = document.querySelector("#start_btn");
let firstTag = document.querySelector(".first_tag");
let secondTag = document.querySelector(".second_tag");
let imageSecondTag = document.querySelector(".image_second_tag");
let questionCount = document.querySelector(".question_count");
let question = document.querySelector(".question");
let answerOptions = document.querySelector(".answer_options");
let submitBtn = document.querySelector(".submit_btn");
let timeCountDown = document.querySelector(".time_countdown");
let scoreCountSpan = document.querySelector(".score_count")
let gameArea = document.querySelector(".game_area");

let categoryOptions = document.querySelector("#category_options");
let difficultyOptions = document.querySelector("#difficulty_options");
let typeOptions = document.querySelector("#type_options");


//API function
async function getQues () {
    try {
        url = urlSetter();

        let res = await fetch(url)

        let data = await res.json();

        questionArray = await data.results;

        return questionArray;
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

function urlSetter () {

    url = "https://opentdb.com/api.php?amount=10";

    catExp = category.value;
    diffExp = difficulty.value;
    typeExp = type.value;

    switch (catExp) {
        case 'Any Category':
            url += "";
        break;
        case 'General Knowledge':
            url += "&category=9";
        break;
        case  'Entertainment: Books':
            url += "&category=10";
        break;
        case  'Entertainment: Film':
            url += "&category=11";
        break;
        case  'Entertainment: Music':
            url += "&category=12";
        break;
        case  'Entertainment: Musicals & Theatres':
            url += "&category=13";
        break;
        case  'Entertainment: Television':
            url += "&category=14";
        break;
        case  'Entertainment: Video Games':
            url += "&category=15";
        break;
        case  'Entertainment: Board Games':
            url += "&category=16";
        break;
        case  'Science & Nature':
            url += "&category=17";
        break;
        case  'Science: Computers':
            url += "&category=18";
        break;
        case  'Science: Mathematics':
            url += "&category=19";
        break;
        case  'Mythology':
            url += "&category=20";
        break;
        case  'Sports':
            url += "&category=21";
        break;
        case  'Geography':
        url += "&category=22";
        break;
        case  'History':
        url += "&category=23";
        break;
        case  'Politics':
        url += "&category=24";
        break;
        case  'Art':
        url += "&category=25";
        break;
        case  'Celebrities':
        url += "&category=26";
        break;
        case  'Animals':
        url += "&category=27";
        break;
        case  'Vehicles':
        url += "&category=28";
        break;
        case  'Entertainment: Comics':
        url += "&category=29";
        break;
        case  'Science: Gadgets':
        url += "&category=30";
        break;
        case  'Entertainment: Japanese Anime & Manga':
        url += "&category=31";
        break;
        case  'Entertainment: Cartoon & Animations':
        url += "&category=32";
        break;
        }

        switch (diffExp) {
            case 'Any Difficulty':
                url += "";
            break;
            case 'Easy':
                url += "&difficulty=easy";
            break;
            case 'Medium':
                url += "&difficulty=medium";
            break;
            case 'Hard':
                url += "&difficulty=hard";
            break;
        }

        switch (typeExp) {
            case 'Any Type':
                url += "";
            break;
            case 'Multiple Choice':
                url += "&type=multiple";
            break;
            case 'True / False':
                url += "&type=boolean";
            break;
        }     
        
        return url;
}

function randomFourNums () {
    let numOne = Math.floor(Math.random() * 4);
    randomNumArr.push(numOne);

    for (let i=1; i<=3; i++) {
        let numTwo = Math.floor(Math.random() * 4);
        if (randomNumArr.includes(numTwo)) {
            while (randomNumArr.includes(numTwo)) {
                numTwo = Math.floor(Math.random() * 4);
            }
        }
        randomNumArr.push(numTwo);
    }
}

//Function triggered to display MCQ options
function addOptions (idx) {

    //To reassign option values
    let optOneRaw = questionArray[idx].correct_answer;
    let optTwoRaw = questionArray[idx].incorrect_answers[0];
    let optThreeRaw = questionArray[idx].incorrect_answers[1];
    let optFourRaw = questionArray[idx].incorrect_answers[2];

    liOne = document.createElement("li");
    liTwo = document.createElement("li");
    liThree = document.createElement("li");
    liFour = document.createElement("li");

    optOne = changeQuote (optOneRaw, liOne);
    optTwo = changeQuote (optTwoRaw, liTwo);
    optThree = changeQuote (optThreeRaw, liThree);
    optFour = changeQuote (optFourRaw, liFour);

    //To push all answers in ansOptInArr
    ansOptInArr.push(optOne, optTwo, optThree, optFour);

    //To put options on random places
    liOne.classList.add("answer_list_items");
    liOne.innerText = ansOptInArr[randomNumArr[0]];

    liTwo.classList.add("answer_list_items");
    liTwo.innerText = ansOptInArr[randomNumArr[1]];

    liThree.classList.add("answer_list_items");
    liThree.innerText = ansOptInArr[randomNumArr[2]];

    liFour.innerText = ansOptInArr[randomNumArr[3]];
    liFour.classList.add("answer_list_items");

    //To show options on the screen
    answerOptions.appendChild(liOne);
    answerOptions.appendChild(liTwo);
    answerOptions.appendChild(liThree);
    answerOptions.appendChild(liFour);
}

//Function to check answer of MCQs
function checkMCQAns () {
    if (userAnswer == optOne) {
        scoreCount++;
        scoreCountSpan.innerText = scoreCount;
        userSelectedAnsLi.classList.add("right");
        console.log(`Your answer ${userAnswer} matches with the correct answer ${questionArray[count].correct_answer}`);
    } else {
        userSelectedAnsLi.classList.add("wrong");
        if(randomNumArr[0] == 0) {
            liOne.classList.add("right");
        } else if(randomNumArr[1] == 0) {
            liTwo.classList.add("right");
        } else if(randomNumArr[2] == 0) {
            liThree.classList.add("right");
        } else if(randomNumArr[3] == 0) {
            liFour.classList.add("right");
        }
        console.log(`Your answer ${userAnswer} does not match with the correct answer ${questionArray[count].correct_answer}`);
    }
}

//Function triggered to display boolean options
function addBooleanOptions (idx) {
    tFOne = questionArray[idx].correct_answer;
    tFTwo = questionArray[idx].incorrect_answers[0];

    liOne = document.createElement("li");
    liOne.classList.add("answer_list_items");
    liOne.innerText = "True";

    liTwo = document.createElement("li");
    liTwo.classList.add("answer_list_items");
    liTwo.innerText = "False";

    answerOptions.appendChild(liOne);
    answerOptions.appendChild(liTwo);
}

//Function to check answer of boolean
function checkBoolAns () {
    if (userAnswer == tFOne) {
        scoreCount++;
        scoreCountSpan.innerText = scoreCount;
        userSelectedAnsLi.classList.add("right");
        console.log(`Your answer ${userAnswer} matches with the correct answer ${questionArray[count].correct_answer}`);
    } else {
        userSelectedAnsLi.classList.add("wrong");
        if(userSelectedAnsLi == liOne) {
            liTwo.classList.add("right");
        } else {
            liOne.classList.add("right");
        }
        console.log(`Your answer ${userAnswer} does not match with the correct answer ${questionArray[count].correct_answer}`);
    }
}
function gameOver() {
    gameArea.classList.add("hide");
    gameOverText = document.createElement("h1");
    restartBtn = document.createElement("button");

    gameOverText.innerText = "OOPS... You have lost your attempts. Play Again...";
    restartBtn.innerText = "Play Again";

    gameOverText.classList.add("gameOverText");
    restartBtn.classList.add("restart_btn");

    imageSecondTag.appendChild(gameOverText);
    imageSecondTag.appendChild(restartBtn);

    restartBtn.addEventListener("click", () => {
        location.reload();
    });
}



function playTimer () {
    myTimerCountDown = 60;
    timerInterval = setInterval(() => {
        if(myTimerCountDown >= 0) {
            timeCountDown.innerText = myTimerCountDown;
            myTimerCountDown--;
        } else {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
} 


categoryOptions.classList.add("hide");
difficultyOptions.classList.add("hide");
typeOptions.classList.add("hide");

category.addEventListener("click", () => {
    categoryOptions.classList.toggle("hide");
});
difficulty.addEventListener("click", () => {
    difficultyOptions.classList.toggle("hide");
});
type.addEventListener("click", () => {
    typeOptions.classList.toggle("hide");
});



categoryOptions.addEventListener("click", (e) => {
    category.value = e.target.innerText;
    categoryOptions.classList.toggle("hide");
});

difficultyOptions.addEventListener("click", (e) => {
    difficulty.value = e.target.innerText;
    difficultyOptions.classList.toggle("hide");
});
typeOptions.addEventListener("click", (e) => {
    type.value = e.target.innerText;
    typeOptions.classList.toggle("hide");
});


startBtn.addEventListener("click", () => {
    firstTag.classList.add("hide");
    secondTag.classList.add("visible");
    if(gameStart == false) {
        count++;
        getQues();
        randomFourNums(); // needs to be called only with MCQs
        gameStart = true;
        setTimeout(playGame, 1000);
    }
});

function changeQuote (val, targetEl) {
        if ((val.includes("&quot;")) || (val.includes("&#039;")) || (val.includes("&ldquo;")) || (val.includes("&rdquo;")) || (val.includes("&Eacute;")) || (val.includes("&prime;")) || (val.includes("&ouml;")) || (val.includes("&eacute;"))) {
            newVal = val.replaceAll("&quot;", "''");
            newVal = newVal.replaceAll("&#039;", "'");
            newVal = newVal.replaceAll("&ldquo;", "“");
            newVal = newVal.replaceAll("&rdquo;", "”");
            newVal = newVal.replaceAll("&Eacute;", "É");
            newVal = newVal.replaceAll("&eacute;", "é");
            newVal = newVal.replaceAll("&prime;", "′");
            newVal = newVal.replaceAll("&ouml;", "ö");
            newVal = newVal.replaceAll("&ouml;", "ö");
        } else {
            newVal = val;
        }
        return targetEl.innerText = newVal;
}

function playGame () {
    if (count < 10) {
        questionCount.innerText = `Question ${count + 1}`;
        quesStr = questionArray[count].question;
        changeQuote(quesStr, question);
        if (questionArray[count].type == "multiple") {
            addOptions(count);
        } else if (questionArray[count].type == "boolean") {
            addBooleanOptions(count);
        }
    playTimer();
    } else {
        gameOver();
        gameOverText.innerText = `Your Score is ${scoreCount}. Play Again...`;
    }
}

answerOptions.addEventListener("click", (e) => {
    userSelectedAnsLi = e.target;
    userAnswer = e.target.innerText;
    userSelectedAnsLi.classList.add("clicked");
    console.log(userSelectedAnsLi);
});

submitBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeCountDown.innerText = myTimerCountDown;
if (questionArray[count].type == "multiple") {
    checkMCQAns();
    setTimeout(() => {
        count++;
        answerOptions.removeChild(liOne);
        answerOptions.removeChild(liTwo);
        answerOptions.removeChild(liThree);
        answerOptions.removeChild(liFour);
        liOne.innerText = "";
        liTwo.innerText = "";
        liThree.innerText = "";
        liFour.innerText = "";
        ansOptInArr.pop();
        ansOptInArr.pop();
        ansOptInArr.pop();
        ansOptInArr.pop();
        randomNumArr.pop();
        randomNumArr.pop();
        randomNumArr.pop();
        randomNumArr.pop();
        randomFourNums();
        playGame();
    }, 2000);
} else if (questionArray[count].type == "boolean"){
    checkBoolAns();
    setTimeout(() => {
        count++;
        answerOptions.removeChild(liOne);
        answerOptions.removeChild(liTwo);
        liOne.innerText = "";
        liTwo.innerText = "";
        playGame();
    }, 2000);
} 
});


