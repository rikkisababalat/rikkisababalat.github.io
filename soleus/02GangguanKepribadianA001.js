        // Data untuk halaman kasus ini
        const caseData = {
            diagnoses: [
                { id: 'dependen', name: 'G.K. Dependen', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🤝</div></div>`, description: 'Kebutuhan pervasif dan berlebihan untuk diurus yang mengarah pada perilaku submisif dan melekat serta ketakutan akan perpisahan.', analysis: 'SANGAT SESUAI. Pasien menunjukkan semua ciri utama: tidak bisa membuat keputusan, secara pasif membiarkan orang lain mengambil alih, dan melakukan apa saja untuk mendapatkan dukungan. Riwayat dan onset sejak dini memperkuat diagnosis ini.' },
                { id: 'ambang', name: 'G.K. Ambang', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🎭</div></div>`, description: 'Pola ketidakstabilan dalam hubungan interpersonal, citra diri, afek, dan impulsivitas yang nyata.', analysis: 'CUKUP SESUAI, NAMUN KURANG TEPAT. Ada kesamaan dalam "takut ditinggalkan", tetapi kasus ini tidak menonjolkan ketidakstabilan afek, impulsivitas, atau hubungan yang intens dan tidak stabil yang menjadi inti dari G.K. Ambang. Perilakunya lebih cenderung pasif daripada kacau.' },
                { id: 'skizotipal', name: 'G.K. Skizotipal', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-indigo-100"><div class="w-12 h-12 bg-indigo-300 rounded-full flex items-center justify-center text-3xl">🛸</div></div>`, description: 'Defisit sosial dan interpersonal ditandai dengan ketidaknyamanan akut dan kurangnya kapasitas untuk hubungan dekat, serta distorsi kognitif atau perseptual dan perilaku eksentrik.', analysis: 'TIDAK SESUAI. Pasien tidak menunjukkan perilaku atau pemikiran yang aneh, eksentrik, atau magis. Ia justru sangat mencari kedekatan, bukan merasa tidak nyaman dengannya.' },
                { id: 'skizoid', name: 'G.K. Skizoid', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">👤</div></div>`, description: 'Pola pelepasan dari hubungan sosial dan rentang ekspresi emosi yang terbatas dalam lingkungan interpersonal.', analysis: 'TIDAK SESUAI. Diagnosis ini adalah kebalikan dari gambaran klinis pasien. Pasien secara aktif mencari dan melekat pada hubungan, bukan melepaskan diri.' },
                { id: 'narsistik', name: 'G.K. Narsistik', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">👑</div></div>`, description: 'Pola kebesaran (dalam fantasi atau perilaku), kebutuhan akan kekaguman, dan kurangnya empati.', analysis: 'TIDAK SESUAI. Pasien menunjukkan kurangnya kepercayaan diri dan kebutuhan untuk bersandar pada orang lain, bukan rasa superioritas atau kebesaran.' }
            ],
            quiz: [
                { question: "Apa gejala inti yang ditunjukkan oleh kasus diatas?", options: ["Perilaku antisosial dan melanggar aturan", "Emosi yang datar dan menarik diri", "Kebutuhan untuk diurus dan perilaku melekat", "Rasa superioritas dan butuh pujian"], answer: "Kebutuhan untuk diurus dan perilaku melekat" },
                { question: "Onset keluhan sejak kelas 1 SD menunjukkan bahwa gangguan ini bersifat...", options: ["Akut dan sementara", "Kronis dan pervasif", "Episodik", "Baru saja muncul"], answer: "Kronis dan pervasif" },
                { question: "Perilaku 'mengikuti teman kemanapun pergi' paling mencerminkan...", options: ["Ketakutan akan perpisahan dan kebutuhan akan dukungan", "Keinginan untuk memanipulasi teman", "Kurangnya minat pada aktivitas lain", "Kecurigaan pada orang lain"], answer: "Ketakutan akan perpisahan dan kebutuhan akan dukungan" },
                { question: "Mengapa Gangguan Kepribadian Skizoid dapat disingkirkan sebagai diagnosis?", options: ["Karena pasien menunjukkan emosi yang kuat", "Karena pasien tidak memiliki perilaku aneh", "Karena pasien aktif mencari kedekatan, bukan menghindarinya", "Karena usia pasien terlalu muda"], answer: "Karena pasien aktif mencari kedekatan, bukan menghindarinya" },
                { question: "Berdasarkan keseluruhan gambaran klinis, diagnosis yang paling mungkin adalah:", options: ["Gangguan Kepribadian Ambang", "Gangguan Kepribadian Dependen", "Gangguan Cemas Menyeluruh", "Gangguan Kepribadian Skizotipal"], answer: "Gangguan Kepribadian Dependen" }
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
            
            quizContainer.querySelector('#quiz-header').classList.remove('hidden');
            quizContainer.querySelector('#quiz-body').classList.remove('hidden');
            quizContainer.querySelector('#quiz-footer').classList.remove('hidden');
            quizContainer.querySelector('#result-container').classList.add('hidden');
            
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
            
            quizContainer.querySelector('#next-btn').disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedAnswer = button.textContent.trim();
                    quizContainer.querySelector('#next-btn').disabled = false;
                });
            });
        }
        
        function updateProgress() {
            quizContainer.querySelector('#question-counter').textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
            const progressBar = quizContainer.querySelector('#progress-bar');
            const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }

        function showResults() {
            quizContainer.querySelector('#progress-bar').style.width = '100%';
            quizContainer.querySelector('#quiz-header').classList.add('hidden');
            quizContainer.querySelector('#quiz-body').classList.add('hidden');
            quizContainer.querySelector('#quiz-footer').classList.add('hidden');
            
            const resultContainer = quizContainer.querySelector('#result-container');
            resultContainer.classList.remove('hidden');
            resultContainer.querySelector('#score-text').textContent = `${score}/${quizData.length}`;

            let feedback = "Kerja bagus!";
            const percentage = (score / quizData.length) * 100;
            if (percentage < 60) {
                feedback = "Mungkin perlu meninjau kembali materinya.";
            } else if (percentage < 90) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman yang luar biasa!";
            }
            resultContainer.querySelector('#feedback-text').textContent = feedback;
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };