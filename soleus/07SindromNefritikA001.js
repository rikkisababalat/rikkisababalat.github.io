        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'asto', name: 'Tes ASTO Positif', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🔬</div></div>`, description: 'Anti-streptolysin O (ASTO) adalah antibodi yang diproduksi tubuh sebagai respons terhadap Streptolysin O, sebuah toksin yang dihasilkan bakteri Streptococcus Grup A.', analysis: 'SANGAT SESUAI. Tes ASTO positif mengonfirmasi adanya infeksi streptokokus baru-baru ini. Ini adalah bukti kunci yang menghubungkan riwayat sakit tenggorokan pasien dengan kondisi ginjalnya saat ini (glomerulonefritis).'},
                { id: 'proteinuria', name: 'Sedimentasi Protein', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🧪</div></div>`, description: 'Pemeriksaan untuk mengukur jumlah protein yang bocor ke dalam urin.', analysis: 'CUKUP SESUAI. Proteinuria ringan hingga sedang sering ditemukan pada sindrom nefritik. Temuan ini mendukung adanya kerusakan ginjal, tetapi tidak spesifik untuk menunjuk penyebabnya adalah pasca-infeksi streptokokus.' },
                { id: 'trigliserida', name: 'Kadar Trigliserida > 200', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🍔</div></div>`, description: 'Peningkatan kadar lemak (trigliserida) dalam darah.', analysis: 'KURANG SESUAI. Peningkatan trigliserida (hiperlipidemia) adalah ciri khas Sindrom Nefrotik, di mana terjadi kebocoran protein yang masif. Kasus ini lebih menunjukkan gambaran Sindrom Nefritik yang didominasi oleh hematuria.' },
                { id: 'vegetasi-echo', name: 'Vegetasi pada Echo', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❤️</div></div>`, description: 'Pemeriksaan USG jantung (echocardiography) untuk melihat struktur jantung.', analysis: 'TIDAK SESUAI. Vegetasi pada katup jantung adalah tanda Endokarditis Infektif. Gejala pasien (edema, hipertensi, hematuria) tidak mengarah ke diagnosis ini, melainkan ke masalah primer pada ginjal.' },
                { id: 'ziehl-neelsen', name: 'Basil Tahan Asam', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Pewarnaan khusus untuk mengidentifikasi bakteri Mycobacterium tuberculosis.', analysis: 'SANGAT TIDAK SESUAI. Pemeriksaan ini digunakan untuk mendeteksi kuman TBC. Sama sekali tidak relevan dengan gejala dan tanda klinis pasien.' }
            ],
            quiz: [
                { question: "Trias gejala klasik untuk Sindrom Nefritik Akut yang tampak pada pasien ini adalah...", options: ["Demam, batuk, pilek", "Bengkak, kencing merah, tekanan darah tinggi", "Nyeri perut, mual, muntah", "Sakit kepala, gatal-gatal, sesak napas"], answer: "Bengkak, kencing merah, tekanan darah tinggi" },
                { question: "Kapan riwayat infeksi tenggorokan pasien terjadi relatif terhadap munculnya keluhan saat ini?", options: ["Kemarin", "1 minggu yang lalu", "2 minggu yang lalu", "1 bulan yang lalu"], answer: "2 minggu yang lalu" },
                { question: "Pemeriksaan laboratorium apa yang paling penting untuk mengonfirmasi penyebab kondisi pasien?", options: ["Tes fungsi hati", "Kadar kolesterol", "Tes ASTO", "Kultur darah"], answer: "Tes ASTO" },
                { question: "Warna urin 'seperti air cucian daging' secara medis menunjukkan adanya...", options: ["Infeksi saluran kemih", "Dehidrasi berat", "Protein dalam urin (Proteinuria)", "Darah dalam urin (Hematuria)"], answer: "Darah dalam urin (Hematuria)" },
                { question: "Temuan mana yang TIDAK sesuai dengan diagnosis Glomerulonefritis Akut Pasca-Streptokokus?", options: ["Hipertensi", "Hematuria", "Riwayat faringitis", "Kadar Trigliserida > 200 mg/dl"], answer: "Kadar Trigliserida > 200 mg/dl" }
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
                labels: diagnoses.map(d => d.name).reverse(), // Reverse to match button order
                datasets: [{
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore).reverse(),
                    backgroundColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 5) return '#f59e0b'; // amber-500
                        if (d.matchScore >= 2) return '#f43f5e'; // rose-500
                        return '#64748b'; // slate-500
                    }).reverse(),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 8) return '#059669';
                         if (d.matchScore >= 5) return '#b45309';
                         if (d.matchScore >= 2) return '#be123c';
                         return '#475569';
                    }).reverse(),
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };