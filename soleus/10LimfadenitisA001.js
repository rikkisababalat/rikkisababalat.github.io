
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'tb-langhans', name: 'Sel Datia Langhans', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-cyan-200"><div class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-3xl">🔬</div></div>`, description: 'Sel datia multinuklear dengan inti tersusun tapal kuda di perifer.', analysis: 'SANGAT SESUAI. Ini adalah deskripsi morfologi yang akurat dari sel klasik yang ditemukan dalam granuloma tuberkulosis. Dikombinasikan dengan gambaran klinis pasien, ini adalah temuan yang paling mungkin dan paling tepat.' },
                { id: 'tb-necrosis', name: 'Sel datia berinti banyak dengan inti terletak di tengah dengan nekrosis perkijuan', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Temuan berupa sel datia (giant cells) dengan latar belakang nekrosis perkijuan (caseous necrosis).', analysis: 'CUKUP SESUAI. Nekrosis perkijuan adalah tanda patognomonik untuk TB. Namun, deskripsi sel datia dengan inti di tengah secara teknis kurang akurat, membuat pilihan ini sedikit lebih lemah dibandingkan deskripsi sel Langhans yang tepat.' },
                { id: 'non-specific-giant-cell', name: 'Sel Datia Berinti Satu', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Temuan sel makrofag besar dengan satu inti (mononuklear).', analysis: 'KURANG SESUAI. Ini adalah temuan yang sangat non-spesifik. Meskipun makrofag terlibat dalam banyak proses inflamasi, temuan ini tidak cukup untuk menjelaskan gambaran klinis penyakit sistemik yang berat pada pasien.' },
                { id: 'thyroid-hurthle', name: 'Sel Hurthle', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🦋</div></div>`, description: 'Sel epitel folikular tiroid besar dengan sitoplasma granular eosinofilik.', analysis: 'TIDAK SESUAI. Benjolan pada kasus ini adalah pembesaran KGB, bukan kelenjar tiroid. Gejala B juga tidak khas untuk penyakit tiroid. Sel Hurthle spesifik untuk patologi tiroid (misal, Tiroiditis Hashimoto atau neoplasma).' },
                { id: 'skin-acantholysis', name: 'Sel-sel Akantolisis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Sel-sel keratinosit yang terlepas satu sama lain.', analysis: 'SANGAT TIDAK SESUAI. Sel akantolitik ditemukan pada penyakit kulit bula autoimun (misal, Pemphigus). Temuan ini sama sekali tidak berhubungan dengan presentasi klinis limfadenopati dan gejala sistemik pasien.' }
            ],
            quiz: [
                { question: "Apa yang paling mungkin menjadi penyebab benjolan di leher pasien berdasarkan keseluruhan gejala?", options: ["Infeksi Virus Akut", "Infeksi Tuberkulosis", "Keganasan Tiroid", "Reaksi Alergi"], answer: "Infeksi Tuberkulosis" },
                { question: "Kumpulan gejala yang terdiri dari demam, keringat malam, dan penurunan berat badan sering disebut sebagai...", options: ["Gejala Prodromal", "Gejala B (Konstitusional)", "Sindrom Metabolik", "Respon Fase Akut"], answer: "Gejala B (Konstitusional)" },
                { question: "Temuan patologis apa pada FNAB yang paling spesifik (patognomonik) untuk Tuberkulosis?", options: ["Sel Datia Langhans", "Limfositosis", "Nekrosis Perkijuan", "Sel Hurthle"], answer: "Nekrosis Perkijuan" },
                { question: "Mengapa 'Penyakit Tiroid' menjadi diagnosis yang kurang mungkin pada kasus ini?", options: ["Karena LED-nya normal", "Karena pasien terlalu muda", "Karena gejala B tidak khas & benjolan adalah KGB, bukan tiroid", "Karena tidak ada riwayat keluarga"], answer: "Karena gejala B tidak khas & benjolan adalah KGB, bukan tiroid" },
                { question: "Pemeriksaan LED pada pasien ini menunjukkan hasil 42 mm/detik. Temuan ini mengindikasikan...", options: ["Kondisi yang sepenuhnya normal", "Adanya proses peradangan kronis yang signifikan", "Risiko tinggi penyakit jantung", "Adanya gangguan pembekuan darah"], answer: "Adanya proses peradangan kronis yang signifikan" }
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
                        if (d.matchScore >= 9) return '#059669'; // a deep green
                        if (d.matchScore >= 8) return '#10b981'; // a deep green
                        if (d.matchScore >= 4) return '#34d399'; // a medium green
                        if (d.matchScore >= 2) return '#facc15'; // a yellow
                        return '#f87171'; // a red
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46'; // a deep green
                        if (d.matchScore >= 8) return '#047857'; // a deep green
                        if (d.matchScore >= 4) return '#059669';
                        if (d.matchScore >= 2) return '#eab308';
                        return '#ef4444';
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