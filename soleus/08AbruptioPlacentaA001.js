        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'plasenta-previa', name: 'Plasenta Previa', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Implantasi plasenta di bagian bawah rahim, menutupi sebagian atau seluruh jalan lahir.', analysis: 'KURANG SESUAI. Gejala klasik Plasenta Previa adalah perdarahan merah segar TANPA nyeri. Pasien ini mengalami nyeri perut hebat dan perdarahan berwarna merah gelap, yang bertentangan dengan diagnosis ini.' },
                { id: 'vasa-previa', name: 'Vasa Previa', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Pembuluh darah janin melintasi atau berada di dekat jalan lahir, tanpa dilindungi oleh plasenta.', analysis: 'KURANG SESUAI. Vasa Previa biasanya menyebabkan perdarahan tanpa nyeri saat ketuban pecah, yang merupakan darah janin dan menyebabkan gawat janin sangat cepat. Nyeri perut hebat bukan ciri khas utama.' },
                { id: 'abortus-insipien', name: 'Abortus Insipien', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Proses keguguran yang tidak dapat dihentikan, ditandai dengan perdarahan dan pembukaan serviks.', analysis: 'TIDAK SESUAI. Definisi abortus adalah penghentian kehamilan sebelum usia 20 minggu. Pasien ini berada pada usia kehamilan 31 minggu, sehingga ini disebut persalinan prematur, bukan abortus.' },
                { id: 'mola-hidatidosa', name: 'Mola Hidatidosa', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl">🍇</div></div>`, description: 'Kehamilan abnormal berupa tumor jinak yang berkembang di rahim.', analysis: 'TIDAK SESUAI. Sangat jarang mola hidatidosa berlanjut hingga usia kehamilan 31 minggu. Gejala dan temuan klinisnya sangat berbeda dari kasus ini.' },
                { id: 'abruptio-plasenta', name: 'Abruptio Plasenta', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Lepasnya plasenta dari dinding rahim sebelum waktunya (sebelum janin lahir).', analysis: 'SANGAT SESUAI. Skenario ini menyajikan trias klasik Abruptio Plasenta: (1) riwayat trauma, (2) nyeri perut hebat, dan (3) perdarahan (seringkali merah gelap). Adanya gawat janin (DJJ 100x/menit) semakin memperkuat diagnosis.' }
            ],
            quiz: [
                { question: "Faktor risiko utama yang paling mungkin memicu kondisi pasien dalam kasus ini adalah?", options: ["Usia ibu", "Kehamilan pertama", "Riwayat terjatuh", "Stres psikologis"], answer: "Riwayat terjatuh" },
                { question: "Temuan manakah yang paling membedakan Abruptio Plasenta dari Plasenta Previa pada kasus ini?", options: ["Warna darah", "Usia kehamilan", "Status G1P0A0", "Adanya nyeri perut yang hebat"], answer: "Adanya nyeri perut yang hebat" },
                { question: "Denyut Jantung Janin (DJJ) 100 x/menit pada kehamilan 31 minggu mengindikasikan kondisi...", options: ["Janin tidur", "Normal untuk usia kehamilan ini", "Gawat Janin (Fetal Distress)", "Kesalahan pengukuran"], answer: "Gawat Janin (Fetal Distress)" },
                { question: "Mengapa diagnosis 'Abortus Insipien' tidak dapat ditegakkan pada pasien ini?", options: ["Karena perdarahannya sedikit", "Karena tidak ada demam", "Karena usia kehamilan sudah melebihi 20 minggu", "Karena ini kehamilan pertama"], answer: "Karena usia kehamilan sudah melebihi 20 minggu" },
                { question: "Berdasarkan keseluruhan skenario klinis, diagnosis apakah yang paling akurat?", options: ["Plasenta Previa", "Vasa Previa", "Mola Hidatidosa", "Abruptio Plasenta"], answer: "Abruptio Plasenta" }
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
                        if (d.matchScore >= 9) return '#059669'; // Emerald 700
                        if (d.matchScore >= 3) return '#34d399'; // Emerald 400
                        if (d.matchScore >= 1) return '#a7f3d0'; // Emerald 200
                        return '#e5e7eb'; // Gray 200
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46'; // Emerald 900
                        if (d.matchScore >= 3) return '#059669'; // Emerald 700
                        if (d.matchScore >= 1) return '#6ee7b7'; // Emerald 300
                        return '#d1d5db'; // Gray 300
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
                feedback = "Pemahaman yang luar biasa! Anda menguasai konsep ini.";
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
            // Tampilkan Abruptio Plasenta secara default karena paling sesuai
            const defaultDiagnosis = diagnoses.find(d => d.matchScore === 10) || diagnoses[0];
            if (defaultDiagnosis) {
                renderDetails(defaultDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };