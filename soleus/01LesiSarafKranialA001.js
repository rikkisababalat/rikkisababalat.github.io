        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'cn-vii-perifer', name: 'Parese CN VII tipe perifer', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">😟</div></div>`, description: 'Kelumpuhan saraf wajah akibat kerusakan pada saraf itu sendiri (Lower Motor Neuron).', analysis: 'SANGAT SESUAI. Gejala kelumpuhan melibatkan seluruh otot wajah pada satu sisi (dahi, mata, dan mulut), yang merupakan tanda patognomonik dari lesi perifer.' },
                { id: 'cn-vii-sentral', name: 'Parese CN VII tipe sentral', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🧠</div></div>`, description: 'Kelumpuhan wajah akibat kerusakan di otak (Upper Motor Neuron), misalnya karena stroke.', analysis: 'KURANG SESUAI. Pada lesi sentral, otot dahi dan kemampuan mengangkat alis biasanya tidak terganggu (forehead sparing) karena adanya persarafan ganda. Kasus ini menunjukkan kelemahan dahi.' },
                { id: 'cn-v-perifer', name: 'Parese CN V tipe perifer', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🦷</div></div>`, description: 'Gangguan pada saraf trigeminus yang mengatur sensasi wajah dan otot pengunyahan.', analysis: 'TIDAK SESUAI. Saraf ini tidak mengatur otot ekspresi wajah seperti tersenyum atau mengangkat alis. Keluhan pasien murni motorik ekspresi wajah, bukan sensasi atau mengunyah.' },
                { id: 'cn-v-sentral', name: 'Parese CN V tipe sentral', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">💥</div></div>`, description: 'Gangguan sentral pada saraf trigeminus.', analysis: 'TIDAK SESUAI. Sama seperti lesi perifer CN V, ini tidak cocok dengan gejala kelumpuhan otot ekspresi wajah.' },
                { id: 'cn-xii-sentral', name: 'Parese CN XII tipe sentral', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">👅</div></div>`, description: 'Gangguan sentral pada saraf hipoglosus yang mengatur gerakan lidah.', analysis: 'TIDAK SESUAI. Saraf ini mengontrol lidah, bukan otot-otot wajah. Tidak ada keluhan pada lidah yang disebutkan.' },
            ],
            quiz: [
                { question: "Temuan kunci yang membedakan lesi perifer dari lesi sentral pada kasus ini adalah...", options: ["Sudut bibir jatuh", "Wajah tampak miring", "Ketidakmampuan mengerutkan dahi", "Tidak ada riwayat HT"], answer: "Ketidakmampuan mengerutkan dahi" },
                { question: "Saraf kranialis nomor berapakah yang mengalami kelainan pada pasien ini?", options: ["CN V (Trigeminus)", "CN XI (Assesorius)", "CN XII (Hipoglosus)", "CN VII (Fasialis)"], answer: "CN VII (Fasialis)" },
                { question: "Jika pasien MASIH BISA mengangkat alisnya, diagnosis yang lebih mungkin adalah...", options: ["Parese CN VII tipe perifer", "Parese CN VII tipe sentral", "Neuralgia Trigeminal", "Sindrom Ramsay Hunt"], answer: "Parese CN VII tipe sentral" },
                { question: "Kondisi idiopatik (tidak diketahui penyebabnya) dari parese CN VII perifer dikenal sebagai...", options: ["Stroke", "Bell's Palsy", "Miastenia Gravis", "Tumor Otak"], answer: "Bell's Palsy" },
                { question: "Berdasarkan seluruh temuan, mana jawaban yang paling tepat untuk kasus ini?", options: ["Parese CN VII tipe sentral", "Parese CN V tipe perifer", "Parese CN VII tipe perifer", "Parese CN XII tipe sentral"], answer: "Parese CN VII tipe perifer" }
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
                        if (d.matchScore >= 8) return '#059669'; // a deep green
                        if (d.matchScore >= 4) return '#f59e0b'; // a yellow/orange
                        return '#ef4444'; // a red
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };