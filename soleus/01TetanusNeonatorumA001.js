        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'omphalitis', name: 'Omphalitis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">🩹</div></div>`, description: 'Infeksi pada puntung tali pusat (umbilikus).', analysis: 'KURANG TEPAT. Omphalitis adalah pintu masuk infeksi, bukan diagnosis untuk sindrom klinis yang terjadi. Gejala pasien (kejang, trismus, kaku otot) jauh melebihi infeksi lokal di tali pusat.' },
                { id: 'sepsis-neonatorum', name: 'Sepsis Neonatorum', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🌡️</div></div>`, description: 'Infeksi bakteri sistemik berat pada bayi baru lahir.', analysis: 'CUKUP SESUAI. Pasien menunjukkan tanda-tanda infeksi sistemik (sakit berat, demam, apatis). Namun, diagnosis ini kurang spesifik karena tidak menjelaskan gejala neurologis khas (trismus, hipertonia) yang sangat menonjol.' },
                { id: 'tetanus-neonatorum', name: 'Tetanus Neonatorum', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">👶</div></div>`, description: 'Penyakit akibat toksin dari bakteri Clostridium tetani, biasanya masuk melalui tali pusat.', analysis: 'SANGAT SESUAI. Kasus ini menampilkan gambaran klinis buku teks: riwayat persalinan tidak higienis, diikuti munculnya trias klasik yaitu trismus (mulut mencucu), spasme otot (kejang), dan hipertonia (kaku).' },
                { id: 'meningoensefalitis', name: 'Meningoensefalitis', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Peradangan pada selaput otak (meninges) dan jaringan otak (ensefalon).', analysis: 'KURANG SESUAI. Walaupun bisa menyebabkan kejang dan demam, tidak adanya ubun-ubun besar yang membonjol membuat diagnosis ini kurang mungkin. Selain itu, trismus bukan gejala khas dari meningoensefalitis.' },
                { id: 'cmv', name: 'Infeksi Kongenital CMV', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Infeksi Cytomegalovirus yang ditularkan dari ibu ke janin selama kehamilan.', analysis: 'TIDAK SESUAI. Presentasi klinisnya berbeda, biasanya berupa gejala kronis sejak lahir (pembesaran hati, kuning, ruam) bukan onset akut dengan spasme otot hebat pada usia 7 hari.' }
            ],
            quiz: [
                { question: "Apa faktor risiko utama yang memicu kondisi pasien dalam kasus ini?", options: ["Riwayat penyakit ibu saat hamil", "Persalinan di dukun dengan alat tidak steril", "Usia bayi 7 hari", "Demam tinggi"], answer: "Persalinan di dukun dengan alat tidak steril" },
                { question: "Gejala manakah yang paling spesifik untuk diagnosis Tetanus Neonatorum pada kasus ini?", options: ["Demam", "Kejang", "Mulut mencucu seperti ikan", "Kesadaran apatis"], answer: "Mulut mencucu seperti ikan" },
                { question: "Pemeriksaan fisik 'UUB tidak membonjol' membantu menyingkirkan kemungkinan diagnosis...", options: ["Sepsis Neonatorum", "Meningoensefalitis", "Omphalitis", "Tetanus Neonatorum"], answer: "Meningoensefalitis" },
                { question: "Kondisi kaku otot dan kejang pada pasien disebabkan oleh neurotoksin yang dihasilkan oleh bakteri...", options: ["Staphylococcus aureus", "Streptococcus agalactiae", "Escherichia coli", "Clostridium tetani"], answer: "Clostridium tetani" },
                { question: "Berdasarkan keseluruhan data klinis, diagnosis yang paling akurat adalah?", options: ["Sepsis Neonatorum", "Omphalitis", "Tetanus Neonatorum", "Meningoensefalitis"], answer: "Tetanus Neonatorum" }
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
            const sortedDiagnoses = [...diagnoses].sort((a, b) => a.matchScore - b.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Emerald-600
                        if (d.matchScore >= 6) return '#34d399'; // Emerald-400
                        if (d.matchScore >= 4) return '#facc15'; // Yellow-400
                        return '#f87171'; // Red-400
                    }),
                    borderColor: sortedDiagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46'; // Emerald-800
                        if (d.matchScore >= 6) return '#059669'; // Emerald-600
                        if (d.matchScore >= 4) return '#eab308'; // Yellow-500
                        return '#ef4444'; // Red-500
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