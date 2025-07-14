        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'batwing', name: 'Batwing Appearance', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Gambaran radiologis pada foto toraks yang khas untuk edema paru.', analysis: 'TIDAK RELEVAN. Tanda ini ditemukan di paru-paru, bukan pada sendi bahu, dan tidak berhubungan dengan trauma atau dislokasi.' },
                { id: 'half-moon', name: 'Half-moon overlap sign', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Tumpang tindih normal antara kaput humerus dan fossa glenoid pada foto rontgen bahu.', analysis: 'RELEVAN SEBAGAI JAWABAN. Ini adalah jawaban yang benar untuk pertanyaan "gambaran normal". Ini menunjukkan sendi bahu yang sehat dan tidak mengalami dislokasi.' },
                { id: 'light-bulb', name: 'Light bulb sign', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">💡</div></div>`, description: 'Tanda radiologis klasik untuk dislokasi bahu posterior pada foto AP.', analysis: 'RELEVAN UNTUK DIAGNOSIS. Tanda ini sangat sesuai dengan diagnosis klinis pasien (dislokasi posterior). Namun, ini adalah gambaran patologis (abnormal), bukan normal.' },
                { id: 'garden-spade', name: 'Garden spade appearance', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">✋</div></div>`, description: 'Gambaran tulang jari tangan yang melebar seperti sekop pada penderita akromegali.', analysis: 'TIDAK RELEVAN. Tanda ini ditemukan di tangan dan berhubungan dengan kelainan hormonal, bukan trauma bahu.' },
                { id: 'gower-sign', name: 'Gower Sign', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🧍</div></div>`, description: 'Tanda klinis, bukan radiologis, yang menunjukkan kelemahan otot proksimal.', analysis: 'TIDAK RELEVAN. Ini adalah temuan dari pemeriksaan fisik untuk kondisi neuromuskular, bukan temuan dari foto rontgen.' }
            ],
            quiz: [
                { question: "Berdasarkan posisi lengan adduksi dan rotasi interna, diagnosis klinis yang paling mungkin adalah...", options: ["Dislokasi anterior", "Dislokasi posterior", "Fraktur klavikula", "Robekan rotator cuff"], answer: "Dislokasi posterior" },
                { question: "Tanda radiologis 'Light bulb sign' pada foto AP bahu sangat khas untuk kondisi...", options: ["Artritis", "Bursitis", "Dislokasi anterior", "Dislokasi posterior"], answer: "Dislokasi posterior" },
                { question: "Jenis dislokasi bahu yang paling sering terjadi secara umum adalah...", options: ["Dislokasi anterior", "Dislokasi posterior", "Dislokasi inferior", "Dislokasi superior"], answer: "Dislokasi anterior" },
                { question: "Manakah dari pilihan berikut yang merupakan gambaran radiologis untuk sendi bahu yang normal?", options: ["Light bulb sign", "Trough sign", "Hill-Sachs lesion", "Half-moon overlap sign"], answer: "Half-moon overlap sign" },
                { question: "Penanganan pertama yang paling penting untuk dislokasi sendi adalah...", options: ["Pemberian antibiotik", "Reposisi (mengembalikan sendi ke tempatnya)", "Pembedahan langsung", "Pemberian obat pelunak otot"], answer: "Reposisi (mengembalikan sendi ke tempatnya)" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
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
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => {
                        if (d.id === 'half-moon') return '#10b981'; // Green for correct answer
                        if (d.id === 'light-bulb') return '#f59e0b'; // Yellow for relevant diagnosis
                        return '#d1d5db'; // Gray for irrelevant
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.id === 'half-moon') return '#059669';
                        if (d.id === 'light-bulb') return '#d97706';
                        return '#9ca3af';
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