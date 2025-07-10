        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'diet-serat', name: 'Diet Tinggi Serat', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🥗</div></div>`, description: 'Meningkatkan asupan serat dari buah, sayur, dan biji-bijian untuk melunakkan feses.', analysis: 'SANGAT TEPAT. Ini adalah tata laksana awal (first-line) untuk semua hemoroid internal grade I-II. Tujuannya adalah mengurangi mengedan saat BAB, yang merupakan faktor risiko utama.' },
                { id: 'rubber-band', name: 'Rubber Band Ligation', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🪢</div></div>`, description: 'Prosedur mengikat pangkal hemoroid dengan karet untuk memutus aliran darah.', analysis: 'TEPAT, TAPI BUKAN LANGKAH AWAL. Ini adalah prosedur non-bedah yang paling efektif untuk hemoroid grade I-III yang gejalanya menetap meskipun sudah modifikasi diet.' },
                { id: 'skleroterapi', name: 'Skleroterapi', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Menyuntikkan larutan kimia ke dalam hemoroid untuk membuatnya mengeras dan menyusut.', analysis: 'PILIHAN LAIN, TAPI BUKAN LANGKAH AWAL. Efektif untuk hemoroid grade I-II, namun biasanya dipertimbangkan jika modifikasi diet tidak cukup atau sebagai alternatif ligasi karet.' },
                { id: 'hemoroidektomi', name: 'Hemoroidektomi', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🔪</div></div>`, description: 'Operasi pengangkatan jaringan hemoroid secara bedah.', analysis: 'TIDAK TEPAT. Prosedur ini terlalu invasif untuk tata laksana awal pada kasus ini. Disediakan untuk hemoroid grade IV atau yang gagal dengan terapi minimal invasif.' },
                { id: 'eksisi', name: 'Eksisi', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">✂️</div></div>`, description: 'Tindakan memotong atau mengangkat jaringan, biasanya untuk hemoroid eksterna.', analysis: 'TIDAK TEPAT. Eksisi lebih diindikasikan untuk hemoroid eksterna yang mengalami trombosis (gumpalan darah), bukan untuk hemoroid interna yang berdarah seperti pada kasus ini.' }
            ],
            quiz: [
                { question: "Berdasarkan gejala perdarahan merah segar tanpa nyeri, diagnosis apa yang paling mungkin?", options: ["Hemoroid Interna", "Fisura Ani", "Kanker Kolorektal", "Abses Perianal"], answer: "Hemoroid Interna" },
                { question: "Apa tujuan utama dari tata laksana awal dengan diet tinggi serat pada pasien ini?", options: ["Menghentikan perdarahan secara instan", "Melunakkan feses dan mengurangi mengedan", "Menghilangkan rasa gatal", "Mengecilkan benjolan secara langsung"], answer: "Melunakkan feses dan mengurangi mengedan" },
                { question: "Temuan benjolan pada Rectal Toucher (RT) tanpa adanya benjolan yang keluar dari dubur mengarahkan pada hemoroid grade berapa?", options: ["Grade I", "Grade II", "Grade III", "Grade IV"], answer: "Grade I" },
                { question: "Manakah prosedur yang dianggap paling invasif dan bukan pilihan awal untuk kasus ini?", options: ["Diet Tinggi Serat", "Skleroterapi", "Rubber Band Ligation", "Hemoroidektomi"], answer: "Hemoroidektomi" },
                { question: "Mengapa Fisura Ani kurang mungkin menjadi diagnosis pada pasien ini?", options: ["Karena usia pasien 50 tahun", "Karena tidak ada keluhan nyeri hebat saat BAB", "Karena perdarahannya berwarna merah segar", "Karena ada rasa gatal"], answer: "Karena tidak ada keluhan nyeri hebat saat BAB" }
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };