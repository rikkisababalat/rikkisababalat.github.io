        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'dexamethasone', name: 'Dexamethasone Tetes Mata', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-orange-200"><div class="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🔥</div></div>`, description: 'Obat tetes mata golongan kortikosteroid.', analysis: 'TIDAK TEPAT. Steroid digunakan untuk menekan reaksi peradangan (inflamasi), bukan untuk mengatasi perdarahan aktif. Penggunaannya tidak relevan untuk kasus ini.' },
                { id: 'ofloxacin', name: 'Ofloxacin 0,3% topikal', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🦠</div></div>`, description: 'Obat tetes mata golongan antibiotik.', analysis: 'TIDAK TEPAT. Antibiotik digunakan untuk mengobati infeksi bakteri. Pada kasus ini, tidak ditemukan tanda-tanda infeksi seperti belekan (sekret mukopurulen), mata gatal, atau riwayat kontak.' },
                { id: 'timolol', name: 'Timolol 0,5%', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Obat tetes mata untuk menurunkan tekanan bola mata (glaukoma).', analysis: 'SANGAT TIDAK TEPAT. Kondisi pasien tidak berhubungan dengan tekanan intraokular yang tinggi. Pemberian timolol tidak memiliki dasar klinis sama sekali untuk kasus ini.' },
                { id: 'observasi', name: 'Kompres Hangat - Observasi', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🧘</div></div>`, description: 'Pendekatan konservatif dengan edukasi dan pemantauan.', analysis: 'PALING TEPAT. Perdarahan subkonjungtiva adalah kondisi jinak yang dapat sembuh sendiri (self-limiting). Tatalaksana utama adalah reassurance (menenangkan pasien/keluarga) dan observasi. Kompres hangat dapat membantu mempercepat absorpsi darah.' },
                { id: 'mast-cell', name: 'Mast Cell Stabilizer', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🌼</div></div>`, description: 'Obat untuk mencegah reaksi alergi pada mata.', analysis: 'SANGAT TIDAK TEPAT. Gejala dan tanda pada pasien (perdarahan fokal, riwayat batuk) sama sekali tidak mengarah pada konjungtivitis alergi yang biasanya ditandai dengan gatal, mata berair, dan kemerahan difus.' },
            ],
            quiz: [
                { question: "Apa diagnosis yang paling mungkin pada pasien ini?", options: ["Konjungtivitis Bakteri", "Uveitis Anterior", "Perdarahan Subkonjungtiva", "Glaukoma Akut"], answer: "Perdarahan Subkonjungtiva" },
                { question: "Faktor pemicu yang paling mungkin menyebabkan mata merah pada kasus ini adalah...", options: ["Trauma benda tumpul", "Infeksi bakteri", "Batuk kuat", "Alergi debu"], answer: "Batuk kuat" },
                { question: "Mengapa antibiotik topikal (Ofloxacin) tidak diindikasikan pada pasien ini?", options: ["Karena pasien masih anak-anak", "Karena tidak ada tanda-tanda infeksi", "Karena harganya mahal", "Karena menyebabkan alergi"], answer: "Karena tidak ada tanda-tanda infeksi" },
                { question: "Pemeriksaan penting yang menyingkirkan diagnosis bahaya pada kasus ini adalah...", options: ["Pengukuran suhu tubuh", "Visus normal dan COA jernih", "Hitung laju respirasi", "Pemeriksaan tenggorokan"], answer: "Visus normal dan COA jernih" },
                { question: "Tatalaksana yang paling tepat untuk kondisi pasien ini adalah?", options: ["Dexamethasone Tetes Mata", "Ofloxacin 0,3% topikal", "Timolol 0,5%", "Kompres Hangat – Observasi", "Mast Cell Stabilizer"], answer: "Kompres Hangat – Observasi" }
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
            // Urutkan sesuai soal: A, B, C, D, E
            const order = ['dexamethasone', 'ofloxacin', 'timolol', 'observasi', 'mast-cell'];
            const sortedDiagnoses = order.map(id => diagnoses.find(d => d.id === id));

            sortedDiagnoses.forEach(diagnosis => {
                if (!diagnosis) return;
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
            const order = ['dexamethasone', 'ofloxacin', 'timolol', 'observasi', 'mast-cell'];
            const sortedDiagnoses = order.map(id => diagnoses.find(d => d.id === id)).reverse(); // Reverse for y-axis display

            const data = {
                labels: sortedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kecocokan',
                    data: sortedDiagnoses.map(d => d.matchScore),
                    backgroundColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#10b981' : (d.matchScore >= 1 ? '#f87171' : '#cbd5e1')),
                    borderColor: sortedDiagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 1 ? '#dc2626' : '#94a3b8')),
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
            // Urutkan sesuai soal: A, B, C, D, E. Tampilkan D (observasi) dulu.
            if (diagnoses.length > 0) {
                renderDetails('observasi'); 
            }
            createChart();
            loadQuiz();
        };