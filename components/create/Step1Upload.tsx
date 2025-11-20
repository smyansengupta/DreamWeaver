'use client';

import React, { useState, useCallback } from 'react';
import { GameFormData, SketchAnalysis } from '@/types/game';
import SketchAnalysisPreview from './SketchAnalysisPreview';
import SketchAnalysisEditModal from './SketchAnalysisEditModal';

interface Step1UploadProps {
  formData: GameFormData;
  updateFormData: (data: Partial<GameFormData>) => void;
}

export default function Step1Upload({ formData, updateFormData }: Step1UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        processFile(files[0]);
      }
    },
    [updateFormData]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        processFile(files[0]);
      }
    },
    [updateFormData]
  );

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData({
          image: file,
          imagePreview: e.target?.result as string,
          sketchAnalysis: undefined,
          analysisApproved: false,
        });
        // Automatically analyze the sketch after upload
        analyzeSketch(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSketch = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', file);
      formDataToSend.append('subject', formData.subject || '');
      formDataToSend.append('gradeLevel', formData.gradeLevel || '');
      formDataToSend.append('topic', formData.topic || '');

      const response = await fetch('/api/analyze-sketch', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze sketch');
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        updateFormData({
          sketchAnalysis: data.analysis,
          analysisApproved: false,
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing sketch:', error);
      setAnalysisError(
        error instanceof Error ? error.message : 'Failed to analyze sketch. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveImage = () => {
    updateFormData({
      image: undefined,
      imagePreview: undefined,
      sketchAnalysis: undefined,
      analysisApproved: false,
    });
    setAnalysisError(null);
  };

  const handleApproveAnalysis = () => {
    updateFormData({
      analysisApproved: true,
    });
  };

  const handleEditAnalysis = () => {
    setShowEditModal(true);
  };

  const handleSaveEditedAnalysis = (updatedAnalysis: SketchAnalysis) => {
    updateFormData({
      sketchAnalysis: updatedAnalysis,
    });
    setShowEditModal(false);
  };

  const handleAnalyzeAgain = () => {
    if (formData.image) {
      analyzeSketch(formData.image);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-3">
          Upload Your Game Sketch
        </h2>
        <p className="text-lg text-primary-600">
          Draw your game on paper with students, or sketch on a whiteboard!
        </p>
      </div>

      {!formData.imagePreview ? (
        <div
          className={`
            relative border-4 border-dashed rounded-3xl p-12 text-center
            transition-all duration-300 cursor-pointer
            ${
              isDragging
                ? 'border-grass-500 bg-grass-50 scale-105'
                : 'border-primary-300 bg-primary-50 hover:border-primary-400 hover:bg-primary-100'
            }
          `}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileSelect}
          />

          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-primary-400 animate-bounce-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-primary-800 mb-3">
              Drop your image here
            </h3>
            <p className="text-lg text-primary-600 mb-6">or click to browse</p>

            <div className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Choose File
            </div>

            <p className="text-sm text-primary-500 mt-6">
              Accepts PNG, JPG • Max size 10MB
            </p>
          </label>

          {/* Helper examples */}
          <div className="mt-10 pt-8 border-t border-primary-200">
            <p className="text-sm font-semibold text-primary-700 mb-4">
              💡 Try these ideas:
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm text-primary-600">
              <div>📸 Take a photo of whiteboard</div>
              <div>✏️ Scan a paper sketch</div>
              <div>🎨 Upload a digital drawing</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative space-y-6">
          {/* Image preview */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-grass-400">
            <img
              src={formData.imagePreview}
              alt="Game sketch preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Image info and actions */}
          <div className="flex items-center justify-between bg-grass-50 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-grass-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-primary-800">Image uploaded successfully!</p>
                <p className="text-sm text-primary-600">
                  {formData.image?.name || 'sketch.jpg'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRemoveImage}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
            >
              Change Image
            </button>
          </div>

          {/* Analysis Loading */}
          {isAnalyzing && (
            <div className="bg-primary-100 rounded-3xl p-8 text-center border-2 border-primary-300">
              <div className="inline-flex items-center gap-3 mb-4">
                <svg
                  className="animate-spin h-8 w-8 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-2xl font-bold text-primary-800">Analyzing your sketch...</span>
              </div>
              <p className="text-primary-600">
                I'm looking at your drawing to understand the game elements 🔍
              </p>
            </div>
          )}

          {/* Analysis Error */}
          {analysisError && !isAnalyzing && (
            <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-300">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-bold text-red-800 mb-2">Analysis Failed</p>
                  <p className="text-red-700 mb-4">{analysisError}</p>
                  <button
                    onClick={handleAnalyzeAgain}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Preview */}
          {formData.sketchAnalysis && !isAnalyzing && (
            <SketchAnalysisPreview
              analysis={formData.sketchAnalysis}
              onApprove={handleApproveAnalysis}
              onEdit={handleEditAnalysis}
              onAnalyzeAgain={handleAnalyzeAgain}
            />
          )}

          {/* Edit Modal */}
          {showEditModal && formData.sketchAnalysis && (
            <SketchAnalysisEditModal
              analysis={formData.sketchAnalysis}
              onSave={handleSaveEditedAnalysis}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </div>
      )}

      {/* Optional: Camera capture for mobile */}
      <div className="mt-8 text-center">
        <p className="text-sm text-primary-600 mb-3">On mobile? Use your camera:</p>
        <label
          htmlFor="cameraInput"
          className="inline-block bg-sunny-500 hover:bg-sunny-600 text-white font-semibold py-3 px-6 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105"
        >
          📷 Take Photo
        </label>
        <input
          type="file"
          id="cameraInput"
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}
