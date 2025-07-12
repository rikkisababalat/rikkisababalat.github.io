        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'furunkel', name: 'Furunkel', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🥵</div></div>`, description: 'Infeksi bakteri akut pada satu folikel rambut, menyebabkan benjolan merah, panas, dan nyeri.', analysis: 'KURANG SESUAI. Pasien tidak mengeluhkan nyeri akut atau benjolan merah. Temuan utamanya adalah lubang kongenital, bukan infeksi primer pada folikel rambut.' },
                { id: 'abses', name: 'Abses Preaurikular', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🌋</div></div>`, description: 'Kumpulan nanah di bawah kulit, menyebabkan bengkak, kemerahan, teraba hangat, dan sangat nyeri.', analysis: 'CUKUP SESUAI, TAPI TIDAK SEKARANG. Riwayat bengkak mungkin adalah episode abses. Namun, saat ini tidak ada tanda-tanda abses aktif. Abses adalah komplikasi, bukan diagnosis primer dari kondisi yang mendasarinya.' },
                { id: 'fistula', name: 'Fistula Preaurikular', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 bg-emerald-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Saluran abnormal bawaan lahir (kongenital) yang memiliki lubang kecil di kulit, biasanya di depan telinga.', analysis: 'SANGAT SESUAI. Adanya lubang (pit) di depan tragus adalah tanda klasik. Riwayat bengkak dan keluarnya cairan saat ditekan cocok dengan gambaran fistula yang terinfeksi secara intermiten.' },
                { id: 'cauliflower', name: 'Cauliflower Ear', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Deformitas daun telinga akibat trauma berulang yang menyebabkan hematoma dan fibrosis.', analysis: 'TIDAK SESUAI. Kondisi ini adalah perubahan bentuk daun telinga karena cedera, tidak berhubungan dengan adanya lubang, saluran, atau keluarnya cairan.' },
                { id: 'karbunkel', name: 'Karbunkel', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">♨️</div></div>`, description: 'Sekelompok furunkel yang menyatu menjadi infeksi kulit yang lebih besar dan dalam.', analysis: 'TIDAK SESUAI. Ini adalah infeksi kulit yang parah, luas, dan sangat nyeri. Gambaran klinis pasien sangat berbeda.' }
            ],
            quiz: [
                { question: "Apa temuan fisik paling penting yang mengarah pada diagnosis utama dalam kasus ini?", options: ["Cairan yang berbau", "Tidak adanya demam", "Adanya lubang di depan tragus", "Riwayat bengkak"], answer: "Adanya lubang di depan tragus" },
                { question: "Mengapa diagnosis 'Abses Preaurikular' kurang tepat untuk kondisi pasien SAAT INI?", options: ["Karena cairannya tidak hijau", "Karena pasien tidak memiliki riwayat trauma", "Karena tidak ada tanda peradangan akut (nyeri, bengkak, merah)", "Karena usia pasien sudah 22 tahun"], answer: "Karena tidak ada tanda peradangan akut (nyeri, bengkak, merah)" },
                { question: "Riwayat bengkak yang diceritakan ibu pasien kemungkinan besar menunjukkan...", options: ["Alergi kulit", "Gigitan serangga", "Episode infeksi atau abses sebelumnya", "Tumbuhnya tumor jinak"], answer: "Episode infeksi atau abses sebelumnya" },
                { question: "Fistula Preaurikular pada dasarnya adalah suatu kondisi...", options: ["Akibat cedera olahraga", "Yang ditularkan melalui udara", "Kelainan bawaan lahir (kongenital)", "Yang disebabkan oleh kebersihan yang buruk"], answer: "Kelainan bawaan lahir (kongenital)" },
                { question: "Berdasarkan semua temuan, diagnosis manakah yang paling akurat?", options: ["Furunkel", "Abses Preaurikular", "Fistula Preaurikular", "Cauliflower Ear"], answer: "Fistula Preaurikular" }
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
            if (diagnoses.length > 0) {
                // Set default view to the highest match score
                const defaultDiagnosis = diagnoses.sort((a, b) => b.matchScore - a.matchScore)[0];
                renderDetails(defaultDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };