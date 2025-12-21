import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle, XCircle, RotateCcw, Trophy, Timer, Flame, ArrowRight, AlertCircle, BookOpen } from 'lucide-react';

export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface GenericQuizProps {
    quizTitle: string;
    questions: Question[];
    onClose?: () => void;
    onComplete?: () => void;
    initialResult?: { score: number; maxScore: number };
}

export const GenericQuiz = ({ quizTitle, questions, onClose, onComplete, initialResult }: GenericQuizProps) => {
    const { saveQuizResult } = useStore();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(initialResult?.score || 0);
    const [showResult, setShowResult] = useState(!!initialResult);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Review Mode State
    const [showReview, setShowReview] = useState(false);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

    // Gamification States
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
    const [points, setPoints] = useState(0);

    // Timer Logic
    useEffect(() => {
        if (!isAnswered && !showResult && !showReview && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isAnswered && !showResult && !showReview) {
            // Time's up!
            setIsAnswered(true);
            setStreak(0);
            // Record as unanswered (null) or force a wrong answer state logic if preferred
            // For now we just let them see the answer.
        }
    }, [timeLeft, isAnswered, showResult, showReview]);

    // Reset timer on new question
    useEffect(() => {
        if (!showReview) {
            setTimeLeft(30);
        }
    }, [currentQuestion, showReview]);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered || showReview) return;

        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setStreak((prev) => prev + 1);
            // Calculate points: Base 100 + (Time Left * 10) + (Streak * 20)
            setPoints((prev) => prev + 100 + (timeLeft * 10) + (streak * 20));
        } else {
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        // Record answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = selectedAnswer;
        setUserAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            // Quiz finished
            const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
            saveQuizResult({
                quizTitle: quizTitle,
                score: finalScore,
                maxScore: questions.length
            });
            setShowResult(true);
            if (onComplete) onComplete();
        }
    };

    const handleReviewNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // End of review, go back to result
            setShowReview(false);
            setShowResult(true);
        }
    };

    const handleReviewPrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Start Review Mode
    const startReview = () => {
        setShowResult(false);
        setShowReview(true);
        setCurrentQuestion(0);
    };

    if (showResult) {
        return (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-2xl w-full mx-auto shadow-2xl border border-gray-100 dark:border-neutral-700 text-center animate-in zoom-in-95 duration-500 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="mb-6 relative inline-block">
                    <Trophy className="w-24 h-24 text-yellow-400 mx-auto drop-shadow-lg animate-bounce" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        Selesai!
                    </div>
                </div>

                <h2 className="text-4xl font-black mb-2 dark:text-white tracking-tight">HASIL KUIS</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Kamu telah menyelesaikan {quizTitle}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">Skor Benar</p>
                        <p className="text-3xl font-black text-blue-800 dark:text-blue-200">{score} / {questions.length}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-800">
                        <p className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wider mb-1">Total Poin</p>
                        <p className="text-3xl font-black text-purple-800 dark:text-purple-200">{points}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                    <button
                        onClick={startReview}
                        className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-700 dark:text-white rounded-xl font-bold transition-all shadow-sm"
                    >
                        <BookOpen className="w-5 h-5" /> Lihat Pembahasan
                    </button>

                    <div className="flex gap-3 w-full">
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                            >
                                Tutup
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setScore(0);
                                setPoints(0);
                                setStreak(0);
                                setCurrentQuestion(0);
                                setShowResult(false);
                                setSelectedAnswer(null);
                                setIsAnswered(false);
                                setTimeLeft(30);
                                setUserAnswers([]);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-transform transform active:scale-95 shadow-lg shdaow-blue-500/30"
                        >
                            <RotateCcw className="w-5 h-5" /> Main Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    // In review mode, use the stored answer. Otherwise use current selectedAnswer
    const activeSelectedAnswer = showReview ? userAnswers[currentQuestion] : selectedAnswer;
    const activeIsAnswered = showReview ? true : isAnswered;

    return (
        <div className="max-w-3xl mx-auto w-full">
            {/* Header Stats */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                    {!showReview && (
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-colors ${streak > 1 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-gray-100 text-gray-500'}`}>
                            <Flame className={`w-5 h-5 ${streak > 1 ? 'animate-pulse' : ''}`} />
                            <span>{streak} Streak</span>
                        </div>
                    )}
                    {showReview && (
                        <div className="px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg font-bold">
                            Mode Pembahasan
                        </div>
                    )}
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                        Score: {showReview ? score : points}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-gray-400">
                        {currentQuestion + 1}/{questions.length}
                    </div>
                    {!showReview && (
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold border ${timeLeft < 10 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                            <Timer className="w-4 h-4" />
                            <span>{timeLeft}s</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Question Card */}
            <div className={`bg-white dark:bg-neutral-800 rounded-3xl p-6 md:p-10 shadow-xl border ${showReview ? 'border-purple-200 dark:border-purple-900/50' : 'border-gray-100 dark:border-neutral-700'} relative overflow-hidden transition-all duration-300`}>
                {/* Progress Bar Top */}
                {!showReview && (
                    <div className="absolute top-0 left-0 h-1.5 bg-gray-100 dark:bg-neutral-700 w-full">
                        <div
                            className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${(timeLeft / 30) * 100}%` }}
                        ></div>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">
                        {currentQ.question}
                    </h3>
                </div>

                <div className="grid gap-4">
                    {currentQ.options.map((option, idx) => {
                        const isSelected = activeSelectedAnswer === idx;
                        const isCorrect = idx === currentQ.correctAnswer;
                        const showCorrect = activeIsAnswered && isCorrect;
                        const showWrong = activeIsAnswered && isSelected && !isCorrect;

                        let buttonClass = "bg-gray-50 dark:bg-neutral-700/50 border-gray-200 dark:border-neutral-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"; // Default

                        if (showCorrect) {
                            buttonClass = "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/40 dark:border-green-500 dark:text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] transform scale-[1.02]";
                        } else if (showWrong) {
                            buttonClass = "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/40 dark:border-red-500 dark:text-red-300 opacity-80";
                        } else if (activeIsAnswered && !isCorrect) {
                            buttonClass = "opacity-50"; // Dim others
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={activeIsAnswered}
                                className={`
                                    relative p-5 rounded-2xl text-left font-medium text-lg transition-all duration-200 border-2
                                    ${buttonClass}
                                    ${!activeIsAnswered && "hover:-translate-y-1 hover:shadow-md active:translate-y-0"}
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 animate-in zoom-in spin-in-90 duration-300" />}
                                    {showWrong && <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 animate-in zoom-in duration-300" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Feedback & Next Button */}
                <div className={`mt-8 flex items-center justify-between transition-all duration-500 ${activeIsAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <div className="flex-1">
                        {activeIsAnswered && (
                            <div className="animate-in fade-in slide-in-from-left duration-300">
                                <p className={`font-bold mb-1 ${activeSelectedAnswer === currentQ.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {activeSelectedAnswer === currentQ.correctAnswer ? "Benar! 🎉" : activeSelectedAnswer === null ? "Waktu Habis ⏰" : "Kurang Tepat 😅"}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                                    {currentQ.explanation}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {showReview && currentQuestion > 0 && (
                            <button
                                onClick={handleReviewPrev}
                                className="px-6 py-3 border border-gray-300 dark:border-neutral-600 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all text-gray-600 dark:text-gray-300"
                            >
                                Sebelumnya
                            </button>
                        )}
                        <button
                            onClick={showReview ? handleReviewNext : nextQuestion}
                            className={`ml-4 shrink-0 flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-95`}
                        >
                            {showReview
                                ? (currentQuestion < questions.length - 1 ? 'Lanjut Review' : 'Selesai Review')
                                : (currentQuestion < questions.length - 1 ? 'Lanjut' : 'Lihat Hasil')
                            }
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Time's Up Message - Only in Play Mode */}
                {timeLeft === 0 && !activeIsAnswered && !showReview && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 animate-in fade-in">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Waktu Habis!</h3>
                        <button
                            onClick={() => setIsAnswered(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
                        >
                            Lihat Jawaban
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
