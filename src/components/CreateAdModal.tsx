import { useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";

import { Input } from "./Form/Input";

import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, []);

  return (
    <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="w-[480px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg shadow-black">
            <Dialog.Title className="text-3xl font-black mb-8">Publique um anúncio</Dialog.Title>

            
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="game" className="font-semibold mb-1">Qual o game?</label>
                <Select.Root
                  name="game"
                  value={currentGame}
                  onValueChange={(value) => setCurrentGame(value)}
                >
                  <Select.Trigger id="game" className="bg-zinc-900 rounded flex items-center justify-between py-3 px-4 text-sm text-zinc-500">
                    <Select.Value placeholder="Selecione o game que deseja jogar" />
                    <Select.Icon>
                      <CaretDown />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-zinc-900 text-zinc-400 rounded">
                      <Select.ScrollUpButton>
                        <CaretUp />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="py-3 px-4">
                        {games.map((game) => {
                          return (
                            <Select.Item
                              value={game.id}
                              key={game.id}
                              className="flex justify-between items-center cursor-pointer hover:bg-violet-500 hover:text-white rounded"
                            >
                              <Select.ItemText className="px-4">{game.title}</Select.ItemText>
                              {currentGame === game.id && (
                                <Select.ItemIndicator>
                                  <Check />
                                </Select.ItemIndicator>
                              )}
                            </Select.Item>
                          );
                        })}
                      </Select.Viewport>
                      <Select.ScrollDownButton>
                        <CaretDown />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
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
                <Checkbox.Root className="w-6 h-6 bg-zinc-900 rounded p-1">
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
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
  )
}