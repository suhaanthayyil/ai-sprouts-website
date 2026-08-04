"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/workshop-01.png", alt: "A young instructor explaining an AI model to students" },
  { src: "/workshop-02.png", alt: "Students presenting their med-bot concept to their peers" },
  { src: "/workshop-03.png", alt: "Two students presenting a project at an AI Sprouts workshop" },
  { src: "/workshop-04.png", alt: "A student teaching a machine-learning concept to a workshop group" },
  { src: "/workshop-05.png", alt: "An instructor leading a coding lesson for young learners" },
];

export function HomeCarousel() {
  const [position, setPosition] = useState(0);
  const [sliding, setSliding] = useState(true);
  const loopSlides = [...slides, slides[0]];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setPosition((current) => current + 1), 4000);
    return () => window.clearInterval(timer);
  }, []);

  const continueLoop = () => {
    if (position !== slides.length) return;
    setSliding(false);
    setPosition(0);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setSliding(true)));
  };

  return (
    <section className="home-carousel" aria-label="AI Sprouts workshop photos" aria-roledescription="carousel">
      <div
        className={sliding ? "home-carousel-track" : "home-carousel-track without-transition"}
        style={{ transform: `translateX(-${position * 100}%)` }}
        onTransitionEnd={continueLoop}
      >
        {loopSlides.map((slide, index) => {
          const isClone = index === slides.length;
          const isVisible = position % slides.length === index;
          return (
          <figure className="home-carousel-slide" aria-hidden={isClone || !isVisible} key={`${slide.src}-${index}`}>
            <Image src={slide.src} alt={!isClone && isVisible ? slide.alt : ""} fill priority={index === 0} sizes="(max-width: 820px) calc(100vw - 40px), 54vw" />
          </figure>
          );
        })}
      </div>
    </section>
  );
}
