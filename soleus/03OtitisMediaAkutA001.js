        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'oma-oklusi', name: 'OMA Fase Oklusi - Tetes Hidung', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Stadium awal OMA dimana tuba Eustachius tersumbat.', analysis: 'TIDAK TEPAT. Membran timpani yang hiperemis (merah, meradang) menunjukkan proses peradangan aktif, yang merupakan ciri fase presupurasi. Fase oklusi ditandai membran yang retraksi (tertarik ke dalam), bukan hiperemis.' },
                { id: 'oma-presupurasi-ab', name: 'OMA Fase Presupurasi – Antibiotik & Analgetik', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Stadium peradangan awal dengan pembentukan cairan radang.', analysis: 'SANGAT TEPAT. Gejala demam, rewel (menandakan nyeri telinga), dan membran timpani hiperemis adalah gambaran klasik OMA fase presupurasi. Tatalaksana utama adalah mengatasi infeksi dengan antibiotik dan meredakan gejala dengan analgetik.' },
                { id: 'oma-supurasi-miringotomi', name: 'OMA Fase Supurasi - Miringotomi', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">🔪</div></div>`, description: 'Stadium lanjut OMA dengan akumulasi nanah.', analysis: 'TIDAK TEPAT. Fase supurasi ditandai dengan membran timpani yang menonjol (bulging) karena tekanan nanah. Miringotomi (sayatan pada gendang telinga) diindikasikan pada kondisi tersebut, bukan hanya pada membran yang hiperemis.' },
                { id: 'oma-presupurasi-dekongestan', name: 'OMA Fase Presupurasi – Tetes Hidung', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Diagnosis benar, tatalaksana tidak lengkap.', analysis: 'KURANG TEPAT. Meskipun diagnosisnya benar, tatalaksananya tidak adekuat. Tetes hidung dekongestan mungkin bisa membantu fungsi tuba, namun terapi utama untuk mengatasi infeksi bakteri dan gejala sistemik (demam, nyeri) adalah antibiotik dan analgetik sistemik.' },
                { id: 'oma-supurasi-cuci', name: 'OMA Fase Supurasi – Cuci Telinga H2O2', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Diagnosis salah dan tatalaksana berbahaya.', analysis: 'SANGAT TIDAK TEPAT. Diagnosis stadiumnya salah. Selain itu, mencuci telinga dengan H2O2 pada membran timpani yang meradang dan belum pecah tidak ada indikasinya dan dapat bersifat iritatif atau bahkan ototoxic jika terjadi kebocoran mikro.' }
            ],
            quiz: [
                { question: "Gejala manakah pada anak 3 tahun ini yang paling khas menunjukkan adanya nyeri telinga (otalgia)?", options: ["Demam", "Batuk pilek", "Rewel", "Menarik telinga"], answer: "Menarik telinga" },
                { question: "Pemeriksaan fisik utama yang mengarahkan pada diagnosis Otitis Media Akut pada kasus ini adalah...", options: ["Suhu 38,5°C", "Adanya batuk pilek", "Membran timpani hiperemis", "Anak terlihat rewel"], answer: "Membran timpani hiperemis" },
                { question: "Kombinasi demam dan membran timpani hiperemis tanpa penonjolan (bulging) menunjukkan OMA pada fase...", options: ["Oklusi", "Presupurasi", "Supurasi", "Resolusi"], answer: "Presupurasi" },
                { question: "Tatalaksana yang paling tepat dan lengkap untuk OMA fase presupurasi sesuai kasus adalah...", options: ["Hanya analgetik", "Antibiotik dan analgetik", "Miringotomi", "Tetes hidung dekongestan saja"], answer: "Antibiotik dan analgetik" },
                { question: "Mengapa miringotomi (opsi C) bukan pilihan tatalaksana utama pada tahap ini?", options: ["Karena demamnya belum terlalu tinggi", "Karena tidak ada nanah yang terlihat keluar", "Karena membran timpani belum menonjol (bulging)", "Karena usia anak masih 3 tahun"], answer: "Karena membran timpani belum menonjol (bulging)" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan:</h4>
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
                    label: 'Tingkat Ketepatan',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#f87171')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#ef4444')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Ketepatan (0-10)', font: { size: 14 } } },
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