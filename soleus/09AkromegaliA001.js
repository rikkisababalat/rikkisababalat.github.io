        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'gigantism-post', name: 'Gigantisme e.c. kelebihan GH setelah lempeng epifisis menutup', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl">🚫</div></div>`, description: 'Suatu kondisi akibat kelebihan GH yang terjadi setelah penutupan lempeng pertumbuhan tulang.', analysis: 'TIDAK SESUAI. Istilah ini mengandung kontradiksi. "Gigantisme" merujuk pada kelebihan GH SEBELUM penutupan lempeng epifisis. Kondisi setelah penutupan disebut Akromegali.' },
                { id: 'gigantism-pre', name: 'Gigantisme e.c. kelebihan GH sebelum lempeng epifisis menutup', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">📏</div></div>`, description: 'Kondisi perawakan sangat tinggi akibat kelebihan GH pada masa pertumbuhan.', analysis: 'KURANG SESUAI. Meskipun mekanisme ini benar untuk gigantisme, pasien berusia 48 tahun. Keluhan dan onsetnya di usia dewasa menyingkirkan diagnosis Gigantisme.' },
                { id: 'gigantism-tumor', name: 'Gigantisme e.c. Tumor intrakranial', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">📏</div></div>`, description: 'Pertumbuhan berlebih pada masa anak-anak akibat tumor di otak.', analysis: 'KURANG SESUAI. Diagnosis "Gigantisme" tidak tepat untuk pasien dewasa ini. Manifestasi klinis yang dialami pasien adalah Akromegali, meskipun penyebabnya adalah tumor intrakranial.' },
                { id: 'acromegaly-adenoma', name: 'Akromegali e.c. kelebihan GH e.c. adenoma pituitari', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Kondisi pembesaran tulang akral dan jaringan lunak akibat tumor pituitari yang menghasilkan GH berlebih pada orang dewasa.', analysis: 'SANGAT SESUAI. "Akromegali" adalah diagnosis yang tepat untuk kelebihan GH pada pasien dewasa. Gejala klinis (perubahan wajah, pembesaran tangan/kaki) dan temuan hemianopsia bitemporal sangat menunjuk pada adenoma pituitari sebagai penyebabnya.' },
                { id: 'acromegaly-pre', name: 'Akromegali e.c. Kelebihan GH sebelum lempeng epifisis menutup', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-xl">🚫</div></div>`, description: 'Suatu kondisi akibat kelebihan GH yang terjadi sebelum penutupan lempeng pertumbuhan.', analysis: 'TIDAK SESUAI. Istilah ini mengandung kontradiksi. "Akromegali" per definisi terjadi SETELAH penutupan lempeng epifisis. Kondisi sebelum penutupan disebut Gigantisme.' }
            ],
            quiz: [
                { question: "Apa temuan pemeriksaan lapang pandang yang paling khas untuk tumor pituitari yang menekan kiasma optikum?", options: ["Skotoma sentral", "Hemianopsia homonim", "Hemianopsia bitemporal", "Penglihatan kabur menyeluruh"], answer: "Hemianopsia bitemporal" },
                { question: "Mengapa kondisi pasien ini didiagnosis sebagai Akromegali dan bukan Gigantisme?", options: ["Karena tekanan darahnya tinggi", "Karena kelebihan hormon terjadi setelah lempeng epifisis menutup", "Karena disebabkan oleh tumor", "Karena pasien seorang laki-laki"], answer: "Karena kelebihan hormon terjadi setelah lempeng epifisis menutup" },
                { question: "Manakah dari keluhan pasien berikut yang secara langsung menunjukkan pertumbuhan tulang pada bagian akral?", options: ["Sakit kepala di pagi hari", "Sering tersandung", "Topi dan sarung tangan tidak muat lagi", "Tekanan darah 130/95"], answer: "Topi dan sarung tangan tidak muat lagi" },
                { question: "Hemianopsia bitemporal pada kasus ini disebabkan oleh kompresi pada struktur...", options: ["Nervus optikus", "Traktus optikus", "Kiasma optikum", "Radiatio optika"], answer: "Kiasma optikum" },
                { question: "Berdasarkan analisis kasus, apa diagnosis dan etiologi yang paling tepat?", options: ["Gigantisme e.c. tumor otak", "Akromegali e.c. penyebab idiopatik", "Sindrom Cushing", "Akromegali e.c. adenoma pituitari"], answer: "Akromegali e.c. adenoma pituitari" }
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
                        if (d.matchScore >= 9) return '#059669'; // Most likely
                        if (d.matchScore >= 3) return '#f59e0b'; // Possible but unlikely
                        return '#ef4444'; // Incorrect/Contradictory
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46';
                        if (d.matchScore >= 3) return '#b45309';
                        return '#b91c1c';
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
                        y: { ticks: { font: { size: 12 }, autoSkip: false } }
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
                renderDetails('acromegaly-adenoma'); // Default to show the correct answer details first
            }
            createChart();
            loadQuiz();
        };