
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'korotkoff-1', name: 'Korotkoff Fase 1', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl font-bold">1</div></div>`, description: 'Suara ketukan (tapping) pertama kali yang terdengar jelas.', analysis: 'SANGAT TEPAT. Ini adalah definisi standar untuk menentukan tekanan darah sistolik. Suara ini muncul saat tekanan manset turun di bawah tekanan arteri sistolik, memungkinkan darah mulai mengalir secara turbulen melalui arteri yang terkompresi.' },
                { id: 'korotkoff-2', name: 'Korotkoff Fase 2', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl font-bold">2</div></div>`, description: 'Suara menjadi lebih lembut, berdesir (swishing).', analysis: 'TIDAK TEPAT. Fase ini terjadi setelah sistolik ditentukan. Ini adalah fase transisi dan tidak digunakan sebagai patokan utama.' },
                { id: 'korotkoff-3', name: 'Korotkoff Fase 3', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl font-bold">3</div></div>`, description: 'Suara kembali menjadi lebih nyaring dan tajam (crisp).', analysis: 'TIDAK TEPAT. Fase ini juga merupakan fase transisi antara sistolik dan diastolik dan tidak digunakan sebagai patokan utama.' },
                { id: 'korotkoff-4', name: 'Korotkoff Fase 4', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl font-bold">4</div></div>`, description: 'Suara meredam secara tiba-tiba (muffling).', analysis: 'TIDAK TEPAT UNTUK SISTOLIK. Fase ini terkadang digunakan untuk menentukan diastolik pada kondisi tertentu (misal: anak-anak, kehamilan), tetapi bukan untuk sistolik.' },
                { id: 'korotkoff-5', name: 'Korotkoff Fase 5', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold">5</div></div>`, description: 'Semua suara menghilang sepenuhnya.', analysis: 'TIDAK TEPAT UNTUK SISTOLIK. Ini adalah patokan utama untuk menentukan tekanan darah diastolik pada orang dewasa. Menandai kembalinya aliran darah laminar (lancar) karena arteri tidak lagi terkompresi.' }
            ],
            quiz: [
                { question: "Fase Korotkoff yang digunakan untuk menentukan TD sistolik adalah…", options: ["Korotkoff fase 5", "Korotkoff fase 3", "Korotkoff fase 1", "Korotkoff fase 4"], answer: "Korotkoff fase 1" },
                { question: "Pada hasil 140/90 mmHg, angka '140' merepresentasikan...", options: ["Tekanan Diastolik", "Tekanan Rata-Rata", "Tekanan Nadi", "Tekanan Sistolik"], answer: "Tekanan Sistolik" },
                { question: "Tekanan darah diastolik pada orang dewasa umumnya ditentukan pada fase...", options: ["Korotkoff fase 1", "Korotkoff fase 2", "Korotkoff fase 5", "Korotkoff fase 3"], answer: "Korotkoff fase 5" },
                { question: "Berdasarkan hasil 140/90 mmHg, diagnosis yang paling mungkin untuk pasien ini adalah...", options: ["Normal", "Prahipertensi", "Hipertensi Tingkat 1", "Hipertensi Tingkat 2"], answer: "Hipertensi Tingkat 1" },
                { question: "Fakta bahwa pasien tidak memiliki keluhan (asimtomatik) menunjukkan bahwa...", options: ["Tekanan darahnya pasti normal", "Hipertensi seringkali tidak menimbulkan gejala awal", "Alat pengukur tekanan darah rusak", "Pasien pasti tidak menderita hipertensi"], answer: "Hipertensi seringkali tidak menimbulkan gejala awal" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi untuk TD Sistolik:</h4>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 10 ? '#059669' : (d.matchScore >= 5 ? '#f59e0b' : '#9ca3af')),
                    borderColor: diagnoses.map(d => d.matchScore >= 10 ? '#065f46' : (d.matchScore >= 5 ? '#b45309' : '#4b5563')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Relevansi (0-10)', font: { size: 14 } } },
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
            if (diagnoses.length > 0) {
                // Set the initial view to the correct answer.
                renderDetails('korotkoff-1');
            }
            createChart();
            loadQuiz();
        };