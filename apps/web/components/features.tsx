import {
  Blocks,
  Settings2,
} from "lucide-react";
import React from "react";
import Github from "./icons/github";

const features = [
  {
    icon: Github,
    title: "Free and open-source",
    description: "OpenScoreboard is completely free to use and open-source, allowing you to selfhost it.",
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5 bg-white dark:bg-muted dark:brightness-[125%] shadow-md transition-transform transform hover:scale-105 cursor-default"
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
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
