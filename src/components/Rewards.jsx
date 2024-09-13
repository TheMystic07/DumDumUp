import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { LockIcon, UnlockIcon } from 'lucide-react'

const rewards = [
        {
          id: 1,
          title: "First Steps",
          description: "Reach the first checkpoint without falling.",
          image: "/dumdum_first_steps.svg?height=100&width=100",
          details: "DumDum believes in baby steps! You’ve taken your first steps without face-planting. Now it gets serious.",
          progress: 10,
          locked: false,
        },
        {
          id: 2,
          title: "DumDum Bounce",
          description: "Fall and bounce back 3 times.",
          image: "/dumdum_bounce.svg?height=100&width=100",
          details: "Oops! DumDum loves a good bounce. Keep bouncing back until you get it right!",
          progress: 30,
          locked: false,
        },
        {
          id: 3,
          title: "The 100 Meter Miracle",
          description: "Climb up 100 meters without stopping.",
          image: "/dumdum_100meter.svg?height=100&width=100",
          details: "You’ve climbed 100 meters without a break? You’re almost not a DumDum anymore!",
          progress: 40,
          locked: false,
        },
        {
          id: 4,
          title: "AO Explorer",
          description: "Unlock a hidden AO easter egg while climbing.",
          image: "/dumdum_ao_explorer.svg?height=100&width=100",
          details: "You’ve stumbled upon AO's secret! Does DumDum understand it? Probably not. But you’re smarter than DumDum now.",
          progress: 50,
          locked: true,
        },
        {
          id: 5,
          title: "Gravity? What’s That?",
          description: "Fall from a height of 300 meters or more.",
          image: "/dumdum_gravity.svg?height=100&width=100",
          details: "You’ve tasted the sweet betrayal of gravity. DumDum salutes your bravery—or is it clumsiness?",
          progress: 0,
          locked: false,
        },
        {
          id: 6,
          title: "Sky High",
          description: "Reach the halfway point of the climb.",
          image: "/dumdum_sky_high.svg?height=100&width=100",
          details: "You’re halfway there! The sky’s the limit…unless you’re DumDum, who got stuck somewhere lower.",
          progress: 50,
          locked: false,
        },
        {
          id: 7,
          title: "DumDum Determined",
          description: "Spend an hour trying to make progress but keep falling.",
          image: "/dumdum_determined.svg?height=100&width=100",
          details: "You may not have climbed much, but your persistence is legendary. DumDum is impressed by your sheer determination—or madness.",
          progress: 0,
          locked: false,
        },
        {
          id: 8,
          title: "The Tower Master",
          description: "Complete the climb without falling once.",
          image: "/dumdum_tower_master.svg?height=100&width=100",
          details: "You’re officially a master climber. No falls, no fails—just pure DumDum skill.",
          progress: 100,
          locked: true,
        },
        {
          id: 9,
          title: "DumDum God",
          description: "Reach the top of DumDumUp!",
          image: "/dumdum_god.svg?height=100&width=100",
          details: "You’ve done it! You’ve reached the top, defied all odds, and outsmarted DumDum. Now, you’re a DumDum god.",
          progress: 100,
          locked: true,
        },
        {
          id: 10,
          title: "BFFs with Gravity",
          description: "Fall 50 times in a single playthrough.",
          image: "/dumdum_gravity_bff.svg?height=100&width=100",
          details: "DumDum knows what it feels like to fall. A lot. But you’ve taken it to a whole new level. Welcome to the gravity club!",
          progress: 0,
          locked: false,
        },
        {
          id: 11,
          title: "AO Maverick",
          description: "Unlock all AO-related hidden secrets.",
          image: "/dumdum_ao_maverick.svg?height=100&width=100",
          details: "You’re not just climbing DumDumUp; you’ve uncovered the mysteries of AO itself. That’s next-level DumDum status.",
          progress: 0,
          locked: true,
        },
        {
          id: 12,
          title: "The Meme Lord",
          description: "Complete the game while wearing the special DumDum Meme Skin.",
          image: "/dumdum_meme_lord.svg?height=100&width=100",
          details: "You didn’t just win; you did it with style. The DumDum Meme Skin says it all: you’re a legend in the making.",
          progress: 0,
          locked: true,
        },
      
      
]

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
