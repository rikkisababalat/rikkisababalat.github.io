        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'loratadine', name: 'Loratadine 1 x 10 mg', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✈️</div></div>`, description: 'Antihistamin H1 generasi kedua, non-sedatif.', analysis: '<strong>SANGAT TEPAT.</strong> Ini adalah pilihan ideal karena efektif untuk urtikaria dan tidak menyebabkan kantuk (non-sedatif), sehingga aman bagi pasien yang berprofesi sebagai pilot.' },
                { id: 'diphenhidramin', name: 'Diphenhidramin 3 x 50 mg', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">😴</div></div>`, description: 'Antihistamin H1 generasi pertama.', analysis: '<strong>SANGAT TIDAK TEPAT.</strong> Meskipun efektif untuk urtikaria, obat ini memiliki efek sedatif (menyebabkan kantuk) yang kuat. Memberikannya kepada seorang pilot sangat berbahaya dan merupakan kontraindikasi.' },
                { id: 'ctm', name: 'Klorfeniramin maleat 3 x 4 mg', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">😕</div></div>`, description: 'Antihistamin H1 generasi pertama.', analysis: '<strong>TIDAK TEPAT.</strong> Sama seperti Diphenhidramin, CTM adalah antihistamin generasi pertama yang memiliki efek sedatif. Ini bukan pilihan yang aman untuk seorang pilot.' },
                { id: 'promethazine', name: 'Promethazine 3 x 50 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">😵</div></div>`, description: 'Antihistamin H1 generasi pertama dengan efek sedasi sangat kuat.', analysis: '<strong>SANGAT BERBAHAYA.</strong> Promethazine memiliki efek sedatif yang sangat kuat dan tidak boleh diberikan kepada siapa pun yang perlu mengoperasikan mesin atau kendaraan, terutama seorang pilot.' },
                { id: 'deksametason', name: 'Deksametason 3 x 0,5 mg', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Obat golongan kortikosteroid.', analysis: '<strong>KURANG TEPAT SEBAGAI LINI PERTAMA.</strong> Kortikosteroid sistemik bukan pilihan pertama untuk urtikaria akut yang tidak rumit. Antihistamin adalah terapi utama. Steroid dipertimbangkan untuk kasus yang berat atau refrakter.' }
            ],
            quiz: [
                { question: "Apa pertimbangan paling penting dalam memilih obat untuk pasien ini?", options: ["Harga obat", "Efektivitas obat", "Efek samping sedatif", "Kecepatan kerja obat"], answer: "Efek samping sedatif" },
                { question: "Mengapa antihistamin generasi pertama (seperti Diphenhidramin & CTM) dihindari pada kasus ini?", options: ["Karena tidak efektif", "Karena harganya mahal", "Karena menyebabkan kantuk", "Karena harus diminum 3 kali sehari"], answer: "Karena menyebabkan kantuk" },
                { question: "Loratadine termasuk dalam golongan obat apa?", options: ["Kortikosteroid", "Antibiotik", "Antihistamin generasi pertama", "Antihistamin generasi kedua"], answer: "Antihistamin generasi kedua" },
                { question: "Kapan kortikosteroid sistemik seperti Deksametason menjadi pilihan pada kasus urtikaria?", options: ["Sebagai obat pertama untuk semua kasus", "Jika pasien adalah seorang pilot", "Pada kasus yang berat, luas, atau tidak responsif terhadap antihistamin", "Jika gatalnya sangat parah"], answer: "Pada kasus yang berat, luas, atau tidak responsif terhadap antihistamin" },
                { question: "Berdasarkan analisis, tatalaksana manakah yang paling aman dan efektif untuk pilot ini?", options: ["Deksametason 3 x 0,5 mg", "Diphenhidramin 3 x 50 mg", "Loratadine 1 x 10 mg", "Klorfeniramin maleat 3 x 4 mg", "Promethazine 3 x 50 mg"], answer: "Loratadine 1 x 10 mg" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan untuk Kasus:</h4>
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
            // Urutan terbalik untuk tampilan chart yang lebih logis (terbaik di atas)
            const reversedDiagnoses = [...diagnoses].reverse();
            const data = {
                labels: reversedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Ketepatan',
                    data: reversedDiagnoses.map(d => d.matchScore),
                    backgroundColor: reversedDiagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // Hijau tua (Tepat)
                        if (d.matchScore >= 4) return '#f59e0b'; // Kuning (Kurang Tepat)
                        return '#ef4444'; // Merah (Tidak Tepat)
                    }),
                    borderColor: reversedDiagnoses.map(d => {
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
            } else if (percentage < 90) {
                feedback = "Pemahaman yang baik!";
            } else {
                feedback = "Pemahaman yang luar biasa! Anda menguasai konsep ini.";
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
                // Set default view to the best option
                renderDetails('loratadine');
            }
            createChart();
            loadQuiz();
        };
