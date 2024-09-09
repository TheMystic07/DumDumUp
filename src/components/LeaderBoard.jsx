import React from "react";
import  { Link } from "react-router-dom";

const leaderboardData = {
 
  "0x123...abc": 1234,
  "0x456...def": 1200,
  "0x789...ghi": 1150,
  "0x321...jkl": 950,
  "0x654...mno": 900,
  "0x987...pqr": 800,
  "0x123...stu": 750,
  "0x456...vwx": 700,
  "0x789...yza": 650,
  "0x321...bcd": 600,
  "0x654...efg": 550,
  "0x987...hij": 500,
  "0x123...klm": 450,
  "0x456...nop": 400,
  "0x789...qrs": 350,
  "0x321...tuv": 300,
  "0x654...wxy": 250,
  "0x987...zab": 200,
  "0x123...cde": 150,
  "0x456...fgh": 100,
  "0x789...ijk": 50,
  "0x321...lmn": 25,
  "0x654...opq": 10,





};

const sortedLeaderboard = Object.entries(leaderboardData)
  .sort(([, a], [, b]) => b - a)
  .map(([address, score]) => ({ address, score }));

export default function LeaderBoard() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#4CAF50] to-[#81C784] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link  to="#" className="flex items-center justify-center"  >
          {/* <WavesIcon className="h-6 w-6" /> */}
          <span className="sr-only">DumDumUp</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link  to="#" className="text-sm font-medium hover:underline underline-offset-4"  >
            About
          </Link>
          <Link  to="/" className="text-sm font-medium hover:underline underline-offset-4"  >
            Home
          </Link>
          <Link  to="#" className="text-sm font-medium hover:underline underline-offset-4"  >
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
            {sortedLeaderboard.slice(0, 3).map(({ address, score }, index) => (
              <div
                key={address}
                className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center ${
                  index === 0 ? "bg-[#4CAF50]" : index === 1 ? "bg-[#81C784]" : "bg-[#4CAF50]"
                }`}
              >
                <div className="text-6xl font-bold">{index + 1}st</div>
                <div className="text-2xl font-bold">{address}</div>
                <div className="text-4xl font-bold">{score}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            {sortedLeaderboard.slice(3).map(({ address, score }) => (
              <div
                key={address}
                className={`p-4 rounded-lg shadow-lg flex items-center justify-between mb-2 ${
                  score >= 1000 ? "bg-[#81C784]" : "bg-[#4CAF50]"
                }`}
              >
                <div className="text-2xl font-bold">{address}</div>
                <div className="text-4xl font-bold">{score}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Powered by</span>
          <Link  to="#" target="_blank"  >
           <b>AO</b>
          </Link>
        </div>
      </main>
    </div>
  );
}

