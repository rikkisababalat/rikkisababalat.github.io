        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'abortus-iminens', name: 'Abortus iminens', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">😥</div></div>`, description: 'Ancaman keguguran dimana terjadi perdarahan dari rahim sebelum 20 minggu kehamilan dengan serviks tertutup.', analysis: 'KURANG SESUAI. Meskipun ada perdarahan, abortus iminens tidak menjelaskan nyeri perut unilateral yang hebat, tanda-tanda syok (hipotensi & takikardia), dan bukti adanya darah di rongga perut.' },
                { id: 'abortus-insipiens', name: 'Abortus insipiens', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">😢</div></div>`, description: 'Keguguran yang sedang berlangsung dimana serviks sudah terbuka, dan perdarahan lebih banyak.', analysis: 'KURANG SESUAI. Nyeri pada abortus biasanya berupa kram di garis tengah perut. Tanda syok dan iritasi peritoneum seperti Chandelier sign sangat tidak khas untuk diagnosis ini.' },
                { id: 'kehamilan-ektopik', name: 'Kehamilan ektopik', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Kehamilan yang terjadi di luar rongga rahim, paling sering di tuba falopi.', analysis: 'SESUAI, TAPI KURANG SPESIFIK. Ini adalah diagnosis dasar yang benar, namun tidak sepenuhnya menangkap kegawatan situasi. Gejala pasien (syok, perdarahan internal) menunjukkan bahwa kehamilan ini sudah mengalami komplikasi.' },
                { id: 'ket', name: 'Kehamilan ektopik terganggu', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Kehamilan ektopik yang telah ruptur (pecah) atau mengalami perdarahan, menyebabkan kondisi gawat darurat.', analysis: 'SANGAT SESUAI. Diagnosis ini secara akurat menjelaskan seluruh gambaran klinis: trias gejala (nyeri, amenore, perdarahan), tanda syok hipovolemik, dan bukti hemoperitoneum (Chandelier sign, pungsi douglas positif). Ini adalah diagnosis yang paling tepat.' },
                { id: 'endometriosis', name: 'Endometriosis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🌸</div></div>`, description: 'Kondisi dimana jaringan mirip endometrium tumbuh di luar rahim.', analysis: 'TIDAK SESUAI. Endometriosis dapat menyebabkan nyeri panggul kronis, namun tidak menjelaskan status kehamilan pasien dan onset akut dari syok hipovolemik.' },
            ],
            quiz: [
                { question: "Temuan tanda vital manakah yang paling mengkhawatirkan pada pasien ini?", options: ["Suhu 37,3°C", "TD 80/60 mmHg & Nadi 120x/menit", "RR 24x/menit", "Semua normal"], answer: "TD 80/60 mmHg & Nadi 120x/menit" },
                { question: "Chandelier sign (nyeri goyang porsio) yang positif dalam kasus ini menandakan...", options: ["Infeksi panggul", "Tanda pasti kehamilan", "Iritasi peritoneum akibat darah", "Kontraksi rahim"], answer: "Iritasi peritoneum akibat darah" },
                { question: "Hasil pungsi cavum douglas yang berisi darah mengkonfirmasi adanya...", options: ["Cairan ketuban pecah", "Infeksi berat", "Perdarahan intra-abdominal (Hemoperitoneum)", "Kista ovarium yang pecah"], answer: "Perdarahan intra-abdominal (Hemoperitoneum)" },
                { question: "Mengapa diagnosis 'Abortus iminens' kurang tepat untuk kasus ini?", options: ["Karena perdarahannya sedikit", "Karena usia kehamilan terlalu muda", "Karena adanya tanda syok dan nyeri hebat yang terlokalisir", "Karena pasien belum pernah melahirkan"], answer: "Karena adanya tanda syok dan nyeri hebat yang terlokalisir" },
                { question: "Berdasarkan semua temuan, diagnosis akhir yang paling tepat dan menggambarkan kegawatan situasinya adalah?", options: ["Abortus Komplit", "Kehamilan Ektopik", "Kehamilan Ektopik Terganggu", "Mola Hidatidosa"], answer: "Kehamilan Ektopik Terganggu" }
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
                        if (d.matchScore >= 9) return '#b91c1c'; // red-800
                        if (d.matchScore >= 6) return '#f97316'; // orange-500
                        if (d.matchScore >= 3) return '#f59e0b'; // amber-500
                        return '#64748b'; // slate-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#7f1d1d';
                        if (d.matchScore >= 6) return '#c2410c';
                        if (d.matchScore >= 3) return '#b45309';
                        return '#475569';
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