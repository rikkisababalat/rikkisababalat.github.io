
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'isdn-5mg', name: 'ISDN 5 mg', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Isosorbide Dinitrate adalah obat vasodilator golongan nitrat.', analysis: 'CUKUP TEPAT, TAPI BUKAN DEFINITIF. Nitrat berguna sebagai terapi anti-iskemik untuk mengurangi preload dan meredakan nyeri dada. Ini adalah bagian dari tatalaksana awal, namun bukan terapi antitrombotik yang menjadi pilar utama pencegahan progresi infark.' },
                { id: 'aspirin-320mg', name: 'Aspirin 320 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Asam Asetilsalisilat adalah antiplatelet yang menghambat COX-1.', analysis: 'TIDAK TEPAT. Meskipun dosis muat aspirin adalah standar emas pada NSTEMI, pasien ini memiliki riwayat alergi aspirin yang jelas, sehingga pemberiannya merupakan kontraindikasi absolut.' },
                { id: 'clopidogrel-300mg', name: 'Clopidogrel 300 mg', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Clopidogrel adalah antiplatelet golongan P2Y12 inhibitor.', analysis: 'SANGAT TEPAT. Ini adalah dosis muat (loading dose) yang benar untuk clopidogrel pada pasien Sindrom Koroner Akut. Ini menjadi terapi antiplatelet pilihan utama karena pasien memiliki kontraindikasi (alergi) terhadap aspirin.' },
                { id: 'aspirin-80mg', name: 'Aspirin 80 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Dosis rendah asam asetilsalisilat untuk pemeliharaan.', analysis: 'TIDAK TEPAT. Ini adalah dosis pemeliharaan, bukan dosis muat. Lebih penting lagi, obat ini tetap dikontraindikasikan karena alergi pasien, berapapun dosisnya.' },
                { id: 'clopidogrel-75mg', name: 'Clopidogrel 75 mg', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Dosis pemeliharaan harian Clopidogrel.', analysis: 'KURANG TEPAT. Ini adalah dosis pemeliharaan, bukan dosis muat. Pada kondisi akut, diperlukan dosis muat yang lebih tinggi (300-600 mg) untuk mencapai inhibisi platelet yang cepat dan efektif.' },
            ],
            quiz: [
                { question: "Berdasarkan gejala, EKG, dan enzim jantung, diagnosis kerja yang paling mungkin pada pasien ini adalah?", options: ["Angina Pektoris Stabil", "Perikarditis Akut", "NSTEMI", "STEMI"], answer: "NSTEMI" },
                { question: "Temuan EKG T-inverted pada lead V1-V4 menunjukkan iskemia pada area mana dari jantung?", options: ["Inferior", "Lateral", "Posterior", "Anteroseptal"], answer: "Anteroseptal" },
                { question: "Mengapa aspirin TIDAK diberikan pada pasien ini, meskipun merupakan standar tatalaksana nyeri dada iskemik?", options: ["Karena tekanan darahnya tinggi", "Karena pasien memiliki riwayat DM", "Karena pasien memiliki riwayat alergi aspirin", "Karena EKG tidak menunjukkan ST-elevasi"], answer: "Karena pasien memiliki riwayat alergi aspirin" },
                { question: "Berapakah dosis muat (loading dose) clopidogrel yang direkomendasikan untuk Sindrom Koroner Akut?", options: ["75 mg", "150 mg", "300 mg", "80 mg"], answer: "300 mg" },
                { question: "Manakah informasi dari anamnesis yang menjadi penentu utama dalam memilih terapi antiplatelet pada kasus ini?", options: ["Durasi nyeri dada", "Riwayat Diabetes Melitus", "Riwayat Alergi Obat", "Adanya mual dan keringat dingin"], answer: "Riwayat Alergi Obat" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan pada Kasus:</h4>
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
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore > 8) return '#10b981'; // emerald-500
                        if (d.matchScore > 4) return '#60a5fa'; // blue-400
                        if (d.matchScore > 2) return '#facc15'; // yellow-400
                        return '#f87171'; // red-400
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore > 8) return '#059669'; // emerald-700
                        if (d.matchScore > 4) return '#2563eb'; // blue-600
                        if (d.matchScore > 2) return '#eab308'; // yellow-500
                        return '#ef4444'; // red-500
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