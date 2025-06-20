"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import courseData from "../../data/music_courses.json";
import Link from "next/link";
import { BackgroundGradient } from "./background-gradient";
import { cn } from "../../../lib/utils";

function FeaturedCourses() {
  const featuredCourses = courseData.courses.filter(
    (course) => course.isFeatured
  );

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-black py-16">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial fade overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Main content */}
      <motion.div
        className="relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-base text-teal-400 font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Music Classification
          </motion.h2>
          <motion.p
            className="mt-3 text-4xl leading-8 font-extrabold tracking-tight text-black dark:text-white sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover Music Genres
          </motion.p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 justify-center">
            <AnimatePresence>
              {featuredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  className="flex justify-center"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden max-w-sm w-full shadow-lg">
                    <div className="p-6 flex flex-col items-center text-center flex-grow">
                      <motion.p
                        className="text-xl font-bold text-black dark:text-white mt-4 mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {course.title}
                      </motion.p>
                      <motion.p
                        className="text-sm text-neutral-600 dark:text-neutral-300 flex-grow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {course.description}
                      </motion.p>
                      <motion.div
                        className="mt-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={course.url}
                          className="inline-block px-6 py-2 text-sm font-medium text-white bg-teal-500 rounded-full hover:bg-teal-600 transition-colors"
                        >
                          Explore
                        </Link>
                      </motion.div>
                    </div>
                  </BackgroundGradient>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FeaturedCourses;