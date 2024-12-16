const quizCategories = {
    cultuur: [
        {
            question: "Wat is de bijnaam van FC Groningen?",
            options: ["De Trots van het Noorden", "De Groene Draak", "De Noorderlingen", "De Stadjes"],
            correct: 0
        },
        {
            question: "Welk bekend festival wordt jaarlijks in Groningen gehouden?",
            options: ["Eurosonic Noorderslag", "Lowlands", "Pinkpop", "Zwarte Cross"],
            correct: 0
        },
        {
            question: "Welk museum is een architectonisch hoogstandje in Groningen?",
            options: ["Groninger Museum", "Noordelijk Scheepvaartmuseum", "Nederlands Stripmuseum", "Universiteitsmuseum"],
            correct: 0
        }
    ],
    geschiedenis: [
        {
            question: "In welk jaar kreeg Groningen stadsrechten?",
            options: ["1040", "1245", "1140", "1345"],
            correct: 2
        },
        {
            question: "Wie bevrijdde Groningen in 1945?",
            options: ["De Canadezen", "De Amerikanen", "De Britten", "De Polen"],
            correct: 0
        },
        {
            question: "Wat was de bijnaam van Groningen in de middeleeuwen?",
            options: ["Villa Gruoninga", "Stad van het Noorden", "De Martinistad", "Het Athene van het Noorden"],
            correct: 0
        }
    ],
    dialect: [
        {
            question: "Wat betekent 'Hou ist?'",
            options: ["Hoe gaat het?", "Waar is het?", "Hoe laat is het?", "Wat is dat?"],
            correct: 0
        },
        {
            question: "Wat betekent 'Goud goan!'?",
            options: ["Tot ziens!", "Goed gedaan!", "Veel succes!", "Ga door!"],
            correct: 2
        },
        {
            question: "Wat is een 'lutje potje'?",
            options: ["Klein kind", "Klein potje", "Klein beetje", "Klein huis"],
            correct: 1
        }
    ],
    eten: [
        {
            question: "Wat is Groninger mosterdsoep?",
            options: ["Soep met Groninger mosterd", "Een dikke erwtensoep", "Een koude soep", "Een vissoep"],
            correct: 0
        },
        {
            question: "Wat zijn 'Groninger Eierkoeken'?",
            options: ["Zoete broodjes", "Hartige koeken", "Cake", "Koekjes met ei"],
            correct: 0
        },
        {
            question: "Welke drank is typisch Gronings?",
            options: ["Fladderak", "Jenever", "Beerenburg", "Brandewijn"],
            correct: 0
        }
    ]
};

let currentCategory = 'cultuur';
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Event listeners voor categorie knoppen
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update actieve categorie
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Start nieuwe quiz
        currentCategory = button.dataset.category;
        startNewQuiz();
    });
});

function startNewQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuiz = quizCategories[currentCategory][currentQuestion];

    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = '';

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });

    document.getElementById('result').textContent = '';
    document.getElementById('submit-btn').disabled = false;
}

function selectOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedOption = index;
}

function checkAnswer() {
    if (selectedOption === null) return;

    const options = document.querySelectorAll('.quiz-option');
    const correct = quizCategories[currentCategory][currentQuestion].correct;

    if (selectedOption === correct) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
        options[selectedOption].classList.add('correct');
    } else {
        document.getElementById('result').textContent = 'Helaas, dat is niet juist.';
        options[selectedOption].classList.add('wrong');
        options[correct].classList.add('correct');
    }

    document.getElementById('submit-btn').disabled = true;
    setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
    selectedOption = null;
    currentQuestion++;

    if (currentQuestion < quizCategories[currentCategory].length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    const quizElement = document.getElementById('quiz');
    quizElement.innerHTML = `
        <h3>Quiz Afgelopen!</h3>
        <p id="score">Je score: ${score} van de ${quizCategories[currentCategory].length}</p>
        <button onclick="restartQuiz()" id="submit-btn">Opnieuw Proberen</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    loadQuestion();
}

// Start de quiz wanneer de pagina is geladen
document.addEventListener('DOMContentLoaded', loadQuestion);
document.getElementById('submit-btn').addEventListener('click', checkAnswer); 