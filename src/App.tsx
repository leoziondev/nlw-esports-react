import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { GameCard } from './components/GameCard';
import { CreateAdModal } from './components/CreateAdModal';

import logo from './assets/logo-esports.svg';

import './styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';

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
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 px-4">
      <img src={logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-20 text-center">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> esta aqui.</h1>

      {/* <div className="grid grid-cols-6 gap-6 mt-16"> */}
      <div className="container">
        <div className="swiperContainer mt-16">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ 
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={6}
            breakpoints={{ 
              "@0.00": {
                slidesPerView: 1.50,
                spaceBetween: 20,
              },
              "@0.50": {
                slidesPerView: 2.50,
                spaceBetween: 20,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              "@1.25": {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 6,
                spaceBetween: 20,
              } 
            }}
          >
            {games.map(game => {
              return (
                <SwiperSlide key={game.id} className="overflow-hidden rounded-lg">
                  <GameCard                  
                    bannerUrl={game.bannerUrl}
                    title={game.title}
                    adsCount={game._count.ads}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>    
        </div>
      </div>

      <CreateAdModal />
      <ToastContainer />
    </div>
  )
}

export default App
