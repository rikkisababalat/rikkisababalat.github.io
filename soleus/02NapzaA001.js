        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'narko-1', name: 'Narkotika Golongan I', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">⛔</div></div>`, description: 'Narkotika dengan potensi ketergantungan SANGAT TINGGI.', analysis: 'TIDAK SESUAI. Golongan ini dilarang digunakan untuk kepentingan pelayanan kesehatan. Contoh: Heroin, Ganja, Kokain. Kodein tidak termasuk di sini.' },
                { id: 'narko-2', name: 'Narkotika Golongan II', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Narkotika dengan potensi ketergantungan TINGGI.', analysis: 'KURANG SESUAI. Golongan ini berkhasiat untuk pengobatan namun digunakan sebagai pilihan terakhir. Contoh: Morfin, Petidin. Kodein memiliki potensi lebih rendah.' },
                { id: 'narko-3', name: 'Narkotika Golongan III', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-3xl">✔️</div></div>`, description: 'Narkotika dengan potensi ketergantungan RINGAN.', analysis: 'SANGAT SESUAI. Golongan ini banyak digunakan dalam terapi medis dan Kodein adalah contoh utamanya. Penggunaannya harus dengan resep dokter karena risiko penyalahgunaan.' },
                { id: 'psiko-1', name: 'Psikotropika Golongan I', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Psikotropika dengan potensi ketergantungan sangat kuat, dilarang untuk terapi.', analysis: 'SALAH KATEGORI. Kodein adalah Narkotika (turunan opium), bukan Psikotropika (bekerja pada SSP dengan efek psikotropik primer). Ini adalah klasifikasi yang berbeda.' },
                { id: 'psiko-3', name: 'Psikotropika Golongan III', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Psikotropika dengan potensi ketergantungan sedang, banyak digunakan untuk terapi.', analysis: 'SALAH KATEGORI. Meskipun sama-sama digunakan untuk terapi, Kodein secara farmakologis dan hukum diklasifikasikan sebagai Narkotika, bukan Psikotropika.' }
            ],
            quiz: [
                { question: "Menurut UU Narkotika di Indonesia, Kodein termasuk dalam golongan apa?", options: ["Narkotika Golongan I", "Narkotika Golongan II", "Narkotika Golongan III", "Psikotropika Golongan I"], answer: "Narkotika Golongan III" },
                { question: "Apa temuan klinis yang paling kuat yang menentang keluhan 'demam tinggi' dari pasien?", options: ["Nadi 70x/menit", "Laju napas 18x/menit", "Suhu tubuh 36,8°C", "Tonsil T1/T1"], answer: "Suhu tubuh 36,8°C" },
                { question: "Kesenjangan antara keluhan subjektif pasien dan temuan fisik yang normal paling sering mengindikasikan...", options: ["Infeksi virus langka", "Gejala psikosomatis", "Potensi penyalahgunaan obat (drug-seeking)", "Alergi yang tidak terdeteksi"], answer: "Potensi penyalahgunaan obat (drug-seeking)" },
                { question: "Mengapa petugas apotek menolak memberikan sirup Kodein tanpa resep dokter?", options: ["Karena harganya sangat mahal", "Karena obat tersebut termasuk Narkotika yang diawasi ketat", "Karena apotek kehabisan stok", "Karena pasien berusia 21 tahun"], answer: "Karena obat tersebut termasuk Narkotika yang diawasi ketat" },
                { question: "Manakah ciri utama dari Narkotika Golongan I?", options: ["Banyak digunakan untuk batuk", "Hanya bisa dibeli dengan resep", "Potensi ketergantungan sangat tinggi dan dilarang untuk terapi", "Potensi ketergantungan ringan"], answer: "Potensi ketergantungan sangat tinggi dan dilarang untuk terapi" }
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
                        if (d.matchScore >= 9) return '#10b981'; // emerald-500
                        if (d.matchScore >= 4) return '#f97316'; // orange-500
                        return '#ef4444'; // red-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // emerald-700
                        if (d.matchScore >= 4) return '#ea580c'; // orange-600
                        return '#dc2626'; // red-600
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
                // Set default view to the correct answer
                renderDetails('narko-3');
            }
            createChart();
            loadQuiz();
        };