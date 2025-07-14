        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'demensia-alzheimer', name: 'Demensia Alzheimer', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Penyakit neurodegeneratif progresif yang ditandai dengan penurunan memori dan fungsi kognitif secara perlahan.', analysis: 'KURANG SESUAI. Onset pada pasien ini terkait dengan kejadian neurologis akut (stroke) dan disertai defisit motorik fokal. Alzheimer biasanya berkembang secara gradual tanpa pemicu yang jelas.' },
                { id: 'demensia-vaskular', name: 'Demensia Vaskular', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Penurunan fungsi kognitif yang disebabkan oleh penyakit serebrovaskular (stroke atau gangguan aliran darah otak).', analysis: 'SANGAT SESUAI. Adanya riwayat hipertensi tidak terkontrol, kelemahan mendadak (stroke), dan defisit neurologis fokal yang diikuti oleh penurunan kognitif adalah gambaran klasik dari Demensia Vaskular.' },
                { id: 'penyakit-picks', name: 'Penyakit Pick’s', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">😡</div></div>`, description: 'Bentuk demensia frontotemporal yang ditandai dengan perubahan kepribadian, perilaku, dan bahasa.', analysis: 'TIDAK SESUAI. Gejala utama pasien adalah apraxia (gangguan motorik terencana), bukan perubahan kepribadian atau disinhibisi sosial yang menjadi ciri khas Penyakit Pick.' },
                { id: 'delirium', name: 'Delirium', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">😵</div></div>`, description: 'Gangguan kesadaran akut dan fluktuatif, sering disebabkan oleh kondisi medis lain.', analysis: 'TIDAK SESUAI. Pasien memiliki kesadaran compos mentis (tidak terganggu) dan onset keluhan kognitifnya subakut (1 bulan), bukan akut dan fluktuatif dalam hitungan jam atau hari.' },
                { id: 'demensia-lewy-bodies', name: 'Demensia Lewy Bodies', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">👻</div></div>`, description: 'Demensia dengan gejala parkinsonisme, halusinasi visual, dan fluktuasi kognitif.', analysis: 'KURANG SESUAI. Pasien tidak menunjukkan gejala inti seperti tremor, halusinasi visual, atau fluktuasi kesadaran yang dilaporkan dalam anamnesis.' }
            ],
            quiz: [
                { question: "Apa faktor risiko utama yang dimiliki pasien yang mengarahkan pada diagnosis Demensia Vaskular?", options: ["Usia lanjut", "Jenis kelamin laki-laki", "Hipertensi tidak terkontrol", "Suhu afebris"], answer: "Hipertensi tidak terkontrol" },
                { question: "Temuan riwayat penyakit manakah yang paling spesifik menunjuk ke arah penyebab vaskular?", options: ["Sering lupa selama 1 bulan", "Kelemahan lengan dan tungkai kiri mendadak", "Tidak diketahui riwayat gula darah", "Dibawa oleh keluarga ke poli"], answer: "Kelemahan lengan dan tungkai kiri mendadak" },
                { question: "Temuan pada pemeriksaan fisik yang mendukung adanya kerusakan otak struktural adalah...", options: ["Tekanan darah 150/90 mmHg", "Nadi 82x/menit", "Kesadaran compos mentis", "Kekuatan motorik kiri 4/4"], answer: "Kekuatan motorik kiri 4/4" },
                { question: "Mengapa 'Delirium' dapat disingkirkan sebagai diagnosis utama?", options: ["Karena tekanan darahnya tinggi", "Karena tidak ada riwayat gula darah", "Karena kesadaran pasien penuh dan onsetnya tidak akut", "Karena tidak ada tremor"], answer: "Karena kesadaran pasien penuh dan onsetnya tidak akut" },
                { question: "Berdasarkan semua gejala dan temuan, diagnosis apakah yang paling akurat?", options: ["Demensia Alzheimer", "Demensia Vaskular", "Penyakit Pick’s", "Demensia Lewy Bodies"], answer: "Demensia Vaskular" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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