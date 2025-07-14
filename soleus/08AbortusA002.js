        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'abortus-insipiens', name: 'Abortus Insipiens', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 flex items-center justify-center text-4xl">⚠️</div></div>`, description: 'Proses keguguran yang tidak dapat dihentikan lagi, ditandai dengan serviks yang telah terbuka.', analysis: 'KURANG SESUAI. Meskipun ada perdarahan dan mulas, temuan kunci pada Abortus Insipiens adalah serviks yang terbuka. Pada kasus ini, serviks pasien tertutup.' },
                { id: 'abortus-iminens', name: 'Abortus Iminens', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 flex items-center justify-center text-4xl">🤰</div></div>`, description: 'Ancaman terjadinya keguguran, ditandai dengan perdarahan dari rahim sebelum kehamilan 20 minggu dengan serviks tertutup.', analysis: 'SANGAT SESUAI. Semua kriteria terpenuhi: perdarahan pada usia kehamilan 12 minggu, serviks tertutup, ukuran rahim sesuai, dan janin masih hidup (DJJ positif).' },
                { id: 'abortus-inkomplit', name: 'Abortus Inkomplit', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 flex items-center justify-center text-4xl">💔</div></div>`, description: 'Sebagian hasil konsepsi telah keluar dari rahim, namun sebagian masih tertinggal di dalam.', analysis: 'TIDAK SESUAI. Diagnosis ini memerlukan serviks yang terbuka dan adanya sisa jaringan. Pada pasien ini, serviks tertutup dan janin masih utuh di dalam rahim.' },
                { id: 'abortus-komplit', name: 'Abortus Komplit', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-100"><div class="w-12 h-12 flex items-center justify-center text-4xl">✅</div></div>`, description: 'Seluruh hasil konsepsi telah keluar dari rahim secara lengkap.', analysis: 'TIDAK SESUAI. Pada abortus komplit, rahim akan kosong dan tidak akan ada DJJ. Pasien ini masih memiliki janin yang hidup di dalam rahim.' },
                { id: 'abortus-habitualis', name: 'Abortus Habitualis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 flex items-center justify-center text-4xl">🔄</div></div>`, description: 'Riwayat keguguran spontan yang terjadi tiga kali atau lebih secara berurutan.', analysis: 'TIDAK RELEVAN. Ini adalah diagnosis riwayat, bukan diagnosis untuk kondisi klinis akut yang sedang dialami pasien pada kunjungan pertama ini.' }
            ],
            quiz: [
                { question: "Apa temuan kunci pada pemeriksaan serviks yang mengarahkan pada diagnosis Abortus Iminens?", options: ["Serviks terbuka", "Serviks tertutup", "Serviks melunak", "Serviks kaku"], answer: "Serviks tertutup" },
                { question: "Usia kehamilan pasien adalah 12 minggu. Manakah temuan tinggi fundus uteri (TFU) yang sesuai?", options: ["Setinggi pusat", "Di antara simfisis dan pusat", "Tepat di atas simfisis pubis", "Tidak teraba"], answer: "Tepat di atas simfisis pubis" },
                { question: "Adanya Denyut Jantung Janin (DJJ) 145 kali/menit menandakan...", options: ["Janin dalam kondisi gawat", "Janin sudah meninggal", "Janin masih hidup dan dalam batas normal", "Kehamilan ganda"], answer: "Janin masih hidup dan dalam batas normal" },
                { question: "Jika pada pemeriksaan ditemukan serviks terbuka dan sebagian jaringan sudah keluar, diagnosisnya berubah menjadi?", options: ["Abortus iminens", "Abortus insipiens", "Abortus inkomplit", "Abortus komplit"], answer: "Abortus inkomplit" },
                { question: "Berdasarkan semua data klinis, diagnosis yang paling tepat adalah?", options: ["Abortus insipiens", "Abortus iminens", "Abortus inkomplit", "Abortus habitualis"], answer: "Abortus iminens" }
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
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 4) return '#f59e0b'; // amber-500
                        return '#ef4444'; // red-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 4) return '#d97706'; // amber-600
                        return '#b91c1c'; // red-700
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