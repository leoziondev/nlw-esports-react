import './styles/main.css';
import logo from './assets/logo-esports.svg';
import { GameCard } from './components/GameCard';
import { AdBanner } from './components/AdBanner';
import { useEffect, useState } from 'react';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> esta aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameCard
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}        
      </div>

      <AdBanner />
    </div>
  )
}

export default App
