        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'appendicitis', name: 'Appendisitis', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">➡️</div></div>`, description: 'Peradangan pada usus buntu (apendiks).', analysis: 'KURANG SESUAI. Nyeri apendisitis klasik biasanya di kanan bawah dan jarang disertai discharge purulen dari serviks atau nyeri goyang serviks. Nyeri bilateral membuat diagnosis ini kurang mungkin.' },
                { id: 'ruptured-cyst', name: 'Ruptur Kista Ovarium', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Pecahnya kantung berisi cairan (kista) pada ovarium.', analysis: 'MUNGKIN, TAPI KURANG COCOK. Ruptur kista menyebabkan nyeri akut, namun biasanya unilateral. Demam tinggi (39,1°C) dan discharge purulen menandakan infeksi berat, yang tidak khas untuk ruptur kista sederhana.' },
                { id: 'ovarian-torsion', name: 'Torsio Ovarium', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Terpelintirnya ovarium pada tangkainya, memutus aliran darah.', analysis: 'TIDAK SESUAI. Torsio menyebabkan nyeri yang sangat hebat dan mendadak, hampir selalu unilateral. Tanda-tanda infeksi berat seperti demam tinggi dan discharge purulen dari serviks tidak mendukung diagnosis ini.' },
                { id: 'ectopic-pregnancy', name: 'Kehamilan Ektopik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Kehamilan yang terjadi di luar rongga rahim.', analysis: 'TERKECUALIKAN. Ini adalah diagnosis banding yang wajib dipikirkan. Namun, hasil pemeriksaan beta-hCG yang negatif secara definitif menyingkirkan semua bentuk kehamilan, termasuk ektopik.' },
                { id: 'pid', name: 'Penyakit Radang Panggul (PID)', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Infeksi pada organ reproduksi wanita bagian atas.', analysis: 'SANGAT SESUAI. Pasien menunjukkan trias klasik PID: nyeri tekan adneksa, nyeri goyang serviks, dan discharge mukopurulen. Didukung oleh demam tinggi, takikardia, dan faktor risiko (usia muda, aktif seksual). Ini adalah diagnosis yang paling mungkin.' },
            ],
            quiz: [
                { question: "Temuan fisik manakah yang paling spesifik untuk diagnosis Penyakit Radang Panggul (PID)?", options: ["Demam tinggi", "Nyeri tekan perut bawah", "Nyeri goyang serviks", "Keputihan"], answer: "Nyeri goyang serviks" },
                { question: "Hasil laboratorium apa yang krusial untuk menyingkirkan kehamilan ektopik dalam kasus ini?", options: ["Tes darah lengkap", "Tes urin", "Kadar C-reactive protein (CRP)", "Tes beta-hCG negatif"], answer: "Tes beta-hCG negatif" },
                { question: "Mengapa diagnosis apendisitis kurang tepat untuk pasien ini?", options: ["Karena pasien seorang perempuan", "Karena nyeri bersifat bilateral dan ada discharge serviks", "Karena demamnya terlalu tinggi", "Karena pasien baru menikah"], answer: "Karena nyeri bersifat bilateral dan ada discharge serviks" },
                { question: "Faktor risiko utama yang dimiliki pasien untuk kondisi ini adalah...", options: ["Usia 22 tahun dan aktif secara seksual", "Riwayat operasi sebelumnya", "Pola makan tidak teratur", "Stres psikologis"], answer: "Usia 22 tahun dan aktif secara seksual" },
                { question: "Berdasarkan semua temuan klinis, diagnosis yang paling tepat adalah:", options: ["Appendisitis", "Ruptur kista ovarium", "Torsio ovarium", "Penyakit Radang Panggul (PID)"], answer: "Penyakit Radang Panggul (PID)" }
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
            if (diagnoses.length > 0) {
                renderDetails(diagnoses.find(d => d.matchScore === 10)?.id || diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };