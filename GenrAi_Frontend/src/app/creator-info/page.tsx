"use client";
import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/utils";
import { BackgroundGradient } from "@/app/components/ui/background-gradient";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/app/components/ui/3d-card";
import Link from 'next/link';

// Contact form component to prevent re-rendering the entire page
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Handle form input changes with useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  // Handle form submission with useCallback
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Create mailto URL with form data
    const subject = `Contact from ${formData.name} via Portfolio`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:sarthaknsanjeev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's email client
    window.open(mailtoUrl, "_blank");

    // Reset form after short delay
    setTimeout(() => {
      setFormStatus("success");
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setFormStatus("idle");
      }, 3000);
    }, 500);
  }, [formData]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        disabled={formStatus === "sending"}
      >
        {formStatus === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : "Send Message"}
      </button>

      {formStatus === "success" && (
        <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center text-green-400">
          Message sent successfully! Opening your email client...
        </div>
      )}

      {formStatus === "error" && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center text-red-400">
          There was an error sending your message. Please try again.
        </div>
      )}
    </form>
  );
});

ContactForm.displayName = 'ContactForm';

const CreatorInfoPage = () => {
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "projects" | "contact">("about");

  // Reusable CenteredTab wrapper for consistent alignment
  const CenteredTab = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );

  const tabs = [
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const tabContent = {
    about: (
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
                src="/me.jpg"
                alt="Creator Avatar"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400?text=Your+Photo";
                }}
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Sarthak Sanjeev
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-300">Trainee Developer @Walsis eConnect Pvt Ltd</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                I'm Sarthak, a Computer Science student at Bennett University with a passion for coding, building ML models, and developing websites. I play basketball for my university team and bring creativity and energy to everything I do.
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
              { icon: "🎓", title: "Education", content: "B.Tech in Computer Science and Engineering" },
              { icon: "💼", title: "Experience", content: "Trainee Developer @Walsis eConnect Pvt Ltd" },
              { icon: "🏆", title: "Achievements", content: "Have Created and Deployed bgZap.com" },
              { icon: "🌟", title: "Interests", content: "Play Basketball" },
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
    skills: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Skills & Expertise
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Technical Skills", skills: ["Node.Js", "JavaScript", "Next.Js, React.Js", "HTML, Tailwindcss", "Python, ML, DL", "MySql"] },
              { category: "Soft Skills", skills: ["Public Speaking", "Leadership", "Efficient Work Distribution", "Team Management"] },
              { category: "Tools & Libraries", skills: ["Postman", "Redux", "Radis", "Flask", "TensorFlow, Pytorch", "Git, Github"] },
            ].map((category, i) => (
              <BackgroundGradient key={i} className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </BackgroundGradient>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Skill Proficiency</h3>
            <div className="space-y-4">
              {[
                { skill: "Node.Js", proficiency: 85 },
                { skill: "Next.Js", proficiency: 90 },
                { skill: "Api Building, Testing", proficiency: 90 },
                { skill: "MySql", proficiency: 80 },
                { skill: "Python and Libraries", proficiency: 90 },
                { skill: "Basketball", proficiency: 1000 }
              ].map((item, i) => {
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.skill}</span>
                      <span>{item.proficiency}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.proficiency}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </CenteredTab>
    ),
    projects: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Featured Projects
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {[
              {
                id: 1,
                title: "BgZap",
                description:
                  "Background removal app using machine learning",
                tags: ["Next.js", "Python", "Flask", "TensorFlow"],
                projectLink: "https://bgzap.com",
                repoLink: "https://github.com/username/bgzap",
                image: "/bgZap.png",
              },
              {
                id: 2,
                title: "GenrAi",
                description:
                  "An ML music classification model with stunning front-end design.",
                tags: ["NextJS", "Tailwind", "Framer Motion", "Python", "Flask", "TensorFlow"],
                projectLink: "/",
                repoLink:
                  "https://github.com/Hooper-at-Dev/Music_Genre_Prediction_AI",
                image: "/genrAi.png",
              },
              {
                id: 3,
                title: "ShuttleFy",
                description:
                  "A Cab Booking Website, with 3 tier of role based authentication secured with JWT",
                tags: ["Node.js", "React", "MySql"],
                projectLink: "https://music-app.example.com",
                repoLink: "https://github.com/username/music-app",
                image: "/ShuttleFy.jpg",
              },
              {
                id: 4,
                title: "Payment Gateway",
                description:
                  "Python based payment gateway",
                tags: ["Python", "PayPal Api", "Flask"],
                projectLink: "https://ai-chat.example.com",
                repoLink: "https://github.com/username/ai-chat",
                image: null
              },
            ].map((project) => (
              <CardContainer
                key={project.id}
                className="w-full h-full min-h-[450px]"
                containerClassName="h-full"
              >
                <CardBody className="relative overflow-hidden group/card h-full">
                  {/* Project Title */}
                  <CardItem translateZ="50" className="w-full mb-6">
                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      {project.title}
                    </h3>
                  </CardItem>

                  {/* Image Container with Pop Out Effect */}
                  <CardItem
                    as="div"
                    translateZ="100"
                    rotateX="0"
                    rotateY="0"
                    className="w-full h-60 relative mt-2 mb-8 rounded-xl overflow-hidden"
                  >
                    {/* Border glow layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl"></div>

                    {/* Image wrapper with inner shadow */}
                    <div className="w-full h-full p-[3px] backdrop-blur-sm">
                      <div className="w-full h-full overflow-hidden rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                        <CardItem
                          as="div"
                          translateZ="200"
                          rotateX={5}
                          rotateY={5}
                          className="w-full h-full absolute inset-0 transform-gpu transition-transform duration-500 group-hover/card:translate-z-10 group-hover/card:rotate-x-10 group-hover/card:rotate-y-10"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                          />
                        </CardItem>
                      </div>
                    </div>
                  </CardItem>

                  {/* Description */}
                  <CardItem translateZ="80" className="w-full">
                    <p className="text-gray-400 mb-4">{project.description}</p>
                  </CardItem>

                  {/* Tags */}
                  <CardItem translateZ="100" className="w-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardItem>

                  {/* Action Buttons */}
                  <CardItem translateZ="120" className="w-full mt-auto pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                      <CardItem
                        as="a"
                        href={project.projectLink}
                        translateZ="140"
                        className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Project
                      </CardItem>
                      <CardItem
                        as="a"
                        href={project.repoLink}
                        translateZ="140"
                        className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Repository
                      </CardItem>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </motion.div>
      </CenteredTab>
    ),
    contact: (
      <CenteredTab>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 group [text-shadow:0_0_10px_rgba(59,130,246,0.5),0_0_15px_rgba(168,85,247,0.4)]">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 opacity-70 shadow-[0_0_10px_2px_rgba(74,222,128,0.6)]"></span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 opacity-50 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)]"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-gray-400 text-center md:text-left">
                Interested in working together? Feel free to reach out using the contact form or through any of the provided channels.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "sarthaknsanjeev@gmail.com" },
                  { icon: "📍", label: "Location", value: "Greater Noida, India" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">{item.label}</span>
                      <span className="block font-medium">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                {[
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                      </svg>
                    ),
                    href: "https://www.linkedin.com/in/sarthak-sanjeev-323a05320/"
                  },
                  {
                    name: "GitHub",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                      </svg>
                    ),
                    href: "https://github.com/Hooper-at-Dev"
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"></path>
                      </svg>
                    ),
                    href: "https://www.instagram.com/nolimit._.11"
                  }
                ].map((platform, i) => (
                  <motion.a
                    key={i}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {platform.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            <BackgroundGradient className="p-1 rounded-xl">
              <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl">
                <ContactForm />
              </div>
            </BackgroundGradient>
          </div>
        </motion.div>
      </CenteredTab>
    ),
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-32 pb-16 flex items-center justify-center">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating particles background effect */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/20"
              style={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 20, Math.random() * -20],
                x: [Math.random() * 20, Math.random() * -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="fixed top-32 left-0 right-0 z-10 flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-md rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative mt-20">
          {tabContent[activeTab]}
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorInfoPage;