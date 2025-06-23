        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'tt-1-minggu', name: '1 minggu dari sekarang', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Interval waktu 1 minggu antara dosis TT1 dan TT2.', analysis: 'TIDAK TEPAT. Interval 1 minggu terlalu pendek bagi sistem imun untuk membangun respons antibodi yang memadai. Pemberian vaksin terlalu cepat dapat mengurangi efektivitasnya.' },
                { id: 'tt-4-minggu', name: '4 minggu dari sekarang', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✔️</div></div>`, description: 'Interval waktu 4 minggu (1 bulan) antara dosis TT1 dan TT2.', analysis: 'SANGAT TEPAT. Ini adalah jadwal standar yang direkomendasikan oleh Kementerian Kesehatan RI dan WHO untuk ibu hamil. Interval ini memberikan waktu yang cukup untuk respons imun primer sebelum dosis kedua diberikan untuk memperkuat kekebalan.' },
                { id: 'tt-6-minggu', name: '6 minggu dari sekarang', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">👍</div></div>`, description: 'Interval waktu 6 minggu antara dosis TT1 dan TT2.', analysis: 'DAPAT DITERIMA. Rekomendasi menyatakan interval *minimal* 4 minggu. Jadi, 6 minggu masih merupakan jadwal yang valid dan tidak akan mengurangi efektivitas vaksin. Namun, 4 minggu adalah jadwal yang paling umum dipraktikkan.' },
                { id: 'tt-6-bulan', name: '6 bulan dari sekarang', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Interval waktu 6 bulan antara dosis pertama.', analysis: 'TIDAK TEPAT. Interval 6 bulan adalah jadwal yang direkomendasikan untuk dosis TT3 (setelah menerima TT2), bukan untuk TT2. Menunggu terlalu lama untuk dosis kedua akan menunda tercapainya perlindungan yang optimal.' },
                { id: 'tt-1-tahun', name: '1 tahun setelah melahirkan', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Interval waktu hingga setelah persalinan.', analysis: 'TIDAK TEPAT. Tujuan utama imunisasi TT saat hamil adalah untuk mencegah tetanus pada ibu saat persalinan dan pada bayi baru lahir (tetanus neonatorum). Menunda hingga setelah melahirkan akan menghilangkan tujuan proteksi ini.' }
            ],
            quiz: [
                { question: "Berdasarkan kasus, mengapa pasien perlu diberikan imunisasi TT?", options: ["Karena usia pasien 26 tahun", "Karena ini kehamilan pertama", "Karena pasien belum pernah divaksinasi sebelumnya", "Karena usia kehamilan 10 minggu"], answer: "Karena pasien belum pernah divaksinasi sebelumnya" },
                { question: "Apa interval waktu minimal yang direkomendasikan antara suntikan TT1 dan TT2 untuk ibu hamil?", options: ["1 minggu", "2 minggu", "4 minggu", "6 bulan"], answer: "4 minggu" },
                { question: "Pemberian dua dosis vaksin TT selama kehamilan memberikan perlindungan selama...", options: ["1 tahun", "3 tahun", "10 tahun", "Seumur hidup"], answer: "3 tahun" },
                { question: "Apa tujuan utama pemberian imunisasi TT pada ibu hamil?", options: ["Mencegah ibu dari semua jenis infeksi", "Meningkatkan berat badan janin", "Mencegah tetanus pada ibu dan bayi baru lahir", "Mencegah keguguran"], answer: "Mencegah tetanus pada ibu dan bayi baru lahir" },
                { question: "Jika seorang ibu hamil lupa jadwal suntik TT2 di minggu ke-4, apa yang sebaiknya dilakukan?", options: ["Mengulang suntik TT1 dari awal", "Tidak perlu suntik lagi", "Segera melakukan suntik TT2 sesegera mungkin", "Menunggu hingga kehamilan berikutnya"], answer: "Segera melakukan suntik TT2 sesegera mungkin" }
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
                renderDetails(diagnoses[1].id); // Set default view to the correct answer
            }
            createChart();
            loadQuiz();
        };