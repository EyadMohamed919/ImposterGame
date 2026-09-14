import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from "../app/store";

function WinnerCard() {
  const player = useSelector((state: RootState) => state.player);
  const playerList = useSelector((state: RootState) => state.playerListInGame);

  // Find the highest voted player
  const maxPlayer = playerList.reduce((highest, current) => {
    return (current.votesOn > (highest?.votesOn || 0)) ? current : highest;
  }, playerList[0]);

  // Find the imposter from the list to display at the end
  const actualImposter = playerList.find((p) => p.imposter);

  const isSelfEjected = player.id === maxPlayer?.id;
  const isImposterEjected = maxPlayer?.imposter;

  // Determine outcome status
  const isImposter = player.imposter;
  const isWinner = isImposter ? !isSelfEjected : (!isSelfEjected && isImposterEjected);

  // Card configurations based on the 4 game cases
  const getCardDetails = () => {
    if (isImposter) {
      if (isWinner) {
        return {
          title: "VICTORY",
          subtitle: "You Won as an Imposter",
          description: "You successfully deceived the group and avoided ejection!",
          bg: "bg-red-950/80 border-red-600 text-red-100",
          badge: "bg-red-600 text-white",
          accentText: "text-red-400",
        };
      }
      return {
        title: "DEFEAT",
        subtitle: "You Lost as an Imposter",
        description: "The crew identified you and voted you out of the game.",
        bg: "bg-zinc-900 border-red-900/50 text-zinc-300",
        badge: "bg-red-900/60 text-red-200",
        accentText: "text-red-500",
      };
    } else {
      if (isWinner) {
        return {
          title: "VICTORY",
          subtitle: "You Won as a Member",
          description: "Great detective work! The imposter was successfully voted out.",
          bg: "bg-emerald-950/80 border-emerald-500 text-emerald-100",
          badge: "bg-emerald-500 text-slate-950",
          accentText: "text-emerald-400",
        };
      }
      return {
        title: "DEFEAT",
        subtitle: "You Lost as a Member",
        description: isSelfEjected
          ? "The group wrongfully voted you out! The imposter got away."
          : "An innocent member was eliminated. The imposter survived!",
        bg: "bg-slate-900 border-slate-700 text-slate-300",
        badge: "bg-slate-700 text-slate-200",
        accentText: "text-slate-400",
      };
    }
  };

  const card = getCardDetails();

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <div className={`relative overflow-hidden rounded-2xl border-2 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 ${card.bg}`}>
        
        <div className="flex justify-between items-center mb-4">
          <span className={`text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full ${card.badge}`}>
            {isWinner ? "Winner" : "Eliminated"}
          </span>
          <span className="text-xs font-semibold opacity-75 uppercase tracking-wider">
            {isImposter ? "Imposter Role" : "Crew Member"}
          </span>
        </div>

        <div className="text-center my-6 space-y-1">
          <h1 className={`text-4xl font-extrabold tracking-black ${isWinner ? "animate-pulse" : ""}`}>
            {card.title}
          </h1>
          <p className={`text-lg font-bold ${card.accentText}`}>
            {card.subtitle}
          </p>
          <p className="text-sm opacity-80 pt-2 max-w-xs mx-auto">
            {card.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs uppercase tracking-widest opacity-60 font-semibold mb-1">
            The Imposter Was
          </p>
          <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-black text-red-400 text-base">
              {actualImposter ? actualImposter.name || actualImposter.name || `Player #${actualImposter.id}` : "Unknown"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WinnerCard;