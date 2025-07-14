        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'pda', name: 'Duktus Arteriosus', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-pink-200"><div class="w-12 h-12 text-pink-500 rounded-full flex items-center justify-center text-4xl">❤️‍🩹</div></div>`, description: 'Saluran antara aorta dan arteri pulmonalis yang gagal menutup setelah lahir.', analysis: 'SANGAT SESUAI. Temuan murmur kontinyu ("machinery murmur") di sela iga 2 kiri adalah tanda patognomonik (sangat khas) untuk PDA. Gejala gagal jantung (sesak, FTT) juga sangat mendukung diagnosis ini.' },
                { id: 'vsd', name: 'Septum Interventrikular', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 text-blue-500 rounded-full flex items-center justify-center text-4xl">💔</div></div>`, description: 'Adanya lubang pada sekat antara ventrikel kiri dan kanan.', analysis: 'CUKUP SESUAI NAMUN BISING BERBEDA. VSD besar dapat menyebabkan gagal jantung serupa, tetapi murmur yang khas adalah holosistolik (bukan kontinyu) dan biasanya terdengar di sela iga 3-4 kiri bawah.' },
                { id: 'asd', name: 'Septum Interatrial', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 text-purple-500 rounded-full flex items-center justify-center text-4xl">❣️</div></div>`, description: 'Adanya lubang pada sekat antara atrium kiri dan kanan.', analysis: 'KURANG SESUAI. ASD jarang menyebabkan gejala gagal jantung yang signifikan pada usia 2 bulan. Murmur khasnya adalah ejeksi sistolik dengan S2 yang terpisah lebar dan menetap (wide fixed splitting S2).' },
                { id: 'ap-window', name: 'Aorta-Arteri Pulmonalis', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 text-orange-500 rounded-full flex items-center justify-center text-4xl">🔗</div></div>`, description: 'Koneksi langsung antara aorta asendens dan arteri pulmonalis utama.', analysis: 'MIRIP NAMUN JARANG. AP Window dapat memberikan gambaran klinis yang hampir identik dengan PDA (murmur kontinyu dan gagal jantung). Namun, kondisi ini jauh lebih jarang daripada PDA, sehingga PDA menjadi diagnosis yang lebih mungkin.' },
                { id: 'aortic-valve', name: 'Katup Aorta', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 text-gray-500 rounded-full flex items-center justify-center text-4xl">밸</div></div>`, description: 'Gangguan pada katup aorta, seperti penyempitan (stenosis) atau kebocoran (regurgitasi).', analysis: 'TIDAK SESUAI. Kelainan katup aorta tidak menghasilkan murmur kontinyu. Stenosis aorta menyebabkan murmur ejeksi sistolik, sedangkan regurgitasi aorta menyebabkan murmur dekresendo diastolik.' }
            ],
            quiz: [
                { question: "Apa temuan pemeriksaan fisik yang paling khas pada kasus ini?", options: ["Murmur sistolik", "Murmur diastolik", "Murmur kontinyu", "Suara jantung melemah"], answer: "Murmur kontinyu" },
                { question: "Gejala sesak napas dan berat badan sulit naik pada bayi ini secara kolektif merujuk pada kondisi?", options: ["Infeksi pernapasan", "Gagal jantung", "Masalah pencernaan", "Alergi susu"], answer: "Gagal jantung" },
                { question: "Di mana lokasi klasik untuk mendengar murmur pada kasus ini?", options: ["Puncak jantung (apeks)", "Sela iga ke-2 linea parasternalis kanan", "Sela iga ke-2 linea parasternalis kiri", "Sela iga ke-4 linea parasternalis kiri"], answer: "Sela iga ke-2 linea parasternalis kiri" },
                { question: "Mengapa VSD (Ventricular Septal Defect) menjadi diagnosis yang kurang mungkin dibandingkan PDA?", options: ["Karena VSD selalu menyebabkan kulit biru", "Karena VSD tidak menyebabkan gagal jantung", "Karena jenis murmur pada VSD berbeda (holosistolik)", "Karena VSD hanya terjadi pada orang dewasa"], answer: "Karena jenis murmur pada VSD berbeda (holosistolik)" },
                { question: "Berdasarkan semua temuan klinis, struktur apakah yang paling mungkin mengalami gangguan?", options: ["Septum interatrial", "Katup Mitral", "Duktus arteriosus", "Septum interventrikular"], answer: "Duktus arteriosus" }
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
            // Urutkan diagnosis berdasarkan skor kecocokan tertinggi
            const sortedDiagnoses = [...diagnoses].sort((a, b) => b.matchScore - a.matchScore);
            sortedDiagnoses.forEach(diagnosis => {
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
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#a7f3d0')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#6ee7b7')),
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