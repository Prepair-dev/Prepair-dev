import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProviderContext } from '../../contexts/theme-context';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { quizQuestions } from '../../utils/data';

const MCQTest = () => {
  const { theme } = React.useContext(ThemeProviderContext);
  const navigate = useNavigate();

  const [questions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestionIndex)) {
      setMarkedForReview((prev) => [...prev, currentQuestionIndex]);
    }
    handleNext();
  };

  const handleNavClick = (idx) => {
    setCurrentQuestionIndex(idx);
  };

  // Progress summary
  const answeredCount = Object.keys(selectedAnswers).length;
  const markedCount = markedForReview.length;
  const notAttemptedCount = questions.length - answeredCount;

  if (submitted) {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        correct++;
      }
    });

    const score = (correct / questions.length) * 100;
    const scoreColor =
      score >= 80
        ? 'text-green-500'
        : score >= 50
          ? 'text-yellow-500'
          : 'text-red-500';

    return (
      <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Test Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p>Total</p>
              <p className="text-xl font-bold">{questions.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p>Correct</p>
              <p className="text-xl font-bold text-green-600">{correct}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <p>Wrong</p>
              <p className="text-xl font-bold text-red-600">{questions.length - correct}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p>Score</p>
              <p className={`text-xl font-bold ${scoreColor}`}>{score.toFixed(2)}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Answer Review</h3>
            {questions.map((q, idx) => {
              const selected = selectedAnswers[idx];
              const isCorrect = selected === q.correctOption;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}
                >
                  <p className="font-semibold mb-2">{q.question}</p>
                  <p>
                    <strong>Your Answer:</strong>{' '}
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {selected || 'Not Answered'}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{' '}
                      <span className="text-green-600">{q.correctOption}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Button
              onClick={() => navigate('/quiz')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              Back to Quiz Catalog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar */}
      <aside className="w-80 bg-white/10 p-6 flex flex-col justify-between min-h-screen border-r border-gray-200">
        <div>
          <h2 className="text-xl font-bold mb-4">Exam Details</h2>
          <div className="mb-4">
            <p><strong>Subject:</strong> Computer Science</p>
            <p><strong>Duration:</strong> 60 minutes</p>
            <p><strong>Total Questions:</strong> {questions.length}</p>
            <p><strong>Marks per Question:</strong> 2</p>
            <p><strong>Negative Marking:</strong> -0.5</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Question Navigation</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(idx)}
                  className={`w-8 h-8 rounded-full border text-sm font-bold transition-all duration-150
                    ${currentQuestionIndex === idx ? 'bg-blue-600 text-white' :
                      selectedAnswers[idx] ? 'bg-green-200 text-green-800' :
                        markedForReview.includes(idx) ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'}
                  `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="text-xs space-y-1 mt-2">
              <div><span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-1"></span>Current Question</div>
              <div><span className="inline-block w-3 h-3 rounded-full bg-green-200 mr-1 border border-green-800"></span>Answered</div>
              <div><span className="inline-block w-3 h-3 rounded-full bg-yellow-200 mr-1 border border-yellow-800"></span>Marked for Review</div>
              <div><span className="inline-block w-3 h-3 rounded-full bg-gray-200 mr-1 border border-gray-800"></span>Not Attempted</div>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={handleSubmit} className="w-full mb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">Submit Exam</Button>
          <Button variant="outline" className="w-full">Save & Exit</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col justify-between min-h-screen">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded">Multiple Choice</span>
              </div>
            </div>
            {/* Code snippet/diagram area */}
            <div className="mb-4 bg-gray-200/60 rounded p-4 text-center text-gray-500 min-h-[60px]">
              Code snippet or diagram (if applicable)
            </div>
            <div className="mb-6">
              <p className="text-lg font-medium">{currentQuestion.question}</p>
            </div>
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => handleAnswerSelect(opt)}
                  className={`cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 border flex items-center gap-3
                    ${selectedAnswers[currentQuestionIndex] === opt
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-600'
                      : 'bg-white/10 hover:bg-white/20 border-gray-300'}
                  `}
                >
                  <input
                    type="radio"
                    name={`option-${currentQuestionIndex}`}
                    checked={selectedAnswers[currentQuestionIndex] === opt}
                    onChange={() => handleAnswerSelect(opt)}
                    className="accent-blue-600"
                  />
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="gap-2">
                <ChevronLeft size={18} /> Previous
              </Button>
              <Button variant="outline" onClick={handleMarkForReview} className="gap-2">
                Mark for Review
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNext} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600">
                  Save & Next <ChevronRight size={18} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  Submit Test
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* Progress Summary */}
        <div className="max-w-3xl mx-auto w-full mt-4">
          <div className="flex justify-between items-center bg-white/10 p-4 rounded-lg">
            <div>
              <span className="font-semibold">Progress Summary</span>
            </div>
            <div className="flex gap-6 text-sm">
              <span>{answeredCount} Answered</span>
              <span>{markedCount} Marked</span>
              <span>{notAttemptedCount} Not Attempted</span>
              <span>1 Current</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MCQTest;
