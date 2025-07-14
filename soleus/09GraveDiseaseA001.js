        // Data disesuaikan untuk fokus pada analisis opsi obat
        const caseData = {
            // Mengganti 'diagnoses' dengan 'options' untuk analisis obat
            options: [
                { id: 'metamizole', name: 'Metamizole', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Obat analgesik-antipiretik (pereda nyeri dan penurun demam).', analysis: 'TIDAK RELEVAN. Metamizole tidak memiliki efek pada kelenjar tiroid, produksi hormon, ataupun gejala spesifik hipertiroidisme. Ini adalah jawaban yang benar untuk pertanyaan "kecuali".' },
                { id: 'lugol', name: 'Solusio Lugol', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Larutan Kalium Iodida (yodium).', analysis: 'RELEVAN. Merupakan obat antitiroid. Yodium dalam dosis tinggi menekan pelepasan hormon tiroid dari kelenjar (efek Wolff-Chaikoff). Digunakan untuk penanganan cepat, misalnya pada krisis tiroid.' },
                { id: 'ptu', name: 'PTU', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Propiltiourasil, obat antitiroid golongan thionamide.', analysis: 'SANGAT RELEVAN. Ini adalah obat antitiroid lini utama. Bekerja dengan cara menghambat enzim thyroid peroxidase, sehingga produksi hormon tiroid (T3 & T4) terganggu.' },
                { id: 'propranolol', name: 'Propranolol', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">❤️</div></div>`, description: 'Obat beta-blocker non-selektif.', analysis: 'SANGAT RELEVAN (SIMTOMATIK). Meskipun bukan obat antitiroid sejati, propranolol esensial untuk mengontrol gejala adrenergik seperti takikardia (jantung berdebar), tremor, dan gelisah. Bekerja cepat meredakan keluhan pasien.' },
                { id: 'karbimazol', name: 'Karbimazol', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Obat antitiroid golongan thionamide, pro-drug dari methimazole.', analysis: 'SANGAT RELEVAN. Sama seperti PTU, ini adalah obat antitiroid lini utama yang menghambat sintesis (produksi) hormon tiroid. Sangat umum digunakan.' },
            ],
            quiz: [
                { question: "Berdasarkan gejala dan temuan klinis (eksoftalmus, pembesaran tiroid difus), diagnosis yang paling mungkin pada pasien ini adalah...", options: ["Tiroiditis Hashimoto", "Penyakit Graves", "Gondok Endemik", "Kanker Tiroid"], answer: "Penyakit Graves" },
                { question: "Manakah dari obat berikut yang bekerja dengan menghambat produksi hormon tiroid di kelenjar tiroid?", options: ["Propranolol", "Metamizole", "PTU", "Semua salah"], answer: "PTU" },
                { question: "Gejala berdebar-debar (takikardia) dan tremor pada pasien ini terutama disebabkan oleh...", options: ["Efek langsung hormon tiroid pada jantung dan sistem saraf", "Kadar kalsium yang rendah", "Respon alergi", "Kekurangan yodium"], answer: "Efek langsung hormon tiroid pada jantung dan sistem saraf" },
                { question: "Manakah obat yang bekerja paling cepat untuk mengurangi gejala berdebar-debar dan gemetar pada pasien hipertiroidisme?", options: ["Propiltiourasil (PTU)", "Propranolol", "Iodium radioaktif", "Karbimazol"], answer: "Propranolol" },
                { question: "Metamizole tidak termasuk obat antitiroid karena fungsinya sebagai...", options: ["Beta-blocker", "Penghambat produksi hormon", "Analgesik-antipiretik", "Larutan yodium"], answer: "Analgesik-antipiretik" }
            ]
        };

        const { options: optionsData, quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(optionId) {
            const option = optionsData.find(d => d.id === optionId);
            if (!option) return;
            detailsContainer.innerHTML = `
                <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transition-all duration-300 ease-in-out">
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        ${option.vizIconHtml}
                        <div class="flex-1 text-center md:text-left">
                            <h3 class="text-2xl font-bold text-emerald-800">${option.name}</h3>
                            <p class="text-slate-600 mt-1">${option.description}</p>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-200">
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
                        <p class="text-slate-600 mt-1">${option.analysis}</p>
                    </div>
                </div>
            `;
            document.querySelectorAll('#diagnosis-nav button').forEach(btn => {
                btn.classList.toggle('nav-button-active', btn.dataset.id === optionId);
                btn.classList.toggle('nav-button-inactive', btn.dataset.id !== optionId);
            });
        }

        function createNav() {
            optionsData.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.name;
                button.dataset.id = option.id;
                button.className = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 nav-button-inactive';
                button.onclick = () => renderDetails(option.id);
                navContainer.appendChild(button);
            });
        }

        function createChart() {
            const ctx = document.getElementById('matchChart').getContext('2d');
            const data = {
                labels: optionsData.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Relevansi Terapi',
                    data: optionsData.map(d => d.matchScore),
                    backgroundColor: optionsData.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#fca5a5')),
                    borderColor: optionsData.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#ef4444')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Relevansi (0-10)', font: { size: 14 } } },
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