import React, { useState, useMemo } from 'react';
import mockData from '../../data/mockData';
import './TriviaMode.css';

const TriviaMode = ({ country }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const questions = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_trivia;
    }
    return [];
  }, [country]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (option) => {
    if (answered) return;
    
    setSelectedAnswer(option);
    setAnswered(true);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
    setTotalAnswered(totalAnswered + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setTotalAnswered(0);
  };

  const isCorrect = selectedAnswer === currentQuestion?.answer;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="trivia-mode">
      <h3 className="trivia-title">🧠 Historical Trivia</h3>

      {totalAnswered < questions.length ? (
        <div className="trivia-container">
          {/* Progress bar */}
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <p className="progress-text">
              {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Score */}
          <div className="score-display">
            <p className="score-text">Score: {score}/{totalAnswered > 0 ? totalAnswered : 0}</p>
          </div>

          {/* Question */}
          <div className="trivia-question">
            <h4>{currentQuestion.question}</h4>
          </div>

          {/* Options */}
          <div className="trivia-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === option
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${
                  answered && option === currentQuestion.answer ? 'show-answer' : ''
                } ${answered ? 'disabled' : ''}`}
                onClick={() => handleSelectAnswer(option)}
                disabled={answered}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p className="feedback-title">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="feedback-explanation">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button className="next-btn" onClick={handleNext}>
              {isLastQuestion ? 'See Results' : 'Next Question →'}
            </button>
          )}
        </div>
      ) : (
        <div className="trivia-results">
          <h4>Quiz Complete!</h4>
          <div className="final-score">
            <p className="score-number">{score}</p>
            <p className="score-total">out of {totalAnswered}</p>
          </div>

          <div className="score-percentage">
            <p className={`percentage ${(score / totalAnswered) * 100 >= 70 ? 'excellent' : (score / totalAnswered) * 100 >= 50 ? 'good' : 'improve'}`}>
              {Math.round((score / totalAnswered) * 100)}%
            </p>
          </div>

          <p className="result-message">
            {(score / totalAnswered) * 100 >= 80 && '🏆 Excellent knowledge of history!'}
            {(score / totalAnswered) * 100 >= 60 && (score / totalAnswered) * 100 < 80 && '👍 Good understanding of key events'}
            {(score / totalAnswered) * 100 < 60 && '📚 Learn more to deepen your historical knowledge'}
          </p>

          <button className="restart-btn" onClick={handleRestart}>
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaMode;
