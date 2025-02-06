'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Quiz {
  question: string;
  options: {
    id: string;
    value: string;
  }[];
  correctAnswer: string;
}

interface QuizComponentProps {
  quizzes?: Quiz[];
}

const QuizComponent = ({ quizzes = [] }: QuizComponentProps) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [showReport, setShowReport] = useState(false);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className='text-gray-600'>No quiz available for this lesson.</div>
    );
  }

  const currentAnswer = selectedAnswers[currentQuizIndex] || null;
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;
  const allAnswered = selectedAnswers.length === quizzes.length;

  const handleAnswerSelection = (option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuizIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleNavigation = (direction: 'previous' | 'next') => {
    const newIndex =
      direction === 'previous' ? currentQuizIndex - 1 : currentQuizIndex + 1;
    setCurrentQuizIndex(newIndex);
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setShowReport(true);
  };

  const calculateScore = () => {
    return quizzes.reduce((score, quiz, index) => {
      return score + (selectedAnswers[index] === quiz.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showReport) {
    return (
      <Card className='rounded-xl shadow-sm'>
        <CardHeader>
          <CardTitle className='text-lg'>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='text-center'>
              <h3 className='text-2xl font-semibold'>
                Score: {calculateScore()} / {quizzes.length}
              </h3>
              <p className='text-gray-600 mt-2'>
                {calculateScore() === quizzes.length
                  ? 'Perfect score! 🎉'
                  : 'Keep practicing!'}
              </p>
            </div>

            {quizzes.map((quiz, index) => (
              <div key={index} className='space-y-4'>
                <h4 className='font-semibold'>{quiz.question}</h4>
                <div className='space-y-2'>
                  {quiz.options.map((option, optIndex) => {
                    const isCorrect = option.id === quiz.correctAnswer;
                    const isSelected = option.id === selectedAnswers[index];
                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          isCorrect
                            ? 'bg-green-50 border-green-300'
                            : isSelected
                            ? 'bg-red-50 border-red-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {option.value}
                        {isSelected && (
                          <span className='ml-2 text-sm text-gray-500'>
                            {isCorrect ? '✓ Correct' : '✗ Your answer'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg'>
          Question {currentQuizIndex + 1} of {quizzes.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <h3 className='text-lg font-semibold'>
            {quizzes[currentQuizIndex].question}
          </h3>

          <div className='space-y-3'>
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswers[currentQuizIndex] === option.id
                    ? 'bg-primary-100 border-primary-500'
                    : 'bg-gray-100 border-gray-300'
                }`}
                onClick={() => handleAnswerSelection(option.id)}
              >
                {option.value}
              </motion.div>
            ))}
          </div>

          <div className='flex justify-between gap-4'>
            <Button
              variant='outline'
              onClick={() => handleNavigation('previous')}
              disabled={currentQuizIndex === 0}
            >
              Previous
            </Button>

            {isLastQuiz ? (
              <Button onClick={handleSubmit} disabled={!allAnswered}>
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={() => handleNavigation('next')}
                disabled={!selectedAnswers[currentQuizIndex]}
              >
                Next Question
              </Button>
            )}
          </div>

          <div className='text-sm text-gray-600 text-center'>
            Answered {selectedAnswers.filter(Boolean).length} of{' '}
            {quizzes.length} questions
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
