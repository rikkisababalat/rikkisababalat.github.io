        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            // Urutan disesuaikan dengan soal A, B, C, D, E
            diagnoses: [
                { id: 'lanolin', name: 'Oleskan Lanolin', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🧴</div></div>`, description: 'Menggunakan salep lanolin murni (HPA Lanolin) khusus untuk ibu menyusui.', analysis: 'TEPAT, NAMUN SEBAGAI LANGKAH LANJUTAN. Lanolin sangat efektif untuk penyembuhan dan memberikan lapisan pelindung yang kuat. Namun, karena merupakan produk eksternal, sering dianggap sebagai tatalaksana lini kedua jika intervensi alami seperti ASI saja tidak cukup.' },
                { id: 'asi', name: 'Oleskan ASI', matchScore: 9, vizIconHtml: `<div class="viz-icon bg-blue-200"><div class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-3xl">💧</div></div>`, description: 'Mengoleskan beberapa tetes Air Susu Ibu (ASI) ke area puting yang lecet dan membiarkannya kering.', analysis: 'SANGAT TEPAT. Ini adalah tatalaksana paling *awal* dan fundamental. ASI memiliki sifat antibakteri dan penyembuhan alami dari tubuh sendiri. Ini adalah langkah pertama yang paling direkomendasikan karena aman, efektif, dan tanpa biaya.' },
                { id: 'antibiotik', name: 'Antibiotik Gentamisin', matchScore: 1, vizIconHtml: `<div class="viz-icon bg-red-200"><div class="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-3xl">💊</div></div>`, description: 'Menggunakan salep antibiotik topikal seperti gentamisin pada luka.', analysis: 'TIDAK TEPAT. Tidak ada tanda-tanda infeksi pada kasus ini (seperti pus, bengkak, atau demam). Penggunaan antibiotik yang tidak perlu harus dihindari untuk mencegah resistensi.' },
                { id: 'minyak-zaitun', name: 'Oleskan Minyak Zaitun', matchScore: 3, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">🌿</div></div>`, description: 'Menggunakan minyak zaitun sebagai pelembab pada area puting.', analysis: 'KURANG TEPAT. Meskipun pelembab, minyak zaitun tidak menawarkan manfaat penyembuhan spesifik seperti ASI atau lanolin dan beberapa jenis minyak tidak dianjurkan untuk ditelan oleh bayi.' },
                { id: 'stop-latch', name: 'Jangan Biarkan Bayi Latch On', matchScore: 0, vizIconHtml: `<div class="viz-icon bg-slate-200"><div class="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-3xl">🚫</div></div>`, description: 'Menghentikan proses menyusui langsung pada payudara yang sakit.', analysis: 'SANGAT TIDAK TEPAT. Menghentikan menyusui dapat menyebabkan bendungan ASI, mastitis, dan penurunan suplai ASI. Kunci utamanya adalah memperbaiki perlekatan, bukan menghentikannya.' }
            ],
            quiz: [
                { question: "Apa penyebab paling umum dari nyeri dan luka pada puting di awal masa menyusui?", options: ["Infeksi jamur", "Produksi ASI berlebih", "Perlekatan bayi yang tidak tepat", "Alergi sabun"], answer: "Perlekatan bayi yang tidak tepat" },
                { question: "Mengapa antibiotik topikal tidak diindikasikan pada kasus ini?", options: ["Karena harganya mahal", "Karena tidak ada tanda-tanda infeksi", "Karena pasien alergi", "Karena tidak tersedia di apotek"], answer: "Karena tidak ada tanda-tanda infeksi" },
                { question: "Manakah tindakan yang paling krusial untuk mencegah masalah ini berulang?", options: ["Minum lebih banyak air", "Memperbaiki posisi dan perlekatan bayi", "Menggunakan pompa ASI saja", "Memberi suplemen pada bayi"], answer: "Memperbaiki posisi dan perlekatan bayi" },
                { question: "Berdasarkan kasus, manakah tatalaksana paling *awal* dan alami yang dapat dilakukan ibu?", options: ["Mengoleskan madu", "Mengoleskan Lanolin", "Mengoleskan ASI", "Mengompres dengan air hangat"], answer: "Mengoleskan ASI" },
                { question: "Meskipun sangat efektif, mengapa lanolin dapat dianggap sebagai tatalaksana lini kedua dibandingkan ASI?", options: ["Karena harganya mahal", "Karena merupakan produk eksternal, sedangkan ASI adalah sumber daya alami tubuh", "Karena menyebabkan alergi parah", "Karena harus dibilas sebelum menyusui"], answer: "Karena merupakan produk eksternal, sedangkan ASI adalah sumber daya alami tubuh" }
            ]
        };

        // Re-order the diagnoses array to match the original question order (A, B, C, D, E) for display logic
        const displayOrder = ['lanolin', 'asi', 'antibiotik', 'minyak-zaitun', 'stop-latch'];
        const orderedDiagnoses = displayOrder.map(id => caseData.diagnoses.find(d => d.id === id));
        
        const { quiz: quizData } = caseData;
        
        const navContainer = document.getElementById('diagnosis-nav');
        const detailsContainer = document.getElementById('diagnosis-details');
        let chart = null;

        function renderDetails(diagnosisId) {
            const diagnosis = orderedDiagnoses.find(d => d.id === diagnosisId);
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
                        <h4 class="font-semibold text-slate-700">Analisis Kesesuaian dengan Kasus:</h4>
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
            orderedDiagnoses.forEach(diagnosis => {
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
                labels: orderedDiagnoses.map(d => d.name),
                datasets: [{
                    label: 'Tingkat Kesesuaian',
                    data: orderedDiagnoses.map(d => d.matchScore),
                    backgroundColor: orderedDiagnoses.map(d => {
                        if (d.matchScore >= 9) return '#059669'; // a very good match
                        if (d.matchScore >= 7) return '#34d399'; // a good match
                        if (d.matchScore >= 3) return '#facc15'; // a poor match
                        return '#f87171'; // incorrect match
                    }),
                    borderColor: orderedDiagnoses.map(d => {
                         if (d.matchScore >= 9) return '#065f46';
                         if (d.matchScore >= 7) return '#059669';
                         if (d.matchScore >= 3) return '#eab308';
                         return '#ef4444';
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
            const navButtons = document.querySelectorAll('#diagnosis-nav button');
            if (navButtons.length > 0) {
                 navButtons.forEach(btn => btn.classList.add('nav-button-inactive'));
            }
            
            createChart();
            loadQuiz();
        };