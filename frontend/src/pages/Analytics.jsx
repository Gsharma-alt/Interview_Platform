import React, { useState, useEffect } from 'react';
import { UploadCloud, BadgeCheck, HelpCircle, ListOrdered, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Analytics() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: '/analytics' } });
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
    setAnalysis(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    setUploadStatus('Analyzing your resume...');
    setError(null);

    try {
      // Update this URL to match your backend API endpoint
      const API_URL = 'http://localhost:5000/api/resume-upload';
      // If you're using a different port or domain, update accordingly

      // Check if user is authenticated
      if (!isAuthenticated()) {
        throw new Error('You must be logged in to analyze your resume');
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Server responded with status: ${res.status}`);
      }

      // Check if the response has content before trying to parse it
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setAnalysis(data);
        setUploadStatus('Analysis complete!');
      } else {
        throw new Error('Server did not return JSON data');
      }
    } catch (error) {
      console.error('Error during resume analysis:', error);
      setError(error.message);
      setUploadStatus(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Resume Analytics</h1>
          <p className="text-purple-200">Upload your resume to get detailed insights and improve your chances of landing interviews</p>
        </div>

        <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl mb-8">
          <div className="space-y-6">
            <div className="flex flex-col items-center p-8 border-2 border-dashed border-purple-500/50 rounded-xl hover:border-purple-500 transition-colors">
              <UploadCloud className="h-12 w-12 text-purple-400 mb-4" />
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Drop your resume here or click to browse
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
              {file && (
                <p className="mt-2 text-sm text-green-400">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${!file || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <UploadCloud className="h-5 w-5" />
              )}
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>

            {uploadStatus && (
              <p className={`text-sm text-center ${uploadStatus.includes('failed') ? 'text-red-400' : 'text-green-400'
                }`}>
                {uploadStatus}
              </p>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {analysis && (
          <div className="space-y-8">
            {/* ATS Score Card */}
            <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-purple-300 flex items-center gap-2">
                  <BadgeCheck className="h-6 w-6" /> ATS Score
                </h2>
                <div className={`text-4xl font-bold ${analysis.atsScore >= 80 ? 'text-green-400' :
                  analysis.atsScore >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                  {analysis.atsScore}%
                </div>
              </div>
              <p className="text-purple-200">Based on keyword optimization, formatting, and structure analysis</p>
            </div>

            {/* Resume Issues */}
            {analysis.issues && analysis.issues.length > 0 && (
              <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
                <h2 className="text-2xl font-semibold text-purple-300 flex items-center gap-2 mb-6">
                  <AlertCircle className="h-6 w-6" /> Areas for Improvement
                </h2>
                <div className="space-y-4">
                  {analysis.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-800/50 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-400 mt-1" />
                      <div>
                        <p className="text-white font-medium">{issue.title}</p>
                        <p className="text-purple-200 text-sm mt-1">{issue.description}</p>
                        {issue.suggestion && (
                          <p className="text-green-400 text-sm mt-2">
                            Suggestion: {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {analysis.strengths && analysis.strengths.length > 0 && (
              <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
                <h2 className="text-2xl font-semibold text-purple-300 flex items-center gap-2 mb-6">
                  <CheckCircle2 className="h-6 w-6" /> Resume Strengths
                </h2>
                <div className="space-y-4">
                  {analysis.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-800/50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                      <div>
                        <p className="text-white font-medium">{strength.title}</p>
                        <p className="text-purple-200 text-sm mt-1">{strength.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {analysis.questions && analysis.questions.length > 0 && (
              <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
                <h2 className="text-2xl font-semibold text-purple-300 flex items-center gap-2 mb-6">
                  <HelpCircle className="h-6 w-6" /> Potential Interview Questions
                </h2>
                <div className="grid gap-4">
                  {analysis.questions.map((q, idx) => (
                    <div key={idx} className="p-4 bg-indigo-800/50 rounded-lg">
                      <p className="text-white">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
