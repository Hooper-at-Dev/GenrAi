"use client";

import React from "react";
import { Spotlight } from "./Spotlight";
import { Button } from "../ui/moving-border";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/classify");
  };

  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="red" />

      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Discover Your Music Genre
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Upload your track and let our AI identify the genre. Experience the power of machine learning in music classification.
        </p>
        <div className="mt-4 pt-12">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-400"
            onClick={handleButtonClick}
          >
            Classify Your Music
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;