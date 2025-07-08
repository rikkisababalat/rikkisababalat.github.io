        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                // Urutan harus sesuai dengan opsi A, B, C, D, E pada soal
                { id: 'hiponatremia', name: 'Hiponatremia', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Kondisi kadar natrium dalam darah lebih rendah dari normal.', analysis: 'TIDAK SESUAI. Meskipun bisa menyebabkan kelemahan, hiponatremia tidak memiliki pola kelemahan fluktuatif (fatigability) yang khas dan tidak secara spesifik menyebabkan ptosis yang memburuk di sore hari.' },
                { id: 'stroke-iskemik', name: 'Stroke Iskemik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Kematian jaringan otak akibat kurangnya suplai darah.', analysis: 'SANGAT TIDAK SESUAI. Stroke memiliki onset akut (mendadak), bukan kronis selama 1 tahun. Defisit neurologisnya juga menetap, bukan membaik dan memburuk secara berulang dalam sehari.' },
                { id: 'myasthenia-gravis', name: 'Myasthenia Gravis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">😴</div></div>`, description: 'Penyakit autoimun yang menyerang sambungan saraf-otot (neuromuscular junction).', analysis: 'SANGAT SESUAI. Semua gejala pasien—kelemahan fluktuatif, ptosis, memburuknya gejala saat lelah (sore hari), membaik setelah istirahat, dan tes provokasi ptosis yang positif—adalah gambaran klasik dari Myasthenia Gravis.' },
                { id: 'duchenne', name: 'Duchenne Muscular Dystrophy', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Kelainan genetik yang menyebabkan kerusakan otot progresif.', analysis: 'SANGAT TIDAK SESUAI. Penyakit ini terjadi pada anak laki-laki, dan kelemahannya bersifat progresif (terus memburuk), bukan fluktuatif. Pasien adalah wanita dewasa.' },
                { id: 'gbs', name: 'Guillain-Barre Syndrome', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">⚡</div></div>`, description: 'Gangguan autoimun akut yang menyerang sistem saraf tepi.', analysis: 'SANGAT TIDAK SESUAI. GBS adalah penyakit akut yang berkembang cepat dalam hitungan hari hingga minggu. Riwayat keluhan selama 1 tahun menyingkirkan diagnosis ini.' }
            ],
            quiz: [
                { question: "Apa pola gejala paling khas yang dialami pasien ini?", options: ["Kelemahan yang konstan sepanjang hari", "Kelemahan memburuk dengan aktivitas & membaik dengan istirahat", "Kelemahan hanya terjadi di pagi hari", "Kelemahan yang berpindah-pindah lokasi"], answer: "Kelemahan memburuk dengan aktivitas & membaik dengan istirahat" },
                { question: "Pemeriksaan fisik dimana pasien diminta melihat satu titik selama 30 detik bertujuan untuk menilai apa?", options: ["Tajam penglihatan", "Kelelahan otot (Fatigability)", "Gerakan bola mata", "Refleks pupil"], answer: "Kelelahan otot (Fatigability)" },
                { question: "Gejala-gejala pada pasien ini paling mungkin disebabkan oleh gangguan pada...", options: ["Otak (Stroke)", "Otot (Distrofi)", "Sambungan Saraf-Otot (Neuromuscular Junction)", "Saraf Tepi (Neuropati)"], answer: "Sambungan Saraf-Otot (Neuromuscular Junction)" },
                { question: "Mengapa Guillain-Barre Syndrome (GBS) bukan diagnosis yang tepat untuk kasus ini?", options: ["Karena GBS tidak menyebabkan ptosis", "Karena tekanan darah pasien normal", "Karena GBS adalah penyakit akut, bukan kronis 1 tahun", "Karena GBS hanya menyerang laki-laki"], answer: "Karena GBS adalah penyakit akut, bukan kronis 1 tahun" },
                { question: "Berdasarkan keseluruhan temuan, diagnosis apakah yang paling akurat?", options: ["Hiponatremia", "Stroke Iskemik", "Myasthenia Gravis", "Guillain-Barre Syndrome"], answer: "Myasthenia Gravis" }
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
                        if (d.matchScore >= 8) return '#059669'; // High match
                        if (d.matchScore >= 4) return '#f59e0b'; // Medium match
                        return '#ef4444'; // Low match
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46';
                        if (d.matchScore >= 4) return '#b45309';
                        return '#b91c1c';
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
                renderDetails('myasthenia-gravis'); // Default to show the most likely diagnosis first
            }
            createChart();
            loadQuiz();
        };