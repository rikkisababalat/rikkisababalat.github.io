        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'care-provider', name: 'Care provider', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🩺</div></div>`, description: 'Memberikan pelayanan kesehatan berkualitas, komprehensif, dan berkelanjutan kepada individu.', analysis: 'KURANG SESUAI. Skenario tidak menggambarkan dokter yang sedang melakukan perawatan langsung ke pasien (misalnya, memeriksa atau menyuntik), melainkan sedang dalam tahap perencanaan program untuk komunitas.' },
                { id: 'manager', name: 'Manager', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">💼</div></div>`, description: 'Mampu mengelola sumber daya (manusia, logistik, waktu) secara efisien dalam tim untuk mencapai tujuan program.', analysis: 'SANGAT SESUAI. Tindakan dokter menghitung target sasaran dan mengoordinasikan logistik vaksin adalah contoh langsung dari fungsi perencanaan dan pengelolaan sumber daya, yang merupakan inti dari peran manajer.' },
                { id: 'communicator', name: 'Communicator', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">🗣️</div></div>`, description: 'Mampu berkomunikasi secara efektif dengan pasien, keluarga, kolega, dan masyarakat luas.', analysis: 'CUKUP SESUAI. Dokter memang berkomunikasi dengan juru imunisasi, tetapi ini adalah alat untuk mencapai tujuan manajerial. Fungsi utamanya bukanlah komunikasi itu sendiri, melainkan pengelolaan program yang lebih besar.' },
                { id: 'decision-maker', name: 'Decision maker', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">💡</div></div>`, description: 'Mampu memilih intervensi yang tepat dan efektif berdasarkan bukti ilmiah dan konteks lokal.', analysis: 'SESUAI. Menghitung target adalah suatu bentuk pengambilan keputusan. Namun, peran manajer lebih luas karena mencakup tidak hanya memutuskan, tetapi juga merencanakan dan mengorganisir pelaksanaan keputusan tersebut.' },
                { id: 'community-leader', name: 'Community leader', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🤝</div></div>`, description: 'Mampu mendapatkan kepercayaan dan membimbing masyarakat untuk berpartisipasi dalam meningkatkan derajat kesehatan.', analysis: 'SESUAI. Menjalankan program imunisasi adalah bentuk kepemimpinan di komunitas. Namun, aktivitas spesifik yang dijelaskan (perhitungan & logistik) lebih condong ke aspek manajerial di balik layar daripada interaksi langsung memimpin komunitas.' }
            ],
            quiz: [
                { question: "Dalam skenario ini, tindakan dokter menghitung target dan mengoordinasikan logistik paling tepat menggambarkan perannya sebagai...", options: ["Care provider", "Manager", "Communicator", "Community leader"], answer: "Manager" },
                { question: "Peran dokter sebagai 'Care Provider' lebih berfokus pada...", options: ["Mengelola anggaran Puskesmas", "Memberikan penyuluhan massal", "Melakukan diagnosis dan terapi pada pasien individu", "Memimpin rapat dengan kepala desa"], answer: "Melakukan diagnosis dan terapi pada pasien individu" },
                { question: "Seorang dokter yang mengadakan pertemuan dengan tokoh masyarakat untuk membahas masalah stunting sedang menjalankan peran utamanya sebagai...", options: ["Manager", "Communicator", "Decision maker", "Community leader"], answer: "Community leader" },
                { question: "Kemampuan untuk menjelaskan rencana terapi kepada pasien dengan bahasa yang mudah dimengerti adalah contoh utama dari peran...", options: ["Care provider", "Manager", "Communicator", "Decision maker"], answer: "Communicator" },
                { question: "Mengapa 'Manager' adalah jawaban paling tepat untuk kasus persiapan imunisasi ini?", options: ["Karena dokter adalah atasan juru imunisasi", "Karena dokter bekerja di gedung Puskesmas", "Karena kegiatannya melibatkan perencanaan dan pengelolaan sumber daya program", "Karena imunisasi adalah keputusan pemerintah"], answer: "Karena kegiatannya melibatkan perencanaan dan pengelolaan sumber daya program" }
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
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 6 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 6 ? '#059669' : '#6ee7b7')),
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