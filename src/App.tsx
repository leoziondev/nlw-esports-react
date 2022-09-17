import './styles/main.css';
import logo from './assets/logo-esports.svg';
import {MagnifyingGlassPlus} from 'phosphor-react';

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> esta aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-1.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">League of Legends</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-2.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">Dota 2</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-3.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">Counter Strike</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-4.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">Apex Legends</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-5.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">Fortnite</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game-6.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0">
            <h2 className="font-bold text-white">World of Craft</h2>
            <span className="text-sm text-zinc-300">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl text-white font-black">Não encontrou o seu duo?</h3>
            <span className="text-zinc-300">Publique um anúncio para encontrar novos players</span>
          </div>
          <button className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white rounded px-4 py-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
