        const caseData = {
            diagnoses: [
                { id: 'fibrilasi-ventrikel', name: 'Fibrilasi Ventrikel', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">💔</div></div>`, description: 'Kontraksi otot ventrikel jantung yang sangat cepat dan tidak terkoordinasi.', analysis: 'TIDAK SPESIFIK. Bisa menjadi mekanisme terminal akibat hipoksia berat, tetapi ini adalah kejadian akhir. Edema paru adalah proses patofisiologis sebelumnya yang lebih spesifik dan sentral dalam kasus ini.' },
                { id: 'hemodilusi-darah', name: 'Hemodilusi Darah', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Pengenceran komponen darah akibat masuknya air tawar ke dalam sirkulasi.', analysis: 'KURANG SESUAI. Mekanisme ini khas untuk tenggelam di AIR TAWAR. Korban ditemukan di laut (air asin), di mana yang terjadi justru hemokonsentrasi. Ini adalah mekanisme biokimia, bukan patofisiologi utama di paru.' },
                { id: 'spasme-laring', name: 'Spasme Laring', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🗣️</div></div>`, description: 'Penutupan laring secara paksa karena iritasi air, menyebabkan asfiksia tanpa air masuk ke paru.', analysis: 'TIDAK MUNGKIN. Mekanisme ini terjadi pada "dry drowning". Uji diatom yang positif membuktikan bahwa korban menghirup air hingga masuk ke sirkulasi, yang tidak akan terjadi jika laring tertutup rapat.' },
                { id: 'tenggelam', name: 'Tenggelam', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">🌊</div></div>`, description: 'Peristiwa atau cedera yang memulai rangkaian proses yang berujung pada kematian akibat perendaman.', analysis: 'SANGAT SESUAI SEBAGAI <b>PENYEBAB KEMATIAN</b>. Semua temuan adalah akibat dari peristiwa tenggelam. Namun, pertanyaan menanyakan tentang *mekanisme* (proses fisiologis), bukan *penyebab* (peristiwa pemicu).' },
                { id: 'edema-paru', name: 'Edema Paru', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Penumpukan cairan di dalam alveoli paru yang secara langsung menghalangi pertukaran gas.', analysis: 'PALING SESUAI SEBAGAI <b>MEKANISME KEMATIAN</b>. Masuknya air ke paru (akibat tenggelam) secara langsung memicu edema paru masif. Edema inilah yang menyebabkan asfiksia dan kematian. Buih yang ditemukan adalah tanda visual dari edema paru.' }
            ],
            quiz: [
                { question: "Dalam terminologi forensik, 'tenggelam' pada kasus ini paling tepat diklasifikasikan sebagai...", options: ["Mekanisme Kematian", "Penyebab Kematian", "Cara Kematian", "Akibat Kematian"], answer: "Penyebab Kematian" },
                { question: "Buih halus pada mulut dan hidung adalah tanda visual langsung dari kondisi patologis apa?", options: ["Pendarahan lambung", "Spasme laring", "Edema paru", "Gagal ginjal"], answer: "Edema paru" },
                { question: "Manakah temuan yang paling konklusif untuk membuktikan bahwa korban masih hidup saat masuk ke dalam air?", options: ["Lebam mayat di dada", "Washer woman's hand", "Uji diatom positif", "Cadaveric spasm"], answer: "Uji diatom positif" },
                { question: "Mengingat pertanyaan menanyakan <b>mekanisme kematian</b>, pilihan manakah yang paling akurat secara patofisiologis?", options: ["Tenggelam", "Asfiksia", "Edema paru", "Henti jantung"], answer: "Edema paru" },
                { question: "Uji diatom yang positif secara langsung menyingkirkan kemungkinan mekanisme kematian berikut:", options: ["Edema paru", "Spasme laring", "Hemokonsentrasi", "Asfiksia"], answer: "Spasme laring" }
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
            const sortedDiagnoses = [...diagnoses].sort((a, b) => a.matchScore - b.matchScore);
            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 10 ? '#059669' : (d.matchScore >= 8 ? '#34d399' : '#fca5a5')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 10 ? '#065f46' : (d.matchScore >= 8 ? '#059669' : '#ef4444')),
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