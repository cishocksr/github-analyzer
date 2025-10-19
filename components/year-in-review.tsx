"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface YearData {
  user: {
    username: string;
    name: string | null;
    avatar_url: string;
  };
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommitsThisYear: number;
    languages: Array<{
      language: string;
      percentage: number;
    }>;
  };
}

export default function YearInReview({
  accessToken: _accessToken,
}: {
  accessToken: string;
}) {
  const [data, setData] = useState<YearData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % 6); // 6 slides total
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + 6) % 6);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github/analytics");
        if (!response.ok) throw new Error("Failed to fetch data");

        const analytics = await response.json();
        setData(analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowRight" && currentSlide < 5) {
        nextSlide();
      }
      if (e.key === "ArrowLeft" && currentSlide > 0) {
        prevSlide();
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, nextSlide, prevSlide]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your 2025 journey...</div>
      </div>
    );
  }

  if (!data) return null;

  const slides = [
    // Slide 1: Welcome
    <div key="welcome" className="text-center space-y-6">
      <h1 className="text-6xl font-bold">Your 2025 GitHub Wrapped</h1>
      <Image
        src={data.user.avatar_url}
        alt={data.user.name || data.user.username}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mx-auto border-4 border-white"
      />
      <p className="text-2xl">{data.user.name || data.user.username}</p>
      <p className="text-xl opacity-80">
        Let's look back at your coding journey this year
      </p>
    </div>,

    // Slide 2: Commits
    <div key="commits" className="text-center space-y-6">
      <h2 className="text-5xl font-bold">You made</h2>
      <div className="text-8xl font-bold bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
        {data.stats.totalCommitsThisYear.toLocaleString()}
      </div>
      <h2 className="text-5xl font-bold">commits in 2025!</h2>
      <p className="text-xl opacity-80 mt-8">
        That's {Math.floor(data.stats.totalCommitsThisYear / 365)} commits per
        day on average
      </p>
    </div>,

    // Slide 3: Repositories
    <div key="repos" className="text-center space-y-6">
      <h2 className="text-5xl font-bold">You worked on</h2>
      <div className="text-8xl font-bold bg-gradient-to-r from-green-300 to-blue-500 bg-clip-text text-transparent">
        {data.stats.totalRepos}
      </div>
      <h2 className="text-5xl font-bold">repositories</h2>
      <p className="text-xl opacity-80 mt-8">
        Building amazing things, one repo at a time 🚀
      </p>
    </div>,

    // Slide 4: Stars
    <div key="stars" className="text-center space-y-6">
      <h2 className="text-5xl font-bold">Your projects earned</h2>
      <div className="text-8xl font-bold bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent">
        ⭐ {data.stats.totalStars}
      </div>
      <h2 className="text-5xl font-bold">stars total!</h2>
      <p className="text-xl opacity-80 mt-8">People love what you build!</p>
    </div>,

    // Slide 5: Top Language
    <div key="language" className="text-center space-y-6">
      <h2 className="text-5xl font-bold">Your top language was</h2>
      <div className="text-8xl font-bold bg-gradient-to-r from-purple-300 to-pink-500 bg-clip-text text-transparent">
        {data.stats.languages[0]?.language || "Unknown"}
      </div>
      <p className="text-xl opacity-80 mt-8">
        Making up {data.stats.languages[0]?.percentage.toFixed(1)}% of your code
      </p>
    </div>,

    // Slide 6: Final
    <div key="final" className="text-center space-y-6">
      <h1 className="text-6xl font-bold">Keep coding!</h1>
      <p className="text-2xl opacity-80">
        2025 was amazing. Let's make 2026 even better!
      </p>
      <div className="pt-8">
        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="min-h-[500px] flex items-center justify-center">
          {slides[currentSlide]}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {["welcome", "commits", "repos", "stars", "language", "final"].map(
              (slideId, index) => (
                <button
                  key={`slide-${slideId}`}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ),
            )}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        {/* Keyboard Navigation Hint */}
        <p className="text-center text-sm opacity-60 mt-8">
          Use arrow keys or click to navigate
        </p>
      </div>
    </div>
  );
}
