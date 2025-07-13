        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'dosis-10', name: 'Methylprednisolone 10mg/kgBB bolus', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Pemberian bolus Methylprednisolone 10mg/kgBB IV dalam 15 menit.', analysis: 'TIDAK TEPAT. Dosis bolus ini terlalu rendah (subterapeutik) menurut protokol standar NASCIS untuk cedera medula spinalis akut dan tidak akan memberikan manfaat maksimal.' },
                { id: 'dosis-50', name: 'Methylprednisolone 50mg/kgBB bolus', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Pemberian bolus Methylprednisolone 50mg/kgBB IV dalam 15 menit.', analysis: 'TIDAK TEPAT. Dosis bolus ini terlalu tinggi, tidak sesuai dengan pedoman klinis, dan dapat meningkatkan risiko efek samping serius (seperti infeksi atau perdarahan GI) tanpa bukti manfaat tambahan.' },
                { id: 'dosis-30-infus', name: 'Methylprednisolone 30mg/kgBB infus kontinu', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Pemberian Methylprednisolone 30mg/kgBB IV kontinu dalam 45 menit.', analysis: 'TIDAK TEPAT. Dosis 30mg/kgBB adalah dosis untuk bolus awal, bukan untuk infus kontinu. Cara pemberiannya juga keliru; protokol mensyaratkan bolus cepat dalam 15 menit, bukan infus selama 45 menit.' },
                { id: 'dosis-30-bolus', name: 'Methylprednisolone 30mg/kgBB bolus', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Pemberian bolus Methylprednisolone 30mg/kgBB IV dalam 15 menit.', analysis: 'SANGAT TEPAT. Ini adalah dosis bolus awal dan cara pemberian yang direkomendasikan oleh protokol NASCIS II dan III untuk pasien cedera medula spinalis akut yang ditangani dalam 8 jam pertama pasca trauma.' },
                { id: 'dosis-100', name: 'Methylprednisolone 100mg/kgBB bolus', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Pemberian bolus Methylprednisolone 100mg/kgBB IV dalam 15 menit.', analysis: 'TIDAK TEPAT. Dosis ini sangat berlebihan dan berbahaya. Tidak ada bukti klinis yang mendukung penggunaan dosis setinggi ini dan risikonya jauh melebihi potensi manfaatnya.' }
            ],
            quiz: [
                { question: "Berdasarkan temuan klinis (paraplegia, defisit sensorik, riwayat trauma), diagnosis yang paling mungkin pada pasien ini adalah...", options: ["Cedera Medula Spinalis Akut", "Hernia Nukleus Pulposus masif", "Guillain-Barré Syndrome", "Stroke Batang Otak"], answer: "Cedera Medula Spinalis Akut" },
                { question: "Hilangnya refleks patella dan Achilles pada fase akut cedera ini paling tepat dijelaskan oleh kondisi...", options: ["Syok neurogenik", "Kerusakan permanen Lower Motor Neuron", "Syok spinal", "Kelelahan otot"], answer: "Syok spinal" },
                { question: "Apa arti klinis dari ditemukannya refleks Chaddock positif pada pasien ini?", options: ["Ini adalah temuan normal", "Menandakan adanya lesi pada Lower Motor Neuron (LMN)", "Mengkonfirmasi adanya lesi pada Upper Motor Neuron (UMN)", "Menandakan pasien berpura-pura"], answer: "Mengkonfirmasi adanya lesi pada Upper Motor Neuron (UMN)" },
                { question: "Tujuan utama pemberian methylprednisolone dosis tinggi pada kasus ini adalah untuk...", options: ["Menyembuhkan kelumpuhan secara langsung", "Mengurangi nyeri secara cepat", "Mencegah kerusakan sekunder akibat inflamasi dan edema", "Menstabilkan tekanan darah"], answer: "Mencegah kerusakan sekunder akibat inflamasi dan edema" },
                { question: "Sesuai dengan protokol NASCIS, tatalaksana bolus awal yang tepat untuk pasien ini adalah...", options: ["Methylprednisolone 10mg/kgBB IV dalam 15 menit", "Methylprednisolone 30mg/kgBB IV dalam 15 menit", "Methylprednisolone 30mg/kgBB IV dalam 1 jam", "Dexamethasone 10 mg IV bolus"], answer: "Methylprednisolone 30mg/kgBB IV dalam 15 menit" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#f59e0b' : '#ef4444')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 3 ? '#d97706' : '#b91c1c')),
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
            if (diagnoses.length > 0) {
                // Set default view to the correct answer
                renderDetails('dosis-30-bolus');
            }
            createChart();
            loadQuiz();
        };