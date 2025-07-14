        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'kejang-10-menit', name: 'Kejang > 10 menit', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-2xl">🤔</div></div>`, description: 'Kejang yang berlangsung selama lebih dari 10 menit.', analysis: 'CUKUP RELEVAN. Kejang saat ini memang sudah 10 menit. Namun, kriteria diagnostik spesifik untuk kejang lama pada KDK adalah >15 menit, yang juga dialami pasien pada episode pertama.' },
                { id: 'kejang-generalisata', name: 'Kejang Generalisata', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-2xl">🌐</div></div>`, description: 'Kejang yang melibatkan seluruh tubuh secara bersamaan.', analysis: 'KURANG SPESIFIK. Kejang generalisata dapat terjadi baik pada Kejang Demam Sederhana (KDS) maupun Kompleks (KDK). Oleh karena itu, temuan ini tidak membantu membedakan keduanya.' },
                { id: 'kejang-15-menit', name: 'Kejang > 15 menit', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-2xl">❗</div></div>`, description: 'Riwayat kejang yang berlangsung lebih dari 15 menit.', analysis: 'SANGAT RELEVAN & DIAGNOSTIK. Ini adalah salah satu kriteria utama untuk mendiagnosis Kejang Demam Kompleks (KDK). Temuan ini secara langsung membedakan kondisi pasien dari Kejang Demam Sederhana.' },
                { id: 'suhu-tinggi', name: 'Suhu 39,5 °C', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Demam tinggi yang menyertai kejang.', analysis: 'RELEVAN TAPI TIDAK SPESIFIK. Suhu tinggi adalah pemicu dan syarat untuk diagnosis kejang demam secara umum. Namun, derajat demam tidak menentukan apakah kejang tersebut sederhana atau kompleks.' },
                { id: 'interval-kejang', name: 'Interval antar kejang > 15 menit', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-2xl">🔁</div></div>`, description: 'Terjadinya lebih dari satu episode kejang dalam 24 jam.', analysis: 'SANGAT RELEVAN. Ini adalah kriteria utama lain untuk KDK. Pasien mengalami dua kejang dalam 5 jam. Namun, opsi "Kejang > 15 menit" adalah deskripsi langsung dari sebuah episode yang sudah pasti memenuhi kriteria, menjadikannya jawaban yang paling tepat dari pilihan yang ada.' },
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin untuk pasien ini?", options: ["Kejang Demam Sederhana", "Epilepsi", "Meningitis", "Kejang Demam Kompleks"], answer: "Kejang Demam Kompleks" },
                { question: "Manakah dari temuan berikut yang merupakan kriteria UTAMA untuk Kejang Demam Kompleks?", options: ["Demam > 40°C", "Usia < 1 tahun", "Kejang > 15 menit", "Riwayat imunisasi tidak lengkap"], answer: "Kejang > 15 menit" },
                { question: "Berapa kali pasien mengalami kejang dalam 24 jam terakhir menurut skenario?", options: ["Satu kali", "Dua kali", "Tiga kali", "Tidak disebutkan"], answer: "Dua kali" },
                { question: "Mengapa demam tinggi (39.5°C) menjadi informasi penting dalam kasus ini?", options: ["Menandakan infeksi bakteri", "Menjadi pemicu kejang (sifat febril)", "Menentukan jenis kejang", "Memastikan diagnosis epilepsi"], answer: "Menjadi pemicu kejang (sifat febril)" },
                { question: "Selain durasi > 15 menit, apa lagi kriteria lain untuk Kejang Demam Kompleks yang ditemukan pada pasien ini?", options: ["Kejang fokal", "Kejang berulang dalam 24 jam", "Adanya batuk pilek", "Berat badan 10 kg"], answer: "Kejang berulang dalam 24 jam" }
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
                    label: 'Tingkat Relevansi Diagnostik',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#b91c1c' : (d.matchScore >= 7 ? '#f97316' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#7f1d1d' : (d.matchScore >= 7 ? '#c2410c' : '#6ee7b7')),
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