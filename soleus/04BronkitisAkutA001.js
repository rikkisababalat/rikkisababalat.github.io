        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'ppok', name: 'PPOK', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">🚬</div></div>`, description: 'Penyakit Paru Obstruktif Kronis, penyakit progresif yang ditandai oleh keterbatasan aliran udara.', analysis: 'SANGAT TIDAK SESUAI. PPOK adalah penyakit kronis yang terjadi pada usia lanjut dengan riwayat merokok. Pasien ini berusia muda (23 tahun) dan gejalanya akut (4 hari).' },
                { id: 'bronkitis-akut', name: 'Bronkitis Akut', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">🌬️</div></div>`, description: 'Peradangan pada saluran udara besar (bronkus) yang bersifat sementara.', analysis: 'SANGAT SESUAI. Usia pasien, onset akut, batuk produktif, demam, riwayat paparan iritan, dan temuan auskultasi (ronkhi dan mengi) sangat khas untuk bronkitis akut.' },
                { id: 'bronkiektasis', name: 'Bronkiektasis', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Kerusakan dan pelebaran permanen pada saluran bronkus.', analysis: 'TIDAK SESUAI. Bronkiektasis adalah kondisi kronis dengan riwayat infeksi berulang dan batuk produktif menahun. Gejala pasien baru berlangsung 4 hari.' },
                { id: 'efusi-pleura', name: 'Efusi Pleura', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Penumpukan cairan berlebih di dalam rongga pleura (selaput paru).', analysis: 'TIDAK SESUAI. Temuan fisik pada efusi pleura adalah suara napas yang melemah atau hilang. Pada pasien ini ditemukan ronkhi dan mengi, yang menunjuk ke masalah di dalam saluran napas, bukan di rongga pleura.' },
                { id: 'ispa', name: 'ISPA', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 rounded-full flex items-center justify-center text-3xl">🤧</div></div>`, description: 'Infeksi Saluran Pernapasan Akut, istilah umum untuk infeksi di saluran napas.', analysis: 'SESUAI TAPI KURANG SPESIFIK. Bronkitis akut adalah salah satu jenis ISPA. Namun, karena temuan klinis (ronkhi dan mengi) jelas mengarah pada peradangan bronkus, maka diagnosis Bronkitis Akut jauh lebih tepat dan informatif.' }
            ],
            quiz: [
                { question: "Apa temuan pemeriksaan fisik yang paling khas untuk menunjukkan adanya lendir di saluran napas besar (bronkus)?", options: ["Demam sumeng", "Dahak kekuningan", "Mengi ekspirasi", "Ronkhi basah kasar"], answer: "Ronkhi basah kasar" },
                { question: "Mengapa PPOK (Penyakit Paru Obstruktif Kronis) dapat disingkirkan sebagai diagnosis pada kasus ini?", options: ["Karena dahaknya berwarna kuning", "Karena pasien adalah perempuan", "Karena usia pasien muda dan gejalanya akut", "Karena pasien tidak sesak napas"], answer: "Karena usia pasien muda dan gejalanya akut" },
                { question: "Faktor risiko manakah dalam riwayat pasien yang paling mungkin berkontribusi pada keluhannya?", options: ["Baru pindah rumah", "Menunggu angkutan di tepi jalan", "Jenis kelamin perempuan", "Usia 23 tahun"], answer: "Menunggu angkutan di tepi jalan" },
                { question: "Adanya mengi (wheezing) pada pasien ini menandakan...", options: ["Adanya cairan di rongga pleura", "Penyempitan pada saluran napas", "Kerusakan permanen pada paru", "Infeksi pada kantung udara (alveolus)"], answer: "Penyempitan pada saluran napas" },
                { question: "Berdasarkan keseluruhan data, diagnosis yang paling spesifik dan akurat adalah...", options: ["ISPA", "Pneumonia", "PPOK", "Bronkitis Akut"], answer: "Bronkitis Akut" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
                // Set default view to the most likely diagnosis
                renderDetails('bronkitis-akut');
            }
            createChart();
            loadQuiz();
        };