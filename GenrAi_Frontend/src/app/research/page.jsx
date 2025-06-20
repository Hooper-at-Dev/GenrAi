"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { TracingBeam } from "../components/ui/tracing-beam";

export default function ResearchPage() {
  const viewer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeViewer = async () => {
      if (!viewer.current) return;

      try {
        const WebViewerInstance = (await import('@pdftron/webviewer')).default;
        const instance = await WebViewerInstance(
          {
            path: '/webviewer',
            initialDoc: '/research-paper.pdf',
            enableFilePicker: true,
            fullAPI: true,
            disabledElements: [
              'ribbons',
              'toggleNotesButton',
              'searchButton',
              'menuButton',
            ],
          },
          viewer.current,
        );

        // Wait for the viewer to be ready
        await instance.Core.documentViewer.getDocument();

        // Add event listeners after viewer is ready
        instance.Core.documentViewer.addEventListener('documentLoaded', () => {
          instance.UI.setFitMode(instance.UI.FitMode.FitWidth);
          setIsLoading(false);
        });

        instance.Core.documentViewer.addEventListener('documentError', (error) => {
          console.error('Document Error:', error);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error initializing viewer:', error);
        setIsLoading(false);
      }
    };

    initializeViewer();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20">
      <TracingBeam className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Research Paper
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 shadow-2xl"
          >
            {isLoading && (
              <div className="h-[800px] w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400">Loading PDF viewer...</p>
                </div>
              </div>
            )}
            <div ref={viewer} className={`h-[800px] w-full ${isLoading ? 'hidden' : ''}`} />
          </motion.div>

          <div className="mt-12 text-gray-400">
            <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
            <p className="mb-4">
              This research paper explores the fascinating intersection of music and artificial intelligence,
              investigating how machine learning algorithms can enhance music creation and analysis.
            </p>
            <p>
              Through extensive experimentation and data analysis, we demonstrate novel approaches to
              musical pattern recognition and generation, contributing to the growing field of AI-assisted
              music composition.
            </p>
          </div>
        </div>
      </TracingBeam>
    </div>
  );
}