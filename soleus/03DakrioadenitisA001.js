        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'dakriosistitis-alergi', name: 'Dakriosistitis - Alergi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Peradangan pada kantung lakrimal (saccus lacrimalis) akibat reaksi alergi.', analysis: 'TIDAK SESUAI. Lokasi benjolan pada kasus ada di superior (atas), sedangkan dakriosistitis terjadi di inferior-medial (bawah, dekat hidung). Tes Anel (+) dan Regurgitasi (-) juga secara aktif menyingkirkan diagnosis ini.' },
                { id: 'abses-palpebra-jamur', name: 'Abses Palpebra - Jamur', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, description: 'Kumpulan nanah di dalam kelopak mata akibat infeksi jamur.', analysis: 'KURANG SESUAI. Ptosis berbentuk S sangat tidak khas untuk abses palpebra biasa. Selain itu, etiologi jamur pada infeksi kelopak mata sangat jarang terjadi tanpa adanya faktor risiko seperti imunosupresi.' },
                { id: 'dakrioadenitis-bakteri', name: 'Dakrioadenitis - Bakteri', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Peradangan kelenjar lakrimal (glandula lacrimalis) yang disebabkan oleh infeksi bakteri.', analysis: 'CUKUP SESUAI, NAMUN KURANG TEPAT. Gejala klinis (lokasi bengkak, ptosis S) memang cocok dengan dakrioadenitis. Namun, infeksi bakteri biasanya lebih akut, disertai demam tinggi dan sekret purulen (nanah) yang jelas, yang tidak disebutkan pada kasus. Riwayat batuk pilek lebih mengarah ke virus.' },
                { id: 'abses-palpebra-bakteri', name: 'Abses Palpebra - Bakteri', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl"> B</div></div>`, description: 'Kumpulan nanah di dalam kelopak mata akibat infeksi bakteri, seperti Staphylococcus.', analysis: 'KURANG SESUAI. Meskipun ada benjolan merah dan nyeri, adanya ptosis berbentuk S merupakan tanda kunci yang menunjuk pada keterlibatan kelenjar lakrimal (dakrioadenitis), bukan sekadar abses pada kelopak mata.' },
                { id: 'dakrioadenitis-virus', name: 'Dakrioadenitis - Virus', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">👁️</div></div>`, description: 'Peradangan kelenjar lakrimal yang disebabkan oleh infeksi virus (misal: influenza, EBV).', analysis: 'SANGAT SESUAI. Ptosis berbentuk S adalah tanda patognomonik (khas). Lokasi bengkak di superior-lateral juga tepat. Riwayat infeksi saluran napas atas (batuk pilek) sebelumnya merupakan petunjuk klasik untuk etiologi viral, yang merupakan penyebab tersering.' }
            ],
            quiz: [
                { question: "Apa tanda klinis yang paling khas (patognomonik) untuk dakrioadenitis pada kasus ini?", options: ["Benjolan hiperemis", "Nyeri tekan", "Ptosis bentuk S", "Pembesaran KGB"], answer: "Ptosis bentuk S" },
                { question: "Riwayat apa yang paling mendukung etiologi virus pada pasien ini?", options: ["Riwayat trauma", "Riwayat batuk pilek", "Riwayat keluarga", "Tidak berobat"], answer: "Riwayat batuk pilek" },
                { question: "Mengapa diagnosis Dakriosistitis dapat disingkirkan pada kasus ini?", options: ["Karena visus 6/6", "Karena ada pembesaran KGB", "Karena Tes Anel (+) dan lokasi di superior", "Karena pasien tidak demam"], answer: "Karena Tes Anel (+) dan lokasi di superior" },
                { question: "Dakrioadenitis adalah peradangan yang terjadi pada struktur anatomi apa?", options: ["Kantung lakrimal (saccus lacrimalis)", "Kelenjar lakrimal (glandula lacrimalis)", "Kelopak mata (palpebra)", "Konjungtiva"], answer: "Kelenjar lakrimal (glandula lacrimalis)" },
                { question: "Berdasarkan semua temuan, diagnosis dan etiologi apakah yang paling akurat?", options: ["Dakriosistitis - Alergi", "Abses palpebra - Jamur", "Dakrioadenitis - Bakteri", "Abses palpebra - Bakteri", "Dakrioadenitis - Virus"], answer: "Dakrioadenitis - Virus" }
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
                        if (d.matchScore >= 6) return '#34d399'; // emerald-400
                        if (d.matchScore >= 4) return '#fcd34d'; // amber-300
                        return '#f87171'; // red-400
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 6) return '#065f46'; // emerald-900
                        if (d.matchScore >= 4) return '#fbbf24'; // amber-400
                        return '#ef4444'; // red-500
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