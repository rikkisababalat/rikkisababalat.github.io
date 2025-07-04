        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'uretritis-go', name: 'Uretritis GO', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-2xl">🚫</div></div>`, description: 'Peradangan uretra akibat infeksi Gonore, ditandai dengan keluarnya nanah.', analysis: 'SANGAT TIDAK SESUAI. Gejala kardinal uretritis adalah adanya discharge (nanah/sekret) dari lubang kencing. Pada kasus ini, pemeriksaan fisik secara eksplisit menyatakan tidak ada discharge.' },
                { id: 'sistitis-non-komplikata', name: 'Sistitis non komplikata', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Infeksi kandung kemih tanpa adanya faktor penyulit.', analysis: 'CUKUP SESUAI, TAPI KURANG TEPAT. Gejalanya memang cocok dengan sistitis. Namun, ISK pada pria dewasa secara definisi selalu dianggap "komplikata" karena perbedaan anatomi yang membuatnya lebih jarang terjadi dan berisiko lebih tinggi.' },
                { id: 'uretritis-non-go', name: 'Uretritis non-GO', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-2xl">🚫</div></div>`, description: 'Peradangan uretra akibat infeksi selain Gonore, seringkali dengan sekret yang lebih jernih.', analysis: 'SANGAT TIDAK SESUAI. Sama seperti Uretritis GO, diagnosis ini memerlukan adanya discharge dari uretra, yang tidak ditemukan pada pasien ini.' },
                { id: 'sistitis-komplikata', name: 'Sistitis komplikata', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Infeksi kandung kemih pada pasien dengan faktor penyulit (contoh: pria, diabetes, kelainan urologis).', analysis: 'SANGAT SESUAI. Kombinasi gejala LUTS (frekuensi, tidak tuntas), demam, dan nyeri tekan suprapubik pada pasien laki-laki adalah gambaran klasik untuk sistitis komplikata.' },
                { id: 'pyelonefritis-komplikata', name: 'Pyelonefritis komplikata', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🤒</div></div>`, description: 'Infeksi yang telah naik dan mengenai ginjal.', analysis: 'KURANG SESUAI. Meskipun pasien mengalami demam, tidak adanya nyeri ketok CVA (nyeri pinggang) membuat diagnosis ini kecil kemungkinannya. Gejala lebih terlokalisir pada kandung kemih.' }
            ],
            quiz: [
                { question: "Temuan pemeriksaan fisik manakah yang paling kuat menunjukkan adanya peradangan pada kandung kemih?", options: ["Suhu 38°C", "Nyeri tekan suprapubik", "Nadi 90x/menit", "Tidak ada discharge OUE"], answer: "Nyeri tekan suprapubik" },
                { question: "Tanda negatif manakah yang membantu menyingkirkan diagnosis Pielonefritis (infeksi ginjal)?", options: ["Tidak ada demam", "Tekanan darah normal", "Tidak ada nyeri ketok CVA", "Pernapasan normal"], answer: "Tidak ada nyeri ketok CVA" },
                { question: "Mengapa Uretritis (GO dan non-GO) menjadi diagnosis yang tidak mungkin pada kasus ini?", options: ["Karena pasien demam", "Karena keluhan baru 3 hari", "Karena tidak ditemukan discharge dari uretra", "Karena pasien berusia 43 tahun"], answer: "Karena tidak ditemukan discharge dari uretra" },
                { question: "Infeksi saluran kemih pada pasien ini digolongkan sebagai 'komplikata' terutama karena...", options: ["Pasien mengalami demam tinggi", "Keluhan dirasakan sangat mengganggu", "Pasien adalah seorang laki-laki", "Infeksi disebabkan oleh bakteri resisten"], answer: "Pasien adalah seorang laki-laki" },
                { question: "Berdasarkan keseluruhan data klinis, diagnosis manakah yang paling akurat?", options: ["Uretritis GO", "Sistitis non komplikata", "Sistitis komplikata", "Pyelonefritis komplikata"], answer: "Sistitis komplikata" }
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
                        if (d.matchScore >= 9) return '#059669'; // emerald-600
                        if (d.matchScore >= 5) return '#34d399'; // emerald-400
                        if (d.matchScore >= 3) return '#facc15'; // yellow-400
                        return '#f87171'; // red-400
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#047857'; // emerald-700
                        if (d.matchScore >= 5) return '#059669'; // emerald-600
                        if (d.matchScore >= 3) return '#eab308'; // yellow-500
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
            if (diagnoses.length > 0) {
                // Set default view to the highest match score
                const bestMatch = diagnoses.reduce((prev, current) => (prev.matchScore > current.matchScore) ? prev : current);
                renderDetails(bestMatch.id);
            }
            createChart();
            loadQuiz();
        };