        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'miopia', name: 'Miopia', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">👓</div></div>`, description: 'Rabun jauh; kondisi di mana objek jauh terlihat kabur.', analysis: 'TIDAK SESUAI. Visus jauh pasien 6/6, yang berarti penglihatan jauhnya normal. Gejala utama miopia adalah kesulitan melihat jauh, yang berlawanan dengan kasus ini.' },
                { id: 'presbiopia', name: 'Presbiopia', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">📰</div></div>`, description: 'Kesulitan melihat dekat akibat penuaan lensa mata.', analysis: 'SANGAT SESUAI. Usia pasien (55 tahun), gejala mata lelah spesifik saat membaca, visus jauh yang normal, dan riwayat kacamata baca yang sudah tidak memadai adalah tanda-tanda klasik dari presbiopia yang progresif.' },
                { id: 'diplopia', name: 'Diplopia', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">😵</div></div>`, description: 'Penglihatan ganda.', analysis: 'TIDAK SESUAI. Diplopia adalah gejala neurologis atau otot mata, bukan kelainan refraksi primer. Pasien tidak melaporkan melihat ganda.' },
                { id: 'astigmatisma', name: 'Astigmatisma', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🌀</div></div>`, description: 'Penglihatan kabur pada semua jarak karena bentuk kornea/lensa tidak teratur.', analysis: 'KURANG SESUAI. Gejala astigmatisma biasanya memengaruhi penglihatan jauh dan dekat. Keluhan pasien yang sangat spesifik pada penglihatan dekat dengan visus jauh yang baik membuat diagnosis ini kurang mungkin menjadi penyebab utama.' },
                { id: 'hipermetropia', name: 'Hipermetropia', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🔎</div></div>`, description: 'Rabun dekat; kesulitan fokus pada objek dekat.', analysis: 'CUKUP SESUAI, NAMUN KURANG SPESIFIK. Meskipun gejalanya mirip, istilah "Hipermetropia" merujuk pada bentuk bola mata, sedangkan "Presbiopia" secara spesifik merujuk pada penurunan kemampuan akomodasi lensa akibat usia. Mengingat usia pasien, presbiopia adalah diagnosis yang lebih akurat.' }
            ],
            quiz: [
                { question: "Apa temuan visus (tajam penglihatan jauh) pada pasien ini?", options: ["6/60 (Buruk)", "6/12 (Menurun)", "6/6 (Normal)", "Tidak bisa dinilai"], answer: "6/6 (Normal)" },
                { question: "Mengapa kacamata lama pasien (S+1.00 D) tidak lagi nyaman?", options: ["Karena lensanya tergores", "Karena presbiopia bersifat progresif dan membutuhkan lensa lebih kuat", "Karena pasien sekarang menderita miopia", "Karena kekuatan kacamata terlalu tinggi"], answer: "Karena presbiopia bersifat progresif dan membutuhkan lensa lebih kuat" },
                { question: "Faktor utama yang menyebabkan presbiopia adalah...", options: ["Bentuk bola mata yang terlalu pendek", "Infeksi pada kornea", "Berkurangnya elastisitas lensa mata karena penuaan", "Kerusakan pada saraf optik"], answer: "Berkurangnya elastisitas lensa mata karena penuaan" },
                { question: "Diagnosis manakah yang paling TIDAK MUNGKIN pada kasus ini, berdasarkan visus 6/6?", options: ["Presbiopia", "Astigmatisma ringan", "Hipermetropia laten", "Miopia"], answer: "Miopia" },
                { question: "Aktivitas apa yang memperberat keluhan pasien?", options: ["Melihat pemandangan", "Menonton televisi dari jauh", "Mengemudi di malam hari", "Membaca koran atau bermain ponsel"], answer: "Membaca koran atau bermain ponsel" }
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
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 4) return '#f59e0b'; // amber-500
                        return '#ef4444'; // red-500
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 4) return '#d97706'; // amber-600
                        return '#b91c1c'; // red-700
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
            } else if (percentage < 99) {
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
                renderDetails('presbiopia');
            }
            createChart();
            loadQuiz();
        };