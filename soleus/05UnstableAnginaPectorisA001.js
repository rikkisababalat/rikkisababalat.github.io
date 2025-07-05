        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'stable-angina', name: 'Angina Pectoris Stabil', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🚶‍♂️</div></div>`, description: 'Nyeri dada yang timbul saat aktivitas dan mereda dengan istirahat.', analysis: 'TIDAK SESUAI. Gejala pasien (nyeri saat istirahat, durasi 45 menit) sangat tidak khas untuk angina stabil, yang nyerinya singkat dan dipicu oleh aktivitas.' },
                { id: 'prinzmetal-angina', name: 'Angina Prinzmetal', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🌀</div></div>`, description: 'Nyeri dada akibat spasme arteri koroner, sering terjadi pada malam atau pagi hari.', analysis: 'KURANG SESUAI. Meskipun terjadi saat istirahat, EKG khas Angina Prinzmetal adalah elevasi ST sementara, bukan T inversi. UAP adalah diagnosis yang lebih mencakup.' },
                { id: 'uap', name: 'Unstable Angina Pectoris', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Nyeri dada baru, memberat, atau terjadi saat istirahat, dengan EKG iskemik namun Troponin normal.', analysis: 'SANGAT SESUAI. Pasien memiliki nyeri dada istirahat >20 menit, EKG menunjukkan iskemia (T inversi), dan tidak ada bukti kerusakan miokard (Troponin normal). Ini adalah definisi klasik dari UAP.' },
                { id: 'stemi', name: 'STEMI', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">📈</div></div>`, description: 'Serangan jantung dengan sumbatan total arteri koroner, ditandai elevasi segmen ST pada EKG.', analysis: 'TIDAK SESUAI. Pemeriksaan EKG pasien tidak menunjukkan adanya elevasi segmen ST, yang merupakan kriteria utama untuk diagnosis STEMI.' },
                { id: 'nstemi', name: 'NSTEMI', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Serangan jantung dengan sumbatan parsial, ditandai EKG iskemik dan peningkatan Troponin.', analysis: 'HAMPIR SESUAI, NAMUN KELIRU. Presentasi gejala dan EKG mirip, tetapi NSTEMI wajib memiliki peningkatan Troponin. Karena Troponin pasien normal, diagnosis NSTEMI dapat disingkirkan.' }
            ],
            quiz: [
                { question: "Apa temuan kunci yang membedakan diagnosis Unstable Angina Pectoris (UAP) dari NSTEMI pada kasus ini?", options: ["Gambaran EKG", "Durasi nyeri dada", "Kadar Troponin T", "Usia pasien"], answer: "Kadar Troponin T" },
                { question: "Gelombang T inversi pada lead II, III, dan aVF menunjukkan kemungkinan iskemia pada dinding jantung bagian...", options: ["Anterior", "Septal", "Lateral", "Inferior"], answer: "Inferior" },
                { question: "Mengapa diagnosis Angina Pectoris Stabil tidak cocok untuk kasus ini?", options: ["Karena nyeri membaik dengan istirahat", "Karena nyeri berlangsung lama dan tidak membaik dengan istirahat", "Karena EKG-nya normal", "Karena Troponin tidak meningkat"], answer: "Karena nyeri berlangsung lama dan tidak membaik dengan istirahat" },
                { question: "Gambaran EKG apa yang menjadi ciri khas STEMI, namun tidak ditemukan pada pasien ini?", options: ["Gelombang Q patologis", "Depresi segmen ST", "Elevasi segmen ST", "Gelombang T inversi"], answer: "Elevasi segmen ST" },
                { question: "Berdasarkan kombinasi nyeri dada, EKG, dan hasil enzim jantung, diagnosis yang paling akurat adalah...", options: ["Angina Pectoris Stabil", "NSTEMI", "Unstable Angina Pectoris", "STEMI"], answer: "Unstable Angina Pectoris" }
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
                        if (d.matchScore >= 9) return '#059669'; // Emerald 600
                        if (d.matchScore >= 6) return '#f97316'; // Orange 500
                        if (d.matchScore >= 4) return '#a855f7'; // Purple 500
                        return '#ef4444'; // Red 500
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#047857'; // Emerald 700
                        if (d.matchScore >= 6) return '#ea580c'; // Orange 600
                        if (d.matchScore >= 4) return '#9333ea'; // Purple 600
                        return '#dc2626'; // Red 600
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
            // Sort diagnoses by matchScore in descending order for display logic
            diagnoses.sort((a, b) => b.matchScore - a.matchScore);
            createNav();
            if (diagnoses.length > 0) {
                // Render the best match first
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };