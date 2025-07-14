        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'a-hipoparatiroid', name: 'Hipoparatiroidisme e.c. hiperkalsemia', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Kondisi kurangnya hormon paratiroid (PTH).', analysis: 'TIDAK SESUAI. Hipoparatiroidisme menyebabkan HIPO-kalsemia (kalsium rendah), bukan HIPER-kalsemia. Pilihan ini secara fundamental kontradiktif.' },
                { id: 'b-hipokalsemia', name: 'Hipokalsemia e.c. hiperparatiroidisme', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Kadar kalsium darah yang rendah.', analysis: 'SANGAT TIDAK SESUAI. Temuan EKG kunci adalah pemendekan interval QT, yang merupakan tanda klasik hiperkalsemia. Hipokalsemia akan menyebabkan pemanjangan interval QT.' },
                { id: 'c-hipertiroid', name: 'Hiperkalsemia e.c. hipertiroidisme', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🦋</div></div>`, description: 'Kadar hormon tiroid yang berlebihan menyebabkan pelepasan kalsium dari tulang.', analysis: 'KURANG SESUAI. Meskipun secara teknis mungkin, ini bukan penyebab umum hiperkalsemia. Pasien juga tidak memiliki gejala klasik hipertiroidisme seperti takikardia, tremor, atau penurunan berat badan.' },
                { id: 'd-hiperparatiroid', name: 'Hiperkalsemia e.c. hiperparatiroidisme', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-3xl">🏆</div></div>`, description: 'Kelebihan produksi hormon paratiroid (PTH) yang menyebabkan kalsium darah tinggi.', analysis: 'PALING SESUAI. Ini adalah penyebab klasik hiperkalsemia. Kombinasi gejala (lemas, nyeri perut, mual), riwayat batu ginjal, dan temuan EKG (pemendekan QT) sangat menunjuk ke diagnosis ini.' },
                { id: 'e-nefrolitiasis', name: 'Hiperkalsemia e.c. Nefrolithiasis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">💎</div></div>`, description: 'Kadar kalsium tinggi yang disebabkan oleh batu ginjal.', analysis: 'TIDAK TEPAT. Hubungan sebab-akibatnya terbalik. Batu ginjal (Nefrolithiasis) adalah AKIBAT atau komplikasi dari hiperkalsemia kronis, bukan PENYEBABNYA.' }
            ],
            quiz: [
                { question: "Temuan pemendekan interval QT pada EKG paling khas untuk kondisi elektrolit apa?", options: ["Hipokalemia", "Hiperkalemia", "Hipokalsemia", "Hiperkalsemia"], answer: "Hiperkalsemia" },
                { question: "Riwayat penyakit pasien manakah yang paling relevan dengan kemungkinan diagnosis hiperkalsemia?", options: ["Operasi usus buntu", "Pneumonia", "Riwayat batu ginjal", "Migrain"], answer: "Riwayat batu ginjal" },
                { question: "Kombinasi gejala 'batu ginjal, nyeri perut, dan lemas' sering dikaitkan dengan mnemonik klasik...", options: ["'Stones, bones, groans'", "'Wet, wacky, wobbly'", "'Can't see, can't pee, can't climb a tree'", "'Demam, ruam, batuk'"], answer: "'Stones, bones, groans'" },
                { question: "Manakah yang merupakan fungsi utama dari Hormon Paratiroid (PTH)?", options: ["Menurunkan kadar gula darah", "Meningkatkan kadar kalsium darah", "Mengatur tekanan darah", "Menurunkan kadar kalsium darah"], answer: "Meningkatkan kadar kalsium darah" },
                { question: "Mengapa nefrolitiasis (batu ginjal) bukan etiologi yang tepat untuk hiperkalsemia pada kasus ini?", options: ["Karena batu ginjal tidak berhubungan dengan kalsium", "Karena hubungan sebab-akibatnya terbalik", "Karena pasien adalah perempuan", "Karena TTV pasien normal"], answer: "Karena hubungan sebab-akibatnya terbalik" }
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
                        if (d.matchScore >= 4) return '#34d399'; // Emerald 400
                        if (d.matchScore >= 2) return '#facc15'; // Yellow 400
                        return '#f87171'; // Red 400
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#047857'; // Emerald 700
                        if (d.matchScore >= 4) return '#059669'; // Emerald 600
                        if (d.matchScore >= 2) return '#eab308'; // Yellow 500
                        return '#ef4444'; // Red 500
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