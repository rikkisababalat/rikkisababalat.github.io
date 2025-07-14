        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'observasi', name: 'Monitor dan Observasi', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🧐</div></div>`, description: 'Pendekatan untuk pasien stabil dengan bradikardia tanpa gejala.', analysis: 'SANGAT TEPAT. Pasien asimtomatik dan hemodinamik stabil (TD 130/90 mmHg). Tidak ada indikasi intervensi darurat. Langkah pertama adalah observasi dan mencari penyebab yang mendasari.' },
                { id: 'atropin', name: 'Sulfas Atropin IV', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Obat pilihan pertama untuk meningkatkan laju jantung pada bradikardia simtomatik.', analysis: 'TIDAK TEPAT. Atropin digunakan untuk bradikardia yang menyebabkan gejala (simtomatik). Karena pasien ini asimtomatik dan stabil, pemberian atropin tidak diperlukan.' },
                { id: 'pacemaker', name: 'Transcutaneous Pacemaker', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">❤️‍🩹</div></div>`, description: 'Pacu jantung sementara melalui kulit untuk bradikardia yang tidak stabil.', analysis: 'TIDAK TEPAT. Pacing hanya diindikasikan untuk bradikardia yang simtomatik dan tidak stabil (menyebabkan pusing, pingsan, nyeri dada, atau hipotensi). Pasien ini stabil.' },
                { id: 'kristaloid', name: 'Loading IV Kristaloid', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Pemberian cairan infus untuk mengatasi dehidrasi atau hipotensi.', analysis: 'TIDAK TEPAT. Tekanan darah pasien 130/90 mmHg, tidak hipotensi. Pemberian cairan tidak akan mengatasi bradikardia dan tidak diindikasikan pada pasien ini.' },
                { id: 'kardioversi', name: 'Kardioversi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Prosedur untuk mengembalikan irama jantung yang cepat (takikardia).', analysis: 'SANGAT TIDAK TEPAT. Kardioversi diindikasikan untuk takiaritmia (irama cepat), bukan bradiaritmia (irama lambat). Ini akan sangat berbahaya.' }
            ],
            quiz: [
                { question: "Berdasarkan gambaran EKG dan laju nadi 48x/menit, diagnosis irama jantung pasien adalah...", options: ["Takikardia Sinus", "Fibrilasi Atrium", "Bradikardia Sinus", "Blok Jantung Derajat III"], answer: "Bradikardia Sinus" },
                { question: "Tanda vital manakah yang paling utama menunjukkan bahwa pasien ini berada dalam kondisi 'bradikardia'?", options: ["Tekanan Darah 130/90 mmHg", "Laju Nadi 48x/menit", "Laju Napas 22x/menit", "Suhu Afebris"], answer: "Laju Nadi 48x/menit" },
                { question: "Mengapa pemberian Sulfas Atropin tidak diindikasikan pada pasien ini?", options: ["Karena tekanan darahnya tinggi", "Karena pasien tidak demam", "Karena pasien asimtomatik dan stabil", "Karena laju napasnya cepat"], answer: "Karena pasien asimtomatik dan stabil" },
                { question: "Intervensi seperti pemasangan Transcutaneous Pacemaker (TCP) dipertimbangkan jika pasien bradikardia menunjukkan...", options: ["Hanya laju nadi < 50x/menit", "Tanda-tanda ketidakstabilan hemodinamik", "Datang untuk medical check-up", "Memiliki riwayat penyakit jantung"], answer: "Tanda-tanda ketidakstabilan hemodinamik" },
                { question: "Apakah langkah manajemen yang paling tepat untuk pasien ini?", options: ["Segera lakukan kardioversi", "Berikan loading cairan IV", "Pasang pacemaker darurat", "Monitor dan observasi lebih lanjut"], answer: "Monitor dan observasi lebih lanjut" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan dengan Kasus:</h4>
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
                    label: 'Tingkat Ketepatan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Ketepatan (0-10)', font: { size: 14 } } },
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