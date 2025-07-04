        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'urine-kateter', name: 'A. Urin kateter', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Pengambilan urin menggunakan selang fleksibel yang dimasukkan melalui uretra ke kandung kemih.', analysis: 'KURANG TEPAT. Metode ini bersifat invasif dan membawa risiko infeksi baru (infeksi nosokomial). Prosedur ini tidak diindikasikan pada pasien dewasa yang kooperatif dan dapat berkemih secara spontan.' },
                { id: 'urine-pungsi', name: 'B. Urin pungsi suprapubik', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Pengambilan urin steril langsung dari kandung kemih dengan menusukkan jarum melalui dinding perut bagian bawah.', analysis: 'SANGAT TIDAK TEPAT. Ini adalah prosedur yang sangat invasif dan merupakan pilihan terakhir. Hanya digunakan dalam situasi yang sangat spesifik (misalnya pada bayi, atau jika kateterisasi gagal/kontraindikasi). Sangat tidak perlu untuk kasus ini.' },
                { id: 'urine-pancar-tengah', name: 'C. Urin pancar tengah', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-3xl">🏆</div></div>`, description: 'Urin yang ditampung di tengah proses berkemih, setelah membersihkan area genital dan membuang aliran awal.', analysis: 'SANGAT SESUAI. Ini adalah metode standar non-invasif (gold standard) untuk urinalisis dan kultur urin. Tujuannya adalah meminimalkan kontaminasi dari bakteri flora normal di uretra, sehingga memberikan hasil yang paling akurat untuk diagnosis ISK pada pasien rawat jalan.' },
                { id: 'urine-pagi', name: 'D. Urin pagi hari', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🌙</div></div>`, description: 'Menggunakan sampel urin pertama saat bangun tidur di pagi hari.', analysis: 'KURANG FOKUS. Ini merujuk pada WAKTU pengambilan, bukan TEKNIK. Meskipun urin pagi lebih pekat dan baik untuk beberapa tes, teknik "pancar tengah" tetap merupakan hal yang paling krusial untuk mencegah kontaminasi. Jawaban ini tidak menjelaskan teknik yang benar.' },
                { id: 'urine-24-jam', name: 'E. Urin 24 jam', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🕒</div></div>`, description: 'Proses pengumpulan seluruh urin yang diproduksi oleh pasien dalam periode 24 jam penuh.', analysis: 'TIDAK TEPAT. Metode ini digunakan untuk analisis kuantitatif (misalnya, jumlah total protein, hormon, atau elektrolit yang diekskresikan), bukan untuk mendeteksi atau mengidentifikasi bakteri pada infeksi akut.' }
            ],
            quiz: [
                { question: "Gejala dan tanda manakah pada kasus ini yang paling spesifik menunjuk ke arah Pielonefritis (infeksi ginjal)?", options: ["Demam tinggi", "BAK kemerahan", "Nyeri ketok CVA (+)", "Riwayat berulang"], answer: "Nyeri ketok CVA (+)" },
                { question: "Apa tujuan utama dari teknik pengambilan urin pancar tengah (midstream)?", options: ["Mendapatkan urin sebanyak mungkin", "Mengurangi kontaminasi dari bakteri uretra", "Memeriksa fungsi ginjal sepanjang hari", "Hanya untuk urin pagi hari"], answer: "Mengurangi kontaminasi dari bakteri uretra" },
                { question: "Manakah metode pengambilan urin yang paling invasif dan berisiko tinggi?", options: ["Urin pancar tengah", "Urin kateter", "Pungsi suprapubik", "Urin 24 jam"], answer: "Pungsi suprapubik" },
                { question: "Mengapa 'Urin 24 Jam' bukan metode yang tepat untuk Tn. Cid?", options: ["Karena terlalu merepotkan pasien", "Karena tujuannya untuk analisis kuantitatif, bukan deteksi infeksi", "Karena hasilnya tidak bisa cepat keluar", "Karena membutuhkan wadah yang besar"], answer: "Karena tujuannya untuk analisis kuantitatif, bukan deteksi infeksi" },
                { question: "Berdasarkan semua pertimbangan, metode pengambilan urin manakah yang paling ideal untuk Tn. Cid?", options: ["Urin kateter", "Urin pancar tengah", "Pungsi suprapubik", "Urin pagi hari"], answer: "Urin pancar tengah" }
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
                    label: 'Tingkat Kesesuaian',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#f97316' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#c2410c' : '#b91c1c')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kesesuaian (0-10)', font: { size: 14 } } },
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
            // Sort diagnoses to match the order A, B, C, D, E in the question
            diagnoses.sort((a, b) => a.name.localeCompare(b.name));
            createNav();
            // Show the correct answer (C) by default
            const defaultDiagnosis = diagnoses.find(d => d.id === 'urine-pancar-tengah') || diagnoses[0];
            if (defaultDiagnosis) {
                renderDetails(defaultDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };
