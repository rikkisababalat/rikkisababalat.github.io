        // Data untuk kasus ini dengan 5 Opsi Diagnosis
        const caseData = {
            diagnoses: [
                { 
                    id: 'difteria', 
                    name: 'Difteria', 
                    matchScore: 10, 
                    vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, 
                    description: 'Infeksi bakteri serius oleh Corynebacterium diphtheriae, menyerang selaput lendir hidung dan tenggorokan.', 
                    analysis: 'SANGAT SESUAI. Gejala kardinal berupa selaput putih keabuan (pseudomembran) yang sulit dilepaskan dan mudah berdarah, disertai demam tinggi dan limfadenopati, adalah gambaran klasik dari difteria.' 
                },
                { 
                    id: 'tonsilitis-bakterial', 
                    name: 'Tonsilitis Bakterial', 
                    matchScore: 7, 
                    vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🤒</div></div>`, 
                    description: 'Peradangan tonsil akibat infeksi bakteri, seringkali oleh Streptococcus.', 
                    analysis: 'CUKUP SESUAI. Gejala demam dan nyeri tenggorok cocok. Namun, tonsilitis biasa umumnya memiliki eksudat (bercak nanah) kekuningan, bukan selaput tebal keabuan yang meluas seperti pada kasus ini.' 
                },
                { 
                    id: 'mononukleosis', 
                    name: 'Mononukleosis Infeksiosa', 
                    matchScore: 5, 
                    vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">😴</div></div>`, 
                    description: 'Disebabkan oleh virus Epstein-Barr (EBV), sering disebut "kissing disease".', 
                    analysis: 'CUKUP MIRIP. Dapat menyebabkan radang tenggorokan hebat dan limfadenopati. Namun, pseudomembran pada mononukleosis (jika ada) tidak sepadat dan tidak melekat kuat seperti pada difteria. Kelelahan ekstrem juga merupakan gejala khas yang tidak disebutkan.' 
                },
                { 
                    id: 'angina-vincent', 
                    name: 'Angina Vincent', 
                    matchScore: 4, 
                    vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">👄</div></div>`, 
                    description: 'Infeksi ulseratif pada gusi dan tenggorokan oleh bakteri spirochete dan fusiform.', 
                    analysis: 'KURANG SESUAI. Meskipun membentuk selaput keabuan, Angina Vincent khas dengan ulkus (luka) yang nyeri dan bau mulut busuk (foetor ex ore) yang tidak dilaporkan pada kasus. Demam tinggi juga kurang umum.' 
                },
                { 
                    id: 'faringitis-jamur', 
                    name: 'Faringitis Jamur', 
                    matchScore: 3, 
                    vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">🍄</div></div>`, 
                    description: 'Infeksi jamur (biasanya Candida albicans) pada faring.', 
                    analysis: 'TIDAK SESUAI. Bercak putih pada kandidiasis lebih menyerupai endapan keju (cottage-cheese like) dan mudah dikerok. Kondisi ini jarang terjadi pada anak dengan imun baik dan jarang menyebabkan demam setinggi ini.' 
                }
            ],
            quiz: [
                { 
                    question: "Jadwal imunisasi untuk mencegah terjadinya kasus di atas berdasarkan program pemerintah adalah usia...", 
                    options: ["Bulan 1, 2, dan 3", "Bulan 9", "Bulan 2, 3, dan 4", "Bulan 1, 2, 3, dan 4", "Bulan 2, 4, dan 6"], 
                    answer: "Bulan 2, 3, dan 4" 
                },
                { 
                    question: "Temuan fisik manakah yang paling spesifik (patognomonik) untuk diagnosis pada kasus ini?", 
                    options: ["Demam 39,0°C", "Tonsil T3/T2 hiperemis", "Nyeri tenggorokan", "Selaput putih keabuan di faring", "Limfadenopati coli"], 
                    answer: "Selaput putih keabuan di faring" 
                },
                { 
                    question: "Penyakit pada kasus ini disebabkan oleh infeksi...", 
                    options: ["Streptococcus pyogenes", "Virus Epstein-Barr", "Corynebacterium diphtheriae", "Virus Influenza", "Staphylococcus aureus"], 
                    answer: "Corynebacterium diphtheriae" 
                },
                { 
                    question: "Selain antibiotik, tatalaksana krusial yang harus segera diberikan untuk menetralisir toksin adalah...", 
                    options: ["Kortikosteroid", "Antivirus", "Cairan infus", "Antipiretik", "Antidifteri Serum (ADS)"], 
                    answer: "Antidifteri Serum (ADS)" 
                },
                { 
                    question: "Istilah untuk pembengkakan leher yang masif dan menyerupai leher banteng (bull neck) pada kasus berat adalah...", 
                    options: ["Goiter", "Struma", "Parotitis", "Limfadenitis", "Cervical Diphtheria"], 
                    answer: "Cervical Diphtheria" 
                }
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
                        if (d.matchScore >= 8) return '#059669'; // Sangat Sesuai
                        if (d.matchScore >= 6) return '#34d399'; // Cukup Sesuai
                        if (d.matchScore >= 4) return '#f59e0b'; // Cukup Mirip
                        return '#ef4444'; // Kurang/Tidak Sesuai
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#065f46';
                        if (d.matchScore >= 6) return '#059669';
                        if (d.matchScore >= 4) return '#d97706';
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };
