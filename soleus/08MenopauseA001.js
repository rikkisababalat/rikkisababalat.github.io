         // Data kasus untuk halaman ini
        const caseData = {
            diagnoses: [
                { id: 'klimakterium', name: 'Klimakterium', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-gray-200"><div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-3xl">🔄</div></div>`, description: 'Istilah umum untuk seluruh periode transisi seorang wanita dari kondisi reproduktif ke non-reproduktif.', analysis: 'SESUAI, TAPI KURANG SPESIFIK. Klimakterium adalah payung besar yang mencakup perimenopause, menopause, dan postmenopause. Meskipun benar, diagnosis yang lebih spesifik lebih bermanfaat secara klinis.' },
                { id: 'perimenopause', name: 'Perimenopause', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">📊</div></div>`, description: 'Fase sebelum menopause yang ditandai dengan menstruasi tidak teratur akibat fluktuasi hormon.', analysis: 'KURANG SESUAI. Pasien telah berhenti haid selama 12 bulan penuh, yang menandakan ia telah melewati fase perimenopause dan sudah mencapai menopause.' },
                { id: 'menopause', name: 'Menopause', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-pink-200"><div class="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-3xl">👩‍🦳</div></div>`, description: 'Berhentinya menstruasi secara permanen, didiagnosis setelah 12 bulan berturut-turut tanpa haid.', analysis: 'SANGAT SESUAI. Pasien memenuhi kriteria waktu (amenorrhea 12 bulan) dan menunjukkan gejala klasik defisiensi estrogen (vasomotor, genitourinari, psikologis). Ini adalah diagnosis yang paling tepat.' },
                { id: 'post-menopause', name: 'Post-menopause', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🗓️</div></div>`, description: 'Periode waktu yang dimulai setelah seorang wanita melewati menopause (setelah 12 bulan tanpa haid).', analysis: 'CUKUP SESUAI. Pasien memang memasuki fase post-menopause. Namun, "Menopause" adalah diagnosis untuk peristiwa klinis yang sedang terjadi dan menjadi penyebab gejalanya saat ini.' },
                { id: 'amenorrhea-primer', name: 'Amenorrhea Primer', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Kondisi di mana seorang perempuan belum pernah mengalami menstruasi pada usia 15 tahun.', analysis: 'TIDAK SESUAI. Pasien berusia 58 tahun dan sebelumnya memiliki siklus haid. Kondisinya adalah amenorrhea sekunder, bukan primer.' },
            ],
            quiz: [
                { question: "Berapa lama seorang wanita harus tidak mengalami haid untuk dapat didiagnosis menopause?", options: ["3 bulan", "6 bulan", "12 bulan", "24 bulan"], answer: "12 bulan" },
                { question: "Keluhan kemaluan kering dan nyeri lecet pada pasien ini disebabkan oleh atrofi vulvovagina. Kondisi ini terutama akibat penurunan hormon...", options: ["Progesteron", "Estrogen", "Testosteron", "LH (Luteinizing Hormone)"], answer: "Estrogen" },
                { question: "Muka kemerahan yang dialami pasien tergolong dalam kelompok gejala apa?", options: ["Gejala Psikologis", "Gejala Genitourinari", "Gejala Vasomotor", "Gejala Metabolik"], answer: "Gejala Vasomotor" },
                { question: "Mengapa diagnosis 'Perimenopause' kurang tepat untuk kasus ini?", options: ["Karena usianya terlalu tua", "Karena ia tidak mengalami perdarahan", "Karena ia sudah tidak haid selama 12 bulan", "Karena gejalanya terlalu ringan"], answer: "Karena ia sudah tidak haid selama 12 bulan" },
                { question: "Berdasarkan semua data klinis, diagnosis manakah yang paling akurat dan spesifik?", options: ["Klimakterium", "Post-menopause", "Menopause", "Amenorrhea Sekunder"], answer: "Menopause" }
            ]
        };

        const { diagnoses, quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        const quizContainer = document.getElementById('quiz-container');
        let chart = null;
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswer = null;

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
                        if (d.matchScore >= 9) return '#059669'; // Emerald 600
                        if (d.matchScore >= 7) return '#10b981'; // Emerald 500
                        if (d.matchScore >= 4) return '#6ee7b7'; // Emerald 300
                        return '#fecaca'; // Red 200
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#047857'; // Emerald 700
                        if (d.matchScore >= 7) return '#059669'; // Emerald 600
                        if (d.matchScore >= 4) return '#34d399'; // Emerald 400
                        return '#f87171'; // Red 400
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
        
        function loadQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
            
            document.getElementById('quiz-header').classList.remove('hidden');
            document.getElementById('quiz-body').classList.remove('hidden');
            document.getElementById('quiz-footer').classList.remove('hidden');
            document.getElementById('result-container').classList.add('hidden');
            
            loadQuestion();
        }

        function loadQuestion() {
            selectedAnswer = null;
            const currentQuestion = quizData[currentQuestionIndex];
            const quizBody = document.getElementById('quiz-body');
            quizBody.innerHTML = `
                <h2 class="text-xl font-semibold text-slate-800 mb-6">${currentQuestion.question}</h2>
                <div id="options-container" class="space-y-3">
                    ${currentQuestion.options.map(option => `
                        <button class="option-btn w-full text-left p-4 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                            ${option.trim()}
                        </button>
                    `).join('')}
                </div>
            `;
            updateProgress();
            
            const nextBtn = document.getElementById('next-btn');
            nextBtn.disabled = true;

            const optionButtons = quizBody.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    optionButtons.forEach(btn => btn.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    selectedAnswer = e.currentTarget.textContent.trim();
                    nextBtn.disabled = false;
                });
            });
        }
        
        function updateProgress() {
            document.getElementById('question-counter').textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
            const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
            document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
        }

        function showResults() {
            document.getElementById('progress-bar').style.width = '100%';
            document.getElementById('quiz-header').classList.add('hidden');
            document.getElementById('quiz-body').classList.add('hidden');
            document.getElementById('quiz-footer').classList.add('hidden');
            
            const resultContainer = document.getElementById('result-container');
            resultContainer.classList.remove('hidden');

            document.getElementById('score-text').textContent = `${score}/${quizData.length}`;

            const feedbackText = document.getElementById('feedback-text');
            const percentage = (score / quizData.length) * 100;
            if (percentage < 50) {
                feedbackText.textContent = "Mungkin perlu meninjau kembali materinya.";
            } else if (percentage < 80) {
                feedbackText.textContent = "Pemahaman yang baik!";
            } else {
                feedbackText.textContent = "Pemahaman yang luar biasa!";
            }
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