        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'usg-ginjal', name: 'A. USG ginjal', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">🩻</div></div>`, description: 'Pemeriksaan pencitraan untuk melihat ukuran, bentuk, dan struktur ginjal.', analysis: 'CUKUP RELEVAN. Pemeriksaan ini penting untuk menyingkirkan kelainan struktural atau hidronefrosis, tetapi tidak menjadi prioritas utama untuk menegakkan diagnosis Sindrom Nefrotik itu sendiri. Biasanya dilakukan sebagai bagian dari tatalaksana komprehensif, bukan sebagai tes konfirmasi awal.' },
                { id: 'rontgen-abdomen', name: 'B. Rontgen abdomen', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-100"><div class="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center text-3xl">🦴</div></div>`, description: 'Pemeriksaan radiografi pada area perut.', analysis: 'TIDAK RELEVAN. Rontgen abdomen tidak memberikan informasi yang berguna mengenai parenkim ginjal, proteinuria, atau kelainan metabolik yang terjadi pada Sindrom Nefrotik. Pemeriksaan ini tidak diindikasikan.' },
                { id: 'darah-kultur', name: 'C. Darah rutin dan kultur darah', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Pemeriksaan dasar hitung sel darah dan deteksi bakteri dalam darah.', analysis: 'KURANG RELEVAN UNTUK DIAGNOSIS. Darah rutin adalah pemeriksaan standar. Kultur darah hanya diindikasikan jika ada kecurigaan kuat terhadap infeksi sistemik (sepsis), yang bukan menjadi gambaran utama kasus ini. Bukan langkah untuk konfirmasi Sindrom Nefrotik.' },
                { id: 'uji-esbach', name: 'D. Uji Esbach', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-cyan-100"><div class="w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center text-3xl">🧪</div></div>`, description: 'Metode kuantitatif untuk mengukur jumlah total protein dalam urin yang dikumpulkan selama 24 jam.', analysis: 'SANGAT TEPAT & PENTING. Tes dipstick (+3) hanya bersifat semi-kuantitatif. Untuk menegakkan diagnosis Sindrom Nefrotik secara definitif, proteinuria harus diukur secara kuantitatif untuk memastikan levelnya masif (>40 mg/m²/jam). Uji Esbach adalah cara untuk melakukan ini.' },
                { id: 'ana-dsdna', name: 'E. ANA dan dsDNA', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Pemeriksaan marker autoimun, terutama untuk Systemic Lupus Erythematosus (SLE).', analysis: 'RELEVAN, TAPI BUKAN PRIORITAS UTAMA. Pemeriksaan ini digunakan untuk mencari etiologi (penyebab) Sindrom Nefrotik sekunder. Ini adalah langkah lanjutan yang penting setelah diagnosis Sindrom Nefrotik ditegakkan, bukan langkah pertama untuk mengkonfirmasi diagnosis itu sendiri.' }
            ],
            quiz: [
                { question: "Triad temuan yang paling khas pada kasus Sindrom Nefrotik ini adalah...", options: ["Demam, batuk, pilek", "Nyeri perut, diare, muntah", "Proteinuria, hipoalbuminemia, edema", "Hipertensi, sakit kepala, kejang"], answer: "Proteinuria, hipoalbuminemia, edema" },
                { question: "Keluhan pasien berupa BAK yang sangat berbuih merupakan tanda klinis dari...", options: ["Infeksi saluran kemih", "Dehidrasi", "Adanya gula dalam urin", "Adanya protein dalam jumlah banyak di urin (proteinuria)"], answer: "Adanya protein dalam jumlah banyak di urin (proteinuria)" },
                { question: "Mengapa kadar albumin pasien (1,8 g/dL) sangat rendah?", options: ["Karena produksi di hati menurun drastis", "Karena albumin hilang dalam jumlah besar melalui ginjal yang bocor", "Karena kebutuhan protein tubuh meningkat", "Karena asupan makanan pasien kurang"], answer: "Karena albumin hilang dalam jumlah besar melalui ginjal yang bocor" },
                { question: "Apakah tujuan utama melakukan Uji Esbach pada pasien ini?", options: ["Untuk memeriksa fungsi hati", "Untuk mengukur jumlah protein dalam urin 24 jam", "Untuk mendeteksi bakteri di urin", "Untuk melihat kadar gula darah"], answer: "Untuk mengukur jumlah protein dalam urin 24 jam" },
                { question: "Berdasarkan keseluruhan data klinis dan laboratorium awal, diagnosis yang paling mungkin untuk pasien ini adalah...", options: ["Gagal Ginjal Akut", "Infeksi Ginjal (Pielonefritis)", "Sindrom Nefrotik", "Sindrom Nefritik Akut"], answer: "Sindrom Nefrotik" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
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
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
            if (diagnoses.length > 0) {
                // Set default view to the correct answer
                renderDetails('uji-esbach');
            }
            createChart();
            loadQuiz();
        };