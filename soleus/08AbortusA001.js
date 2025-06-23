        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'abortus-imminens', name: 'Abortus Imminens', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Ancaman keguguran dimana terjadi perdarahan namun kehamilan masih berpotensi lanjut.', analysis: 'KURANG SESUAI. Meskipun OUE tertutup, ukuran uterus yang jauh lebih kecil dari usia kehamilan (sebesar telur ayam vs 17 minggu) sangat tidak cocok dengan diagnosis ini.' },
                { id: 'abortus-insipien', name: 'Abortus Insipien', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">⏳</div></div>`, description: 'Keguguran yang sedang berlangsung dan tidak dapat dicegah, ditandai dengan OUE terbuka.', analysis: 'TIDAK SESUAI. Diagnosis ini secara langsung dikesampingkan oleh temuan kunci yaitu OUE yang tertutup pada pemeriksaan vagina.' },
                { id: 'abortus-komplit', name: 'Abortus Komplit', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-100"><div class="w-12 h-12 bg-emerald-300 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Seluruh hasil konsepsi telah keluar dari rahim secara lengkap.', analysis: 'SANGAT SESUAI. Semua tanda klasik ada: riwayat perdarahan dan mulas yang telah berhenti, OUE kembali tertutup, dan ukuran uterus sudah involusi (mengecil).' },
                { id: 'abortus-inkomplit', name: 'Abortus Inkomplit', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Sebagian hasil konsepsi masih tertinggal di dalam rahim.', analysis: 'TIDAK SESUAI. Pada abortus inkomplit, perdarahan biasanya masih aktif dan OUE masih terbuka karena ada sisa jaringan. Kasus ini menunjukkan perdarahan berhenti dan OUE tertutup.' },
                { id: 'missed-abortion', name: 'Missed Abortion', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-slate-100"><div class="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center text-3xl">😔</div></div>`, description: 'Kematian janin dalam kandungan tanpa pengeluaran hasil konsepsi.', analysis: 'CUKUP SESUAI NAMUN KURANG TEPAT. OUE tertutup dan uterus kecil memang cocok. Namun, riwayat episode perdarahan dan mulas yang jelas yang kemudian berhenti total lebih menunjuk pada proses pengeluaran yang sudah selesai (komplit).' }
            ],
            quiz: [
                { question: "Temuan manakah pada pemeriksaan fisik yang paling signifikan mengarah ke diagnosis akhir?", options: ["Usia pasien 24 tahun", "Tidak ada nyeri adneksa", "OUE tertutup", "Ukuran uterus sebesar telur ayam"], answer: "Ukuran uterus sebesar telur ayam" },
                { question: "Diagnosis Abortus Insipien dan Inkomplit dapat dikesampingkan terutama karena temuan...", options: ["Perdarahan telah berhenti", "OUE tertutup", "Usia kehamilan 17 minggu", "Tidak ada demam"], answer: "OUE tertutup" },
                { question: "Diskrepansi antara usia kehamilan (17 minggu) dan ukuran uterus (sebesar telur ayam) menandakan...", options: ["Terjadinya involusi uterus setelah ekspulsi", "Kesalahan perhitungan tanggal haid", "Kehamilan ganda", "Adanya mioma uteri"], answer: "Terjadinya involusi uterus setelah ekspulsi" },
                { question: "Mengapa 'Missed Abortion' kurang tepat dibandingkan 'Abortus Komplit' pada kasus ini?", options: ["Karena OUE tertutup", "Karena uterusnya kecil", "Karena adanya riwayat mulas & perdarahan akut yang telah selesai", "Karena pasien masih muda"], answer: "Karena adanya riwayat mulas & perdarahan akut yang telah selesai" },
                { question: "Berdasarkan semua data (anamnesis dan pemeriksaan), diagnosis apakah yang paling tepat?", options: ["Abortus Imminens", "Abortus Komplit", "Missed Abortion", "Abortus Insipien"], answer: "Abortus Komplit" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                // Default to showing the most likely diagnosis first
                renderDetails('abortus-komplit');
            }
            createChart();
            loadQuiz();
        };