import { useEffect, useState } from "react";

import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.png";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);
  return (
    <div className="max-w[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game.count.ads}
            />
          );
        })}

        <GameBanner
          bannerUrl="/game-1.png"
          title="League of Legends"
          adsCount={5}
        />
        <GameBanner bannerUrl="/game-2.png" title="Dota 2" adsCount={1} />
        <GameBanner bannerUrl="/game-3.png" title="CS:GO" adsCount={2} />
        <GameBanner bannerUrl="/game-4.png" title="Apex Legends" adsCount={3} />
        <GameBanner bannerUrl="/game-5.png" title="Fortnite" adsCount={4} />
        <GameBanner
          bannerUrl="/game-6.png"
          title="World of Warcraft"
          adsCount={5}
        />
      </div>
      <CreateAdBanner />
    </div>
  );
}

export default App;
