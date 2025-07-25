        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'common-migraine', name: 'Common Migraine', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🤕</div></div>`, description: 'Nyeri kepala primer yang ditandai dengan serangan berulang, unilateral, berdenyut, tanpa didahului gejala neurologis fokal (aura).', analysis: 'SANGAT SESUAI. Gejala pasien (unilateral, berdenyut, diperberat aktivitas, disertai mual) sangat cocok dengan kriteria diagnosis migrain. Penyangkalan adanya kilatan cahaya memastikan ini adalah tipe tanpa aura.' },
                { id: 'classic-migraine', name: 'Classic Migraine', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">✨</div></div>`, description: 'Jenis migrain yang didahului atau disertai dengan gejala neurologis transien (aura), paling sering berupa gangguan visual.', analysis: 'TIDAK SESUAI. Pasien secara eksplisit menyangkal adanya aura (kilatan cahaya), yang merupakan kriteria wajib untuk diagnosis migrain klasik (migrain dengan aura).' },
                { id: 'cluster-headache', name: 'Cluster Headache', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">👁️</div></div>`, description: 'Nyeri kepala hebat, tajam, biasanya di sekitar mata, terjadi dalam periode berulang (cluster) dan disertai gejala otonom ipsilateral.', analysis: 'KURANG SESUAI. Karakter nyeri (berdenyut vs tajam), lokasi (seluruh sisi kepala vs sekitar mata), dan tidak adanya gejala otonom (mata merah/berair) membuat diagnosis ini tidak cocok.' },
                { id: 'hemiplegic-migraine', name: 'Hemiplegic Migraine', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">💪</div></div>`, description: 'Bentuk migrain dengan aura yang langka, di mana aura mencakup kelemahan motorik pada satu sisi tubuh.', analysis: 'TIDAK SESUAI. Pemeriksaan fisik dengan tegas menyatakan "tidak dijumpai adanya kelemahan motorik", sehingga diagnosis ini dapat langsung disingkirkan.' },
                { id: 'secondary-headache', name: 'Secondary Headache', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-gray-100"><div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Nyeri kepala yang merupakan gejala dari kondisi medis lain (misal: infeksi, trauma, tumor).', analysis: 'KURANG MUNGKIN. Meskipun tidak bisa 100% disingkirkan tanpa penunjang, tidak adanya riwayat trauma/penyakit, TTV normal, dan pemeriksaan neurologis yang bersih membuat nyeri kepala primer jauh lebih mungkin.' },
            ],
            quiz: [
                { question: "Fitur kunci yang menyingkirkan diagnosis 'Classic Migraine' pada kasus ini adalah...", options: ["Nyeri berdenyut", "Adanya mual", "Lokasi nyeri di satu sisi", "Tidak adanya kilatan cahaya"], answer: "Tidak adanya kilatan cahaya" },
                { question: "Manakah dari keluhan berikut yang merupakan kriteria diagnostik khas untuk migrain?", options: ["Nyeri diperberat aktivitas fisik", "Demam", "Riwayat hipertensi", "Kelemahan motorik"], answer: "Nyeri diperberat aktivitas fisik" },
                { question: "Temuan 'tidak dijumpai kelemahan motorik' secara langsung menyingkirkan diagnosis...", options: ["Cluster headache", "Common migraine", "Hemiplegic migraine", "Secondary headache"], answer: "Hemiplegic migraine" },
                { question: "Karakter nyeri 'berdenyut' (throbbing) paling sering ditemukan pada...", options: ["Tension-type headache", "Cluster headache", "Migraine", "Sinusitis headache"], answer: "Migraine" },
                { question: "Berdasarkan keseluruhan data klinis, diagnosis yang paling mungkin adalah?", options: ["Classic Migraine (dengan aura)", "Cluster Headache", "Secondary Headache", "Common Migraine (tanpa aura)"], answer: "Common Migraine (tanpa aura)" }
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