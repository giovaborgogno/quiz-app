import React, { useState } from 'react';
import questions from './questions.json'; // Importa el JSON con las preguntas

function App() {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerOptionClick = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 overflow-y-auto p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Quiz</h1>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-6">
            <div className="mb-2 text-lg font-semibold">{question.question}</div>
            <div className="flex flex-col">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[questionIndex] === optionIndex;
                const isCorrect = showResults && optionIndex === question.answer;
                const isIncorrect = showResults && isSelected && optionIndex !== question.answer;

                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerOptionClick(questionIndex, optionIndex)}
                    disabled={showResults} // Disable buttons after showing results
                    className={`w-full text-left p-4 border rounded-lg mb-2 
                      ${isSelected ? 'bg-blue-100' : 'bg-white'}
                      ${isCorrect ? 'bg-green-100 border-green-500' : ''}
                      ${isIncorrect ? 'bg-red-100 border-red-500' : ''}
                      hover:bg-blue-50`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {showResults && selectedAnswers[questionIndex] !== question.answer && (
              <div className="mt-2 text-sm text-gray-600">
                Correct answer: {question.options[question.answer]}
              </div>
            )}
          </div>
        ))}

        {!showResults && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600"
          >
            Submit
          </button>
        )}
        {showResults && (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold">You scored {selectedAnswers.filter((answer, index) => answer === questions[index].answer).length} out of {questions.length}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;