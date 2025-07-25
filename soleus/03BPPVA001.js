
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'bppv', name: 'Benign Paroxysmal Positional Vertigo', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Gangguan vestibuler akibat otolith (kristal kalsium) yang salah posisi di kanalis semisirkularis telinga dalam.', analysis: 'SANGAT SESUAI. Gejala klasik vertigo episodik singkat (< 1 menit) yang dipicu perubahan posisi kepala, disertai mual dan nistagmus rotatoar tanpa gangguan pendengaran adalah gambaran BPPV yang sempurna.' },
                { id: 'meniere', name: 'Meniere’s Disease', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">👂</div></div>`, description: 'Gangguan telinga dalam akibat penumpukan cairan endolimfe, menyebabkan episode vertigo, tinitus, dan tuli.', analysis: 'KURANG SESUAI. Pasien tidak mengalami gangguan pendengaran atau tinitus, yang merupakan gejala kunci Meniere. Durasi vertigo pada Meniere juga lebih lama (20 menit hingga berjam-jam).' },
                { id: 'neuritis', name: 'Vestibular Neuritis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Peradangan pada saraf vestibular, biasanya akibat infeksi virus, menyebabkan vertigo hebat yang konstan.', analysis: 'KURANG SESUAI. Vertigo pada neuritis vestibular bersifat tunggal, parah, dan berkelanjutan (berhari-hari), bukan episode singkat yang dipicu oleh posisi seperti pada kasus ini.' },
                { id: 'hipotensi', name: 'Hipotensi Ortostatik', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Penurunan tekanan darah saat berdiri yang menyebabkan pusing atau sensasi akan pingsan.', analysis: 'TIDAK SESUAI. Meskipun pusing dipicu saat berdiri, pasien mengalami vertigo rotatoar (berputar) sejati dengan nistagmus, bukan pusing biasa. Tekanan darah pasien juga tidak rendah.' },
                { id: 'sentral', name: 'Vertigo Sentral', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Vertigo yang disebabkan oleh lesi pada sistem saraf pusat (misal: stroke, tumor di batang otak atau serebelum).', analysis: 'SANGAT TIDAK SESUAI. Tidak ditemukannya defisit neurologis fokal (motorik dan sensorik normal) serta karakteristik vertigo perifer yang khas membuat diagnosis ini paling tidak mungkin.' }
            ],
            quiz: [
                { question: "Apa gejala yang paling khas untuk BPPV pada kasus ini?", options: ["Sakit kepala", "Mual", "Vertigo yang dipicu perubahan posisi", "Tekanan darah tinggi"], answer: "Vertigo yang dipicu perubahan posisi" },
                { question: "Mengapa Penyakit Meniere bukan diagnosis yang mungkin pada pasien ini?", options: ["Karena usia pasien", "Karena tidak ada gangguan pendengaran atau tinitus", "Karena vertigo berlangsung singkat", "Karena tidak ada riwayat trauma"], answer: "Karena tidak ada gangguan pendengaran atau tinitus" },
                { question: "Temuan pemeriksaan fisik manakah yang secara objektif mendukung diagnosis gangguan vestibular?", options: ["Tekanan darah 140/90", "Kesadaran kompos mentis", "Nistagmus rotatoar", "Kekuatan motorik normal"], answer: "Nistagmus rotatoar" },
                { question: "Karakteristik vertigo yang episodik dan singkat pada kasus ini membantu membedakannya dari...", options: ["Hipotensi ortostatik", "Vertigo sentral", "Neuritis vestibular", "Kecemasan"], answer: "Neuritis vestibular" },
                { question: "Berdasarkan keseluruhan data klinis, diagnosis manakah yang paling akurat?", options: ["Meniere's Disease", "Hipotensi Ortostatik", "Benign Paroxysmal Positional Vertigo", "Vertigo Sentral"], answer: "Benign Paroxysmal Positional Vertigo" }
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
             diagnoses.sort((a, b) => b.matchScore - a.matchScore).forEach(diagnosis => {
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
            const sortedDiagnoses = [...diagnoses].sort((a, b) => a.matchScore - b.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#10b981' : (d.matchScore >= 4 ? '#f59e0b' : '#ef4444')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#d97706' : '#dc2626')),
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