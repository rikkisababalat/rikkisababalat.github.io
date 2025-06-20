        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'limfangitis', name: 'Limfangitis', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">🩸</div></div>`, description: 'Peradangan pada pembuluh limfe, biasanya karena infeksi bakteri akut.', analysis: 'TIDAK SESUAI. Limfangitis adalah kondisi akut, nyeri, dan sering disertai garis merah di kulit. Kasus ini bersifat kronis (8 bulan), tidak nyeri, dan tidak ada temuan kulit yang dilaporkan.' },
                { id: 'limfadenopati-akut', name: 'Limfadenopati Akut', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">🤒</div></div>`, description: 'Pembengkakan kelenjar getah bening yang terjadi cepat (< 2 minggu), umumnya karena infeksi.', analysis: 'TIDAK SESUAI. Durasi 8 bulan pada pasien ini menunjukkan proses kronis, bukan akut. Selain itu, massa pada limfoma biasanya tidak nyeri, berbeda dengan limfadenopati infeksi akut.' },
                { id: 'limfadenopati-tb', name: 'Limfadenopati TB', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">🫁</div></div>`, description: 'Infeksi tuberkulosis pada kelenjar getah bening (skrofuloderma).', analysis: 'CUKUP SESUAI (Secara Klinis). Limfadenopati TB bisa menyebabkan benjolan leher kronis dan gejala sistemik. Namun, diagnosis ini DISINGKIRKAN oleh hasil biopsi, yang tidak menunjukkan granuloma kaseosa (khas TB) melainkan sel Reed-Sternberg.' },
                { id: 'limfoma-hodgkin', name: 'Limfoma Hodgkin', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 flex items-center justify-center text-3xl">🔬</div></div>`, description: 'Keganasan pada sistem limfatik yang ditandai oleh adanya sel Reed-Sternberg.', analysis: 'SANGAT SESUAI & TERKONFIRMASI. Semua elemen cocok: usia pasien, gejala B (demam, keringat malam, penurunan BB), limfadenopati yang kenyal dan tidak nyeri, serta temuan sel Reed-Sternberg yang patognomonik (memastikan diagnosis).' },
                { id: 'limfoma-non-hodgkin', name: 'Limfoma Non-Hodgkin', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-teal-100"><div class="w-12 h-12 flex items-center justify-center text-3xl">🧬</div></div>`, description: 'Kelompok keganasan limfoid yang beragam, tidak melibatkan sel Reed-Sternberg.', analysis: 'CUKUP SESUAI (Secara Klinis). Gejala LNH bisa sangat mirip dengan Limfoma Hodgkin. Akan tetapi, diagnosis pasti bergantung pada hasil biopsi. Adanya sel Reed-Sternberg secara spesifik mengarahkan diagnosis ke Limfoma Hodgkin, bukan LNH.' }
            ],
            quiz: [
                { question: "Apa temuan paling spesifik dari hasil biopsi pada kasus ini?", options: ["Granuloma kaseosa", "Sel atipikal", "Sel Reed-Sternberg", "Infiltrasi neutrofil"], answer: "Sel Reed-Sternberg" },
                { question: "Kumpulan gejala berupa demam, keringat malam, dan penurunan berat badan yang signifikan dikenal sebagai...", options: ["Sindrom Cushing", "Gejala B", "Sindrom Horner", "Trias Virchow"], answer: "Gejala B" },
                { question: "Manakah karakteristik benjolan pada leher pasien yang paling khas untuk limfoma?", options: ["Sangat nyeri dan merah", "Keras seperti batu dan terfiksir", "Kenyal, mobile, dan tidak nyeri", "Berkembang sangat cepat dalam hitungan hari"], answer: "Kenyal, mobile, dan tidak nyeri" },
                { question: "Mengapa Limfadenopati Tuberkulosis menjadi diagnosis banding yang kuat sebelum hasil biopsi keluar?", options: ["Karena sama-sama disebabkan oleh virus", "Karena presentasi klinis (benjolan leher kronis dan gejala sistemik) bisa sangat mirip", "Karena keduanya selalu menunjukkan sel Reed-Sternberg", "Karena pengobatannya sama"], answer: "Karena presentasi klinis (benjolan leher kronis dan gejala sistemik) bisa sangat mirip" },
                { question: "Berdasarkan analisis kasus secara keseluruhan, diagnosis yang paling tepat adalah...", options: ["Limfangitis", "Limfadenopati Tuberkulosis", "Limfoma Hodgkin", "Limfoma Non-Hodgkin"], answer: "Limfoma Hodgkin" }
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
                        if (d.matchScore >= 9) return '#059669'; // Emerald-600
                        if (d.matchScore >= 7) return '#10b981'; // Emerald-500
                        if (d.matchScore >= 5) return '#34d399'; // Emerald-400
                        if (d.matchScore >= 3) return '#6ee7b7'; // Emerald-300
                        return '#a7f3d0'; // Emerald-200
                    }),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                // Set Limfoma Hodgkin as the default selected view
                const defaultDiagnosis = diagnoses.find(d => d.id === 'limfoma-hodgkin') || diagnoses[0];
                renderDetails(defaultDiagnosis.id);
            }
            createChart();
            loadQuiz();
        };