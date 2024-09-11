import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun,
  createDataItemSigner,
  connect,
} from "@permaweb/aoconnect";

const DumDumProcess = "GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8";

export default function LeaderBoard() {
  const [scores, setScores] = useState([]);

  const getHighScore = async () => {
    const addr = await window.arweaveWallet.getActiveAddress();
    const res = await dryrun({
      process: DumDumProcess,
      tags: [
        {
          name: "Action",
          value: "GetHighScore",
        },
      ],
    });
    const { Messages } = res;
    const scoreData = Messages[0].Data;
    const scoreObj = JSON.parse(scoreData);
    console.log(scoreObj);

    // Transform the object into an array of {address, score} objects
    const scoresArray = Object.entries(scoreObj).map(([address, score]) => ({
      address,
      score: parseInt(score, 10)  // Ensure score is a number
    }));

    // Sort the array by score in descending order
    scoresArray.sort((a, b) => b.score - a.score);

    setScores(scoresArray);
  };

  useEffect(() => {
    getHighScore();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#4CAF50] to-[#81C784] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to="#" className="flex items-center justify-center">
          <span className="sr-only">DumDumUp</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">Leaderboard</h1>
          <p className="max-w-[600px] text-xl md:text-2xl">See who's dominating the DumDumUp game!</p>
        </div>
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scores.slice(0, 3).map(({ address, score }, index) => (
              <div
                key={address}
                className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center ${
                  index === 0 ? "bg-[#4CAF50]" : index === 1 ? "bg-[#81C784]" : "bg-[#4CAF50]"
                }`}
              >
                <div className="text-6xl font-bold">{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'}</div>
                <div className="text-2xl font-bold">{address.substring(0, 6)}...{address.substring(address.length - 4)}</div>
                <div className="text-4xl font-bold">{score}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            {scores.slice(3).map(({ address, score }, index) => (
              <div
                key={address}
                className={`p-4 rounded-lg shadow-lg flex items-center justify-between mb-2 ${
                  score >= 1000 ? "bg-[#81C784]" : "bg-[#4CAF50]"
                }`}
              >
                <div className="text-2xl font-bold">{address.substring(0, 6)}...{address.substring(address.length - 4)}</div>
                <div className="text-4xl font-bold">{score}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Powered by</span>
          <Link to="#" target="_blank">
            <b>AO</b>
          </Link>
        </div>
      </main>
    </div>
  );
}