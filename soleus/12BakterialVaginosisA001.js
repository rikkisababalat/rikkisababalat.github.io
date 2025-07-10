        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'bacterial-vaginosis', name: 'Bakterial Vaginosis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-cyan-200"><div class="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Infeksi akibat ketidakseimbangan flora normal vagina, dengan pertumbuhan berlebih bakteri anaerob.', analysis: 'SANGAT SESUAI. Semua tanda klasik ada: duh putih keabuan, bau amis, dan ditemukannya "clue cells". Riwayat sering mencuci dengan sabun adalah faktor risiko yang jelas.' },
                { id: 'trichomoniasis', name: 'Trikomoniasis', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🍓</div></div>`, description: 'Infeksi menular seksual yang disebabkan oleh parasit Trichomonas vaginalis.', analysis: 'KURANG SESUAI. Gambaran duh pada kasus (putih keabuan) tidak cocok dengan trikomoniasis yang khasnya kuning-hijau dan berbusa. Temuan mikroskopis juga berbeda.' },
                { id: 'gonorrhea', name: 'Gonore', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Infeksi menular seksual oleh bakteri Neisseria gonorrhoeae, biasanya menyebabkan servisitis.', analysis: 'TIDAK SESUAI. Gonore umumnya menghasilkan duh purulen (seperti nanah) dari serviks, bukan keputihan homogen dari vagina. Temuan mikroskopisnya adalah diplokokus gram-negatif.' },
                { id: 'candidiasis-vaginalis', name: 'Kandidosis Vaginalis', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-pink-200"><div class="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-3xl">🧀</div></div>`, description: 'Infeksi jamur (biasanya Candida albicans) yang menyebabkan gatal hebat.', analysis: 'CUKUP SESUAI KARENA ADA GATAL. Namun, duh yang khas (kental seperti keju) dan ketiadaan bau amis membuat diagnosis ini kurang mungkin dibandingkan Bakterial Vaginosis.' },
                { id: 'syphilis', name: 'Sifilis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Infeksi menular seksual oleh bakteri Treponema pallidum.', analysis: 'TIDAK SESUAI. Sifilis primer ditandai dengan lesi ulkus (chancre) yang tidak nyeri, bukan keluhan keputihan seperti pada kasus ini.' }
            ],
            quiz: [
                { question: "Apa temuan kunci pada pemeriksaan mikroskopis yang mendukung diagnosis Bakterial Vaginosis?", options: ["Pseudohifa jamur", "Sel epitel dikerumuni bakteri (Clue Cell)", "Protozoa berflagel yang bergerak", "Diplokokus gram-negatif intraseluler"], answer: "Sel epitel dikerumuni bakteri (Clue Cell)" },
                { question: "Karakteristik keputihan yang paling khas untuk Bakterial Vaginosis adalah...", options: ["Kental, putih seperti keju, dan gatal hebat", "Berbusa, berwarna kuning kehijauan", "Encer, homogen, putih keabuan dengan bau amis", "Lendir bening dan elastis saat ovulasi"], answer: "Encer, homogen, putih keabuan dengan bau amis" },
                { question: "Faktor risiko yang disebutkan pada pasien yang dapat mengganggu flora normal vagina adalah...", options: ["Usia 24 tahun", "Keluhan selama 2 hari", "Sering mencuci kemaluan dengan sabun", "Adanya rasa gatal"], answer: "Sering mencuci kemaluan dengan sabun" },
                { question: "Bau amis (fishy odor) pada Bakterial Vaginosis disebabkan oleh...", options: ["Produksi asam laktat oleh Lactobacillus", "Pelepasan amina oleh bakteri anaerob", "Pertumbuhan jamur Candida", "Adanya parasit Trichomonas"], answer: "Pelepasan amina oleh bakteri anaerob" },
                { question: "Manakah dari kondisi berikut yang paling khas ditandai dengan rasa gatal hebat dan duh tubuh seperti keju cottage?", options: ["Bakterial Vaginosis", "Trikomoniasis", "Kandidosis Vaginalis", "Gonore"], answer: "Kandidosis Vaginalis" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
