        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'grade-1', name: 'Ruptur Perineum Grade I', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-100"><div class="w-12 h-12 rounded-full flex items-center justify-center text-xl">🩹</div></div>`, description: 'Robekan hanya melibatkan mukosa vagina dan/atau kulit perineum.', analysis: 'TIDAK SESUAI. Kasus ini melibatkan robekan yang jauh lebih dalam, yaitu sampai ke otot sfingter ani, sehingga Grade I dapat disingkirkan.' },
                { id: 'grade-2', name: 'Ruptur Perineum Grade II', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 rounded-full flex items-center justify-center text-xl">🤕</div></div>`, description: 'Robekan melibatkan otot perineum namun tidak mengenai sfingter ani.', analysis: 'TIDAK SESUAI. Pemeriksaan fisik dengan jelas menyebutkan adanya keterlibatan sfingter ani, yang membuat diagnosis ini tidak cukup.' },
                { id: 'grade-3a', name: 'Ruptur Perineum Grade IIIA', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 rounded-full flex items-center justify-center text-xl">🩸</div></div>`, description: 'Robekan mengenai sfingter ani eksterna dengan kerusakan <50% dari ketebalannya.', analysis: 'KURANG TEPAT. Diagnosis ini sudah mengarah ke keterlibatan sfingter, namun tidak mencakup kerusakan pada sfingter ani interna yang ditemukan pada pasien.' },
                { id: 'grade-3b', name: 'Ruptur Perineum Grade IIIB', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 rounded-full flex items-center justify-center text-xl">🚨</div></div>`, description: 'Robekan mengenai sfingter ani eksterna dengan kerusakan >50% dari ketebalannya.', analysis: 'KURANG TEPAT. Meskipun ini adalah cedera sfingter yang parah, diagnosis ini tidak menyebutkan keterlibatan sfingter ani interna yang merupakan temuan kunci pada kasus ini.' },
                { id: 'grade-3c', name: 'Ruptur Perineum Grade IIIC', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 rounded-full flex items-center justify-center text-xl">✅</div></div>`, description: 'Robekan melibatkan sfingter ani eksterna dan interna.', analysis: 'SANGAT SESUAI. Definisi Grade IIIC secara presisi menjelaskan temuan pada pasien, yaitu adanya robekan pada kedua sfingter ani (eksterna dan interna).' }
            ],
            quiz: [
                { question: "Struktur apa yang paling menentukan dalam membedakan ruptur perineum Grade II dan Grade III?", options: ["Kulit perineum", "Otot perineum", "Sfingter ani", "Mukosa vagina"], answer: "Sfingter ani" },
                { question: "Pada kasus ini, temuan kunci yang mengarahkan diagnosis ke Grade IIIC adalah...", options: ["Perdarahan aktif", "Tanda vital normal", "Robekan pada sfingter eksterna dan interna", "Riwayat persalinan per vaginam"], answer: "Robekan pada sfingter eksterna dan interna" },
                { question: "Sebuah robekan yang hanya sampai ke otot perineum tanpa mengenai sfingter diklasifikasikan sebagai?", options: ["Grade I", "Grade II", "Grade IIIA", "Grade IV"], answer: "Grade II" },
                { question: "Apa yang membedakan ruptur Grade IIIC dengan Grade IV?", options: ["Keterlibatan sfingter interna", "Jumlah perdarahan", "Keterlibatan mukosa rektum", "Keterlibatan otot perineum"], answer: "Keterlibatan mukosa rektum" },
                { question: "Berdasarkan analisis kasus, diagnosis yang paling akurat adalah?", options: ["Ruptur Perineum Grade II", "Ruptur Perineum Grade IIIB", "Ruptur Perineum Grade IIIC", "Ruptur Perineum Grade IV"], answer: "Ruptur Perineum Grade IIIC" }
            ]
        };

        const { diagnoses, quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(diagnosisId) {
            const diagnosis = diagnoses.find(d => d.id === diagnosisId);
            if (!diagnosis) return;
            detailsContainer.innerHTML = `
                <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 ease-in-out">
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        ${diagnosis.vizIconHtml}
                        <div class="flex-1 text-center md:text-left">
                            <h3 class="text-2xl font-bold text-emerald-800">${diagnosis.name}</h3>
                            <p class="text-slate-600 mt-1">${diagnosis.description}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-200">
                        <h4 class="font-semibold text-slate-700">Analisis Kecocokan dengan Kasus:</h4>
                        <p class="text-slate-600 mt-1">${diagnosis.analysis}</p>
                    </div>
                </div>
            `;
            document.querySelectorAll('#diagnosis-nav button').forEach(btn => {
                btn.classList.toggle('nav-button-active', btn.dataset.id === diagnosisId);
                btn.classList.toggle('nav-button-inactive', btn.dataset.id !== diagnosisId);
            });
        }

        function createNav() {
            diagnoses.forEach(diagnosis => {
                const button = document.createElement('button');
                button.textContent = diagnosis.name;
                button.dataset.id = diagnosis.id;
                button.className = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
                button.onclick = () => renderDetails(diagnosis.id);
                navContainer.appendChild(button);
            });
        }

        function createChart() {
            const ctx = document.getElementById('matchChart').getContext('2d');
            const data = {
                labels: diagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#10b981' : (d.matchScore >= 5 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 5 ? '#d97706' : '#dc2626')),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            };
            if(chart) { chart.destroy(); }
            chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kecocokan (0-10)', font: { size: 14 } } },
                        y: { ticks: { font: { size: 12 } } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => ` Skor: ${context.parsed.x}` } }
                    }
                }
            });
        }
        
        const quizContainer = document.getElementById('quiz-container');
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswer = null;

        function loadQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
            
            const quizHeader = quizContainer.querySelector('#quiz-header');
            const quizBody = quizContainer.querySelector('#quiz-body');
            const quizFooter = quizContainer.querySelector('#quiz-footer');
            const resultContainer = quizContainer.querySelector('#result-container');
            
            if (quizHeader) quizHeader.classList.remove('hidden');
            if (quizBody) quizBody.classList.remove('hidden');
            if (quizFooter) quizFooter.classList.remove('hidden');
            if (resultContainer) resultContainer.classList.add('hidden');
            
            loadQuestion();
        }

        function loadQuestion() {
            selectedAnswer = null;
            const currentQuestion = quizData[currentQuestionIndex];
            const quizBody = quizContainer.querySelector('#quiz-body');
            quizBody.innerHTML = `
                <h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2>
                <div id="options-container" class="space-y-3">
                    ${currentQuestion.options.map(option => `
                        <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
            updateProgress();
            
            const nextBtn = quizContainer.querySelector('#next-btn');
            if(nextBtn) nextBtn.disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedAnswer = button.textContent.trim();
                    if(nextBtn) nextBtn.disabled = false;
                });
            });
        }
        
        function updateProgress() {
            const questionCounter = quizContainer.querySelector('#question-counter');
            const progressBar = quizContainer.querySelector('#progress-bar');
            if(questionCounter) questionCounter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
            if(progressBar) {
                const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
                progressBar.style.width = `${progressPercentage}%`;
            }
        }

        function showResults() {
            const progressBar = quizContainer.querySelector('#progress-bar');
            if (progressBar) progressBar.style.width = '100%';

            quizContainer.querySelector('#quiz-header').classList.add('hidden');
            quizContainer.querySelector('#quiz-body').classList.add('hidden');
            quizContainer.querySelector('#quiz-footer').classList.add('hidden');
            
            const resultContainer = quizContainer.querySelector('#result-container');
            resultContainer.classList.remove('hidden');

            const scoreText = resultContainer.querySelector('#score-text');
            scoreText.textContent = `${score}/${quizData.length}`;

            const feedbackText = resultContainer.querySelector('#feedback-text');
            let feedback = "Kerja bagus!";
            const percentage = (score / quizData.length) * 100;
            if (percentage < 50) {
                feedback = "Mungkin perlu meninjau kembali materinya.";
            } else if (percentage < 80) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman yang luar biasa!";
            }
            feedbackText.textContent = feedback;
        }

        quizContainer.addEventListener('click', (e) => {
            if (e.target.id === 'next-btn') {
                if (selectedAnswer === null) return;
                const isCorrect = selectedAnswer === quizData[currentQuestionIndex].answer;
                if (isCorrect) { score++; }
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            } else if (e.target.id === 'restart-btn') {
                loadQuiz();
            }
        });
        
 window.onload = () => {
            createNav();
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };
