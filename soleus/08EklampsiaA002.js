
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'persalinan', name: 'Persalinan', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">👶</div></div>`, description: 'Terminasi kehamilan dengan melahirkan bayi dan plasenta.', analysis: 'SANGAT TEPAT (DEFINITIF). Eklampsia adalah penyakit yang disebabkan oleh plasenta. Satu-satunya cara untuk menyembuhkan kondisi ini adalah dengan melahirkan plasenta. Setelah stabilisasi, persalinan harus segera dilakukan.' },
                { id: 'mgso4', name: 'MgSO4', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Antikonvulsan pilihan utama untuk pencegahan dan terapi kejang pada eklampsia.', analysis: 'KRUSIAL, TAPI BUKAN DEFINITIF. MgSO4 adalah tatalaksana lini pertama untuk mengontrol kejang dan mencegah kejang berulang. Ini menstabilkan pasien, tetapi tidak menyembuhkan penyakit dasarnya.' },
                { id: 'nifedipine', name: 'Nifedipine', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❤️</div></div>`, description: 'Obat antihipertensi untuk mengontrol tekanan darah.', analysis: 'PENTING, TAPI BUKAN DEFINITIF. Mengontrol tekanan darah sangat penting untuk mencegah komplikasi seperti stroke. Namun, ini hanya menangani gejala hipertensi, bukan akar penyebab eklampsia.' },
                { id: 'o2', name: 'Suplementasi O2', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-sky-100"><div class="w-12 h-12 bg-sky-300 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Pemberian oksigen untuk mengatasi hipoksia.', analysis: 'SUPORTIF, BUKAN DEFINITIF. Pemberian O2 sangat penting untuk mencegah kerusakan organ akibat hipoksia selama/setelah kejang, tetapi ini adalah tatalaksana suportif, bukan pengobatan kausatif.' },
                { id: 'diazepam', name: 'Diazepam', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Obat antikonvulsan golongan benzodiazepin.', analysis: 'TIDAK TEPAT. Meskipun bisa menghentikan kejang, MgSO4 terbukti lebih superior dan aman untuk eklampsia. Diazepam hanya digunakan sebagai alternatif lini kedua jika MgSO4 tidak tersedia.' },
            ],
            quiz: [
                { question: "Berdasarkan data TD 180/110 mmHg, kejang, dan proteinuria +2, diagnosis yang paling tepat adalah?", options: ["Preeklampsia Berat", "Eklampsia", "Hipertensi Kronik", "Kejang Demam"], answer: "Eklampsia" },
                { question: "Manakah obat yang menjadi pilihan utama (lini pertama) untuk mengontrol dan mencegah kejang pada kasus ini?", options: ["Diazepam", "Fenitoin", "MgSO4", "Nifedipine"], answer: "MgSO4" },
                { question: "Mengapa 'Persalinan' dianggap sebagai tatalaksana definitif?", options: ["Karena mengurangi stres ibu", "Karena usia kehamilan sudah cukup bulan", "Karena plasenta adalah sumber penyebab penyakit", "Karena bayi harus segera diselamatkan"], answer: "Karena plasenta adalah sumber penyebab penyakit" },
                { question: "Apa tujuan utama pemberian Nifedipine (antihipertensi) pada pasien ini?", options: ["Mengobati kejang", "Menurunkan proteinuria", "Mencegah persalinan prematur", "Menurunkan tekanan darah untuk mencegah stroke"], answer: "Menurunkan tekanan darah untuk mencegah stroke" },
                { question: "Kurangnya pemeriksaan kehamilan (ANC) pada pasien ini merupakan faktor risiko utama untuk?", options: ["Persalinan lama", "Terlambatnya deteksi dan penanganan preeklampsia", "Infeksi pasca-persalinan", "Bayi berat lahir rendah"], answer: "Terlambatnya deteksi dan penanganan preeklampsia" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Peran dalam Kasus:</h4>
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
                    label: 'Skor Prioritas/Kepentingan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 10 ? '#059669' : (d.matchScore >= 8 ? '#10b981' : (d.matchScore >= 6 ? '#34d399' : '#a7f3d0'))),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 10 ? '#065f46' : (d.matchScore >= 8 ? '#059669' : (d.matchScore >= 6 ? '#047857' : '#6ee7b7'))),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kepentingan (0-10)', font: { size: 14 } } },
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
                // Set default view to the highest match score (definitive treatment)
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };