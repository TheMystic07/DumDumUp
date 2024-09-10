import React from 'react';
import { ConnectButton , useConnection } from 'arweave-wallet-kit'
import { Link } from 'react-router-dom';
import {
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun,
  createDataItemSigner , connect
} from "@permaweb/aoconnect";


export default function Landing() {



  const { connected, connect, disconnect } = useConnection();
  const DumDumProcess = "GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8"
  const aoSigner = createDataItemSigner(window.arweaveWallet);


  const ao = connect();
  const DumDumConnect= async () => {
    await window.arweaveWallet.connect(["ACCESS_ADDRESS"]);
    const m_id = await message({
      process: DumDumProcess,
      signer: createDataItemSigner(window.arweaveWallet),
      // data: JSON.stringify(pos),`
      tags: [{ name: "Action", value: "Connect" }],
    });
    const res = await  result({
      process: DumDumProcess,
      message: m_id,
    });
    console.log(res);
  
  };
  

  // async function DumDumConnect(){
  //   await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);

  //   const res = await message({
  //     process: DumDumProcess,
  //     tags: [{name: "Action", value: "Connect" },],
  //     // data:  json
  //     signer: aoSigner,
  //     // data: window.arweaveWallet.getActiveAddress(),
  //   });
  //   console.log("DumDum  result", res);

  //   const msgResult = await result({
  //     process: DumDumProcess,
  //     message: res,
  //   });


  //   console.log(msgResult);

  //   const messageId = await message({
  //     process: DumDumProcess ,
  //     signer: createDataItemSigner(window.arweaveWallet),
  //     tags: [{ name: "Action", value: "Connect" }],
  //     data: `Send({Target="GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8",Action="Connect"})`,
  //   });
  //   let res1 = await result({
  //     message: messageId,
  //     process: DumDumProcess,
  //   });
  
  // }





  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-to-b from-[#4CAF50] to-[#81C784] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to="#" className="flex items-center justify-center">
          <WavesIcon className="h-6 w-6" />
          <span className="sr-only">DumDumUp</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link  to="/leaderboard" className="text-sm font-medium hover:underline underline-offset-4">
            Leaderboard
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">DumDumUp</h1>
          <p className="max-w-[600px] text-xl md:text-2xl">
            Climb to the top and become the ultimate champion.
          </p>
        </div>

{connected ? (
          <button >
            <Link to="/game" >
              <button className='px-6 py-3 text-lg font-medium bg-gradient-to-r from-[#4CAF50] to-[#81C784] hover:from-[#81C784] hover:to-[#4CAF50] shadow-lg shadow-[#4CAF50]/50 rounded-md' onClick={()=>DumDumConnect()} >
              Explore </button>
            </Link>
          </button>
        ) : (
          
        <ConnectButton
//   accent="rgb(255, 0, 0)"
profileModal={true}
showBalance={false}
showAddress={false}
showProfilePicture={true}
/>
        )}
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

function WavesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

