import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { LockIcon, UnlockIcon } from 'lucide-react'
const arweaveImages = [
  "https://arweave.net/Ov0Xea2kWa5GS1DCEmeF0aoct8rbJwDmizmTo9bQrtY",
  "https://arweave.net/Ive8YUyCU0FQEBSc8UjfTlQYFZY5s8t45gqsNf3uJMw",
  "https://arweave.net/mHJx-qRQZwfwflcGWOqT8Vx3uZ1h5AneAfGgLwVnRkA",
  "https://arweave.net/q7HwNmTNbfpAdVs3kR_YlLayaExLNrfNlU6vjPVFCuU",
  "https://arweave.net/NA6Ehmy4SjJfNljZkP6QI4WI2OZZwe3Bo5exWTQUaA8",
  "https://arweave.net/g8MzoUJ2vrHz40b_jT0q-hAc_jlM7SSSVB5TIrlz3JA",
  "https://arweave.net/JMhR0T7NqmFf3bDhsVZpnufFjcActAnkp-D_Y6n4KdE",
  "https://arweave.net/Csl5nMtg6TQYM_t8XfjNh0iqEb1RYUSO8kTNUwxSfq0",
  "https://arweave.net/Rxkwn8G-CuAYjZvsvR6vwTprD_asA-Ztj8XWDSuAj-Q",
  "https://arweave.net/QXz5DH3x6qmHryShT3uxIZ8c9-HXClQJQNW39iA5mXM",
  "https://arweave.net/DxFa5_ZpDku6R2ZkpWIj1sCNzU9eD4YKepAEtLA7bvg"
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledImages = shuffleArray([...arweaveImages]);

const rewards = [
  {
    id: 1,
    title: "First Steps",
    description: "Reach the first checkpoint without falling.",
    image: shuffledImages[0],
    details: "DumDum believes in baby steps! You’ve taken your first steps without face-planting. Now it gets serious.",
    progress: 10,
    locked: false,
  },
  {
    id: 2,
    title: "DumDum Bounce",
    description: "Fall and bounce back 3 times.",
    image: shuffledImages[1],
    details: "Oops! DumDum loves a good bounce. Keep bouncing back until you get it right!",
    progress: 30,
    locked: false,
  },
  {
    id: 3,
    title: "The 100 Meter Miracle",
    description: "Climb up 100 meters without stopping.",
    image: shuffledImages[2],
    details: "You’ve climbed 100 meters without a break? You’re almost not a DumDum anymore!",
    progress: 40,
    locked: false,
  },
  {
    id: 4,
    title: "AO Explorer",
    description: "Unlock a hidden AO easter egg while climbing.",
    image: shuffledImages[3],
    details: "You’ve stumbled upon AO's secret! Does DumDum understand it? Probably not. But you’re smarter than DumDum now.",
    progress: 50,
    locked: true,
  },
  {
    id: 5,
    title: "Gravity? What’s That?",
    description: "Fall from a height of 300 meters or more.",
    image: shuffledImages[4],
    details: "You’ve tasted the sweet betrayal of gravity. DumDum salutes your bravery—or is it clumsiness?",
    progress: 0,
    locked: false,
  },
  {
    id: 6,
    title: "Sky High",
    description: "Reach the halfway point of the climb.",
    image: shuffledImages[5],
    details: "You’re halfway there! The sky’s the limit…unless you’re DumDum, who got stuck somewhere lower.",
    progress: 50,
    locked: false,
  },
  {
    id: 7,
    title: "DumDum Determined",
    description: "Spend an hour trying to make progress but keep falling.",
    image: shuffledImages[6],
    details: "You may not have climbed much, but your persistence is legendary. DumDum is impressed by your sheer determination—or madness.",
    progress: 0,
    locked: false,
  },
  {
    id: 8,
    title: "The Tower Master",
    description: "Complete the climb without falling once.",
    image: shuffledImages[7],
    details: "You’re officially a master climber. No falls, no fails—just pure DumDum skill.",
    progress: 100,
    locked: true,
  },
  {
    id: 9,
    title: "DumDum God",
    description: "Reach the top of DumDumUp!",
    image: shuffledImages[8],
    details: "You’ve done it! You’ve reached the top, defied all odds, and outsmarted DumDum. Now, you’re a DumDum god.",
    progress: 100,
    locked: true,
  },
  {
    id: 10,
    title: "BFFs with Gravity",
    description: "Fall 50 times in a single playthrough.",
    image: shuffledImages[9],
    details: "DumDum knows what it feels like to fall. A lot. But you’ve taken it to a whole new level. Welcome to the gravity club!",
    progress: 0,
    locked: false,
  },
  {
    id: 11,
    title: "AO Maverick",
    description: "Unlock all AO-related hidden secrets.",
    image: shuffledImages[10],
    details: "You’re not just climbing DumDumUp; you’ve uncovered the mysteries of AO itself. That’s next-level DumDum status.",
    progress: 0,
    locked: true,
  },
  {
    id: 12,
    title: "The Meme Lord",
    description: "Complete the game while wearing the special DumDum Meme Skin.",
    image: shuffledImages[0],  // Using the first image again since only 11 unique URLs were provided
    details: "You didn’t just win; you did it with style. The DumDum Meme Skin says it all: you’re a legend in the making.",
    progress: 0,
    locked: true,
  },
];

export default function Rewards() {
  const [selectedReward, setSelectedReward] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4CAF50] to-[#81C784] text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-shadow">Epic Quests  (Still in Development) </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card 
              key={reward.id} 
              className={`bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 ${reward.locked ? 'opacity-75 hover:opacity-100' : ''}`}
              onClick={() => !reward.locked && setSelectedReward(reward)}
            >
              <CardContent className="p-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  {reward.locked ? (
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      <LockIcon className="w-3 h-3 mr-1" /> Locked
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      <UnlockIcon className="w-3 h-3 mr-1" /> Unlocked
                    </Badge>
                  )}
                </div>
                <img src={reward.image} alt={reward.title} className="w-24 h-24 object-cover mb-4 rounded-full border-4 border-white/50" />
                <h3 className="text-xl font-semibold text-center mb-2">{reward.title}</h3>
                <p className="text-sm text-center text-white/80 mb-4">{reward.description}</p>
                <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${reward.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold">{reward.progress}% Complete</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
        <DialogContent className="bg-gradient-to-b from-[#4CAF50] to-[#81C784] text-white border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedReward?.title}</DialogTitle>
          </DialogHeader>
          <img 
            src={selectedReward?.image} 
            alt={selectedReward?.title} 
            className="w-32 h-32 object-cover mx-auto rounded-full border-4 border-white/50 mb-4" 
          />
          <ScrollArea className="max-h-[60vh]">
            <DialogDescription className="text-white/90 text-lg">
              {selectedReward?.details}
            </DialogDescription>
          </ScrollArea>
          <div className="mt-6">
            <p className="font-semibold text-lg mb-2">Quest Progress: {selectedReward?.progress}%</p>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div 
                className="bg-white h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${selectedReward?.progress}%` }}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
