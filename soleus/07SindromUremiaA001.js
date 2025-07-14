        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'belum-hd', name: 'Belum memerlukan hemodialisis', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Menunda tindakan terapi pengganti ginjal.', analysis: 'TIDAK TEPAT. Pasien menunjukkan gejala uremia yang mengancam jiwa (penurunan kesadaran). Penundaan hemodialisis sangat berbahaya dan dapat berakibat fatal.' },
                { id: 'hipertensi', name: 'Hipertensi stage 2', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🩺</div></div>`, description: 'Tekanan darah sistolik ≥140 mmHg atau diastolik ≥90 mmHg.', analysis: 'KURANG TEPAT. Hipertensi adalah penyebab yang mendasari penyakit ginjal pasien, bukan indikasi untuk dialisis. Komplikasi dari gagal ginjal (seperti uremia) adalah indikasinya, bukan hipertensi itu sendiri.' },
                { id: 'hiperkalemia', name: 'Hiperkalemia', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Kadar kalium dalam darah yang terlalu tinggi.', analysis: 'TIDAK SESUAI. Kadar kalium pasien adalah 4,0 mEq/L, yang berada dalam batas normal. Hiperkalemia berat adalah indikasi cito HD, namun tidak ditemukan pada pasien ini.' },
                { id: 'overload', name: 'Overload Cairan', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Akumulasi cairan berlebih di dalam tubuh.', analysis: 'CUKUP SESUAI. Adanya edema tungkai bilateral dan takipnea (RR 28x/menit) menunjukkan overload cairan. Ini adalah indikasi yang valid untuk HD, namun gejala uremik lebih mendesak pada kasus ini.' },
                { id: 'uremia', name: 'Sindrom Uremia', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Kumpulan gejala akibat akumulasi toksin karena gagal ginjal.', analysis: 'SANGAT SESUAI. Kombinasi gejala neurologis (penurunan kesadaran, bicara kacau) dengan azotemia berat (Ureum 240, Kreatinin 9.2) adalah definisi klasik sindrom uremia. Ini merupakan indikasi absolut dan paling utama untuk hemodialisis segera.' },
            ],
            quiz: [
                { question: "Gejala manakah yang paling menunjukkan adanya ensefalopati uremik pada pasien ini?", options: ["Edema tungkai", "Konjungtiva anemis", "Penurunan kesadaran dan bicara kacau", "Tekanan darah tinggi"], answer: "Penurunan kesadaran dan bicara kacau" },
                { question: "Manakah dari hasil lab berikut yang menjadi dasar diagnosis sindrom uremia?", options: ["Hb 8.4", "Kalium 4.0", "Ureum 240 dan Kreatinin 9.2", "TD 170/100 mmHg"], answer: "Ureum 240 dan Kreatinin 9.2" },
                { question: "Mengapa 'Hiperkalemia' bukan menjadi indikasi HD pada kasus ini?", options: ["Karena pasien tidak sesak napas", "Karena kadar kalium pasien dalam batas normal", "Karena tekanan darahnya tinggi", "Karena kadar ureum sudah sangat tinggi"], answer: "Karena kadar kalium pasien dalam batas normal" },
                { question: "Adanya edema tungkai bilateral pada pasien ini menandakan komplikasi apa?", options: ["Anemia", "Hipertensi", "Ensefalopati", "Overload cairan"], answer: "Overload cairan" },
                { question: "Singkatan 'AEIOU' sering digunakan untuk mengingat indikasi dialisis. Huruf 'U' pada singkatan tersebut merujuk pada...", options: ["Urin yang sedikit", "Ureum > 100", "Uremia", "Usia tua"], answer: "Uremia" }
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Urgensi (0-10)', font: { size: 14 } } },
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