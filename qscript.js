const quizData = [
    {
        question: "How do you insert COMMENTS in Python code?",
        a: "/ This is a comment",
        b: "#This is a comment",
        c: "/*This is a comment*/",
        d: "//This is a comment",
        correct: "b"
    },
    {
        question: "Which CSS property controls the text size?",
        a: "font-size",
        b: "text-size",
        c: "text-style",
        d: "font-style",
        correct: "a"
    },
    {
        question: "What is the most used programming language?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "What does HTML stand for?",
        a: "Hyperlinks and Text Markup Language",
        b: "Hyper Text Markup Language",
        c: "Home Tool Markup Language",
        d: "none of the above",
        correct: "b"
    },
    {
        question: "What is the output for 5//2 in python?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "b"
    }
];

const frontPage = document.getElementById('front-page');
const quizPage = document.getElementById('quiz-page');
const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');

let currentQuestion = 0;
let score = 0;

// Function to load the quiz
function loadQuiz() {
    const quizQuestion = quizData[currentQuestion];
    
    quiz.innerHTML = `
        <div class="question">${quizQuestion.question}</div>
        <label>
            <input type="radio" name="answer" value="a">
            ${quizQuestion.a}
        </label><br>
        <label>
            <input type="radio" name="answer" value="b">
            ${quizQuestion.b}
        </label><br>
        <label>
            <input type="radio" name="answer" value="c">
            ${quizQuestion.c}
        </label><br>
        <label>
            <input type="radio" name="answer" value="d">
            ${quizQuestion.d}
        </label>
    `;
    
    // Show/hide navigation buttons based on the question number
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
}

nextBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        // Save the answer and go to the next question
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        loadQuiz();
    } else {
        alert('Please select an answer before proceeding.');
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuiz();
    }
});

// Function to get selected answer
function getSelected() {
    const answers = document.getElementsByName('answer');
    let answer;
    
    answers.forEach((ans) => {
        if (ans.checked) {
            answer = ans.value;
        }
    });

    return answer;
}

// Handle start button click - Show quiz page
startBtn.addEventListener('click', () => {
    frontPage.classList.add('hide');
    quizPage.classList.remove('hide');
    loadQuiz();
});

// Handle submit button click
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        
        quiz.innerHTML = '';
        result.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Restart Quiz</button>
        `;
    } else {
        alert('Please select an answer before submitting.');
    }
});
