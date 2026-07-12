"use client";

import { useState, useEffect } from "react";

const phrases = [
  "Best Deals",
  "Best Offers",
  "Pure Commitment",
  "Best Service",
];

export default function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = deleting ? 50 : 100;

    if (!deleting && charIndex === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((i) => (deleting ? i - 1 : i + 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <span className="inline-block min-w-[6ch] text-left">
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
