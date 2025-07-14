        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'kista-sebasea', name: 'Kista Sebasea', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl">✔️</div></div>`, description: 'Kista jinak akibat sumbatan kelenjar sebasea (minyak). Istilah lama untuk kista epidermoid.', analysis: 'SANGAT SESUAI. Istilah "kista sebasea" dan "kista ateroma" merujuk pada kondisi yang sama, yaitu kista epidermoid. Gambaran klinis pasien sangat cocok dengan diagnosis ini.' },
                { id: 'kista-ateroma', name: 'Kista Ateroma', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl">✔️</div></div>`, description: 'Sinonim untuk kista epidermoid, berisi keratin, dan sering memiliki punctum sentral.', analysis: 'SANGAT SESUAI. Ini adalah nama lain yang sangat umum untuk diagnosis yang paling mungkin. Adanya punctum adalah kunci.' },
                { id: 'kista-epidermoid', name: 'Kista Epidermoid', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-xl">✔️</div></div>`, description: 'Kista jinak berasal dari folikel rambut, berisi keratin. Ini adalah terminologi medis yang paling tepat saat ini.', analysis: 'SANGAT SESUAI. Ini adalah diagnosis yang paling akurat. Tumbuh lambat, adanya punctum, dan riwayat trauma semuanya mendukung diagnosis ini.' },
                { id: 'kista-dermoid', name: 'Kista Dermoid', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-xl">❌</div></div>`, description: 'Kista kongenital (bawaan) yang berisi elemen kulit seperti rambut atau kelenjar.', analysis: 'TIDAK SESUAI. Diagnosis ini paling tidak mungkin. Kista dermoid bersifat bawaan lahir dan secara karakteristik TIDAK memiliki punctum. Punctum yang ada pada pasien hampir menyingkirkan diagnosis ini.' },
                { id: 'massa-jinak', name: 'Massa Jaringan Lunak Jinak', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl">🧐</div></div>`, description: 'Kategori deskriptif umum untuk setiap tumor non-kanker di jaringan lunak.', analysis: 'SESUAI, TAPI TIDAK SPESIFIK. Benjolan pada pasien ini memang merupakan massa jaringan lunak jinak. Namun, ini adalah deskripsi, bukan diagnosis akhir. Kista epidermoid adalah salah satu jenisnya.' }
            ],
            quiz: [
                { question: "Apa temuan kunci pada pemeriksaan fisik yang paling mengarahkan diagnosis ke kista epidermoid/ateroma?", options: ["Ukuran 6x4 cm", "Adanya punctum", "Nyeri saat ditekan", "Lokasi di punggung"], answer: "Adanya punctum" },
                { question: "Mengapa riwayat trauma relevan dalam kasus pembentukan kista epidermoid?", options: ["Trauma selalu menyebabkan infeksi", "Trauma dapat mengimplantasi sel epidermis ke lapisan lebih dalam", "Semua benjolan disebabkan trauma", "Tidak ada relevansinya"], answer: "Trauma dapat mengimplantasi sel epidermis ke lapisan lebih dalam" },
                { question: "Manakah dari diagnosis berikut yang paling TIDAK MUNGKIN pada pasien ini, terutama karena ketiadaan satu fitur khas?", options: ["Kista ateroma", "Lipoma", "Kista dermoid", "Kista epidermoid"], answer: "Kista dermoid" },
                { question: "\"Punctum\" pada kista ateroma secara esensial adalah...", options: ["Jaringan parut", "Pembuluh darah yang pecah", "Muara folikel rambut yang tersumbat", "Tanda awal keganasan"], answer: "Muara folikel rambut yang tersumbat" },
                { question: "Pasien mengeluh nyeri yang memberat. Kemungkinan penyebab nyeri yang paling umum pada kista ini adalah...", options: ["Perubahan menjadi ganas (kanker)", "Peradangan atau infeksi sekunder", "Tekanan pada saraf tulang belakang", "Alergi terhadap bahan pakaian"], answer: "Peradangan atau infeksi sekunder" }
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
                        if (d.matchScore >= 8) return '#10b981'; // emerald-500
                        if (d.matchScore >= 5) return '#60a5fa'; // blue-400
                        return '#f87171'; // red-400
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 8) return '#059669'; // emerald-700
                        if (d.matchScore >= 5) return '#3b82f6'; // blue-500
                        return '#ef4444'; // red-500
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };