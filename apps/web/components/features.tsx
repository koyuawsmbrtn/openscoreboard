"use client";

import React, { useState } from "react";
import { Blocks, Settings2 } from "lucide-react";
import Github from "./icons/github";

const features = [
  {
    icon: Github,
    title: "Free and open-source",
    description:
      "OpenScoreboard is completely free to use and open-source, allowing you to selfhost it.",
  },
  {
    icon: Settings2,
    title: "Customizable Scoreboards",
    description:
      "Design and configure scoreboards to fit your game's unique style and requirements.",
  },
  {
    icon: Blocks,
    title: "Seamless Integration",
    description:
      "The simple API allows you to integrate OpenScoreboard with your game engine or SDK effortlessly.",
  },
];

const Features = () => {
  const [flashlightStyles, setFlashlightStyles] = useState<Record<number, string>>({});
  const [transformStyles, setTransformStyles] = useState<Record<number, string>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left; // Mouse X relative to the card
    const y = e.clientY - card.top; // Mouse Y relative to the card
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // Rotate up to 10 degrees
    const rotateY = ((x - centerX) / centerX) * -10; // Rotate up to 10 degrees

    setFlashlightStyles((prev) => ({
      ...prev,
      [index]: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 60%)`,
    }));

    setTransformStyles((prev) => ({
      ...prev,
      [index]: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    }));
  };

  const handleMouseLeave = (index: number) => {
    setFlashlightStyles((prev) => ({
      ...prev,
      [index]: "none", // Remove the flashlight effect
    }));
    setTransformStyles((prev) => ({
      ...prev,
      [index]: "rotateX(0deg) rotateY(0deg)", // Reset rotation
    }));
  };

  return (
    <div className="flex items-center justify-center py-12 bg-muted">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mt-4 sm:mt-6">
          Unleash Your Creativity
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-[17px] md:text-lg text-center">
          OpenScoreboard is designed to be flexible and adaptable, allowing you to create the perfect scoreboard for your game.
        </p>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative flex flex-col border rounded-xl py-6 px-5 bg-white dark:bg-muted dark:brightness-[125%] shadow-md transition-transform transform cursor-default"
              style={{
                backgroundImage: flashlightStyles[index], // Apply flashlight effect
                transition: "background-image 0.1s ease-out, transform 0.2s ease-out",
                transform: transformStyles[index], // Apply rotation effect
                perspective: "1000px", // Add perspective for 3D effect
                transformStyle: "preserve-3d", // Preserve 3D transformations
                backfaceVisibility: "hidden", // Hide the back face
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full"
                style={{
                  transform: "translateZ(20px)", // Prevent text/icon warping
                }}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <span
                className="text-lg font-semibold"
                style={{
                  transform: "translateZ(20px)", // Prevent text warping
                }}
              >
                {feature.title}
              </span>
              <p
                className="mt-1 text-foreground/80 text-[15px]"
                style={{
                  transform: "translateZ(20px)", // Prevent text warping
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;