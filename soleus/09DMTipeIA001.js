        // Data diubah untuk menempatkan C-Peptida sebagai pilihan paling tepat
        const caseData = {
            diagnoses: [
                { id: 'hba1c', name: 'HbA1c', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Pemeriksaan yang mengukur rata-rata glukosa darah selama 2-3 bulan.', analysis: 'TEPAT, NAMUN BUKAN PRIORITAS UTAMA. HbA1c penting untuk mengonfirmasi hiperglikemia kronis dan sebagai baseline. Namun, tes ini tidak memberikan informasi tentang penyebab DM (tipe 1 atau 2) yang krusial untuk keputusan terapi darurat pada pasien anak dengan gejala akut.' },
                { id: 'c-peptida', name: 'C-Peptida', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Mengukur sisa kemampuan pankreas memproduksi insulin.', analysis: 'SANGAT TEPAT. Dengan diagnosis DM yang sudah hampir pasti secara klinis (gejala + GDS 330), pertanyaan paling krusial selanjutnya adalah menentukan tipe DM untuk memulai terapi yang tepat dan cepat. C-Peptida langsung mengukur kapasitas produksi insulin, di mana hasil yang rendah akan mengonfirmasi DMT1 dan keharusan terapi insulin segera untuk mencegah DKA.' },
                { id: 'insulin', name: 'Insulin Darah', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Mengukur kadar insulin dalam sirkulasi darah.', analysis: 'Cukup relevan, namun C-Peptida dianggap sebagai penanda produksi insulin endogen yang lebih stabil dan akurat, terutama untuk tujuan klasifikasi.' },
                { id: 'gdp', name: 'GDP', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🍽️</div></div>`, description: 'Pemeriksaan Gula Darah Puasa (minimal 8 jam).', analysis: 'KURANG BERMANFAAT. Pasien sudah memiliki GDS sangat tinggi dengan gejala klasik. Meminta pasien puasa tidak efisien dan dapat menunda tatalaksana yang mendesak.' },
                { id: 'kortisol', name: 'Hormon Kortisol', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🌙</div></div>`, description: 'Mengukur hormon stres yang dapat mempengaruhi gula darah.', analysis: 'TIDAK TEPAT. Tidak ada indikasi klinis yang mengarah pada kelainan hormon kortisol. Gejala pasien sangat spesifik untuk DM primer.' }
            ],
            quiz: [
                { question: "Apa tiga gejala klasik (trias) diabetes yang ditemukan pada pasien ini?", options: ["Demam, batuk, pilek", "Sakit kepala, mual, muntah", "Haus berlebih, sering BAK, nafsu makan meningkat", "Nyeri sendi, ruam kulit, lemas"], answer: "Haus berlebih, sering BAK, nafsu makan meningkat" },
                { question: "Mengapa terjadi penurunan berat badan pada pasien meskipun nafsu makannya meningkat?", options: ["Karena pasien kurang minum", "Karena kelebihan hormon tiroid", "Karena sel tubuh tidak bisa menggunakan glukosa untuk energi", "Karena gangguan penyerapan di usus"], answer: "Karena sel tubuh tidak bisa menggunakan glukosa untuk energi" },
                { question: "Berdasarkan usia dan gejala akut, jenis diabetes apakah yang paling mungkin diderita pasien?", options: ["Diabetes Tipe 2", "Diabetes Gestasional", "Diabetes Tipe 1", "Diabetes LADA"], answer: "Diabetes Tipe 1" },
                { question: "Nilai Gula Darah Sewaktu (GDS) pasien adalah 330 mg/dL. Menurut kriteria diagnostik, nilai ini...", options: ["Normal", "Ambang batas (Pre-diabetes)", "Sangat tinggi dan mendukung diagnosis DM", "Perlu diulang setelah puasa"], answer: "Sangat tinggi dan mendukung diagnosis DM" },
                { question: "Pemeriksaan apa yang paling tepat untuk melihat kontrol gula darah rata-rata selama 3 bulan terakhir?", options: ["Tes Urin Lengkap", "Profil Lemak", "HbA1c", "C-Peptida"], answer: "HbA1c" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Pilihan:</h4>
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
                    label: 'Tingkat Relevansi Klinis',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 7 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 7 ? '#059669' : '#6ee7b7')),
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