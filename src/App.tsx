import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import { GameCard } from './components/GameCard';
import { CreateAdModal } from './components/CreateAdModal';

import logo from './assets/logo-esports.svg';

import './styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

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
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
    });
  }, [games]);

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

      <CreateAdModal />
      <ToastContainer />
    </div>
  )
}

export default App
