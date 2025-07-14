        // Data kasus telah diperbarui dengan 5 opsi
        const caseData = {
            diagnoses: [
                 { id: 'nyha-1', name: 'NYHA I', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">👍</div></div>`, description: 'Tidak ada keterbatasan aktivitas fisik.', analysis: 'TIDAK SESUAI. Pasien jelas memiliki keterbatasan yang signifikan, yang bertentangan dengan definisi Kelas I.' },
                 { id: 'nyha-2', name: 'NYHA II', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🚶‍♀️</div></div>`, description: 'Keterbatasan aktivitas fisik ringan.', analysis: 'TIDAK CUKUP. NYHA II terjadi pada aktivitas fisik biasa (misal: naik tangga 2 lantai, berjalan cepat). Keluhan pasien timbul pada "aktivitas ringan", yang menunjukkan keterbatasan yang lebih parah dari Kelas II.' },
                 { id: 'nyha-3', name: 'NYHA III', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">😮‍💨</div></div>`, description: 'Keterbatasan aktivitas fisik yang nyata.', analysis: 'SANGAT SESUAI. Pasien nyaman saat istirahat, namun aktivitas yang lebih ringan dari biasanya (seperti "aktivitas ringan") sudah menyebabkan kelelahan atau sesak napas. Ini cocok sekali dengan skenario.' },
                 { id: 'nyha-4', name: 'NYHA IV', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🛌</div></div>`, description: 'Tidak dapat melakukan aktivitas fisik tanpa rasa tidak nyaman.', analysis: 'KURANG SESUAI. Pasien dengan NYHA IV mengalami gejala bahkan saat istirahat. Kasus ini menyatakan pasien hanya sesak saat beraktivitas, meskipun ringan.' },
                 { id: 'nyha-5', name: 'NYHA V', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Di luar Klasifikasi Standar NYHA.', analysis: 'TIDAK ADA/TIDAK SESUAI. Klasifikasi fungsional NYHA untuk gagal jantung hanya terdiri dari kelas I hingga IV. Kelas V tidak ada dalam pedoman klinis yang digunakan secara umum dan merupakan pilihan yang salah.' }
            ],
            quiz: [
                 { question: "Pada kasus ini, sesak napas saat beraktivitas ringan namun nyaman saat istirahat mengarahkan pada klasifikasi...", options: ["NYHA I", "NYHA II", "NYHA III", "NYHA IV", "NYHA V"], answer: "NYHA III" },
                 { question: "Apa istilah medis untuk keluhan pasien yang harus tidur dengan 2-3 bantal agar tidak sesak?", options: ["Dispnea", "Ortopnu", "PND (Paroxysmal Nocturnal Dyspnea)", "Apnea", "Tachyapnea"], answer: "Ortopnu" },
                 { question: "Manakah dari temuan fisik berikut yang paling kuat menunjukkan adanya penumpukan cairan (kongesti) di paru-paru?", options: ["TD 150/110 mmHg", "JVP meningkat", "Pitting edema", "Ronkhi basah halus", "Hepatojugular reflux"], answer: "Ronkhi basah halus" },
                 { question: "Riwayat hipertensi tidak terkontrol adalah faktor risiko utama untuk kondisi apa?", options: ["Asma Bronkial", "Gagal Jantung", "Penyakit Paru Obstruktif Kronik", "Anemia", "Gagal Ginjal"], answer: "Gagal Jantung" },
                 { question: "Pemeriksaan JVP meningkat dan pitting edema lebih menunjukkan adanya komponen...", options: ["Gagal jantung kiri murni", "Gagal jantung kanan", "Gagal napas akut", "Syok kardiogenik", "Infeksi paru"], answer: "Gagal jantung kanan" }
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
                        if (d.matchScore >= 8) return '#059669'; // very likely
                        if (d.matchScore >= 4) return '#34d399'; // possible
                        if (d.matchScore >= 1) return '#a7f3d0'; // unlikely
                        return '#e2e8f0'; // not applicable
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46';
                        if (d.matchScore >= 4) return '#059669';
                        if (d.matchScore >= 1) return '#6ee7b7';
                        return '#94a3b8';
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