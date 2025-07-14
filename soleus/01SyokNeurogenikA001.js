        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'syok-neurogenik', name: 'Syok Neurogenik', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Gangguan sirkulasi akibat kerusakan sistem saraf simpatis setelah cedera tulang belakang.', analysis: 'SANGAT SESUAI. Trias klasik (hipotensi, bradikardia, akral hangat) pada pasien dengan riwayat trauma punggung adalah gambaran patognomonik (sangat khas) untuk syok neurogenik.' },
                { id: 'syok-hipovolemik', name: 'Syok Hipovolemik', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Kegagalan sirkulasi akibat kehilangan volume darah atau cairan dalam jumlah besar.', analysis: 'TIDAK SESUAI. Pasien menunjukkan bradikardia (denyut jantung lambat) dan akral hangat, yang berkebalikan dengan kompensasi fisiologis pada syok hipovolemik (takikardia dan akral dingin).' },
                { id: 'syok-spinal', name: 'Syok Spinal', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-2xl">⚡️</div></div>`, description: 'Hilangnya refleks dan tonus otot di bawah level cedera tulang belakang secara sementara.', analysis: 'KURANG TEPAT. Syok spinal adalah fenomena neurologis (kelemahan, mati rasa, hilangnya refleks), sedangkan masalah utama pasien adalah hemodinamik (sirkulasi). Meskipun bisa terjadi bersamaan, syok neurogenik lebih tepat untuk menjelaskan tanda-tanda vitalnya.' },
                { id: 'syok-kardiogenik', name: 'Syok Kardiogenik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-pink-100"><div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-3xl">❤️‍🩹</div></div>`, description: 'Kegagalan sirkulasi akibat ketidakmampuan jantung memompa darah secara efektif.', analysis: 'SANGAT TIDAK SESUAI. Tidak ada riwayat penyakit jantung, dan akral hangat menyingkirkan kemungkinan kegagalan pompa jantung primer, yang biasanya menyebabkan akral dingin akibat perfusi buruk.' },
                { id: 'syok-sepsis', name: 'Syok Sepsis', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Respons inflamasi sistemik yang parah terhadap infeksi yang menyebabkan disfungsi organ.', analysis: 'SANGAT TIDAK SESUAI. Tidak ada tanda-tanda infeksi seperti demam, dan etiologinya jelas trauma, bukan infeksi.' }
            ],
            quiz: [
                { question: "Apa temuan tanda vital yang paling khas untuk syok neurogenik pada kasus ini?", options: ["Hipotensi dan takikardia", "Hipertensi dan bradikardia", "Hipotensi dan bradikardia", "Demam dan takipnea"], answer: "Hipotensi dan bradikardia" },
                { question: "Mengapa 'akral hangat' menjadi petunjuk penting dalam kasus ini?", options: ["Menandakan demam tinggi", "Menyingkirkan adanya perdarahan", "Menunjukkan adanya vasodilatasi perifer akibat gangguan simpatis", "Menandakan pasien dehidrasi"], answer: "Menunjukkan adanya vasodilatasi perifer akibat gangguan simpatis" },
                { question: "Mekanisme utama yang menyebabkan hipotensi pada syok neurogenik adalah...", options: ["Kehilangan banyak cairan", "Penurunan curah jantung primer", "Hilangnya tonus pembuluh darah (vasodilatasi masif)", "Reaksi alergi hebat"], answer: "Hilangnya tonus pembuluh darah (vasodilatasi masif)" },
                { question: "Mengapa syok hipovolemik kurang mungkin menjadi diagnosis pada pasien ini?", options: ["Karena tekanan darahnya terlalu rendah", "Karena riwayat traumanya tidak jelas", "Karena pasien mengalami bradikardia, bukan takikardia", "Karena pasien tidak mengeluh nyeri"], answer: "Karena pasien mengalami bradikardia, bukan takikardia" },
                { question: "Berdasarkan semua gejala dan temuan, diagnosis apakah yang paling akurat?", options: ["Syok Sepsis", "Syok Kardiogenik", "Syok Spinal", "Syok Neurogenik"], answer: "Syok Neurogenik" }
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