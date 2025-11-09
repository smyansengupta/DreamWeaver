'use client';

import React, { useState, useCallback } from 'react';
import { GameFormData } from '@/types/game';

interface Step1UploadProps {
  formData: GameFormData;
  updateFormData: (data: Partial<GameFormData>) => void;
}

export default function Step1Upload({ formData, updateFormData }: Step1UploadProps) {
  const [isDragging, setIsDragging] = useState(false);

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
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateFormData({
      image: undefined,
      imagePreview: undefined,
    });
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
        <div className="relative">
          {/* Image preview */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-grass-400">
            <img
              src={formData.imagePreview}
              alt="Game sketch preview"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Image info and actions */}
          <div className="mt-6 flex items-center justify-between bg-grass-50 p-6 rounded-2xl">
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
