"use client";

import React, { useState, ChangeEvent } from "react";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";

interface Prediction {
  genre: string;
  percentage: number;
}

interface Results {
  predicted_genre: string;
  predictions: Prediction[];
}

export default function ClassifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setResults(null);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process file");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred while processing your file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] flex items-center justify-center pt-28 md:pt-32">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="red" />

        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center mb-8">
          Music Genre Classification
        </h1>

        <div className="bg-black/30 border border-gray-800 rounded-lg p-6 md:p-8 backdrop-blur-sm mx-auto max-w-2xl">
          {!results && (
            <div className="flex flex-col items-center">
              <p className="text-neutral-300 mb-6 text-center max-w-2xl mx-auto">
                Upload your music track and our AI will analyze and classify it into one of our music genres.
                We support MP3 and WAV formats.
              </p>
              
              <div className="w-full max-w-md mx-auto mt-4 mb-6">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("file-upload")?.click()}>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".mp3,.wav"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileName ? (
                    <div className="text-green-400">Selected: {fileName}</div>
                  ) : (
                    <div className="text-gray-400">
                      <p>Drag and drop your audio file here</p>
                      <p className="text-sm mt-2">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-400"
                onClick={handleUpload}
                disabled={isUploading || !file}
              >
                {isUploading ? "Processing..." : "Classify Music"}
              </Button>
            </div>
          )}

          {results && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800 rounded-xl p-6 w-full max-w-lg mb-8">
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Predicted Genre</p>
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {results.predicted_genre}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300 text-sm font-medium mb-2">Genre Distribution</p>
                  {results.predictions.sort((a, b) => b.percentage - a.percentage).map((prediction, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{prediction.genre}</span>
                        <span className="text-gray-400">{prediction.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${prediction.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-400"
                onClick={() => {
                  setFile(null);
                  setFileName("");
                  setResults(null);
                }}
              >
                Classify Another Track
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 