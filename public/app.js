class MultiplicationPractice {
    constructor() {
        this.currentPage = 'main';
        this.problems = [];
        this.currentProblemIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.timerInterval = null;
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.elements = {
            mainPage: document.getElementById('main-page'),
            quizPage: document.getElementById('quiz-page'),
            summaryPage: document.getElementById('summary-page'),
            startTableSelect: document.getElementById('start-table'),
            endTableSelect: document.getElementById('end-table'),
            startQuizBtn: document.getElementById('start-quiz-btn'),
            timer: document.getElementById('timer'),
            currentQuestion: document.getElementById('current-question'),
            problemText: document.getElementById('problem-text'),
            answerInput: document.getElementById('answer-input'),
            submitAnswerBtn: document.getElementById('submit-answer-btn'),
            totalTime: document.getElementById('total-time'),
            correctCount: document.getElementById('correct-count'),
            incorrectCount: document.getElementById('incorrect-count'),
            scorePercentage: document.getElementById('score-percentage'),
            performanceMessage: document.getElementById('performance-message'),
            restartQuizBtn: document.getElementById('restart-quiz-btn'),
            backToMainBtn: document.getElementById('back-to-main-btn')
        };
    }

    attachEventListeners() {
        this.elements.startQuizBtn.addEventListener('click', () => this.startQuiz());
        this.elements.submitAnswerBtn.addEventListener('click', () => this.submitAnswer());
        this.elements.restartQuizBtn.addEventListener('click', () => this.restartQuiz());
        this.elements.backToMainBtn.addEventListener('click', () => this.backToMain());
        
        this.elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });

        this.elements.startTableSelect.addEventListener('change', () => this.validateTableSelection());
        this.elements.endTableSelect.addEventListener('change', () => this.validateTableSelection());
    }

    validateTableSelection() {
        const startTable = parseInt(this.elements.startTableSelect.value);
        const endTable = parseInt(this.elements.endTableSelect.value);
        
        if (startTable > endTable) {
            this.elements.endTableSelect.value = startTable;
        }
    }

    generateProblems() {
        const startTable = parseInt(this.elements.startTableSelect.value);
        const endTable = parseInt(this.elements.endTableSelect.value);
        const problems = [];
        
        while (problems.length < 10) {
            const factor1 = Math.floor(Math.random() * (endTable - startTable + 1)) + startTable;
            const factor2 = Math.floor(Math.random() * 10) + 1;
            const problemString = `${factor1} × ${factor2}`;
            
            if (!problems.some(p => p.problem === problemString)) {
                problems.push({
                    problem: problemString,
                    answer: factor1 * factor2
                });
            }
        }
        
        return problems;
    }

    startQuiz() {
        this.problems = this.generateProblems();
        this.currentProblemIndex = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.startTime = Date.now();
        
        this.showPage('quiz');
        this.startTimer();
        this.displayCurrentProblem();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            this.elements.timer.textContent = this.formatTime(elapsed);
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    displayCurrentProblem() {
        const problem = this.problems[this.currentProblemIndex];
        this.elements.problemText.textContent = `${problem.problem} = ?`;
        this.elements.currentQuestion.textContent = this.currentProblemIndex + 1;
        this.elements.answerInput.value = '';
        this.elements.answerInput.focus();
    }

    submitAnswer() {
        const userAnswer = parseInt(this.elements.answerInput.value);
        const correctAnswer = this.problems[this.currentProblemIndex].answer;
        
        if (isNaN(userAnswer)) {
            return;
        }

        const isCorrect = userAnswer === correctAnswer;
        
        if (isCorrect) {
            this.correctAnswers++;
        } else {
            this.incorrectAnswers++;
        }

        this.showFeedback(isCorrect);

        setTimeout(() => {
            this.currentProblemIndex++;
            
            if (this.currentProblemIndex >= this.problems.length) {
                this.endQuiz();
            } else {
                this.displayCurrentProblem();
                this.clearFeedback();
            }
        }, 1000);
    }

    showFeedback(isCorrect) {
        const quizPage = this.elements.quizPage;
        quizPage.classList.add(isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    }

    clearFeedback() {
        const quizPage = this.elements.quizPage;
        quizPage.classList.remove('feedback-correct', 'feedback-incorrect');
    }

    endQuiz() {
        this.endTime = Date.now();
        this.stopTimer();
        this.showSummary();
        this.showPage('summary');
    }

    showSummary() {
        const totalTime = this.endTime - this.startTime;
        const scorePercentage = Math.round((this.correctAnswers / this.problems.length) * 100);
        
        this.elements.totalTime.textContent = this.formatTime(totalTime);
        this.elements.correctCount.textContent = this.correctAnswers;
        this.elements.incorrectCount.textContent = this.incorrectAnswers;
        this.elements.scorePercentage.textContent = `${scorePercentage}%`;
        
        const performanceMessage = this.elements.performanceMessage;
        if (scorePercentage >= 70) {
            performanceMessage.textContent = 'Great job! You did excellent!';
            performanceMessage.className = 'performance-message success';
        } else {
            performanceMessage.textContent = 'Keep practicing to improve your score!';
            performanceMessage.className = 'performance-message needs-improvement';
        }
    }

    restartQuiz() {
        this.startQuiz();
    }

    backToMain() {
        this.showPage('main');
        this.stopTimer();
    }

    showPage(pageName) {
        this.elements.mainPage.classList.remove('active');
        this.elements.quizPage.classList.remove('active');
        this.elements.summaryPage.classList.remove('active');
        
        this.elements[`${pageName}Page`].classList.add('active');
        this.currentPage = pageName;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MultiplicationPractice();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}