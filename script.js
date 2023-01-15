const startButton = $("start-btn");
const nextButton = $("next-btn");
const questionContainerElement = $("question-container");
const questionElement = $("question");
const answerButtonElement = $("answer-button");
let suffledQuestions, correctQuestionIndex;
let quizScore = 0;


startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () =>
{
    correctQuestionIndex++;
    setNextQuestion();
})

function startQuiz()
{
    startButton.classList.add("hide")
    suffledQuestions = questions.sort(() => Math.random() - 0.5);
    correctQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion()
{
    resetState();
    showQuestion(suffledQuestions[correctQuestionIndex]);
}


function showQuestion(question)
{
    questionElement.innerText = question.question;
    question.answers.forEach((answer) =>
    {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn")
        if (answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState()
{
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonElement.firstChild)
    {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStausClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button) =>
    {
        setStausClass(button, button.dataset.correct);
    });
    if (suffledQuestions.length > correctQuestionIndex + 1)
    {
        nextButton.classList.remove("hide");
    } else
    {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
    if (selectedButton.dataset = correct)
    {
        quizScore++;
    }
    $("right-answer").innerHTML = quizScore;
}

function setStausClass(element, correct)
{
    clearStatusClass(element);
    if (correct)
    {
        element.classList.add("correct");
    } else
    {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element)
{
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "which one of these is a javaScript framework ?",
        answers: [
            { text: "python", correct: false },
            { text: "Django", correct: false },
            { text: "Vue", correct: true },
            { text: "Eclipse", correct: false }
        ],
    },
    {
        question: "What is 2+2 ?",
        answers: [
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "3", correct: false },
            { text: "2", correct: false }
        ],
    },
    {
        question: "What is 2+2/2 ?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "3", correct: true },
            { text: "2", correct: false }
        ],
    },
    {
        question: "Who is the prime minister of india?",
        answers: [
            { text: "Yogi Adityanath", correct: false },
            { text: "Amit Sah", correct: false },
            { text: "Rahul Gandhi", correct: false },
            { text: "Narendra Modi", correct: true }
        ],
    },
]
function $(element)
{
    return document.getElementById(element);
}