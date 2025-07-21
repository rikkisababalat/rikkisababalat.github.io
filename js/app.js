// app.js - Main application logic (loaded deferred)

// Case Data - Moved to top for easy access
const caseData = {
    diagnoses: [
        { 
            id: 'meningitis-tb', 
            name: 'Meningitis TB', 
            matchScore: 10, 
            description: 'Infeksi selaput otak oleh Mycobacterium tuberculosis.', 
            analysis: 'SANGAT TEPAT. Kombinasi gejala subakut (demam >2 minggu), tanda rangsang meningeal, dan profil CSF (pleositosis limfositik, protein tinggi, glukosa rendah) sangat klasik untuk Meningitis TB. Ini adalah diagnosis kerja utama.' 
        },
        // ... other diagnoses ...
    ],
    quiz: [
        { 
            question: "Berdasarkan keseluruhan data klinis, apakah diagnosis yang paling mungkin?", 
            options: ["Meningitis TB", "Meningitis Bakterial Akut", "Meningitis Viral", "Stroke", "Ensefalitis"], 
            answer: "Meningitis TB" 
        },
        // ... other quiz questions ...
    ]
};

// DOM Elements - Cached for performance
const elements = {
    navContainer: document.getElementById('diagnosis-nav'),
    detailsContainer: document.getElementById('diagnosis-details'),
    conclusionSection: document.getElementById('conclusion'),
    startQuizBtn: document.getElementById('start-quiz-btn'),
    quizHomeBox: document.getElementById('quiz-home-box'),
    quizBox: document.getElementById('quiz-box'),
    quizOverBox: document.getElementById('quiz-over-box'),
    // ... other elements ...
};

// State Management
const appState = {
    clickedDiagnoses: new Set(),
    quizState: {
        currentQuestionIndex: 0,
        score: 0,
        attempt: 0,
        questionOrder: [],
        interval: null,
        timePerQuestion: 30
    }
};

// Initialization
function initApp() {
    if (!elements.navContainer) return;
    
    shuffleArray(caseData.diagnoses);
    createNav();
    createProgressUI();
    setupEventListeners();
    
    elements.startQuizBtn.disabled = true;
}

// Core Functions
function createNav() {
    caseData.diagnoses.forEach(diagnosis => {
        const button = document.createElement('button');
        button.textContent = diagnosis.name;
        button.dataset.id = diagnosis.id;
        button.className = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
        button.onclick = () => renderDetails(diagnosis.id);
        elements.navContainer.appendChild(button);
    });
}

function renderDetails(diagnosisId) {
    const diagnosis = caseData.diagnoses.find(d => d.id === diagnosisId);
    if (!diagnosis) return;

    // Track clicked diagnoses
    if (!appState.clickedDiagnoses.has(diagnosisId)) {
        appState.clickedDiagnoses.add(diagnosisId);
        updateProgressUI();
    }

    // Show conclusion if all diagnoses viewed
    if (appState.clickedDiagnoses.size === caseData.diagnoses.length) {
        setTimeout(() => elements.conclusionSection.classList.remove('hidden'), 300);
    }

    // Render diagnosis details
    elements.detailsContainer.innerHTML = createDiagnosisHTML(diagnosis);
    animateDetailsContainer();
    updateNavButtons(diagnosisId);
}

function createDiagnosisHTML(diagnosis) {
    const scoreColor = getScoreColor(diagnosis.matchScore);
    return `
        <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div class="text-center md:text-left">
                <h3 class="text-2xl font-bold text-emerald-800">${diagnosis.name}</h3>
                <p class="text-slate-600 mt-1">${diagnosis.description}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200">
                <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
                <p class="text-slate-600 mt-1 mb-4">${diagnosis.analysis}</p>
                <div>
                    <h5 class="text-sm font-semibold text-slate-600 mb-1">Skor Relevansi: 
                        <span class="font-bold text-black">${diagnosis.matchScore} / 10</span>
                    </h5>
                    <div class="w-full bg-slate-200 rounded-full h-2.5">
                        <div class="h-2.5 rounded-full" style="width: ${(diagnosis.matchScore / 10) * 100}%; background-color: ${scoreColor};"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Quiz Functions
function initQuiz(time) {
    appState.quizState.timePerQuestion = time;
    elements.quizHomeBox.classList.add('hidden');
    elements.quizBox.classList.remove('hidden');
    resetQuizState();
    loadQuestion();
}

function loadQuestion() {
    const { currentQuestionIndex, questionOrder } = appState.quizState;
    const questionIndex = questionOrder[currentQuestionIndex];
    const currentQuestion = caseData.quiz[questionIndex];
    
    // Update UI
    elements.questionTextElement.textContent = currentQuestion.question;
    elements.questionCounter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${caseData.quiz.length}`;
    
    // Render options
    elements.optionsContainer.innerHTML = '';
    shuffleArray(currentQuestion.options).forEach(optionText => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.className = 'option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium';
        button.onclick = () => checkAnswer(button, optionText, currentQuestion.answer);
        elements.optionsContainer.appendChild(button);
    });
    
    startTimer();
}

function checkAnswer(selectedButton, selectedText, correctAnswerText) {
    const { quizState } = appState;
    
    stopTimer();
    quizState.attempt++;
    disableOptions();
    
    if (selectedText === correctAnswerText) {
        selectedButton.classList.add('correct');
        quizState.score++;
        elements.scoreBoardElement.textContent = quizState.score;
    } else {
        selectedButton.classList.add('incorrect');
        highlightCorrectAnswer(correctAnswerText);
    }
    
    showNextButton();
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getScoreColor(score) {
    if (score >= 8) return '#10b981';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
}

// Event Listeners
function setupEventListeners() {
    // Quiz controls
    elements.startQuizBtn?.addEventListener('click', () => {
        elements.startQuizBtn.classList.add('hidden');
        elements.timeSelectionBox.classList.remove('hidden');
    });
    
    elements.timeKilatBtn?.addEventListener('click', () => initQuiz(10));
    elements.timeNormalBtn?.addEventListener('click', () => initQuiz(30));
    elements.timeSantaiBtn?.addEventListener('click', () => initQuiz(60));
    
    elements.nextQuestionBtn?.addEventListener('click', showNextQuestion);
    elements.seeResultBtn?.addEventListener('click', showResults);
    elements.startAgainBtn?.addEventListener('click', resetQuizUI);
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);