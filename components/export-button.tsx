"use client";

import { useState } from "react";

interface ExportButtonProps {
  data: {
    stats: {
      totalRepos: number;
      totalStars: number;
      totalCommitsThisYear: number;
      languages: Array<{ language: string; bytes: number; percentage: number }>;
    };
  };
  username: string;
}

export function ExportButton({ data, username }: ExportButtonProps) {
  const [_exporting, _setExporting] = useState(false);

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `github-stats-${username}-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const shareStats = async () => {
    const text = `Check out my GitHub stats for 2025! 🚀
    
📁 ${data.stats.totalRepos} repositories
⭐ ${data.stats.totalStars} stars
💻 ${data.stats.totalCommitsThisYear} commits

Top language: ${data.stats.languages[0]?.language}

#GitHubWrapped #Coding`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My GitHub Stats 2025",
          text: text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      alert("Stats copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={exportAsJSON}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
      >
        <span>📥</span>
        Export JSON
      </button>
      <button
        type="button"
        onClick={shareStats}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
      >
        <span>📤</span>
        Share Stats
      </button>
    </div>
  );
}
