
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'fam', name: 'FAM', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🧩</div></div>`, description: 'Fibroadenoma Mammae adalah tumor jinak paling umum pada payudara, terdiri dari jaringan fibrosa dan kelenjar.', analysis: 'KURANG SESUAI. Meskipun sifatnya mobile dan kenyal cocok dengan FAM, ukurannya yang 12 cm sangat besar untuk FAM biasa. Selain itu, gambaran histopatologi "seperti daun" tidak khas untuk FAM.' },
                { id: 'dysplasia', name: 'Mammary Dysplasia', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Istilah umum untuk perubahan fibrokistik, biasanya berupa nodul multipel dan sering disertai nyeri.', analysis: 'TIDAK SESUAI. Kasus ini menunjukkan satu massa besar yang dominan, bukan payudara yang terasa berbenjol-benjol secara umum. Keluhan nyeri juga tidak ada.' },
                { id: 'filoides', name: 'Tumor Filoides', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🌿</div></div>`, description: 'Tumor fibroepitelial langka yang ditandai dengan pertumbuhan cepat dan struktur stroma seluler.', analysis: 'SANGAT SESUAI. Ukuran massa yang besar (12 cm), sifat mobile, dan terutama temuan histopatologi proyeksi "seperti daun" adalah gambaran klasik dan patognomonik untuk Tumor Filoides.' },
                { id: 'fibrokista', name: 'Fibrokista Mammae', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🔮</div></div>`, description: 'Kondisi jinak yang ditandai dengan adanya kista berisi cairan dan jaringan fibrosa.', analysis: 'TIDAK SESUAI. Sama seperti displasia, kondisi ini biasanya menyebabkan banyak benjolan kecil atau kista dan seringkali nyeri, berbeda dengan satu massa besar dan kenyal pada kasus ini.' },
                { id: 'ca-payudara', name: 'Ca Payudara', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🎗️</div></div>`, description: 'Keganasan (kanker) yang berasal dari sel-sel di payudara.', analysis: 'KURANG SESUAI. Walaupun bisa berupa massa besar, kanker payudara umumnya terfiksasi (tidak mobile) dan sering menunjukkan tanda infiltrasi seperti peau d’orange atau retraksi puting, yang semuanya tidak ada pada pasien ini. Histopatologinya juga berbeda.' }
            ],
            quiz: [
                { question: "Temuan histopatologi 'gambaran proyeksi seperti daun' paling spesifik untuk diagnosis apa?", options: ["Fibroadenoma", "Tumor Filoides", "Kanker Payudara", "Fibrokista"], answer: "Tumor Filoides" },
                { question: "Manakah dari temuan berikut yang paling mendukung sifat jinak atau borderline dari massa pada kasus ini?", options: ["Ukuran 12 cm", "Mobile dan kenyal", "Pertumbuhan selama 1 tahun", "Tidak ada cairan dari puting"], answer: "Mobile dan kenyal" },
                { question: "Ukuran massa 12 cm pada payudara dianggap sebagai...", options: ["Ukuran yang normal", "Ukuran kecil", "Ukuran sedang", "Ukuran besar"], answer: "Ukuran besar" },
                { question: "Mengapa Kanker Payudara (Ca payudara) kurang mungkin menjadi diagnosis pada kasus ini?", options: ["Karena pasien masih muda", "Karena tidak ada keluhan nyeri", "Karena tidak ada tanda infiltrasi seperti peau d'orange atau retraksi papil", "Karena hanya terjadi di satu payudara"], answer: "Karena tidak ada tanda infiltrasi seperti peau d'orange atau retraksi papil" },
                { question: "Berdasarkan semua temuan klinis dan histopatologis, diagnosis apakah yang paling akurat?", options: ["FAM", "Mammary dysplasia", "Tumor filoides", "Fibrokista mammae", "Ca payudara"], answer: "Tumor filoides" }
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
                        if(d.matchScore >= 8) return '#10b981'; // emerald-500
                        if(d.matchScore >= 4) return '#60a5fa'; // blue-400
                        return '#f87171'; // red-400
                    }),
                    borderColor: diagnoses.map(d => {
                        if(d.matchScore >= 8) return '#059669'; // emerald-700
                        if(d.matchScore >= 4) return '#3b82f6'; // blue-600
                        return '#ef4444'; // red-500
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
                // Set default view to the correct diagnosis
                renderDetails('filoides');
            }
            createChart();
            loadQuiz();
        };
