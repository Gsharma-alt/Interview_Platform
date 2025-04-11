import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageSquare, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function TextInterview() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI("AIzaSyAskR1GqZzlZXYfZO4kmFt37PN9zAAvyPs");
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const prompt = 'Generate 5 interview questions for a software engineer role.';
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setQuestions(responseText.split('\n').filter((q) => q.trim() !== ''));
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmitAnswer = async () => {
    try {
      setLoading(true);
      const prompt = `Evaluate this answer: "${answer}" and provide feedback.`;
      const result = await model.generateContent(prompt);
      setAiResponse(result.response.text());
    } catch (err) {
      setError('Failed to process your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setAiResponse('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswer('');
      setAiResponse('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
          Text Interview Practice
        </h1>
        <p className="text-xl text-purple-200 mb-10">
          Perfect your responses with AI-powered feedback and coaching
        </p>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader className="animate-spin h-12 w-12 text-purple-300" />
            <p className="ml-4 text-purple-300">Loading...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900 bg-opacity-50 text-red-200 p-6 rounded-xl border border-red-700">
            {error}
          </div>
        ) : (
          <>

            {questions.length > 0 && (
              <div className="relative p-1 mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 blur-sm"></div>
                <div className="relative bg-indigo-950 rounded-xl p-8">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h2>
                  <p className="text-purple-100 mb-6">{questions[currentQuestionIndex]}</p>

                  <textarea
                    className="w-full p-4 border border-indigo-700 rounded-lg bg-indigo-900 bg-opacity-50 text-white focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500"
                    rows={5}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                  />

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!answer.trim()}
                    className={`mt-4 px-8 py-4 rounded-full ${answer.trim()
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Submit Answer
                  </button>

                  {aiResponse && (
                    <div className="mt-8 bg-indigo-800 bg-opacity-50 p-6 rounded-xl border border-purple-700">
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">AI Feedback:</h3>
                      <div className="text-purple-100">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`inline-flex items-center px-8 py-4 rounded-full ${currentQuestionIndex > 0
                    ? 'border border-purple-300 bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300'
                    : 'bg-indigo-800 text-indigo-400 cursor-not-allowed opacity-50'
                  }`}
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous Question
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`inline-flex items-center px-8 py-4 rounded-full ${currentQuestionIndex < questions.length - 1
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                    : 'bg-indigo-800 text-indigo-400 cursor-not-allowed opacity-50'
                  }`}
              >
                Next Question
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TextInterview;