        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'recall-bias', name: 'Bias Recall', matchScore: 9.5, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🤔</div></div>`, description: 'Kesalahan sistematis akibat perbedaan akurasi atau kelengkapan ingatan responden mengenai peristiwa atau pengalaman masa lalu.', analysis: 'SANGAT MUNGKIN TERJADI. Meminta seseorang mengingat detail konsumsi makanan selama 1 bulan sangat sulit. Ini adalah kelemahan fundamental dari desain penelitian ini. Responden kemungkinan besar akan lupa, salah memperkirakan porsi, atau hanya melaporkan makanan yang paling berkesan, bukan seluruhnya.' },
                { id: 'information-bias', name: 'Bias Informasi', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">ℹ️</div></div>`, description: 'Kategori bias yang luas di mana kesalahan pengukuran atau pengumpulan data menghasilkan informasi yang salah.', analysis: 'BENAR, TAPI KURANG SPESIFIK. Bias Recall adalah salah satu jenis dari Bias Informasi. Meskipun benar bahwa ada potensi bias informasi, istilah "Bias Recall" secara lebih akurat menunjuk pada sumber masalah utama dalam kasus ini.' },
                { id: 'interviewer-bias', name: 'Bias Interviewer', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🗣️</div></div>`, description: 'Bias yang muncul ketika interviewer secara sadar atau tidak sadar memengaruhi respons subjek penelitian.', analysis: 'MUNGKIN TERJADI. Karena peneliti membantu pengisian kuesioner, ada kemungkinan cara bertanya atau memberikan petunjuk dapat memengaruhi jawaban responden. Namun, masalah ingatan (recall) tetap ada bahkan jika kuesioner diisi sendiri, menjadikannya masalah yang lebih fundamental.' },
                { id: 'selection-bias', name: 'Bias Seleksi', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">👥</div></div>`, description: 'Terjadi ketika individu atau kelompok dalam studi berbeda secara sistematis dari populasi target.', analysis: 'TIDAK DAPAT DITENTUKAN. Skenario tidak memberikan detail tentang bagaimana responden dipilih. Masalah utama yang dijelaskan dalam kasus ini berkaitan dengan metode pengumpulan data, bukan proses seleksi responden.' },
                { id: 'gender-bias', name: 'Bias Gender', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-pink-100"><div class="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-3xl">♀️</div></div>`, description: 'Perlakuan yang berbeda atau representasi yang tidak proporsional berdasarkan gender dalam penelitian.', analysis: 'TIDAK RELEVAN. Penelitian ini secara spesifik berfokus pada satu gender (perempuan hamil) untuk tujuan studi yang relevan. Oleh karena itu, bias gender bukanlah isu dalam konteks ini.' }
            ],
            quiz: [
                { question: "Apa metode utama yang digunakan dokter untuk mengumpulkan data diet?", options: ["Observasi langsung", "Food diary harian", "Kuesioner food recall 1 bulan", "Analisis darah"], answer: "Kuesioner food recall 1 bulan" },
                { question: "Kelemahan paling fundamental dari metode yang digunakan dalam studi ini adalah...", options: ["Membutuhkan waktu lama", "Sulitnya responden mengingat masa lalu secara akurat", "Biaya penelitian yang mahal", "Responden tidak jujur"], answer: "Sulitnya responden mengingat masa lalu secara akurat" },
                { question: "Berdasarkan kelemahan tersebut, jenis bias yang paling mungkin terjadi adalah...", options: ["Bias Seleksi", "Bias Recall", "Bias Gender", "Bias Publikasi"], answer: "Bias Recall" },
                { question: "Mengapa 'Bias Seleksi' bukan masalah utama yang dideskripsikan dalam kasus ini?", options: ["Karena semua responden adalah ibu hamil", "Karena rumah sakitnya bagus", "Karena kasus tidak menjelaskan cara pemilihan responden", "Karena peneliti adalah seorang dokter"], answer: "Karena kasus tidak menjelaskan cara pemilihan responden" },
                { question: "Fakta bahwa peneliti membantu responden mengisi kuesioner dapat menimbulkan potensi tambahan berupa...", options: ["Bias Recall", "Bias Seleksi", "Bias Interviewer", "Bias Konfirmasi"], answer: "Bias Interviewer" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Kemungkinan dalam Kasus Ini:</h4>
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
            // Sort diagnoses by matchScore in descending order for display
            const sortedDiagnoses = [...diagnoses].sort((a, b) => b.matchScore - a.matchScore);
            sortedDiagnoses.forEach(diagnosis => {
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
            const sortedData = [...diagnoses].sort((a, b) => a.matchScore - b.matchScore);
            const data = {
                labels: sortedData.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kemungkinan',
                    data: sortedData.map(d => d.matchScore),
                    backgroundColor: sortedData.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: sortedData.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kemungkinan (0-10)', font: { size: 14 } } },
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
