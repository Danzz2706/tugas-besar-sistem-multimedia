import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

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
}

export const GenericQuiz = ({ quizTitle, questions, onClose, onComplete }: GenericQuizProps) => {
    const { saveQuizResult } = useStore();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;

        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        if (optionIndex === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            // Quiz finished
            saveQuizResult({
                quizTitle: quizTitle,
                score: score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0),
                maxScore: questions.length
            });
            setShowResult(true);
            if (onComplete) onComplete();
        }
    };

    if (showResult) {
        return (
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-sm border border-gray-200 dark:border-neutral-700 text-center animate-in zoom-in-95 duration-200">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Hasil Kuis</h2>
                <div className="text-6xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                    {score} / {questions.length}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    {score === questions.length
                        ? "Sempurna! Kamu memahami materi ini dengan sangat baik! 🌟"
                        : score > questions.length / 2
                            ? "Bagus! Terus tingkatkan belajarmu. 🚀"
                            : "Jangan menyerah, coba pelajari materi lagi ya. 💪"}
                </p>
                <div className="flex justify-center gap-4">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            Tutup
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setScore(0);
                            setCurrentQuestion(0);
                            setShowResult(false);
                            setSelectedAnswer(null);
                            setIsAnswered(false);
                        }}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" /> Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-sm border border-gray-200 dark:border-neutral-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">{quizTitle}</h2>
                <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                    Soal {currentQuestion + 1} / {questions.length}
                </span>
            </div>

            <p className="text-lg mb-8 dark:text-gray-200 font-medium">{questions[currentQuestion].question}</p>

            <div className="grid gap-3 mb-8">
                {questions[currentQuestion].options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl text-left transition-all border-2 relative ${isAnswered
                            ? idx === questions[currentQuestion].correctAnswer
                                ? "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : idx === selectedAnswer
                                    ? "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                    : "border-transparent bg-gray-50 dark:bg-neutral-700/50 text-gray-400 opacity-50"
                            : "border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white"
                            }`}
                    >
                        {option}
                        {isAnswered && idx === questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {isAnswered && idx === selectedAnswer && idx !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">Penjelasan:</p>
                    <p className="text-blue-700 dark:text-blue-200 text-sm">{questions[currentQuestion].explanation}</p>
                </div>
            )}

            <div className="flex justify-end">
                {isAnswered && (
                    <button
                        onClick={nextQuestion}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30"
                    >
                        {currentQuestion < questions.length - 1 ? "Selanjutnya" : "Lihat Hasil"}
                    </button>
                )}
            </div>
        </div>
    );
};
