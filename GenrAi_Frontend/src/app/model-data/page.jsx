"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/app/components/ui/background-gradient";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/app/components/ui/3d-card";
import { cn } from "../../lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ModelInfoPage = () => {
  const [activeTab, setActiveTab] = useState("architecture");

  // Reusable CenteredTab wrapper for consistent alignment
  const CenteredTab = ({ children }) => (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );

  const tabs = [
    { id: "architecture", label: "Architecture" },
    { id: "preprocessing", label: "Preprocessing" },
    { id: "training", label: "Training" },
    { id: "performance", label: "Performance" },
  ];

  const tabContent = {
    architecture: (
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
                src="/dataset/cnn.jpg"
                alt="CNN Model"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                CNN Architecture
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-300">Music Genre Classification</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                A specialized Convolutional Neural Network designed to process audio spectrograms
                and classify them into distinct music genres with high accuracy.
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Model Overview</h3>
            <p className="text-gray-400 mb-4">
              This model uses a Convolutional Neural Network (CNN) architecture to analyze
              mel-spectrogram representations of audio files. CNNs are especially effective
              for this task as they can identify spatial patterns in the frequency and time
              domains of the spectrograms.
            </p>
            <p className="text-gray-400">
              The architecture consists of 3 convolutional blocks (each with Conv2D, MaxPooling,
              and BatchNormalization), followed by dense layers for classification across 10 music genres.
            </p>
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
              { icon: "🧠", title: "Model Type", content: "Convolutional Neural Network (CNN)" },
              { icon: "📊", title: "Input Shape", content: "(128, 128, 1) - Mel spectrogram images" },
              { icon: "🎯", title: "Output", content: "10 genre classes with softmax activation" },
              { icon: "⚙️", title: "Parameters", content: "~218,887 (after Dropout and softmax layer)" },
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
        </motion.div>
      </CenteredTab>
    ),

    preprocessing: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Audio Preprocessing Pipeline
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <div className="grid grid-cols-1 gap-6">
            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Audio Chunking</h3>
              <div className="text-gray-100 p-4 rounded bg-black/50 font-mono text-sm shadow-inner">
                <div><span className="text-blue-400">audio_path</span> = "./disco.00000.wav"</div>
                <div><span className="text-blue-400">y, sr</span> = librosa.load(audio_path, sr=<span className="text-green-400">None</span>)</div>
                <div><span className="text-blue-400">chunk_duration</span> = <span className="text-green-400">4</span></div>
                <div><span className="text-blue-400">overlap_duration</span> = <span className="text-green-400">2</span></div>
                <div><span className="text-blue-400">chunk_samples</span> = <span className="text-blue-400">int</span>(chunk_duration * sr)</div>
                <div><span className="text-blue-400">overlap_samples</span> = <span className="text-blue-400">int</span>(overlap_duration * sr)</div>
                <div><span className="text-blue-400">num_chunks</span> = <span className="text-blue-400">int</span>(np.ceil((<span className="text-blue-400">len</span>(y) - chunk_samples) / (chunk_samples - overlap_samples)) + <span className="text-green-400">1</span>)</div>

                <div><span className="text-gray-500"># Iterate over the chunks and extract them</span></div>
                <div><span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> range(num_chunks):</div>
                <div className="pl-4"><span className="text-blue-400">start</span> = i * (chunk_samples - overlap_samples)</div>
                <div className="pl-4"><span className="text-blue-400">end</span> = start + chunk_samples</div>
                <div className="pl-4"><span className="text-blue-400">chunk</span> = y[start:end]</div>
                <div className="pl-4">plt.figure(figsize=(<span className="text-green-400">4</span>, <span className="text-green-400">2</span>))</div>
                <div className="pl-4">librosa.display.waveshow(chunk, sr=sr)</div>
                <div className="pl-4">plt.show()</div>
              </div>
              <p className="mt-3 text-gray-200">
                Audio files are loaded and chunked into 4 second segments with 2 second overlap.
              </p>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Mel Spectrogram Extraction</h3>
              <div className="text-gray-100 p-4 rounded bg-black/50 font-mono text-sm shadow-inner">
                <div><span className="text-blue-400">spectrogram</span> = librosa.feature.melspectrogram(y=<span className="text-blue-400">chunk</span>, sr=<span className="text-blue-400">sr</span>)</div>
                <div><span className="text-blue-400">spectrogram_db</span> = librosa.power_to_db(spectrogram, ref=np.max)</div>
              </div>
              <p className="mt-3 text-gray-200">
                Spectrograms are computed using Mel scale, which approximates human auditory perception.
                The power spectrum is converted to decibel (dB) scale for better dynamic range representation.
              </p>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Image Transformation</h3>
              <div className="text-gray-100 p-4 rounded bg-black/50 font-mono text-sm shadow-inner">
                <div><span className="text-blue-400">def</span> load_and_preprocess_data(data_dir, classes, target_shape=(<span className="text-green-400">256</span>, <span className="text-green-400">256</span>)):</div>
              </div>
              <p className="mt-3 text-gray-200">
                Mel spectrograms are resized to fixed dimensions (256x256) and expanded with a channel
                dimension to match CNN input requirements. This creates image-like representations of audio data.
              </p>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">DataSet Split</h3>
              <div className="text-gray-100 p-4 rounded bg-black/50 font-mono text-sm shadow-inner">
                <div><span className="text-blue-400">X_train</span>, <span className="text-blue-400">X_test</span>, <span className="text-blue-400">Y_train</span>, <span className="text-blue-400">Y_test</span> = train_test_split(data, labels, test_size=<span className="text-green-400">0.2</span>, random_state=<span className="text-green-400">42</span>)</div>
              </div>
              <p className="mt-3 text-gray-200">
                The dataset is split into training and validation sets with 80% and 20% respectively.
              </p>
            </BackgroundGradient>
          </div>
        </motion.div>
      </CenteredTab>
    ),

    training: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Model Architecture & Training
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <CardContainer className="w-full">
            <CardBody className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <CardItem translateZ="40" className="w-full">
                <h3 className="text-xl font-semibold mb-4">CNN Architecture</h3>
                <div className="text-gray-300 p-4 rounded bg-black/30 font-mono text-sm">
                  <div><span className="text-blue-400">model</span> = tf.keras.models.Sequential()</div>

                  <div><br /></div>

                  <div>model.add((Conv2D(filters=<span className="text-green-400">32</span>, kernel_size=<span className="text-green-400">3</span>, padding=<span className="text-green-400">'same'</span>, activation=<span className="text-green-400">'relu'</span>, input_shape=X_train[0].shape)))</div>
                  <div>model.add((Conv2D(filters=<span className="text-green-400">32</span>, kernel_size=<span className="text-green-400">3</span>, activation=<span className="text-green-400">'relu'</span>)))</div>
                  <div>model.add((MaxPooling2D(pool_size=<span className="text-green-400">2</span>, strides=<span className="text-green-400">2</span>)))</div>

                  <div><br /></div>

                  <div>model.add((Conv2D(filters=<span className="text-green-400">64</span>, kernel_size=<span className="text-green-400">3</span>, padding=<span className="text-green-400">'same'</span>, activation=<span className="text-green-400">'relu'</span>, input_shape=X_train[0].shape)))</div>
                  <div>model.add((Conv2D(filters=<span className="text-green-400">64</span>, kernel_size=<span className="text-green-400">3</span>, activation=<span className="text-green-400">'relu'</span>)))</div>
                  <div>model.add((MaxPooling2D(pool_size=<span className="text-green-400">2</span>, strides=<span className="text-green-400">2</span>)))</div>

                  <div><br /></div>

                  <div>model.add((Conv2D(filters=<span className="text-green-400">128</span>, kernel_size=<span className="text-green-400">3</span>, padding=<span className="text-green-400">'same'</span>, activation=<span className="text-green-400">'relu'</span>, input_shape=X_train[0].shape)))</div>
                  <div>model.add((Conv2D(filters=<span className="text-green-400">128</span>, kernel_size=<span className="text-green-400">3</span>, activation=<span className="text-green-400">'relu'</span>)))</div>
                  <div>model.add((MaxPooling2D(pool_size=<span className="text-green-400">2</span>, strides=<span className="text-green-400">2</span>)))</div>

                  <div><br /></div>

                  <div>model.add(Dropout(<span className="text-green-400">0.3</span>))</div>

                  <div><br /></div>

                  <div>model.add((Conv2D(filters=<span className="text-green-400">256</span>, kernel_size=<span className="text-green-400">3</span>, padding=<span className="text-green-400">'same'</span>, activation=<span className="text-green-400">'relu'</span>, input_shape=X_train[0].shape)))</div>
                  <div>model.add((Conv2D(filters=<span className="text-green-400">256</span>, kernel_size=<span className="text-green-400">3</span>, activation=<span className="text-green-400">'relu'</span>)))</div>
                  <div>model.add((MaxPooling2D(pool_size=<span className="text-green-400">2</span>, strides=<span className="text-green-400">2</span>)))</div>

                  <div><br /></div>

                  <div>model.add((Conv2D(filters=<span className="text-green-400">512</span>, kernel_size=<span className="text-green-400">3</span>, padding=<span className="text-green-400">'same'</span>, activation=<span className="text-green-400">'relu'</span>, input_shape=X_train[0].shape)))</div>
                  <div>model.add((Conv2D(filters=<span className="text-green-400">512</span>, kernel_size=<span className="text-green-400">3</span>, activation=<span className="text-green-400">'relu'</span>)))</div>
                  <div>model.add((MaxPooling2D(pool_size=<span className="text-green-400">2</span>, strides=<span className="text-green-400">2</span>)))</div>

                  <div><br /></div>

                  <div>model.add(Dropout(<span className="text-green-400">0.3</span>))</div>
                  <div>model.add(Flatten())</div>
                  <div>model.add(Dense(<span className="text-green-400">1200</span>, activation=<span className="text-green-400">'relu'</span>))</div>
                  <div>model.add(Dropout(<span className="text-green-400">0.45</span>))</div>

                  <div><span className="text-gray-500">#Output Layer</span></div>
                  <div>model.add(Dense(units=<span className="text-blue-400">len</span>(classes), activation=<span className="text-green-400">'softmax'</span>))</div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Optimizer</h3>
              <div className="text-gray-300 p-4 rounded bg-black/30 font-mono text-sm">
                <div>optimizer = Adam(learning_rate=<span className="text-green-400">0.0001</span>)</div>
              </div>
              <p className="mt-3 text-gray-400">
                Adam optimizer combines the benefits of AdaGrad and RMSProp, adapting learning rates
                for each parameter with momentum for faster convergence.
              </p>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Loss Function</h3>
              <div className="text-gray-300 p-4 rounded bg-black/30 font-mono text-sm">
                <div>loss=<span className="text-amber-400">'categorical_crossentropy'</span></div>
              </div>
              <p className="mt-3 text-gray-400">
                Categorical cross-entropy is appropriate for multi-class classification problems
                with mutually exclusive classes and one-hot encoded labels.
              </p>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Activation Functions</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-400">
                <div>Conv2D:</div>
                <div className="text-amber-400">ReLU</div>
                <div>Hidden Dense:</div>
                <div className="text-amber-400">ReLU</div>
                <div>Output Layer:</div>
                <div className="text-amber-400">Softmax</div>
              </div>
              <p className="mt-3 text-gray-400">
                ReLU prevents vanishing gradients in deep layers, while Softmax
                normalizes outputs to probability distribution across genre classes.
              </p>
            </BackgroundGradient>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Training Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Training Configuration</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Batch Size: 32</li>
                  <li>• Epochs: 30 </li>
                  <li>• Train/Validation Split: 80%/20%</li>
                  <li>• Data Augmentation: Chunking and Overlaping</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Regularization Techniques</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Dropout (30%, 45%)</li>
                  <li>• Batch Normalization</li>
                  <li>• L2 Regularization (weight decay)</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </CenteredTab>
    ),

    performance: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Model Performance
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>

          <div className="space-y-6">
            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Genre Classification Results</h3>
              <div className="overflow-x-auto max-w-full">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 px-6 text-left">Genre Class</th>
                      <th className="py-2 px-6 text-right">Correct</th>
                      <th className="py-2 px-6 text-right">Total</th>
                      <th className="py-2 px-6 text-right">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { genre: "Blues", correct: 290, total: 305, accuracy: 95.08 },
                      { genre: "Classical", correct: 291, total: 295, accuracy: 98.64 },
                      { genre: "Country", correct: 280, total: 312, accuracy: 89.74 },
                      { genre: "Disco", correct: 300, total: 316, accuracy: 94.94 },
                      { genre: "Hiphop", correct: 250, total: 276, accuracy: 90.58 },
                      { genre: "Jazz", correct: 300, total: 316, accuracy: 94.94 },
                      { genre: "Metal", correct: 300, total: 302, accuracy: 99.34 },
                      { genre: "Pop", correct: 270, total: 291, accuracy: 92.78 },
                      { genre: "Reggae", correct: 280, total: 299, accuracy: 93.65 },
                      { genre: "Rock", correct: 270, total: 289, accuracy: 93.43 }
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-2 px-6">{item.genre}</td>
                        <td className="py-2 px-6 text-right">{item.correct}</td>
                        <td className="py-2 px-6 text-right">{item.total}</td>
                        <td className="py-2 px-6 text-right">
                          <div className="flex items-center justify-end">
                            <span className="mr-2">{item.accuracy}%</span>
                            <div className="w-24 bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${item.accuracy}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BackgroundGradient>

            <BackgroundGradient className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Overall Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Accuracy:</span>
                  <span className="text-green-400 font-bold">94.31%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: "90.85%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Highest Accuracy (Classical):</span>
                  <span className="text-blue-400 font-bold">99.34%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: "97%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Lowest Accuracy (Pop):</span>
                  <span className="text-purple-400 font-bold">89.74%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-300" style={{ width: "81.85%" }}></div>
                </div>
              </div>
            </BackgroundGradient>
          </div>

          <BackgroundGradient className="p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Training Metrics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Loss Over Epochs</h4>
                <div className="w-full h-80 bg-black/30 rounded-lg p-4 relative">
                  <Line
                    data={{
                      labels: Array.from({ length: 30 }, (_, i) => i + 1),
                      datasets: [
                        {
                          label: 'Training Loss',
                          data: [
                            1.7919, 1.2283, 0.9318, 0.7077, 0.5549, 0.4364, 0.3438, 0.2854, 0.2421, 0.1769,
                            0.1509, 0.1336, 0.1192, 0.1139, 0.0791, 0.0798, 0.0663, 0.0738, 0.0615, 0.0587,
                            0.0445, 0.0503, 0.0400, 0.0562, 0.0523, 0.0645, 0.0257, 0.0335, 0.0431, 0.0444
                          ],
                          borderColor: 'rgb(255, 99, 132)',
                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                          borderWidth: 2,
                          tension: 0.3,
                          pointRadius: 3,
                          pointHoverRadius: 5,
                          pointBackgroundColor: 'rgb(255, 99, 132)',
                          pointBorderColor: 'white',
                          pointBorderWidth: 1,
                        },
                        {
                          label: 'Validation Loss',
                          data: [
                            1.3874, 0.9815, 0.8369, 0.6592, 0.5021, 0.4141, 0.4353, 0.4055, 0.3969, 0.2802,
                            0.3457, 0.2958, 0.3049, 0.2986, 0.3936, 0.3171, 0.2434, 0.3423, 0.2451, 0.2736,
                            0.2572, 0.2494, 0.2620, 0.2710, 0.2530, 0.3045, 0.2288, 0.2548, 0.2713, 0.2461
                          ],
                          borderColor: 'rgb(217, 119, 196)',
                          backgroundColor: 'rgba(217, 119, 196, 0.5)',
                          borderWidth: 2,
                          borderDash: [5, 5],
                          tension: 0.3,
                          pointRadius: 3,
                          pointHoverRadius: 5,
                          pointBackgroundColor: 'rgb(217, 119, 196)',
                          pointBorderColor: 'white',
                          pointBorderWidth: 1,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 2,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                          },
                          ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 10
                            },
                            maxRotation: 0,
                            callback: function(tickValue, index) {
                              return index % 5 === 0 ? tickValue : '';
                            }
                          },
                          title: {
                            display: true,
                            text: 'Loss',
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 12
                            }
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            display: false
                          },
                          ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 10
                            },
                            maxRotation: 0,
                            callback: function(tickValue, index) {
                              return index % 5 === 0 ? tickValue : '';
                            }
                          },
                          title: {
                            display: true,
                            text: 'Epochs',
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 12
                            }
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 11
                            },
                            boxWidth: 15,
                            padding: 10
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'rgba(255, 255, 255, 0.9)',
                          bodyColor: 'rgba(255, 255, 255, 0.9)',
                          cornerRadius: 4,
                          displayColors: true,
                          callbacks: {
                            title: function(context) {
                              return `Epoch ${context[0].label}`;
                            }
                          }
                        }
                      },
                    }}
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Accuracy Over Epochs</h4>
                <div className="w-full h-80 bg-black/30 rounded-lg p-4 relative">
                  <Line
                    data={{
                      labels: Array.from({ length: 30 }, (_, i) => i + 1),
                      datasets: [
                        {
                          label: 'Training Accuracy',
                          data: [
                            0.3519, 0.5710, 0.6809, 0.7590, 0.8083, 0.8494, 0.8824, 0.9058, 0.9184, 0.9423,
                            0.9509, 0.9562, 0.9617, 0.9649, 0.9739, 0.9750, 0.9811, 0.9765, 0.9812, 0.9831,
                            0.9856, 0.9853, 0.9865, 0.9825, 0.9849, 0.9805, 0.9927, 0.9893, 0.9870, 0.9860
                          ],
                          borderColor: 'rgb(66, 135, 245)',
                          backgroundColor: 'rgba(66, 135, 245, 0.5)',
                          borderWidth: 2,
                          tension: 0.3,
                          pointRadius: 3,
                          pointHoverRadius: 5,
                          pointBackgroundColor: 'rgb(66, 135, 245)',
                          pointBorderColor: 'white',
                          pointBorderWidth: 1,
                        },
                        {
                          label: 'Validation Accuracy',
                          data: [
                            0.4982, 0.6765, 0.7192, 0.7806, 0.8347, 0.8628, 0.8581, 0.8738, 0.8738, 0.9115,
                            0.8948, 0.9092, 0.9082, 0.9078, 0.8861, 0.9119, 0.9249, 0.9018, 0.9342, 0.9199,
                            0.9329, 0.9245, 0.9309, 0.9255, 0.9295, 0.9249, 0.9399, 0.9376, 0.9275, 0.9422
                          ],
                          borderColor: 'rgb(72, 199, 116)',
                          backgroundColor: 'rgba(72, 199, 116, 0.5)',
                          borderWidth: 2,
                          borderDash: [5, 5],
                          tension: 0.3,
                          pointRadius: 3,
                          pointHoverRadius: 5,
                          pointBackgroundColor: 'rgb(72, 199, 116)',
                          pointBorderColor: 'white',
                          pointBorderWidth: 1,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 1,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                          },
                          ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 10
                            },
                            callback: function(tickValue) {
                              return (Number(tickValue) * 100).toFixed(0) + '%';
                            }
                          },
                          title: {
                            display: true,
                            text: 'Accuracy',
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 12
                            }
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            display: false
                          },
                          ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 10
                            },
                            maxRotation: 0,
                            callback: function(tickValue, index) {
                              return index % 5 === 0 ? tickValue : '';
                            }
                          },
                          title: {
                            display: true,
                            text: 'Epochs',
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 12
                            }
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                              size: 11
                            },
                            boxWidth: 15,
                            padding: 10
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'rgba(255, 255, 255, 0.9)',
                          bodyColor: 'rgba(255, 255, 255, 0.9)',
                          cornerRadius: 4,
                          displayColors: true,
                          callbacks: {
                            title: function(context) {
                              return `Epoch ${context[0].label}`;
                            },
                            label: function(context) {
                              let label = context.dataset.label || '';
                              if (label) {
                                label += ': ';
                              }
                              if (context.parsed.y !== null) {
                                label += (context.parsed.y * 100).toFixed(2) + '%';
                              }
                              return label;
                            }
                          }
                        }
                      },
                    }}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-lg font-medium mb-3">Final Metrics</h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span>Final Training Loss:</span>
                          <span className="text-red-400">0.044</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-red-400 to-red-600 h-1.5 rounded-full shadow-[0_0_4px_#ff0000] transition-all duration-300" style={{ width: "2.05%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <span>Final Validation Loss:</span>
                          <span className="text-pink-400">0.246</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-pink-400 to-pink-600 h-1.5 rounded-full shadow-[0_0_4px_#ff6bb8] transition-all duration-300" style={{ width: "18.35%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <span>Best Traning Accuracy:</span>
                          <span className="text-pink-400">99.26% (Epoch 27)</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-pink-400 to-pink-600 h-1.5 rounded-full shadow-[0_0_4px_#ff6bb8] transition-all duration-300" style={{ width: "99.26%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span>Final Training Accuracy:</span>
                          <span className="text-blue-400">98.60%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-blue-400 via-green-400 to-teal-500 h-1.5 rounded-full shadow-[0_0_4px_#00cc66] transition-all duration-300" style={{ width: "98.6%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <span>Final Validation Accuracy:</span>
                          <span className="text-green-400">94.22%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-blue-400 via-green-400 to-teal-500 h-1.5 rounded-full shadow-[0_0_4px_#00cc66] transition-all duration-300" style={{ width: "90.7%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <span>Best Validation Accuracy:</span>
                          <span className="text-green-400">94.22% (Epoch 30)</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="bg-gradient-to-r from-blue-400 via-green-400 to-teal-500 h-1.5 rounded-full shadow-[0_0_4px_#00cc66] transition-all duration-300" style={{ width: "93.2%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg bg-white/5">
                  <h5 className="font-medium mb-2">Key Observations</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    <li>Model achieves 90.7% final validation accuracy</li>
                    <li>Training accuracy reached 98.6%, suggesting some overfitting</li>
                    <li>Best performance at epoch 25 (93.2%)</li>
                    <li>Validation loss plateaus around epoch 15, then fluctuates</li>
                  </ul>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      </CenteredTab>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-32 pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] left-0 -translate-x-[10%] w-[120%] h-[120%] opacity-50">
          <div className="absolute inset-0 z-[-1]">
            <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,#3b82f6_0,#3b82f620_35%,#3b82f600_70%)]"></div>
            <div className="absolute bottom-0 left-0 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,#8b5cf6_0,#8b5cf620_35%,#8b5cf600_70%)]"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12 mt-8">
          <div className="relative">
            <div className="flex space-x-1 bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 border border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap",
                    activeTab === tab.id
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default ModelInfoPage;