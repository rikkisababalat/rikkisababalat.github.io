        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'bacterial', name: 'Meningitis Bakterial', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi bakteri akut pada meninges, seringkali bersifat gawat darurat.', analysis: 'KURANG SESUAI. Meskipun glukosa rendah dan protein tinggi, onset penyakitnya subakut (3 minggu), bukan akut. Selain itu, sel yang dominan adalah limfosit, bukan neutrofil yang menjadi ciri khas meningitis bakteri.' },
                { id: 'tb', name: 'Meningitis TB', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-cyan-200"><div class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Infeksi meninges oleh Mycobacterium tuberculosis, dengan perjalanan penyakit yang lebih lambat.', analysis: 'SANGAT SESUAI. Kombinasi riwayat demam subakut, tanda meningeal (+), dan temuan CSF (limfositosis, protein tinggi, dan glukosa rendah) adalah gambaran yang sangat klasik untuk Meningitis TB.' },
                { id: 'viral', name: 'Meningitis Virus', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Bentuk meningitis yang paling umum dan biasanya lebih ringan, disebabkan oleh virus.', analysis: 'TIDAK SESUAI. Meskipun selnya limfosit, temuan glukosa CSF yang rendah pada kasus ini sangat bertentangan dengan diagnosis meningitis virus, di mana kadar glukosa umumnya normal.' },
                { id: 'fungal', name: 'Meningitis Fungal', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Infeksi jamur pada meninges, sering terjadi pada pasien dengan sistem imun yang lemah.', analysis: 'CUKUP SESUAI. Gambaran CSF pada meningitis jamur bisa sangat mirip dengan meningitis TB (limfosit, glukosa rendah, protein tinggi). Ini adalah diagnosis banding yang kuat, namun presentasi klinis pada kasus ini lebih condong ke TB yang lebih umum.' },
                { id: 'meningoencephalitis', name: 'Meningoensefalitis', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Peradangan yang terjadi pada selaput otak (meninges) dan jaringan otak (ensefalon) secara bersamaan.', analysis: 'SESUAI, TAPI BUKAN DIAGNOSIS ETIOLOGI. Pasien ini memang mengalami meningoensefalitis (ditandai dengan meningitis dan penurunan kesadaran/ensefalitis). Namun, istilah ini mendeskripsikan sindrom klinis, bukan penyebabnya. Meningitis TB adalah diagnosis etiologi yang paling mungkin.' }
            ],
            quiz: [
                { question: "Temuan CSF apakah yang paling kuat menyingkirkan diagnosis meningitis virus pada kasus ini?", options: ["Warna kekuningan", "Peningkatan protein", "Dominasi limfosit", "Glukosa rendah"], answer: "Glukosa rendah" },
                { question: "Dominasi jenis sel apakah pada cairan serebrospinal yang paling mendukung diagnosis meningitis TB?", options: ["Neutrofil", "Limfosit", "Eosinofil", "Sel Darah Merah"], answer: "Limfosit" },
                { question: "Riwayat demam selama 3 minggu sebelum penurunan kesadaran menunjukkan perjalanan penyakit yang bersifat...", options: ["Akut", "Subakut", "Kronis", "Fulminan"], answer: "Subakut" },
                { question: "Adanya kaku kuduk, Laseque sign, dan Kernig sign secara kolektif dikenal sebagai...", options: ["Tanda vital", "Refleks patologis", "Tanda rangsang meningeal", "Gangguan motorik"], answer: "Tanda rangsang meningeal" },
                { question: "Berdasarkan keseluruhan data klinis dan penunjang, diagnosis etiologi yang paling mungkin adalah...", options: ["Meningitis Bakterial", "Meningitis Virus", "Meningitis TB", "Stroke"], answer: "Meningitis TB" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#6ee7b7')),
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