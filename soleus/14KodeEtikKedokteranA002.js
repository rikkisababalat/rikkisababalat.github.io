        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { 
                    id: 'kemandirian-profesi', 
                    name: 'Kebebasan dan kemandirian profesi', 
                    matchScore: 10, 
                    vizIconHtml: `<div class="viz-icon bg-yellow-200"><div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">⚖️</div></div>`, 
                    description: 'Prinsip bahwa dokter harus bebas dari intervensi luar yang dapat memengaruhi penilaian klinis dan profesionalisme.', 
                    analysis: 'SANGAT SESUAI. Ini adalah akar masalahnya. Menerima gratifikasi (hadiah) dari perusahaan farmasi secara langsung mengorbankan independensi dokter. Keputusan meresepkan obat menjadi bias karena adanya "imbalan", bukan murni berdasarkan kebutuhan pasien.' 
                },
                { 
                    id: 'kepentingan-masyarakat', 
                    name: 'Kepentingan masyarakat & pelayanan', 
                    matchScore: 7, 
                    vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">🤝</div></div>`, 
                    description: 'Prinsip bahwa dokter harus selalu mengutamakan kepentingan pasien dan masyarakat dalam setiap aspek pelayanan kesehatan.', 
                    analysis: 'CUKUP SESUAI. Pelanggaran ini adalah dampak langsung dari hilangnya kemandirian. Ketika dokter tidak lagi mandiri, ia mungkin tidak lagi memilih obat yang paling efektif atau paling terjangkau (cost-effective) untuk pasien, sehingga merugikan kepentingan pasien/masyarakat.' 
                },
                { 
                    id: 'iptek', 
                    name: 'Mengikuti perkembangan iptek', 
                    matchScore: 2, 
                    vizIconHtml: `<div class="viz-icon bg-green-200"><div class="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-3xl">📚</div></div>`, 
                    description: 'Kewajiban dokter untuk terus memperbarui ilmu pengetahuan dan teknologi kedokteran.', 
                    analysis: 'TIDAK SESUAI. Meskipun tawarannya adalah seminar, konteksnya adalah gratifikasi. Menjadikan seminar sebagai alat untuk mempromosikan obat secara tidak etis justru mencemari tujuan luhur dari pengembangan IPTEK. Pelanggaran utamanya bukan tentang ikut atau tidaknya seminar.' 
                },
                 { 
                    id: 'membuka-rahasia', 
                    name: 'Membuka rahasia jabatan', 
                    matchScore: 1, 
                    vizIconHtml: `<div class="viz-icon bg-purple-200"><div class="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-3xl">🤫</div></div>`, 
                    description: 'Kewajiban untuk menjaga kerahasiaan informasi yang diperoleh karena jabatannya, terutama data medis pasien.', 
                    analysis: 'TIDAK RELEVAN. Kasus ini sama sekali tidak menyinggung tentang pembocoran informasi rahasia apapun. Fokusnya adalah pada proses pengambilan keputusan dalam peresepan obat.' 
                },
                { 
                    id: 'pengobatan-belum-diuji', 
                    name: 'Pengobatan yang belum diuji', 
                    matchScore: 1, 
                    vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">🧪</div></div>`, 
                    description: 'Larangan menggunakan metode atau obat yang belum terbukti secara ilmiah keamanan dan kemanjurannya.', 
                    analysis: 'TIDAK RELEVAN. Kasus menyebutkan "perusahaan obat ternama", yang menyiratkan bahwa produknya sudah teruji dan memiliki izin edar. Isunya adalah etika promosi, bukan keamanan produk.' 
                },
            ],
            quiz: [
                { question: "Apa isu etika sentral yang digambarkan dalam kasus ini?", options: ["Kesalahan medis", "Kerahasiaan pasien", "Gratifikasi dan konflik kepentingan", "Penelitian ilegal"], answer: "Gratifikasi dan konflik kepentingan" },
                { question: "Menerima tawaran dari medical representative secara langsung mengkompromikan prinsip...", options: ["Kebebasan dan kemandirian profesi", "Membuka rahasia jabatan", "Mengikuti perkembangan iptek", "Kepentingan masyarakat"], answer: "Kebebasan dan kemandirian profesi" },
                { question: "Praktik menerima imbalan sebagai ganti peresepan obat tertentu menciptakan sebuah...", options: ["Simbiosis mutualisme", "Pengembangan profesional", "Konflik kepentingan", "Prosedur standar"], answer: "Konflik kepentingan" },
                { question: "Mengapa tindakan ini berpotensi merugikan 'kepentingan masyarakat'?", options: ["Karena dokter akan sering liburan", "Karena seminar membuat dokter lelah", "Karena pilihan obat mungkin tidak lagi berbasis kebutuhan & efisiensi biaya pasien", "Karena perusahaan farmasi akan untung besar"], answer: "Karena pilihan obat mungkin tidak lagi berbasis kebutuhan & efisiensi biaya pasien" },
                { question: "Apa tindakan yang paling etis dan profesional bagi dokter dalam situasi ini?", options: ["Menerima tawaran secara diam-diam", "Menerima tawaran tapi hanya ikut seminarnya", "Menolak tawaran secara sopan dan menjaga independensi", "Melaporkan medical representative ke polisi"], answer: "Menolak tawaran secara sopan dan menjaga independensi" }
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
                        <h4 class="font-semibold text-slate-700">Analisis Relevansi dengan Kasus:</h4>
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
                    label: 'Tingkat Relevansi',
                    data: diagnoses.map(d => d.matchScore),
                    backgroundColor: diagnoses.map(d => d.matchScore >= 8 ? '#059669' : (d.matchScore >= 4 ? '#34d399' : '#a7f3d0')),
                    borderColor: diagnoses.map(d => d.matchScore >= 8 ? '#065f46' : (d.matchScore >= 4 ? '#059669' : '#6ee7b7')),
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Relevansi (0-10)', font: { size: 14 } } },
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
                // Set the default view to the highest-scored (most relevant) option
                const defaultId = diagnoses.sort((a, b) => b.matchScore - a.matchScore)[0].id;
                renderDetails(defaultId);
            }
            createChart();
            loadQuiz();
        };