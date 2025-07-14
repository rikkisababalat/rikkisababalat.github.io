        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'anagen-effluvium', name: 'Anagen Effluvium', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">☣️</div></div>`, description: 'Kerontokan rambut masif pada fase pertumbuhan (anagen), biasanya akibat toksisitas.', analysis: 'TIDAK SESUAI. Pemicu klasik seperti kemoterapi/radiasi tidak ada. Kerontokan pada kasus ini tidak separah gambaran anagen effluvium klasik.' },
                { id: 'alopecia-areata', name: 'Alopesia Areata', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Kerontokan rambut autoimun yang menyebabkan kebotakan berpola (patchy).', analysis: 'KURANG SESUAI. Pasien mengalami kerontokan difus (merata), bukan berpola bulat atau oval yang khas untuk alopesia areata.' },
                { id: 'alopecia-androgenik', name: 'Alopesia Androgenik', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Kebotakan pola pria yang bersifat kronis dan progresif karena faktor genetik dan hormonal.', analysis: 'CUKUP SESUAI, NAMUN BUKAN DIAGNOSIS UTAMA. Meskipun pasien mungkin memiliki predisposisi, onset yang akut dan pemicu stres lebih menunjuk ke diagnosis lain. Alopesia androgenik biasanya progresif lambat.' },
                { id: 'telogen-effluvium', name: 'Telogen Effluvium', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">😥</div></div>`, description: 'Kerontokan rambut difus akibat banyaknya rambut yang masuk ke fase istirahat (telogen).', analysis: 'SANGAT SESUAI. Adanya pemicu stres berat, onset kerontokan akut (1 bulan), penipisan difus, dan hair pull test (+) adalah gambaran klinis yang sangat khas untuk Telogen Effluvium.' },
                { id: 'dermatitis-seboroik', name: 'Dermatitis Seboroik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🧼</div></div>`, description: 'Kondisi peradangan kulit kepala yang menyebabkan ketombe dan skuama.', analysis: 'TIDAK SESUAI. Tidak ada gejala peradangan kulit kepala seperti gatal, kemerahan, atau ketombe yang signifikan dilaporkan dalam kasus ini.' },
            ],
            quiz: [
                { question: "Faktor risiko utama yang dialami pasien dalam studi kasus ini adalah...", options: ["Usia muda", "Jenis kelamin laki-laki", "Pekerjaan tingkat stres tinggi", "Sering menyisir rambut"], answer: "Pekerjaan tingkat stres tinggi" },
                { question: "Pemeriksaan 'Hair pull test (+)' pada pasien ini menandakan...", options: ["Adanya infeksi jamur", "Kerontokan rambut yang aktif dan abnormal", "Kekuatan akar rambut yang lemah", "Tanda kebotakan permanen"], answer: "Kerontokan rambut yang aktif dan abnormal" },
                { question: "Jenis kerontokan rambut yang dialami pasien (difus) berarti...", options: ["Rontok hanya di bagian depan", "Rontok membentuk pitak-pitak", "Rontok secara merata di seluruh kepala", "Rontok hanya saat keramas"], answer: "Rontok secara merata di seluruh kepala" },
                { question: "Mengapa 'Alopesia Areata' bukan diagnosis yang paling mungkin?", options: ["Karena onsetnya akut", "Karena tidak ada riwayat autoimun", "Karena pola kerontokannya difus, bukan patchy (berpola)", "Karena pasien adalah seorang CEO"], answer: "Karena pola kerontokannya difus, bukan patchy (berpola)" },
                { question: "Berdasarkan semua temuan, diagnosis yang paling akurat adalah...", options: ["Anagen Effluvium", "Alopesia Androgenik", "Telogen Effluvium", "Dermatitis Seboroik"], answer: "Telogen Effluvium" }
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
                        if (d.matchScore >= 8) return '#059669'; // Paling cocok
                        if (d.matchScore >= 4) return '#34d399'; // Cukup cocok
                        return '#a7f3d0'; // Kurang cocok
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 8) return '#065f46';
                         if (d.matchScore >= 4) return '#059669';
                         return '#6ee7b7';
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