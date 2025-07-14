        // Data kasus dengan 5 diagnosis banding sesuai permintaan
        const caseData = {
            diagnoses: [
                { id: 'stemi-anteroseptal', name: 'STEMI Anteroseptal', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🧡</div></div>`, description: 'Infark miokard terbatas pada dinding depan dan sekat antar bilik jantung.', analysis: 'SESUAI, TAPI KURANG LENGKAP. Diagnosis ini benar untuk ST elevasi di V1-V4, tetapi tidak menjelaskan adanya ST elevasi di V5-V6 yang menunjukkan perluasan ke dinding lateral.' },
                { id: 'nstemi', name: 'NSTEMI', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Infark miokard akibat sumbatan parsial arteri koroner, tanpa elevasi ST yang persisten.', analysis: 'TIDAK SESUAI. Temuan EKG yang paling menonjol pada kasus ini adalah ST elevasi, sehingga diagnosis NSTEMI tidak dapat ditegakkan.' },
                { id: 'stemi-anterolateral', name: 'STEMI Anterolateral', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">💔</div></div>`, description: 'Infark miokard akibat sumbatan total arteri koroner yang mendarahi dinding depan dan samping jantung.', analysis: 'SANGAT SESUAI. Gejala, peningkatan Troponin, dan ST elevasi di V1-V6 secara klasik menunjukkan infark luas pada dinding anterolateral. Ini adalah diagnosis yang paling tepat dan komprehensif.' },
                { id: 'unstable-angina', name: 'Unstable Angina', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">😥</div></div>`, description: 'Nyeri dada iskemik saat istirahat tanpa adanya kerusakan otot jantung.', analysis: 'TIDAK SESUAI. Adanya peningkatan enzim Troponin secara definitif menyingkirkan diagnosis angina tidak stabil dan memastikan telah terjadi infark (kerusakan otot jantung).' },
                { id: 'stemi-lateral', name: 'STEMI Lateral', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-teal-200"><div class="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-3xl">❤️‍🩹</div></div>`, description: 'Infark miokard terbatas pada dinding samping (lateral) jantung.', analysis: 'KURANG LENGKAP. Diagnosis ini hanya menjelaskan ST elevasi di V5-V6. Ini mengabaikan temuan yang lebih dominan di lead V1-V4, sehingga tidak mencakup seluruh luasnya infark.' }
            ],
            quiz: [
                { question: "Temuan EKG 'ST elevasi di lead V1-V6' paling spesifik menunjukkan sumbatan pada arteri koroner mana?", options: ["Right Coronary Artery (RCA)", "Left Circumflex Artery (LCx)", "Proximal Left Anterior Descending (LAD)", "Distal Left Anterior Descending (LAD)", "Posterior Descending Artery (PDA)"], answer: "Proximal Left Anterior Descending (LAD)" },
                { question: "Apa yang membedakan STEMI dari NSTEMI pada kasus ini?", options: ["Adanya nyeri dada", "Peningkatan enzim Troponin", "Adanya ST elevasi pada EKG", "Usia pasien", "Jenis kelamin pasien"], answer: "Adanya ST elevasi pada EKG" },
                { question: "Peningkatan enzim Troponin pada pasien ini menandakan...", options: ["Iskemia reversibel", "Nekrosis (kematian) sel otot jantung", "Peradangan perikardium", "Gangguan irama jantung", "Kelelahan otot dada"], answer: "Nekrosis (kematian) sel otot jantung" },
                { question: "Mengapa 'Unstable Angina' BUKAN diagnosis yang tepat?", options: ["Karena nyerinya tidak hilang istirahat", "Karena enzim Troponin meningkat", "Karena pasien sudah tua", "Karena EKG normal", "Karena tekanan darah normal"], answer: "Karena enzim Troponin meningkat" },
                { question: "Berdasarkan semua temuan, diagnosis apakah yang paling akurat dan komprehensif?", options: ["STEMI anteroseptal", "NSTEMI", "STEMI anterolateral", "Unstable angina", "STEMI lateral"], answer: "STEMI anterolateral" }
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Paling Cocok
                        if (d.matchScore >= 5) return '#34d399'; // Cukup Cocok
                        if (d.matchScore >= 3) return '#facc15'; // Kurang Cocok
                        return '#f87171'; // Tidak Cocok
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 5) return '#059669';
                        if (d.matchScore >= 3) return '#eab308';
                        return '#ef4444';
                    }),
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