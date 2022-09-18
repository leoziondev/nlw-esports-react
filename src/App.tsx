import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameCard } from './components/GameCard';
import { AdBanner } from './components/AdBanner';

import logo from './assets/logo-esports.svg';

import './styles/main.css';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

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

      <Dialog.Root>
        <AdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="w-[480px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg shadow-black">
            <Dialog.Title className="text-3xl font-black mb-8">Publique um anúncio</Dialog.Title>

            
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="game" className="font-semibold mb-1">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold mb-1">Seu nickname</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="yearsPlaying" className="font-semibold mb-1">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="discord" className="font-semibold mb-1">Qual seu discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="weekDays" className="font-semibold mb-1">Quando costuma jogar?</label>
                <div className="flex justify-between">
                  <button title="Domingo" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Dom</button>
                  <button title="Segunda" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Seg</button>
                  <button title="Terça" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Ter</button>
                  <button title="Quarta" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Qua</button>
                  <button title="Quinta" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Qui</button>
                  <button title="Sexta" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Sex</button>
                  <button title="Sabado" className="flex items-center justify-center p-3 bg-zinc-900 hover:bg-violet-600 rounded text-xs">Sab</button>
                </div>
              </div>
              <div className="flex flex-col">
                  <label htmlFor="discord" className="font-semibold mb-1">Qual o horário do dia?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="time" placeholder="De" />
                    <Input type="time" placeholder="Até" />
                  </div>
                </div>
              <div className="flex items-center gap-2 text-sm">
                <Input type="checkbox"/>
                Costumo me conectar ao chat de voz
              </div>

              <footer className="flex justify-end gap-6">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 h-12 rounded-md font-semibold px-5">Cancelar</Dialog.Close>
                <button type="submit" className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 h-12 rounded-md font-semibold px-5">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
