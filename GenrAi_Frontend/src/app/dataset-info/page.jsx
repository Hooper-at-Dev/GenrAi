"use client";
import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { BackgroundGradient } from "../components/ui/background-gradient";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import { Rays } from "../components/ui/rays";
import { Beams } from "../components/ui/beams";
import { Lens } from "../components/ui/lens";

const DatasetInfoPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Reusable CenteredTab wrapper for consistent alignment
  const CenteredTab = ({ children }) => (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "statistics", label: "Statistics" },
    { id: "visualization", label: "Visualization" },
  ];

  const tabContent = {
    overview: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src="/dataset/kaggle.png"
                alt="GTZAN Dataset"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400?text=GTZAN+Dataset";
                }}
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                GTZAN Dataset
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-300">Music Genre Classification</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                The GTZAN dataset is the most-used public dataset for music genre recognition (MGR) evaluation. It was collected by George Tzanetakis for the seminal paper on MGR titled "Musical Genre Classification of Audio Signals."
              </p>
            </div>
          </div>
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {[
              { icon: "📊", title: "Size", content: "1000 audio tracks, each 30 seconds long" },
              { icon: "🎵", title: "Genres", content: "10 genres with 100 tracks per genre" },
              { icon: "🔊", title: "Format", content: "WAV audio files, 22050Hz Mono 16-bit" },
              { icon: "📁", title: "Structure", content: "Organized by genre with metadata" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">About the Dataset</h3>
            <p className="text-gray-400 mb-4">
              The GTZAN dataset has been widely used in academic research for music genre classification. It contains 10 genres: Blues, Classical, Country, Disco, Hip-hop, Jazz, Metal, Pop, Reggae, and Rock.
            </p>
            <p className="text-gray-400">
              Each 30-second excerpt was taken from a different song, typically from the middle of the song. The audio files were collected in 2000-2001 from various sources, including personal CDs, radio, and microphone recordings, ensuring a variety of recording conditions and sources.
            </p>
          </div>
        </motion.div>
      </CenteredTab>
    ),

    features: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Audio Features & Characteristics
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Time Domain Features", features: ["Zero Crossing Rate", "Energy", "Entropy of Energy", "Silence Ratio"] },
              { category: "Frequency Domain Features", features: ["Spectral Centroid", "Spectral Spread", "Spectral Entropy", "Spectral Flux", "Spectral Rolloff"] },
              { category: "Cepstral Features", features: ["MFCCs (Mel-Frequency Cepstral Coefficients)", "Delta MFCCs", "Delta-Delta MFCCs"] },
              { category: "Rhythm Features", features: ["Beat Histogram", "Tempo", "Beat Strength", "Rhythm Regularity"] },
              { category: "Harmony Features", features: ["Chroma Vectors", "Key Clarity", "Harmonic Change Detection Function"] },
              { category: "Perceptual Features", features: ["Loudness", "Sharpness", "Spread", "Tonality"] },
            ].map((category, i) => (
              <BackgroundGradient key={i} className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </BackgroundGradient>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Feature Extraction Process</h3>
            <p className="text-gray-400 mb-4">
              Feature extraction transforms raw audio signals into meaningful numerical representations. For the GTZAN dataset, this typically involves:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Segmenting audio into frames (typically 20-40ms with overlap)</li>
              <li>Applying windowing functions (e.g., Hamming window)</li>
              <li>Computing short-time Fourier transform (STFT)</li>
              <li>Extracting time and frequency domain features</li>
              <li>Computing statistical measures across frames (mean, variance, etc.)</li>
            </ol>
          </div>
        </motion.div>
      </CenteredTab>
    ),

    statistics: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Dataset Statistics
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {/* Genre Distribution */}
            <CardContainer className="w-full">
              <CardBody className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <CardItem translateZ="40" className="w-full">
                  <h3 className="text-xl font-semibold mb-4">Genre Distribution</h3>
                  <div className="flex flex-wrap justify-between gap-4">
                    {["Blues", "Classical", "Country", "Disco", "Hip-hop", "Jazz", "Metal", "Pop", "Reggae", "Rock"].map((genre, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="h-28 w-4 bg-gray-700 rounded-t-full overflow-hidden flex flex-col-reverse relative">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="bg-gradient-to-t from-purple-500 to-blue-500 w-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                        <p className="text-xs mt-2 text-gray-400 rotate-45 origin-top-left translate-x-5">{genre}</p>
                        <p className="text-sm font-medium mt-1">100</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 text-center mt-6">All genres have equal representation with 100 tracks each</p>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Audio Characteristics */}
            <CardContainer className="w-full">
              <CardBody className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <CardItem translateZ="40" className="w-full">
                  <h3 className="text-xl font-semibold mb-4">Audio Characteristics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Sample Rate", value: "22,050 Hz" },
                      { label: "Channels", value: "Mono (1)" },
                      { label: "Bit Depth", value: "16-bit" },
                      { label: "Duration", value: "30 seconds" },
                      { label: "File Format", value: "WAV" },
                      { label: "Total Duration", value: "~8.33 hours" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="text-lg font-semibold mt-1">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Feature Statistics */}
            <CardContainer className="w-full">
              <CardBody className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <CardItem translateZ="40" className="w-full">
                  <h3 className="text-xl font-semibold mb-4">Genre Feature Comparison</h3>
                  <div className="space-y-4">
                    {[
                      { feature: "Spectral Centroid", values: [75, 65, 70, 85, 80, 60, 90, 75, 65, 85] },
                      { feature: "Tempo (BPM)", values: [95, 60, 85, 120, 95, 75, 140, 110, 90, 130] },
                      { feature: "Zero Crossing Rate", values: [65, 45, 60, 75, 85, 55, 90, 70, 65, 80] },
                      { feature: "Energy", values: [70, 55, 65, 85, 80, 60, 95, 75, 70, 90] }
                    ].map((item, i) => {
                      const genres = ["Blues", "Classical", "Country", "Disco", "Hip-hop", "Jazz", "Metal", "Pop", "Reggae", "Rock"];
                      return (
                        <div key={i} className="space-y-2">
                          <p className="font-medium">{item.feature}</p>
                          <div className="flex flex-wrap items-end h-20 gap-1">
                            {item.values.map((value, j) => (
                              <div key={j} className="flex flex-col items-center flex-1 min-w-0">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${value}%` }}
                                  transition={{ duration: 1, delay: j * 0.05 }}
                                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                                  style={{ minWidth: "8px" }}
                                />
                                <p className="text-[8px] mt-1 overflow-hidden text-ellipsis whitespace-nowrap w-full text-center text-gray-400">{genres[j]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Note: Values shown are relative and normalized for visualization purposes
                  </p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </motion.div>
      </CenteredTab>
    ),

    visualization: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Visualizations
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <div className="flex flex-col gap-12">
            {/* Card 1 */}
            <div className="w-full relative rounded-3xl overflow-hidden mx-auto bg-gradient-to-r from-[#1D2235] to-[#121318] p-8">
              <Rays className="opacity-70" />
              <Beams />
              <div className="relative z-10">
                <Lens>
                  <Image
                    src="/dataset/waveform.png"
                    alt="Waveform visualization"
                    width={600}
                    height={400}
                    className="rounded-2xl w-full"
                  />
                </Lens>
                <motion.div
                  className="py-4 relative z-20"
                >
                  <h2 className="text-white text-2xl text-left font-bold">
                    Audio Waveform Analysis
                  </h2>
                  <p className="text-neutral-200 text-left">
                    The waveform visualization shows the raw audio signal patterns across different genres. This graph represents a waveform of a music signal from the GTZAN dataset. The x-axis shows time (in seconds), and the y-axis represents the amplitude of the audio signal. The blue line depicts the fluctuation of the audio waveform over time, indicating changes in sound intensity and frequency. This visualization is useful for analyzing the temporal characteristics of the music.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full relative rounded-3xl overflow-hidden mx-auto bg-gradient-to-r from-[#251D35] to-[#181213] p-8">
              <Rays className="opacity-70 transform rotate-90" />
              <Beams />
              <div className="relative z-10">
                <Lens>
                  <Image
                    src="/dataset/freq.png"
                    alt="Frequency spectrum"
                    width={600}
                    height={400}
                    className="rounded-2xl w-full"
                  />
                </Lens>
                <motion.div
                  className="py-4 relative z-20"
                >
                  <h2 className="text-white text-2xl text-left font-bold">
                    Spectrograms of music samples from different genres
                  </h2>
                  <div className="text-neutral-200 text-left space-y-4">
                    <p>
                      This graph shows spectrograms of music samples from different genres (Classical, Jazz, Country, Pop, Rock, and Metal) in the GTZAN dataset. Each subplot represents a 30-second segment of a song, with:
                    </p>
                    <ul className="list-disc list-inside">
                      <li><strong>X-axis</strong>: Time (in seconds).</li>
                      <li><strong>Y-axis</strong>: Frequency (in kHz).</li>
                      <li><strong>Color</strong>: Represents the intensity of frequencies at each time point (darker colors indicate higher intensity).</li>
                    </ul>
                    <p>The patterns in the spectrograms highlight genre-specific characteristics:</p>
                    <ul className="list-disc list-inside">
                      <li><strong>Classical</strong>: Smooth, layered harmonics.</li>
                      <li><strong>Jazz</strong>: Complex, dynamic textures.</li>
                      <li><strong>Country</strong>: Clear, repetitive structures.</li>
                      <li><strong>Pop</strong>: Balanced, rhythmic patterns.</li>
                      <li><strong>Rock</strong>: Strong bass and mid-range frequencies.</li>
                      <li><strong>Metal</strong>: High-energy, aggressive tones.</li>
                    </ul>
                    <p>These visualizations help distinguish musical features across genres.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full relative rounded-3xl overflow-hidden mx-auto bg-gradient-to-r from-[#35251D] to-[#131218] p-8">
              <Rays className="opacity-70 transform rotate-180" />
              <Beams />
              <div className="relative z-10">
                <Lens>
                  <Image
                    src="/dataset/Mel.png"
                    alt="Neural network visualization"
                    width={600}
                    height={400}
                    className="rounded-2xl w-full"
                  />
                </Lens>
                <motion.div
                  className="py-4 relative z-20"
                >
                  <h2 className="text-white text-2xl text-left font-bold">
                    Mel-Spectrogram
                  </h2>
                  <div className="text-neutral-200 text-left space-y-4">
                    <p>
                      This image depicts a Mel-spectrogram of a 30-second audio clip. The Mel-spectrogram maps sound frequencies (on the y-axis) against time (on the x-axis), with color intensity indicating the strength of each frequency band in decibels (dB). Darker colors represent lower intensities, while brighter colors (yellow/orange) indicate higher intensities.
                    </p>
                    <ul className="list-disc list-inside">
                      <li><strong>Y-axis</strong>: Frequency (in Hz), scaled logarithmically to reflect human hearing perception.</li>
                      <li><strong>X-axis</strong>: Time (in seconds).</li>
                      <li><strong>Color Scale</strong>: Represents amplitude in dB, ranging from -80 dB (dark) to +0 dB (bright).</li>
                    </ul>
                    <p>
                      The vertical lines and patterns in the spectrogram reveal the dynamic changes in frequency content throughout the audio, making it useful for analyzing musical or speech signals, especially in machine learning applications like music genre classification or speech recognition.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-full relative rounded-3xl overflow-hidden mx-auto bg-gradient-to-r from-[#1D3525] to-[#121813] p-8">
              <Rays className="opacity-70 transform -rotate-90" />
              <Beams />
              <div className="relative z-10">
                <Lens>
                  <Image
                    src="/dataset/genre.png"
                    alt="Genre distribution"
                    width={600}
                    height={400}
                    className="rounded-2xl w-full"
                  />
                </Lens>
                <motion.div
                  className="py-4 relative z-20"
                >
                  <h2 className="text-white text-2xl text-left font-bold">
                    Musical Key Distribution by Genre
                  </h2>
                  <div className="text-neutral-200 text-left space-y-4">
                    <p>
                      This heatmap illustrates how various musical keys are distributed across different genres in the GTZAN dataset. Each cell represents the frequency (count) of a specific key within a genre, with color intensity indicating the number of occurrences:
                    </p>
                    <ul className="list-disc list-inside">
                      <li><strong>X-axis</strong>: Musical keys (e.g., C, C#, D, etc.), arranged in ascending order.</li>
                      <li><strong>Y-axis</strong>: Music genres (Blues, Country, Disco, HipHop, Jazz, Metal, Pop, Reggae, Rock).</li>
                      <li><strong>Color Scale</strong>: Represents the count of songs in each key, ranging from 0 (dark blue) to 20 (bright red).</li>
                    </ul>
                    <p>The patterns reveal which keys are most commonly used in each genre. For example:</p>
                    <ul className="list-disc list-inside">
                      <li>Some genres may favor certain keys consistently.</li>
                      <li>Others may show more variability or no clear preference.</li>
                    </ul>
                    <p>
                      This visualization helps understand the tonal characteristics and preferences of different music genres.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </CenteredTab>
    ),
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Animated Background Shapes */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-40 right-20 w-64 h-64 rounded-full border border-white/10 opacity-20"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(30,64,175,0.05) 100%)" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-60 left-10 w-40 h-40 rounded-full border border-white/10 opacity-20"
            style={{ background: "radial-gradient(circle, rgba(30,64,175,0.1) 0%, rgba(139,92,246,0.05) 100%)" }}
          />
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            GTZAN Dataset
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            The benchmark dataset for music genre classification
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-md transition-all text-sm font-medium",
                  activeTab === tab.id
                    ? "bg-white/10 text-white shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {tabContent[activeTab]}
        </div>

        {/* Source and Citation */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Dataset source: <a href="https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Kaggle - GTZAN Dataset</a></p>
        </div>
      </div>
    </div>
  );
};

export default DatasetInfoPage;