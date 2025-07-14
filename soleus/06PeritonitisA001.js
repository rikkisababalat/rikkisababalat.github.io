        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'ileus-obstruktif', name: 'Ileus Obstruktif', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Sumbatan mekanik pada lumen usus.', analysis: 'KURANG SESUAI. Gejala utama ileus obstruktif adalah nyeri kolik, muntah, dan distensi abdomen. Kasus ini menunjukkan nyeri hebat mendadak dan kaku pada perut (defans muskular), yang lebih mengarah pada iritasi peritoneal daripada sumbatan mekanis.' },
                { id: 'ileus-paralitik', name: 'Ileus Paralitik', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🔇</div></div>`, description: 'Lumpuhnya gerakan peristaltik usus.', analysis: 'SESUAI, TAPI BUKAN DIAGNOSIS UTAMA. Pasien memang mengalami ileus paralitik (bising usus 0x/menit), tetapi ini adalah konsekuensi atau tanda dari kondisi yang lebih parah, yaitu peritonitis. Ileus paralitik adalah gejalanya, bukan penyebab utamanya.' },
                { id: 'peritonitis', name: 'Peritonitis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Peradangan pada peritoneum (selaput rongga perut).', analysis: 'SANGAT SESUAI. Ini adalah diagnosis yang paling cocok. Riwayat demam tifoid, nyeri perut akut, defans muskular (perut papan), dan bising usus menghilang adalah gambaran klinis klasik dari peritonitis akibat perforasi usus.' },
                { id: 'demam-tifoid', name: 'Demam Tifoid', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🤒</div></div>`, description: 'Infeksi sistemik oleh bakteri Salmonella typhi.', analysis: 'TIDAK TEPAT SEBAGAI KOMPLIKASI. Demam tifoid adalah penyakit primer yang mendasari kondisi pasien saat ini. Pertanyaannya adalah tentang komplikasi yang terjadi, bukan penyakit awalnya.' },
                { id: 'syok-sepsis', name: 'Syok Sepsis', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">📉</div></div>`, description: 'Sepsis berat dengan hipotensi yang persisten.', analysis: 'SESUAI, TAPI PERITONITIS ADALAH SUMBERNYA. Tanda vital pasien (takikardia, takipnea, demam, hipotensi ringan) menunjukkan adanya SIRS/sepsis. Namun, peritonitis adalah sumber infeksi intra-abdomen yang menyebabkan kondisi sistemik ini. Jadi, peritonitis adalah diagnosis patologis yang lebih spesifik.' }
            ],
            quiz: [
                { question: "Temuan fisik manakah yang paling spesifik untuk peritonitis?", options: ["Demam", "Takikardia", "Bising usus menghilang", "Defans muskular"], answer: "Defans muskular" },
                { question: "Hilangnya bising usus pada pasien ini paling tepat disebut sebagai...", options: ["Ileus obstruktif", "Ileus paralitik", "Dispepsia", "Gastroenteritis"], answer: "Ileus paralitik" },
                { question: "Mengapa 'Demam Tifoid' bukan jawaban yang tepat untuk pertanyaan utama?", options: ["Karena demamnya tidak terlalu tinggi", "Karena itu adalah penyakit dasarnya, bukan komplikasinya", "Karena sudah diobati", "Karena tidak menyebabkan nyeri perut"], answer: "Karena itu adalah penyakit dasarnya, bukan komplikasinya" },
                { question: "Kombinasi tanda vital pasien (nadi cepat, napas cepat, demam, tekanan darah rendah) merupakan indikator dari...", options: ["Dehidrasi ringan", "Reaksi alergi", "Respons peradangan sistemik (SIRS/Sepsis)", "Kecemasan"], answer: "Respons peradangan sistemik (SIRS/Sepsis)" },
                { question: "Melihat riwayatnya, penyebab paling mungkin dari peritonitis pada pasien ini adalah...", options: ["Radang usus buntu (apendisitis)", "Pankreatitis akut", "Perforasi usus akibat infeksi tifoid", "Tukak lambung yang bocor"], answer: "Perforasi usus akibat infeksi tifoid" }
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
                        if (d.matchScore >= 9) return '#059669'; // Emerald-600 for best match
                        if (d.matchScore >= 6) return '#34d399'; // Emerald-400 for good match
                        if (d.matchScore >= 3) return '#f9a826'; // Yellow-500 for fair match
                        return '#ef4444'; // Red-500 for poor match
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46';
                         if (d.matchScore >= 6) return '#059669';
                         if (d.matchScore >= 3) return '#f59e0b';
                         return '#dc2626';
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