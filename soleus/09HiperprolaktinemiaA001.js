        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'sella-turcica', name: 'Sella turcica', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Struktur tulang di dasar tengkorak yang menjadi "rumah" bagi kelenjar hipofisis (pituitari).', analysis: 'SANGAT SESUAI. Kelainan di sini (tumor hipofisis) dapat secara bersamaan menyebabkan hiperprolaktinemia (galaktorea, amenorea) dan menekan saraf di sekitarnya (diplopia). Ini adalah satu-satunya lokasi yang menjelaskan semua gejala pasien.' },
                { id: 'ovarium', name: 'Ovarium', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-pink-100"><div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-3xl">🌸</div></div>`, description: 'Organ reproduksi wanita yang memproduksi sel telur dan hormon estrogen/progesteron.', analysis: 'KURANG SESUAI. Kondisi seperti PCOS dapat menjelaskan amenorea, infertilitas, dan hirsutisme. Namun, tidak dapat menjelaskan gejala galaktorea dan diplopia.' },
                { id: 'ginjal-superior', name: 'Superior dari ginjal', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-xl font-bold">Ad</div></div>`, description: 'Lokasi kelenjar adrenal, yang memproduksi hormon stres dan androgen.', analysis: 'TIDAK SESUAI. Tumor adrenal dapat menyebabkan kelebihan androgen (hirsutisme, jerawat), tetapi tidak menyebabkan galaktorea, amenorea (dengan mekanisme ini), atau diplopia.' },
                { id: 'laring-inferior', name: 'Inferior dari prominentia laryngea', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-2xl">🦋</div></div>`, description: 'Lokasi kelenjar tiroid, yang mengatur metabolisme tubuh.', analysis: 'KURANG SESUAI. Hipotiroidisme berat dapat meningkatkan kadar prolaktin dan menyebabkan amenorea. Namun, tidak menjelaskan gejala neurologis berupa efek massa seperti diplopia.' },
                { id: 'uterus', name: 'Uterus', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🏠</div></div>`, description: 'Organ tempat janin berkembang.', analysis: 'SANGAT TIDAK SESUAI. Masalah struktural pada uterus (misalnya, sindrom Asherman) dapat menyebabkan amenorea, tetapi sama sekali tidak berhubungan dengan gejala hormonal sistemik (galaktorea, hirsutisme) atau gejala neurologis (diplopia).' }
            ],
            quiz: [
                { question: "Gejala manakah yang paling khas menunjukkan adanya kadar prolaktin yang sangat tinggi (hiperprolaktinemia)?", options: ["Jerawat", "Vagina kering", "Galaktorea (cairan dari puting)", "Nyeri saat berhubungan"], answer: "Galaktorea (cairan dari puting)" },
                { question: "Diplopia (penglihatan ganda) pada kasus ini kemungkinan besar disebabkan oleh...", options: ["Efek samping obat", "Kekurangan vitamin A", "Penekanan tumor pada saraf kranial", "Kadar gula darah tinggi"], answer: "Penekanan tumor pada saraf kranial" },
                { question: "Sella turcica adalah struktur tulang yang melindungi organ vital apa?", options: ["Kelenjar Tiroid", "Kelenjar Hipofisis (Pituitari)", "Kelenjar Adrenal", "Ovarium"], answer: "Kelenjar Hipofisis (Pituitari)" },
                { question: "Mengapa diagnosis Sindrom Ovarium Polikistik (PCOS) kurang tepat untuk pasien ini?", options: ["Karena usia pasien terlalu tua", "Karena pasien tidak obesitas", "Karena PCOS tidak menyebabkan galaktorea dan diplopia", "Karena PCOS tidak menyebabkan jerawat"], answer: "Karena PCOS tidak menyebabkan galaktorea dan diplopia" },
                { question: "Berdasarkan analisis komprehensif seluruh gejala, lokasi kelainan yang paling mungkin adalah...", options: ["Ovarium", "Uterus", "Kelenjar Tiroid", "Sella turcica"], answer: "Sella turcica" }
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
            // Urutkan data dari skor tertinggi ke terendah untuk visualisasi yang lebih baik
            const sortedDiagnoses = [...diagnoses].sort((a, b) => b.matchScore - a.matchScore);
            
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 4) return '#6ee7b7'; // emerald-300
                        return '#fca5a5'; // red-300
                    }),
                    borderColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 4) return '#34d399'; // emerald-400
                        return '#f87171'; // red-400
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