        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'centor', name: 'Centor', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Skoring klinis untuk memprediksi kemungkinan faringitis akibat bakteri Streptococcus Grup A.', analysis: 'SANGAT SESUAI. Kriteria Centor (demam, limfadenopati servikal anterior, tidak ada batuk, eksudat tonsil) adalah alat yang dirancang khusus untuk menilai pasien dengan gejala seperti ini guna memandu terapi.' },
                { id: 'paradise', name: 'Paradise', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🗓️</div></div>`, description: 'Kriteria untuk menentukan indikasi operasi pengangkatan tonsil (tonsilektomi).', analysis: 'KURANG SESUAI. Kriteria Paradise digunakan untuk kasus tonsilitis yang berulang (kronis), bukan untuk mendiagnosis penyebab satu episode akut faringitis seperti pada kasus ini.' },
                { id: 'twist', name: 'TWIST', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Skoring untuk evaluasi risiko torsio testis pada pasien dengan nyeri skrotum akut.', analysis: 'TIDAK SESUAI. Skoring ini digunakan untuk kondisi urologi darurat dan sama sekali tidak berhubungan dengan keluhan nyeri kepala, demam, atau sakit tenggorokan.' },
                { id: 'burch-wartofsky', name: 'Burch-Wartofsky', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">⚡️</div></div>`, description: 'Sistem skoring untuk mendiagnosis badai tiroid, suatu krisis tirotoksikosis.', analysis: 'TIDAK SESUAI. Badai tiroid adalah kondisi endokrinologi darurat dengan gejala yang berbeda dan tidak relevan dengan presentasi klinis pasien ini.' },
                { id: 'phillips', name: 'Phillips', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl"> पेट </div></div>`, description: 'Modifikasi dari skor Alvarado untuk membantu diagnosis apendisitis (radang usus buntu).', analysis: 'TIDAK SESUAI. Skoring ini untuk evaluasi nyeri perut yang dicurigai sebagai apendisitis, tidak relevan untuk keluhan di area kepala dan leher.' }
            ],
            quiz: [
                { question: "Berdasarkan data kasus, temuan mana yang memberikan 1 poin pada skor Centor untuk pasien ini?", options: ["Usia 29 tahun", "Tidak ada riwayat penyakit", "Suhu 39,0°C", "Mual dan muntah"], answer: "Suhu 39,0°C" },
                { question: "Tujuan utama penggunaan Skor Centor dalam praktik klinis adalah untuk...", options: ["Menentukan dosis antivirus", "Memprediksi kemungkinan infeksi bakteri Streptococcus", "Memastikan pasien butuh rawat inap", "Mengevaluasi risiko dehidrasi"], answer: "Memprediksi kemungkinan infeksi bakteri Streptococcus" },
                { question: "Adanya batuk pada pasien dengan sakit tenggorokan akan...", options: ["Menambah 1 poin pada Skor Centor", "Tidak mengubah Skor Centor", "Mengurangi kemungkinan faringitis bakteri", "Menjadi indikasi tes usap tenggorok"], answer: "Mengurangi kemungkinan faringitis bakteri" },
                { question: "Mengapa Kriteria Paradise TIDAK cocok untuk mengevaluasi pasien ini?", options: ["Karena pasien adalah laki-laki", "Karena demamnya terlalu tinggi", "Karena kriteria itu untuk kasus tonsilitis berulang", "Karena pasien tidak memiliki alergi"], answer: "Karena kriteria itu untuk kasus tonsilitis berulang" },
                { question: "Dari semua skoring yang ada, manakah yang paling tepat untuk kasus faringitis akut ini?", options: ["TWIST", "Burch-Wartofsky", "Paradise", "Centor"], answer: "Centor" }
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
                            <h3 class="text-2xl font-bold text-emerald-800">Skor ${diagnosis.name}</h3>
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#a7f3d0' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#6ee7b7' : '#f87171')),
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };