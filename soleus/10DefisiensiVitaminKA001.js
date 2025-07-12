       // Data disesuaikan untuk kasus Defisiensi Vitamin K
        const caseData = {
            diagnoses: [
                { id: 'vit-k1', name: 'Vitamin K1', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Bentuk vitamin K (Phytonadione) yang digunakan untuk profilaksis dan pengobatan gangguan perdarahan.', analysis: 'SANGAT SESUAI. Injeksi Vitamin K1 adalah standar emas untuk mencegah VKDB pada bayi baru lahir. Vitamin ini esensial untuk sintesis faktor koagulasi II, VII, IX, dan X di hati.' },
                { id: 'vit-b1', name: 'Vitamin B1', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Dikenal sebagai Tiamin, penting untuk metabolisme energi dan fungsi saraf.', analysis: 'TIDAK SESUAI. Defisiensi Vitamin B1 menyebabkan penyakit Beriberi, yang gejalanya melibatkan masalah jantung dan saraf, bukan gangguan pembekuan darah.' },
                { id: 'vit-b12', name: 'Vitamin B12', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Dikenal sebagai Kobalamin, penting untuk pembentukan sel darah merah dan fungsi neurologis.', analysis: 'TIDAK SESUAI. Defisiensi Vitamin B12 menyebabkan anemia megaloblastik dan masalah neurologis, bukan pemanjangan PT/APTT dan perdarahan akut.' },
                { id: 'vit-k2', name: 'Vitamin K2', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🦴</div></div>`, description: 'Bentuk vitamin K (Menaquinone) yang lebih banyak berperan dalam kesehatan tulang dan kardiovaskular.', analysis: 'KURANG SESUAI. Meskipun merupakan bentuk Vitamin K, Vitamin K2 bukan merupakan preparat standar yang diberikan saat lahir untuk mencegah perdarahan. Peran utamanya berbeda.' },
                { id: 'vit-k3', name: 'Vitamin K3', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Bentuk sintetis Vitamin K (Menadione) yang larut dalam air.', analysis: 'TIDAK TEPAT & BERBAHAYA. Vitamin K3 tidak lagi digunakan pada neonatus karena dapat menyebabkan stres oksidatif, anemia hemolitik, dan kernikterus (kerusakan otak akibat kadar bilirubin tinggi).' }
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin untuk bayi dalam studi kasus ini?", options: ["Hemofilia", "Demam Berdarah Dengue", "Penyakit Perdarahan Akibat Defisiensi Vitamin K (VKDB)", "Leukemia"], answer: "Penyakit Perdarahan Akibat Defisiensi Vitamin K (VKDB)" },
                { question: "Mengapa hasil laboratorium PT dan APTT pada pasien ini memanjang?", options: ["Karena kekurangan trombosit", "Karena Vitamin K dibutuhkan untuk membuat faktor pembekuan", "Karena adanya infeksi virus", "Karena fungsi hati terganggu sejak lahir"], answer: "Karena Vitamin K dibutuhkan untuk membuat faktor pembekuan" },
                { question: "Temuan 'ubun-ubun besar menonjol' pada bayi ini paling mungkin menandakan apa?", options: ["Dehidrasi berat", "Gizi buruk", "Peningkatan tekanan di dalam kepala", "Kelainan tulang tengkorak"], answer: "Peningkatan tekanan di dalam kepala" },
                { question: "Manakah faktor risiko utama yang menyebabkan kondisi pada bayi ini?", options: ["Lahir prematur", "Ibu merokok saat hamil", "Tidak mendapat injeksi Vitamin K saat lahir", "Riwayat alergi pada keluarga"], answer: "Tidak mendapat injeksi Vitamin K saat lahir" },
                { question: "Tindakan apakah yang seharusnya menjadi tata laksana awal paling penting di IGD untuk kasus ini?", options: ["Memberikan antibiotik spektrum luas", "Memberikan transfusi darah lengkap", "Memberikan suntikan Vitamin K1 dosis terapi", "Melakukan CT scan kepala segera"], answer: "Memberikan suntikan Vitamin K1 dosis terapi" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#d97706' : '#dc2626')),
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
            if (diagnoses.length > 0) {
                // Set default view to Vitamin K1 as it's the correct answer
                renderDetails('vit-k1');
            }
            createChart();
            loadQuiz();
        };