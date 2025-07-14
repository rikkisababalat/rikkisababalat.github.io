        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'd-rektal-5', name: 'Diazepam Rektal 5 mg', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Pemberian Diazepam melalui rektum dengan dosis 5 mg.', analysis: 'KURANG TEPAT. Walaupun obat dan rute pemberian sudah benar sebagai lini pertama, dosis 5 mg direkomendasikan untuk anak dengan berat badan kurang dari 10 kg. Dosis ini subterapetik untuk pasien dengan BB 11 kg.' },
                { id: 'd-iv-10', name: 'Diazepam IV 10 mg', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-100"><div class="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center text-3xl">💉</div></div>`, description: 'Pemberian Diazepam melalui jalur intravena dengan dosis 10 mg.', analysis: 'TIDAK TEPAT. Dosis IV untuk anak adalah 0,3-0,5 mg/kg. Untuk 11 kg, dosisnya hanya sekitar 3,3-5,5 mg. Dosis 10 mg adalah dosis dewasa dan berisiko menyebabkan depresi napas berat. Selain itu, rute rektal lebih cepat dan diutamakan jika akses IV belum terpasang.' },
                { id: 'd-rektal-10', name: 'Diazepam Rektal 10 mg', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">✅</div></div>`, description: 'Pemberian Diazepam melalui rektum dengan dosis 10 mg.', analysis: 'SANGAT TEPAT. Sesuai pedoman tatalaksana kejang demam, dosis diazepam rektal untuk anak dengan berat badan 10 kg atau lebih adalah 10 mg. Ini adalah pilihan lini pertama yang paling tepat untuk menghentikan kejang akut pada pasien ini.' },
                { id: 'f-iv-100', name: 'Fenitoin IV 100 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Pemberian Fenitoin intravena dengan dosis 100 mg.', analysis: 'SANGAT TIDAK TEPAT. Fenitoin adalah obat antikonvulsan lini kedua, hanya digunakan jika kejang berlanjut setelah pemberian diazepam (status epileptikus). Dosis muatan (loading dose) yang benar adalah 15-20 mg/kg (sekitar 165-220 mg untuk pasien ini), sehingga dosis 100 mg juga tidak tepat.' },
                { id: 'f-iv-50', name: 'Fenitoin IV 50 mg', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">❌</div></div>`, description: 'Pemberian Fenitoin intravena dengan dosis 50 mg.', analysis: 'SANGAT TIDAK TEPAT. Sama seperti opsi sebelumnya, Fenitoin bukan pilihan lini pertama dan dosis yang diberikan sangat jauh di bawah dosis terapetik yang direkomendasikan.' }
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin untuk pasien dalam studi kasus ini?", options: ["Epilepsi", "Meningitis", "Kejang Demam Kompleks", "Kejang Demam Sederhana"], answer: "Kejang Demam Sederhana" },
                { question: "Berapa dosis diazepam rektal yang tepat untuk pasien dengan berat badan 11 kg?", options: ["2.5 mg", "5 mg", "7.5 mg", "10 mg"], answer: "10 mg" },
                { question: "Manakah dari berikut ini yang BUKAN merupakan kriteria Kejang Demam Sederhana?", options: ["Kejang bersifat umum (tonik-klonik)", "Terjadi satu kali dalam 24 jam", "Durasi kejang kurang dari 15 menit", "Kejang terjadi tanpa didahului demam"], answer: "Kejang terjadi tanpa didahului demam" },
                { question: "Faktor risiko utama yang memicu kejang pada kasus ini adalah...", options: ["Batuk pilek", "Riwayat imunisasi tidak lengkap", "Usia 17 bulan", "Demam tinggi"], answer: "Demam tinggi" },
                { question: "Mengapa Fenitoin bukan pilihan pertama untuk tatalaksana kejang akut pada pasien ini?", options: ["Karena harganya lebih mahal", "Karena efek sampingnya lebih banyak", "Karena merupakan obat lini kedua setelah benzodiazepine", "Karena hanya tersedia dalam bentuk tablet"], answer: "Karena merupakan obat lini kedua setelah benzodiazepine" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Ketepatan untuk Kasus Ini:</h4>
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
            // Urutan sesuai pilihan A, B, C, D, E
            const orderedDiagnoses = [
                diagnoses.find(d => d.id === 'd-rektal-5'),
                diagnoses.find(d => d.id === 'd-iv-10'),
                diagnoses.find(d => d.id === 'd-rektal-10'),
                diagnoses.find(d => d.id === 'f-iv-100'),
                diagnoses.find(d => d.id === 'f-iv-50')
            ];
            const data = {
                labels: orderedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Ketepatan',
                    data: orderedDiagnoses.map(d => d.matchScore),
                    backgroundColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#34d399' : (d.matchScore >= 3 ? '#fbbf24' : '#f87171')),
                    borderColor: orderedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 3 ? '#d97706' : '#b91c1c')),
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
                feedback = "Pemahaman yang luar biasa! Anda menguasai kasus ini.";
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