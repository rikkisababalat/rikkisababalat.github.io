        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'primer', name: 'Primer', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🛡️</div></div>`, description: 'Tindakan yang bertujuan untuk mencegah penyakit terjadi sebelum seseorang jatuh sakit.', analysis: 'SANGAT SESUAI. Fokus utama pada edukasi masker dan higenitas kepada masyarakat umum (yang mayoritas sehat) adalah tindakan pencegahan agar tidak terinfeksi. Ini adalah definisi inti dari pencegahan primer.' },
                { id: 'sekunder', name: 'Sekunder', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🩺</div></div>`, description: 'Tindakan untuk mendeteksi penyakit sedini mungkin dan menanganinya dengan cepat.', analysis: 'CUKUP SESUAI, NAMUN BUKAN FOKUS UTAMA. Anjuran untuk periksa saat bergejala memang pencegahan sekunder, tetapi ini hanya satu bagian dari program. Sasaran utamanya adalah seluruh populasi, bukan hanya yang sudah sakit.' },
                { id: 'tersier', name: 'Tersier', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">❤️‍🩹</div></div>`, description: 'Tindakan untuk mengurangi dampak penyakit kronis dan membantu rehabilitasi pasien.', analysis: 'TIDAK SESUAI. Kegiatan dalam kasus ini tidak berfokus pada penanganan komplikasi jangka panjang atau rehabilitasi pasien yang sudah mengalami dampak parah dari penyakit.' },
                { id: 'komunitas', name: 'Komunitas', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">🏘️</div></div>`, description: 'Merujuk pada lingkup atau skala target sasaran promosi kesehatan.', analysis: 'TIDAK TEPAT SEBAGAI LEVEL PENCEGAHAN. Meskipun sasarannya adalah komunitas, istilah "Komunitas" menjelaskan "siapa" yang disasar, bukan "tingkat intervensi" apa yang diberikan. Pertanyaan menanyakan tentang tingkat promosi.' },
                { id: 'global', name: 'Global', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-gray-100"><div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-3xl">🌍</div></div>`, description: 'Merujuk pada skala promosi kesehatan yang mencakup seluruh dunia.', analysis: 'TIDAK TEPAT. Ini adalah istilah untuk skala, bukan level pencegahan. Selain itu, lingkup dalam kasus ini adalah kecamatan, bukan global.' }
            ],
            quiz: [
                { question: "Kegiatan edukasi penggunaan masker dan menjaga higenitas tubuh untuk orang sehat termasuk dalam tingkat pencegahan apa?", options: ["Primer", "Sekunder", "Tersier", "Komunitas"], answer: "Primer" },
                { question: "Anjuran untuk segera memeriksakan diri saat timbul gejala batuk dan pilek merupakan contoh dari pencegahan tingkat...?", options: ["Primer", "Sekunder", "Tersier", "Global"], answer: "Sekunder" },
                { question: "Siapakah sasaran utama dari promosi kesehatan dalam skenario ini?", options: ["Hanya pasien yang sakit", "Seluruh warga kecamatan", "Hanya tenaga medis", "Pemerintah daerah"], answer: "Seluruh warga kecamatan" },
                { question: "Mengapa 'Pencegahan Tersier' tidak sesuai untuk kasus ini?", options: ["Karena dilakukan oleh dokter", "Karena sasarannya komunitas", "Karena tujuannya bukan rehabilitasi penyakit kronis", "Karena penyakitnya menular"], answer: "Karena tujuannya bukan rehabilitasi penyakit kronis" },
                { question: "Berdasarkan keseluruhan program yang dijalankan dokter, tingkat promosi kesehatan yang paling dominan adalah...?", options: ["Primer", "Sekunder", "Tersier", "Komunitas"], answer: "Primer" }
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