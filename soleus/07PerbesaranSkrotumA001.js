        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'transiluminasi', name: 'Tes Transiluminasi', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">💡</div></div>`, description: 'Pemeriksaan dengan menyinari skrotum menggunakan sumber cahaya (senter) di ruangan gelap.', analysis: 'SANGAT RELEVAN. Ini adalah tes pilihan pertama yang paling sederhana dan efektif untuk membedakan antara hidrokel (cairan akan meneruskan cahaya) dan hernia atau massa padat (akan menghalangi cahaya).' },
                { id: 'valsalva', name: 'Tes Valsalva', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">😤</div></div>`, description: 'Meminta pasien untuk mengejan atau batuk untuk meningkatkan tekanan intra-abdomen.', analysis: 'KURANG RELEVAN. Meskipun dapat membantu mendiagnosis hernia, tes ini sangat sulit dilakukan secara efektif pada bayi berusia 6 bulan. Ada metode lain yang lebih sederhana dan lebih cocok untuk kelompok usia ini.' },
                { id: 'colok-dubur', name: 'Colok Dubur', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">👉</div></div>`, description: 'Pemeriksaan rektum menggunakan jari untuk menilai struktur di sekitarnya.', analysis: 'KURANG RELEVAN. Bisa digunakan untuk mengevaluasi hernia, namun ini adalah prosedur invasif dan bukan merupakan langkah awal yang dianjurkan untuk kasus pembengkakan skrotum tanpa nyeri pada bayi.' },
                { id: 'phren', name: 'Phren Sign', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">✋</div></div>`, description: 'Mengangkat testis untuk melihat apakah nyeri berkurang atau tidak.', analysis: 'TIDAK RELEVAN. Tes ini digunakan untuk membedakan penyebab nyeri skrotum akut (torsio testis vs epididimitis). Pasien dalam kasus ini tidak menunjukkan tanda-tanda nyeri tekan.' },
                { id: 'spatula', name: 'Tes Spatula', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">👅</div></div>`, description: 'Menyentuh dinding faring posterior dengan spatula.', analysis: 'SANGAT TIDAK RELEVAN. Tes ini digunakan untuk memeriksa refleks muntah dan tidak memiliki kaitan sama sekali dengan keluhan pada genitalia.' }
            ],
            quiz: [
                { question: "Berdasarkan skenario, pemeriksaan paling sederhana dan utama untuk membantu menegakkan diagnosis adalah...", options: ["Tes Valsalva", "Tes Transiluminasi", "Colok Dubur", "Phren Sign"], answer: "Tes Transiluminasi" },
                { question: "Mengapa tes transiluminasi sangat berguna dalam kasus pembesaran skrotum pada bayi?", options: ["Untuk mengukur ukuran testis", "Untuk memeriksa refleks kremaster", "Untuk membedakan antara tumpukan cairan dan massa padat", "Untuk melihat aliran darah ke testis"], answer: "Untuk membedakan antara tumpukan cairan dan massa padat" },
                { question: "Ketiadaan rasa nyeri atau rewel pada bayi dalam kasus ini cenderung menyingkirkan diagnosis...", options: ["Hidrokel", "Hernia Inguinalis tidak terkomplikasi", "Torsio Testis", "Varikokel"], answer: "Torsio Testis" },
                { question: "Jika hasil tes transiluminasi positif (cahaya menembus), diagnosis yang paling mungkin adalah...", options: ["Hernia Inkarserata", "Tumor Testis", "Hidrokel", "Epididimitis"], answer: "Hidrokel" },
                { question: "Mengapa Phren Sign tidak dilakukan pada pasien ini?", options: ["Karena pasien terlalu muda", "Karena tidak ada riwayat trauma", "Karena tidak ada keluhan nyeri tekan pada skrotum", "Karena skrotum terlalu besar"], answer: "Karena tidak ada keluhan nyeri tekan pada skrotum" }
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
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#34d399' : '#fca5a5')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#059669' : '#ef4444')),
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
            if (diagnoses.length > 0) {
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };