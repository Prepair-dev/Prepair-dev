import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, ChevronLeft, Home, Trophy } from 'lucide-react';
import { ThemeProviderContext } from '../../contexts/theme-context';

const getPerformanceEmoji = (percent) => {
    if (percent === 100) return '🏆';
    if (percent >= 80) return '🎉';
    if (percent >= 60) return '👍';
    if (percent >= 40) return '🙂';
    return '😅';
};

const QuizResult = () => {
    const { theme } = React.useContext(ThemeProviderContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { questions, answers } = state;

    const total = questions.length;
    const correct = questions.filter((q, i) => q.correctAnswer === answers[i]).length;
    const percent = Math.round((correct / total) * 100);
    const emoji = getPerformanceEmoji(percent);

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        setTimeout(() => setProgress(percent), 300);
    }, [percent]);

    return (
        <div className={`p-6 max-w-3xl mx-auto animate-fade-in ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Score Progress Bar & Summary */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 mb-4">
                    {/* Circular Progress Bar */}
                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="45"
                            className={theme === 'dark' ? 'stroke-gray-700' : 'stroke-gray-200'}
                            strokeWidth="10" fill="none"
                        />
                        <circle
                            cx="50" cy="50" r="45"
                            className="stroke-blue-500 transition-all duration-700"
                            strokeWidth="10" fill="none"
                            strokeDasharray={2 * Math.PI * 45}
                            strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                            style={{ transition: 'stroke-dashoffset 1s' }}
                        />
                        <text
                            x="50" y="54" textAnchor="middle" fontSize="1.5em"
                            className={theme === 'dark' ? 'fill-blue-400' : 'fill-blue-600'}
                        >
                            {percent}%
                        </text>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-4xl">
                        {percent === 100 ? <Trophy className="w-12 h-12 text-yellow-500" /> : emoji}
                    </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
                <div className="flex gap-6 text-lg">
                    <span>Total: <b>{total}</b></span>
                    <span>Correct: <b className="text-green-500">{correct}</b></span>
                    <span>Score: <b>{correct} / {total}</b></span>
                </div>
            </div>

            {/* Questions Breakdown */}
            <div className="grid gap-6">
                {questions.map((q, i) => {
                    const isCorrect = answers[i] === q.correctAnswer;
                    return (
                        <div
                            key={i}
                            className={`p-6 rounded-xl shadow transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 ${isCorrect ? 'border-green-400' : 'border-red-400'} animate-fade-in`}
                        >
                            <div className="flex items-center mb-2">
                                {isCorrect ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-500 mr-2" />
                                )}
                                <span className="font-semibold text-lg">{q.question}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {q.options.map((opt, idx) => {
                                    const isUserAnswer = answers[i] === opt.id;
                                    const isCorrectAnswer = q.correctAnswer === opt.id;
                                    return (
                                        <div
                                            key={idx}
                                            className={`px-4 py-2 rounded border flex items-center gap-2
                                                ${isCorrectAnswer ? 
                                                    theme === 'dark' ? 
                                                    'border-green-500 bg-green-900/30' : 
                                                    'border-green-500 bg-green-50' : ''}
                                                ${isUserAnswer && !isCorrectAnswer ? 
                                                    theme === 'dark' ? 
                                                    'border-red-400 bg-red-900/20' : 
                                                    'border-red-400 bg-red-50' : ''}
                                                ${isUserAnswer && isCorrectAnswer ? 'ring-2 ring-blue-400' : ''}
                                                ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
                                                transition-all duration-200
                                            `}
                                        >
                                            {isUserAnswer && (
                                                <span className="text-blue-400 font-bold">Your choice</span>
                                            )}
                                            <span>{opt.text}</span>
                                            {isCorrectAnswer && (
                                                <CheckCircle2 className="ml-auto w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {!isCorrect && (
                                <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                                    Correct Answer: <b>{q.options.find(o => o.id === q.correctAnswer)?.text}</b>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-10">
                <button
                    className={`px-6 py-2 rounded-lg shadow transition flex items-center gap-2
                        ${theme === 'dark' ? 
                          'bg-blue-600 hover:bg-blue-700 text-white' : 
                          'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Retake Quiz
                </button>
                <button
                    className={`px-6 py-2 rounded-lg shadow transition flex items-center gap-2
                        ${theme === 'dark' ? 
                          'bg-gray-700 hover:bg-gray-600 text-white' : 
                          'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                    onClick={() => navigate('/dashboard')}
                >
                    <Home className="w-5 h-5" />
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default QuizResult;