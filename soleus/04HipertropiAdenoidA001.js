        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                 { id: 'adenoidektomi', name: 'Adenoidektomi', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✂️</div></div>`, description: 'Prosedur bedah untuk mengangkat jaringan adenoid yang membesar.', analysis: 'SANGAT SESUAI. Ini adalah tatalaksana definitif yang mengatasi akar masalah, yaitu sumbatan jalan napas oleh adenoid. Dengan menghilangkan sumbatan, gejala OSA (mengorok, sesak) akan teratasi dan kualitas hidup pasien akan membaik.' },
                 { id: 'kortikosteroid', name: 'Kortikosteroid', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💨</div></div>`, description: 'Obat anti-inflamasi (misalnya semprotan hidung) untuk mengurangi peradangan dan ukuran adenoid.', analysis: 'CUKUP SESUAI. Bisa menjadi pilihan pertama pada kasus ringan-sedang. Namun, pada pasien dengan gejala OSA yang jelas dan berdampak pada prestasi sekolah, tindakan operatif seringkali lebih efektif dan memberikan hasil yang lebih cepat dan permanen.' },
                 { id: 'tonsilektomi', name: 'Tonsilektomi', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">😮</div></div>`, description: 'Prosedur bedah untuk mengangkat amandel (tonsil).', analysis: 'KURANG FOKUS. Meskipun sering dilakukan bersamaan dengan adenoidektomi, gejala spesifik seperti "adenoid facies" lebih menunjuk pada masalah adenoid. Tanpa informasi pembesaran tonsil, ini bukan tindakan utama yang diindikasikan.' },
                 { id: 'amoxicillin', name: 'Amoxicillin', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Antibiotik untuk melawan infeksi bakteri.', analysis: 'TIDAK SESUAI. Gejala pasien bersifat kronis dan disebabkan oleh sumbatan mekanis, bukan infeksi bakteri akut. Memberikan antibiotik tidak akan mengatasi masalah sumbatan.' },
                 { id: 'insisi-drainase', name: 'Insisi & Drainase', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Prosedur untuk mengeluarkan kumpulan nanah (abses).', analysis: 'SANGAT TIDAK SESUAI. Prosedur ini untuk kondisi infeksi akut bernanah seperti abses peritonsil, yang memiliki gejala dan tanda yang sangat berbeda dari kasus ini.' }
            ],
            quiz: [
                 { question: "Apa penyebab paling mungkin dari prestasi sekolah pasien yang menurun?", options: ["Malas belajar", "Gangguan penglihatan", "Kurang tidur berkualitas akibat sesak napas", "Masalah pendengaran"], answer: "Kurang tidur berkualitas akibat sesak napas" },
                 { question: "Temuan fisik berupa wajah dengan mulut terbuka, pandangan kosong, dan gigi menonjol dikenal sebagai...", options: ["Facies Muka Singa", "Facies Hipotiroid", "Facies Parkinson", "Facies Adenoid"], answer: "Facies Adenoid" },
                 { question: "Mengapa Adenoidektomi adalah tatalaksana yang paling tepat untuk kasus ini?", options: ["Karena merupakan prosedur termudah", "Karena langsung mengatasi akar penyebab sumbatan", "Karena dapat meningkatkan nafsu makan", "Karena bisa dilakukan tanpa bius total"], answer: "Karena langsung mengatasi akar penyebab sumbatan" },
                 { question: "Gejala manakah yang paling spesifik menunjukkan adanya Obstructive Sleep Apnea (OSA)?", options: ["Sering bengong di kelas", "Napas melalui mulut", "Terbangun di malam hari karena sesak", "Suara sengau"], answer: "Terbangun di malam hari karena sesak" },
                 { question: "Mengapa pemberian Amoxicillin tidak tepat pada kasus ini?", options: ["Harganya mahal", "Pasien alergi", "Penyebabnya bukan infeksi bakteri akut", "Efek sampingnya banyak"], answer: "Penyebabnya bukan infeksi bakteri akut" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 5 ? '#34d399' : '#f87171')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 5 ? '#059669' : '#ef4444')),
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