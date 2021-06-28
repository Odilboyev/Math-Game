// global variables
const question = document.getElementById('question')
const answer = document.getElementById('answer')
const cases = document.getElementsByClassName('case');
const levelSpan = document.getElementById('level');
const levelSpan2 = document.getElementById('level2');
let level = 1
const modal = document.getElementById('myModal')
let seconds = 10
const timer = document.getElementById('timer')
const time = document.getElementById('time')
var intervalId = null;

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

// <interval>
const interval = () => { 
    seconds--
    timer.innerHTML = seconds
    time.style.width = `${seconds}0%`
    if(seconds === 0){
        modal.classList.remove('d-none')
        clearInterval(intervalId);
    }
}
intervalId = setInterval(interval, 1000);
// </interval>


const getRandomNumber = () => {
    return Math.floor(Math.random() * 50) + 1
}
const setNumber = () => {

    // <question-and-True-answer>
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const sign = Math.floor(Math.random() * 100) % 2 + 1;

    const questionString = `${a} ${sign==1 && '+' || '-'} ${b}`
    question.innerHTML = questionString
    const trueAnswer = eval(questionString);
    let casesArray = [trueAnswer]
    // </question-and-True-answer>

    // <wrong-answer>
    while (casesArray.length < 4) {
        let randomNumber = getRandomNumber();
        if (casesArray.indexOf(randomNumber) == -1) {
            casesArray.push(randomNumber)
        }
    }
    let case2 = getRandomNumber()
    let case3 = getRandomNumber()
    let case4 = getRandomNumber()
    // </wrong-answer>

    // <displaying-answers>
    casesArray = shuffle(casesArray)
    for (let i = 0; i < 4; i++) {
        cases[i].classList.remove('success')
        cases[i].classList.remove('error')
        cases[i].innerHTML = casesArray[i]
        cases[i].onclick = (event) => check(event.target, casesArray[i], trueAnswer)
    }
    // </displaying-answers>
}

setNumber()

// <check-answer>
const check = (box, number, trueAnswer) => {
    box.classList.remove('success')
    box.classList.remove('error')
    console.log(box)
    if (number == trueAnswer) {
        box.classList.add('success')
        seconds += 3
        setNumber()
        level++;
        levelSpan.innerText = level
        levelSpan2.innerText = level

    } else {
        box.classList.add('error')
        modal.classList.remove('d-none')
        clearInterval(intervalId);
        intervalId = null;
    }
}
// </check-answer>

// <refresh>
const reFresh = () => {
    // level = 1
    // modal.classList.add('d-none')
    // seconds = 11
    // setNumber()
    // setInterval(interval, 1000);
    window.location.reload();
}
// </refresh>