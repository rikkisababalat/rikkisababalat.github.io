        // Data disesuaikan untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'peyronie', name: 'Peyronie disease', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Pembentukan plak fibrotik di penis yang menyebabkan ereksi bengkok dan nyeri.', analysis: 'TIDAK SESUAI. Gejala utama Peyronie adalah kelengkungan penis saat ereksi. Kasus ini tidak menyebutkan adanya kelengkungan dan fokus pada ereksi persisten tanpa stimulasi.' },
                { id: 'balanitis', name: 'Balanitis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Peradangan atau infeksi pada kepala penis (glans).', analysis: 'TIDAK SESUAI. Balanitis menyebabkan kemerahan, bengkak, dan nyeri pada glans penis, bukan ereksi kaku dan nyeri pada seluruh batang penis.' },
                { id: 'priapismus-low-flow', name: 'Priapismus low-flow', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">❗️</div></div>`, description: 'Ereksi >4 jam akibat kegagalan darah vena keluar dari penis (veno-oklusi).', analysis: 'SANGAT SESUAI. Gejala klasik berupa ereksi kaku >4 jam, nyeri hebat, dan sianosis (warna biru gelap) karena stasis darah vena. Ini adalah diagnosis yang paling tepat untuk kasus ini.' },
                { id: 'parafimosis', name: 'Parafimosis', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">⭕️</div></div>`, description: 'Kulup (preputium) terjebak di belakang kepala penis dan tidak bisa kembali.', analysis: 'TIDAK SESUAI. Parafimosis adalah masalah pada kulup yang menjepit penis, menyebabkan pembengkakan pada glans. Kasus ini menggambarkan masalah ereksi pada corpora cavernosa (batang penis).' },
                { id: 'priapismus-high-flow', name: 'Priapismus high-flow', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-sky-100"><div class="w-12 h-12 bg-sky-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Ereksi akibat aliran darah arteri yang berlebihan, biasanya karena trauma.', analysis: 'KURANG SESUAI. Priapismus high-flow biasanya TIDAK nyeri dan penis TIDAK sepenuhnya kaku. Warna penis merah terang (teroksigenasi), bukan biru gelap (iskemik).' }
            ],
            quiz: [
                { question: "Apa temuan kunci pada pemeriksaan fisik yang paling kuat mengindikasikan adanya iskemia?", options: ["Penis yang rigid", "Nyeri tekan hebat", "Ereksi tanpa stimulasi", "Penis berwarna biru gelap"], answer: "Penis berwarna biru gelap" },
                { question: "Berapa lama minimal durasi ereksi yang tidak diinginkan untuk dapat diklasifikasikan sebagai priapismus?", options: ["1 jam", "2 jam", "4 jam", "8 jam"], answer: "4 jam" },
                { question: "Perbedaan utama antara priapismus low-flow (iskemik) dan high-flow (non-iskemik) adalah...", options: ["Durasi ereksi", "Usia pasien", "Adanya nyeri hebat dan sianosis pada low-flow", "Penyebabnya selalu obat-obatan"], answer: "Adanya nyeri hebat dan sianosis pada low-flow" },
                { question: "Mengapa kondisi yang dialami pasien ini dianggap sebagai kegawatdaruratan urologi?", options: ["Karena sangat memalukan", "Karena berisiko menyebabkan infeksi menular seksual", "Karena risiko kerusakan jaringan permanen dan disfungsi ereksi", "Karena selalu membutuhkan pembedahan besar"], answer: "Karena risiko kerusakan jaringan permanen dan disfungsi ereksi" },
                { question: "Berdasarkan keseluruhan skenario klinis, diagnosis yang paling akurat adalah:", options: ["Parafimosis akut", "Priapismus high-flow", "Penyakit Peyronie", "Priapismus low-flow"], answer: "Priapismus low-flow" }
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
                        if (d.matchScore >= 8) return '#059669'; // Emerald-700
                        if (d.matchScore >= 4) return '#34d399'; // Emerald-400
                        if (d.matchScore >= 2) return '#a7f3d0'; // Emerald-200
                        return '#e5e7eb'; // Gray-200
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46'; // Emerald-900
                        if (d.matchScore >= 4) return '#059669'; // Emerald-700
                        if (d.matchScore >= 2) return '#6ee7b7'; // Emerald-300
                        return '#d1d5db'; // Gray-300
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
            } else if (percentage < 90) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman yang luar biasa! Anda menguasai kasus ini.";
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