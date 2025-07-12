        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'manager', name: 'Manager', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">💼</div></div>`, description: 'Merencanakan, mengorganisir, dan mengelola sumber daya (manusia, anggaran) untuk mencapai tujuan tertentu.', analysis: 'SANGAT SESUAI. Dokter merancang program, menyusun job description, dan mempertimbangkan biaya serta efisiensi. Ini adalah fungsi inti dari seorang manajer.' },
                { id: 'community-leader', name: 'Community Leader', matchScore: 7, vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">🤝</div></div>`, description: 'Memperoleh kepercayaan masyarakat dan mampu memimpin serta menggerakkan partisipasi komunitas untuk mengatasi masalah kesehatan.', analysis: 'CUKUP SESUAI. Dokter mengidentifikasi masalah komunitas dan memimpin solusinya. Namun, rincian tindakan yang disebutkan lebih spesifik ke arah manajemen.' },
                { id: 'decision-maker', name: 'Decision Maker', matchScore: 6, vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Mampu memilih tindakan terbaik dari berbagai alternatif berdasarkan data dan pertimbangan yang relevan.', analysis: 'SESUAI, TAPI TERLALU UMUM. Semua peran lain melibatkan pengambilan keputusan. Kasus ini menjabarkan proses yang lebih kompleks dari sekadar membuat keputusan, yaitu mengelola sebuah proyek.' },
                { id: 'communicator', name: 'Communicator', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">📣</div></div>`, description: 'Mampu menyampaikan informasi dan edukasi secara efektif kepada individu, keluarga, dan masyarakat.', analysis: 'KURANG FOKUS. Meskipun komunikasi penting untuk mengajak kerja sama, fokus utama dalam narasi kasus adalah pada aspek perencanaan dan pengorganisasian, bukan pada cara komunikasinya.' },
                { id: 'care-provider', name: 'Care Provider', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">👨‍⚕️</div></div>`, description: 'Memberikan pelayanan kesehatan secara langsung, bersifat individual, kuratif, preventif, dan rehabilitatif.', analysis: 'TIDAK SESUAI. Aktivitas dokter dalam kasus ini tidak berfokus pada penanganan pasien secara individual, melainkan pada program kesehatan di tingkat populasi atau komunitas.' }
            ],
            quiz: [
                { question: "Aktivitas mana dalam kasus yang paling kuat menunjukkan peran dokter sebagai 'Manager'?", options: ["Merasa tidak bisa bekerja sendiri", "Merancang program pengadaan air bersih", "Menyusun job description dan mempertimbangkan biaya", "Bekerja sebagai Kepala Puskesmas"], answer: "Menyusun job description dan mempertimbangkan biaya" },
                { question: "Peran 'Five-Star Doctor' yang berfokus pada pelayanan kesehatan langsung ke pasien adalah...", options: ["Communicator", "Care Provider", "Manager", "Community Leader"], answer: "Care Provider" },
                { question: "Mengapa peran 'Community Leader' juga cocok namun bukan yang paling utama dalam deskripsi kasus ini?", options: ["Karena programnya gagal", "Karena tidak ada interaksi dengan masyarakat", "Karena deskripsi kasus lebih detail pada aspek perencanaan & pengorganisasian", "Karena dokter bekerja di Puskesmas"], answer: "Karena deskripsi kasus lebih detail pada aspek perencanaan & pengorganisasian" },
                { question: "Keputusan dokter untuk mengajak pihak lain bekerja sama menunjukkan kesadaran akan pentingnya...", options: ["Hierarki", "Kompetisi", "Kolaborasi", "Otonomi"], answer: "Kolaborasi" },
                { question: "Berdasarkan semua aktivitas yang dilakukan, peran apakah yang paling tepat untuk dokter tersebut dalam konteks 'Five-Star Doctor'?", options: ["Care provider", "Decision maker", "Manager", "Communicator"], answer: "Manager" }
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
                        if (d.matchScore >= 8) return '#059669'; // Sesuai (hijau tua)
                        if (d.matchScore >= 6) return '#34d399'; // Cukup sesuai (hijau)
                        if (d.matchScore >= 4) return '#facc15'; // Kurang sesuai (kuning)
                        return '#f87171'; // Tidak sesuai (merah)
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
                renderDetails(diagnoses[0].id);
            }
            createChart();
            loadQuiz();
        };