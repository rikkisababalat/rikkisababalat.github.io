        // Ganti data di bawah ini untuk setiap halaman kasus yang berbeda
        const caseData = {
            diagnoses: [
                { id: 'ileocaecal', name: 'Ileocaecal', matchScore: 10, vizIconHtml: `<div class="viz-icon bg-emerald-200"><div class="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-3xl">🎯</div></div>`, description: 'Regio pertemuan antara ileum terminal (usus halus akhir) dan sekum (usus besar awal).', analysis: 'SANGAT SESUAI. Ini adalah lokasi yang paling umum (sekitar 45% kasus) untuk permulaan Penyakit Crohn. Gejala klinis dan demografi pasien sangat cocok dengan keterlibatan regio ini.' },
                { id: 'anorektal', name: 'Anorektal', matchScore: 5, vizIconHtml: `<div class="viz-icon bg-yellow-100"><div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-3xl">⚠️</div></div>`, description: 'Area anus dan rektum.', analysis: 'MUNGKIN, TAPI BUKAN YANG UTAMA. Keterlibatan anorektal (seperti fistula atau abses) sering terjadi pada Penyakit Crohn, tetapi jarang menjadi lokasi awal satu-satunya. Biasanya menyertai penyakit di lokasi lain.' },
                { id: 'sekum', name: 'Sekum', matchScore: 8, vizIconHtml: `<div class="viz-icon bg-green-100"><div class="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-3xl">📍</div></div>`, description: 'Bagian awal dari usus besar.', analysis: 'CUKUP SESUAI. Sekum adalah bagian dari regio ileocaecal dan sering terlibat. Namun, istilah "ileocaecal" lebih presisi karena ileum terminalis adalah komponen kunci yang paling sering terkena.' },
                { id: 'apendiks', name: 'Apendiks', matchScore: 2, vizIconHtml: `<div class="viz-icon bg-orange-100"><div class="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center text-3xl">❓</div></div>`, description: 'Struktur seperti kantong yang menempel pada usus besar.', analysis: 'JARANG. Apendiks dapat meradang sebagai bagian dari Penyakit Crohn, tetapi sangat jarang menjadi lokasi primer atau satu-satunya dari penyakit ini.' },
                { id: 'kolon-transversus', name: 'Kolon Transversus', matchScore: 4, vizIconHtml: `<div class="viz-icon bg-blue-100"><div class="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-3xl">↔️</div></div>`, description: 'Bagian tengah dari usus besar.', analysis: 'KURANG UMUM. Keterlibatan kolon saja (Crohn\'s colitis) terjadi pada sekitar 20% kasus, dan biasanya lebih menyebar atau mengenai bagian lain selain hanya kolon transversus sebagai titik awal.' },
            ],
            quiz: [
                { question: "Berdasarkan gejala dan temuan kolonoskopi, diagnosis yang paling mungkin pada pasien ini adalah...", options: ["Kolitis Ulseratif", "Penyakit Crohn", "Irritable Bowel Syndrome (IBS)", "Kanker Kolon"], answer: "Penyakit Crohn" },
                { question: "Temuan 'skip lesions' pada kolonoskopi berarti...", options: ["Peradangan hanya terjadi di rektum", "Area peradangan diselingi oleh jaringan usus yang normal", "Seluruh lapisan usus meradang secara terus menerus", "Adanya polip jinak di sepanjang usus"], answer: "Area peradangan diselingi oleh jaringan usus yang normal" },
                { question: "Lokasi anatomis manakah yang paling sering menjadi titik awal Penyakit Crohn?", options: ["Anorektal", "Kolon desendens", "Ileocaecal", "Lambung"], answer: "Ileocaecal" },
                { question: "Mengapa penurunan berat badan terjadi pada pasien ini meskipun pola makannya normal?", options: ["Pasien diam-diam melakukan diet ketat", "Malabsorpsi nutrisi akibat peradangan usus", "Efek samping obat diare", "Infeksi cacing pita"], answer: "Malabsorpsi nutrisi akibat peradangan usus" },
                { question: "Gambaran 'cobblestone' pada mukosa usus disebabkan oleh...", options: ["Penumpukan sisa makanan yang tidak tercerna", "Pertumbuhan jamur pada dinding usus", "Ulkus-ulkus dalam yang linear dan transversal", "Penebalan otot dinding usus"], answer: "Ulkus-ulkus dalam yang linear dan transversal" }
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
                    label: 'Tingkat Kemungkinan',
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
                        x: { beginAtZero: true, max: 10, title: { display: true, text: 'Skor Kemungkinan (0-10)', font: { size: 14 } } },
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