        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'anterior-cord', name: 'Anterior Cord Syndrome', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl">🚶‍♂️</div></div>`, description: 'Kerusakan pada 2/3 anterior medula spinalis, biasanya karena cedera fleksi atau masalah vaskular.', analysis: 'KURANG SESUAI. Meskipun ada kelemahan motorik, sindrom ini tidak secara khas menyebabkan saddle anesthesia sebagai gejala utamanya. Fungsi propriosepsi (getaran, posisi) seharusnya masih baik.' },
                { id: 'cauda-equina', name: 'Sindrom Kauda Equina', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🔀</div></div>`, description: 'Kompresi pada kumpulan akar saraf (kauda equina) di ujung bawah kanalis spinalis (di bawah L1/L2).', analysis: 'CUKUP SESUAI, NAMUN KURANG TEPAT. Banyak gejala yang tumpang tindih (saddle anesthesia, kelemahan LMN). Namun, gambaran klasik CES adalah defisit yang asimetris. Kelemahan motorik yang simetris pada pasien ini membuat diagnosis Sindrom Konus Medularis lebih mungkin.' },
                { id: 'brown-sequard', name: 'Brown-Séquard Syndrome', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-xl">🌗</div></div>`, description: 'Lesi hemiseksi (separuh bagian) dari medula spinalis.', analysis: 'TIDAK SESUAI. Sindrom ini menyebabkan gejala yang berbeda pada sisi kiri dan kanan tubuh (kelemahan ipsilateral dan kehilangan sensasi nyeri kontralateral). Pasien ini mengalami kelemahan pada kedua sisi (bilateral).' },
                { id: 'conus-medullaris', name: 'Sindrom Konus Medularis', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❗️</div></div>`, description: 'Cedera pada ujung terminal medula spinalis (konus medularis), sekitar vertebra T12-L2.', analysis: 'SANGAT SESUAI. Diagnosis ini paling cocok karena alasan kunci: kelemahan motorik yang terjadi bersifat simetris (kekuatan 2222/2222), yang merupakan ciri khas lesi konus. Adanya saddle anesthesia dan nyeri punggung bawah yang hebat juga konsisten. Meskipun hiporefleksia adalah tanda LMN, lesi pada konus dapat merusak pusat refleks sakral, sehingga menghasilkan gambaran LMN.' },
                { id: 'guillain-barre', name: 'Guillian-Barré Syndrome', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-xl">🦠</div></div>`, description: 'Polineuropati demielinasi inflamasi akut yang dimediasi oleh sistem imun.', analysis: 'TIDAK SESUAI. GBS bukan disebabkan oleh trauma fisik akut. Ini adalah kondisi autoimun, biasanya diawali oleh infeksi. Gejala saddle anesthesia tidak khas untuk GBS.' }
            ],
            quiz: [
                { question: "Apa temuan klinis yang paling spesifik mengarahkan diagnosis ke Sindrom Konus Medularis pada kasus ini?", options: ["Jejas hematoma pada lumbal", "Nyeri punggung hebat", "Kelemahan motorik yang simetris", "Adanya riwayat jatuh"], answer: "Kelemahan motorik yang simetris" },
                { question: "Sindrom Konus Medularis melibatkan cedera pada struktur apa?", options: ["Akar saraf di luar medula spinalis", "Pleksus lumbosakral", "Saraf femoralis", "Ujung terminal dari medula spinalis"], answer: "Ujung terminal dari medula spinalis" },
                { question: "Manakah pernyataan yang paling akurat dalam membedakan Sindrom Konus Medularis (CMS) dari Sindrom Kauda Equina (CES)?", options: ["CMS selalu menyebabkan hiperrefleksia", "CES tidak menyebabkan nyeri", "CMS cenderung simetris, sedangkan CES cenderung asimetris", "Hanya CES yang merupakan keadaan darurat"], answer: "CMS cenderung simetris, sedangkan CES cenderung asimetris" },
                { question: "Mengapa kondisi ini (baik CMS maupun CES) dianggap sebagai kegawatdaruratan bedah saraf?", options: ["Karena tekanan darah tidak stabil", "Risiko infeksi sangat tinggi", "Untuk mencegah defisit neurologis permanen", "Karena menyebabkan demam tinggi"], answer: "Untuk mencegah defisit neurologis permanen" },
                { question: "Berdasarkan analisis yang direvisi, diagnosis apakah yang paling akurat?", options: ["Sindrom Kauda Equina", "Sindrom Konus Medularis", "Anterior Cord Syndrome", "Brown-Séquard Syndrome"], answer: "Sindrom Konus Medularis" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 9 ? '#d91b1b' : (d.matchScore >= 5 ? '#f59e0b' : '#34d399')),
                    borderColor: diagnoses.map(d => d.matchScore >= 9 ? '#b91c1c' : (d.matchScore >= 5 ? '#d97706' : '#059669')),
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };