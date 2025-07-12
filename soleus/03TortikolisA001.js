        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'limfadenitis', name: 'Limfadenitis servikal', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Peradangan pada kelenjar getah bening di leher, biasanya akibat infeksi.', analysis: 'KURANG SESUAI. Meskipun ada benjolan, kasus ini tidak menyebutkan adanya demam, kemerahan, atau nyeri tekan yang khas untuk infeksi. Selain itu, limfadenitis tidak secara langsung menyebabkan leher miring (tortikolis).' },
                { id: 'torticollis', name: 'Sternocleidomastoid pseudotumor of Infancy', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">👶</div></div>`, description: 'Penebalan dan pemendekan otot leher (SCM) yang menyebabkan kepala miring.', analysis: 'SANGAT SESUAI. Kombinasi leher miring (tortikolis), benjolan keras di otot SCM, onset di minggu awal kehidupan, dan riwayat lahir besar (makrosomia) adalah presentasi klinis yang klasik untuk kondisi ini.' },
                { id: 'abses', name: 'Abses submandibular', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🥵</div></div>`, description: 'Kumpulan nanah yang terlokalisir di bawah rahang.', analysis: 'TIDAK SESUAI. Lokasi benjolan (di otot SCM) tidak cocok. Abses juga akan disertai demam tinggi, nyeri hebat, dan fluktuasi (terasa lunak berisi cairan), yang tidak ditemukan pada pasien.' },
                { id: 'parotitis', name: 'Parotitis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">😷</div></div>`, description: 'Peradangan pada kelenjar liur parotis, terletak di depan telinga.', analysis: 'TIDAK SESUAI. Lokasi pembengkakan pada parotitis adalah di area pipi/depan telinga, bukan di sepanjang otot leher. Parotitis juga tidak menyebabkan tortikolis.' },
                { id: 'struma', name: 'Struma difusa toksik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🦋</div></div>`, description: 'Pembesaran kelenjar tiroid akibat hipertiroidisme.', analysis: 'TIDAK SESUAI. Lokasi benjolan ada di leher depan (kelenjar tiroid), bukan di otot samping. Kondisi ini sangat jarang pada bayi baru lahir dan tidak menyebabkan tortikolis.' }
            ],
            quiz: [
                { question: "Apa faktor risiko utama pada pasien ini yang sangat mendukung diagnosis Tortikolis Muskular Kongenital?", options: ["Usia 21 hari", "Lahir spontan", "Jenis kelamin pasien", "Berat badan lahir 4370 gram"], answer: "Berat badan lahir 4370 gram" },
                { question: "Benjolan yang teraba pada leher pasien sebenarnya adalah...", options: ["Kelenjar getah bening yang meradang", "Kumpulan nanah (abses)", "Penebalan dan fibrosis otot SCM", "Tumor kelenjar tiroid"], answer: "Penebalan dan fibrosis otot SCM" },
                { question: "Istilah 'tortikolis' secara spesifik merujuk pada...", options: ["Benjolan di leher", "Posisi leher yang miring", "Nyeri saat leher digerakkan", "Pembengkakan kelenjar"], answer: "Posisi leher yang miring" },
                { question: "Mengapa Limfadenitis Servikal kemungkinan besar bukan diagnosis yang tepat?", options: ["Karena bayi terlalu muda", "Karena lehernya miring", "Karena tidak ada riwayat demam atau tanda infeksi", "Karena benjolannya hanya satu"], answer: "Karena tidak ada riwayat demam atau tanda infeksi" },
                { question: "Berdasarkan keseluruhan data klinis, diagnosis yang paling akurat untuk kasus ini adalah?", options: ["Abses submandibular", "Parotitis", "Limfadenitis servikal", "Sternocleidomastoid pseudotumor of infancy"], answer: "Sternocleidomastoid pseudotumor of infancy" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#a7f3d0' : '#fecaca')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#059669' : '#dc2626')),
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
            if (diagnoses.length > 0) {
                // Set the initial view to the most likely diagnosis
                renderDetails('torticollis'); 
            }
            createChart();
            loadQuiz();
        };