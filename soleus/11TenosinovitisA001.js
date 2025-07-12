
        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'fraktur-schapoid', name: 'Fraktur os schapoid', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">🦴</div></div>`, description: 'Patah pada salah satu tulang kecil di pergelangan tangan (tulang skafoid).', analysis: 'KURANG SESUAI. Diagnosis ini tidak mungkin karena pemeriksaan radiologis (rontgen) tidak menunjukkan adanya kelainan. Fraktur akan terlihat jelas pada rontgen.' },
                { id: 'kontraktur-dupuytren', name: 'Kontraktur Dupuytren', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-purple-100"><div class="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-3xl">✋</div></div>`, description: 'Kondisi yang menyebabkan satu atau lebih jari menekuk ke arah telapak tangan.', analysis: 'SANGAT TIDAK SESUAI. Gejala dan lokasi nyeri pada pasien (sisi radial pergelangan tangan) sama sekali tidak cocok dengan kontraktur Dupuytren yang mengenai telapak tangan dan jari-jari.' },
                { id: 'tenosinovitis-dequervain', name: 'Tenosinovitis de Quervain', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✍️</div></div>`, description: 'Peradangan pada selubung tendon di sisi ibu jari pergelangan tangan.', analysis: 'SANGAT SESUAI. Kombinasi dari nyeri di styloid radius, diperberat aktivitas repetitif (menulis, menggendong), dan uji Finkelstein yang positif adalah gambaran klinis klasik untuk kondisi ini. Rontgen yang normal semakin memperkuat diagnosis.' },
                { id: 'osteoartritis-cmc', name: 'Osteoartritis sendi karpometakarpal', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">👍</div></div>`, description: 'Radang sendi degeneratif pada pangkal ibu jari.', analysis: 'MUNGKIN, TAPI KURANG TEPAT. Lokasi nyeri berdekatan, namun Uji Finkelstein yang positif lebih spesifik untuk masalah tendon (de Quervain) daripada masalah sendi (osteoartritis). Tes provokasi untuk OA CMC adalah grind test.' },
                { id: 'fraktur-styloideus', name: 'Fraktur os styloideus', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">💔</div></div>`, description: 'Patah pada tonjolan tulang di ujung radius (tulang pengumpil).', analysis: 'TIDAK SESUAI. Sama seperti fraktur skafoid, diagnosis ini dikesampingkan oleh hasil pemeriksaan radiologis yang normal.' }
            ],
            quiz: [
                { question: "Temuan pemeriksaan fisik manakah yang paling spesifik untuk diagnosis pada kasus ini?", options: ["Edema pergelangan tangan", "Nyeri tekan pada styloid radius", "Uji Finkelstein (+)", "Keterbatasan gerak"], answer: "Uji Finkelstein (+)" },
                { question: "Aktivitas manakah yang menjadi faktor risiko utama bagi pasien ini?", options: ["Membaca buku", "Menonton televisi", "Menulis novel dengan tangan", "Berjalan kaki"], answer: "Menulis novel dengan tangan" },
                { question: "Mengapa diagnosis fraktur (patah tulang) dapat disingkirkan?", options: ["Karena pasien masih bisa bergerak", "Karena tidak ada riwayat trauma", "Karena hasil pemeriksaan radiologis normal", "Karena pasien seorang perempuan"], answer: "Karena hasil pemeriksaan radiologis normal" },
                { question: "Tenosinovitis de Quervain melibatkan peradangan pada selubung tendon yang mana?", options: ["Fleksor jari", "Ekstensor jari", "Abduktor dan ekstensor ibu jari", "Palmaris longus"], answer: "Abduktor dan ekstensor ibu jari" },
                { question: "Berdasarkan semua temuan klinis, diagnosis apakah yang paling akurat?", options: ["Fraktur os schapoid", "Kontraktur Dupuytren", "Tenosinovitis de Quervain", "Osteoartritis"], answer: "Tenosinovitis de Quervain" }
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
                        if (d.matchScore >= 5) return '#34d399'; // Emerald 400
                        if (d.matchScore >= 3) return '#facc15'; // Yellow 400
                        return '#f87171'; // Red 400
                    }),
                    borderColor: diagnoses.map(d => {
                        if (d.matchScore >= 9) return '#065f46'; // Emerald 900
                        if (d.matchScore >= 5) return '#059669'; // Emerald 700
                        if (d.matchScore >= 3) return '#eab308'; // Yellow 500
                        return '#ef4444'; // Red 500
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
            if (diagnoses.length > 0) {
                // Set the correct diagnosis to be active by default
                renderDetails('tenosinovitis-dequervain');
            }
            createChart();
            loadQuiz();
        };