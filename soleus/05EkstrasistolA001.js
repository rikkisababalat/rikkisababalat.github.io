        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'pac', name: 'Kompleks Prematur Atrial', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 text-emerald-600 rounded-full flex items-center justify-center text-4xl font-bold">💓</div></div>`, description: 'Denyut jantung prematur yang berasal dari fokus ektopik di dalam atrium.', analysis: 'SANGAT SESUAI. EKG menunjukkan denyut prematur dengan gelombang P ektopik (berbeda dari P sinus) yang diikuti oleh kompleks QRS sempit. Ini cocok dengan gejala pasien dan pemicu kafein.' },
                { id: 'pvc', name: 'Ventrikel Ekstrasistol', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 text-orange-400 rounded-full flex items-center justify-center text-4xl font-bold">💔</div></div>`, description: 'Denyut prematur yang berasal dari fokus ektopik di dalam ventrikel.', analysis: 'TIDAK SESUAI. VES/PVC akan menunjukkan kompleks QRS yang lebar (>0,12s) dan bizarre tanpa gelombang P sebelumnya. Pada kasus ini, QRS-nya sempit.' },
                { id: 'svt', name: 'Takikardia Supraventrikel', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 text-red-500 rounded-full flex items-center justify-center text-4xl font-bold">💨</div></div>`, description: 'Aritmia cepat dan teratur yang berasal dari atas ventrikel.', analysis: 'KURANG SESUAI. SVT adalah takikardia yang berkelanjutan (HR >150x/menit). Pasien memiliki HR 96x/menit dengan denyut ektopik sesekali, bukan takikardia terus-menerus.' },
                { id: 'afib', name: 'Atrial Fibrilasi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 text-purple-500 rounded-full flex items-center justify-center text-4xl font-bold">〰️</div></div>`, description: 'Aktivasi atrium yang tidak terkoordinasi dan cepat, menyebabkan respons ventrikel yang tidak teratur.', analysis: 'TIDAK SESUAI. AF memiliki irama yang sangat tidak teratur (irregularly irregular) dan tidak ada gelombang P yang jelas. EKG pasien memiliki irama dasar teratur dan gelombang P.' },
                { id: 'junctional', name: 'Junctional Rhythm', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 text-blue-500 rounded-full flex items-center justify-center text-4xl font-bold">🐌</div></div>`, description: 'Irama yang berasal dari nodus AV, biasanya lambat (40-60 bpm).', analysis: 'TIDAK SESUAI. Ini adalah deskripsi irama yang berkelanjutan, bukan denyut ektopik. Laju dan morfologi EKG tidak cocok.' },
            ],
            quiz: [
                { question: "Apa kemungkinan pemicu utama gejala palpitasi pada pasien ini?", options: ["Kurang tidur", "Stres ujian", "Konsumsi kafein berlebih", "Aktivitas fisik"], answer: "Konsumsi kafein berlebih" },
                { question: "Ciri utama pada EKG yang membedakan Kompleks Prematur Atrial (KPA) dari Ventrikel Ekstrasistol (VES) adalah...", options: ["Laju denyut jantung", "Ada atau tidaknya jeda kompensasi", "Lebar kompleks QRS", "Tinggi gelombang T"], answer: "Lebar kompleks QRS" },
                { question: "Sensasi 'jantung berhenti sesaat' yang dirasakan pasien disebabkan oleh...", options: ["Gelombang P ektopik", "Kompleks QRS yang sempit", "Jeda kompensasi setelah denyut prematur", "Peningkatan tekanan darah"], answer: "Jeda kompensasi setelah denyut prematur" },
                { question: "Berdasarkan EKG, apa irama jantung dasar pasien?", options: ["Atrial Fibrilasi", "Irama Sinus", "Junctional Rhythm", "Ventrikel Takikardia"], answer: "Irama Sinus" },
                { question: "Diagnosis yang paling akurat untuk kasus ini adalah...", options: ["Ventrikel Ekstrasistol", "Takikardia Supraventrikel", "Kompleks Prematur Atrial", "Atrial Fibrilasi"], answer: "Kompleks Prematur Atrial" }
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };