        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'terapi-hormonal', name: 'Terapi Hormonal', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Pemberian hormon (seperti hCG) untuk merangsang penurunan testis.', analysis: 'TIDAK SESUAI. Terapi ini hanya memiliki tingkat keberhasilan rendah dan umumnya hanya dipertimbangkan untuk bayi, bukan untuk pasien dewasa berusia 27 tahun. Bukan merupakan tatalaksana definitif.' },
                { id: 'sirkumsisi', name: 'Sirkumsisi', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">✂️</div></div>`, description: 'Prosedur bedah untuk mengangkat kulup (prepusium) penis.', analysis: 'SANGAT TIDAK SESUAI. Sirkumsisi tidak memiliki kaitan apapun dengan penanganan testis yang tidak turun ke dalam skrotum.' },
                { id: 'orkidopeksi', name: 'Orkidopeksi', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Prosedur bedah untuk memindahkan dan memfiksasi testis ke dalam skrotum.', analysis: 'SANGAT SESUAI. Ini adalah tatalaksana definitif dan baku emas untuk kriptorkismus. Tujuannya adalah menempatkan testis pada lingkungan suhu yang tepat dan mempermudah deteksi dini kanker.' },
                { id: 'herniotomi', name: 'Herniotomi', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">🩹</div></div>`, description: 'Operasi untuk memperbaiki defek pada dinding perut (hernia).', analysis: 'KURANG TEPAT. Hernia inguinalis sering menyertai kriptorkismus. Jika ada, herniotomi akan dilakukan bersamaan, tetapi prosedur utamanya untuk testis adalah orkidopeksi. Herniotomi saja tidak menyelesaikan masalah posisi testis.' },
                { id: 'eswl', name: 'ESWL', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">💥</div></div>`, description: 'Terapi gelombang kejut untuk menghancurkan batu (misalnya batu ginjal).', analysis: 'SANGAT TIDAK SESUAI. ESWL adalah prosedur untuk penyakit batu saluran kemih dan tidak ada hubungannya sama sekali dengan kelainan posisi testis.' }
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin untuk kondisi pasien ini?", options: ["Hernia Inguinalis", "Hidrokel", "Varikokel", "Kriptorkismus"], answer: "Kriptorkismus" },
                { question: "Mengapa kondisi ini dapat menyebabkan kesulitan memiliki keturunan (infertilitas)?", options: ["Produksi testosteron terganggu", "Suhu yang lebih tinggi di luar skrotum merusak produksi sperma", "Menyebabkan infeksi berulang", "Ukuran penis menjadi kecil"], answer: "Suhu yang lebih tinggi di luar skrotum merusak produksi sperma" },
                { question: "Selain infertilitas, apa risiko jangka panjang utama dari kriptorkismus yang tidak ditangani?", options: ["Infeksi Saluran Kemih", "Penyakit Prostat", "Keganasan (Kanker) Testis", "Disfungsi Ereksi"], answer: "Keganasan (Kanker) Testis" },
                { question: "Di mana lokasi benjolan (testis) yang teraba pada pasien ini?", options: ["Di dalam perut (abdomen)", "Di kantung skrotum", "Di lipat paha (inguinal)", "Di atas kandung kemih"], answer: "Di lipat paha (inguinal)" },
                { question: "Tindakan bedah untuk memindahkan testis ke dalam skrotum disebut...", options: ["Vasektomi", "Herniotomi", "Orkidopeksi", "Nefrektomi"], answer: "Orkidopeksi" }
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
                        if (d.matchScore >= 9) return '#059669'; // Emerald 700
                        if (d.matchScore >= 4) return '#f59e0b'; // Amber 500
                        return '#ef4444'; // Red 500
                    }),
                    borderColor: diagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46';
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kesesuaian (0-10)', font: { size: 14 } } },
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
                // Set default view to the correct answer
                renderDetails('orkidopeksi');
            }
            createChart();
            loadQuiz();
        };